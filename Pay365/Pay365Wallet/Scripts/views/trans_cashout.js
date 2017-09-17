cashout = new function () {
    this.listBankCashout = {};
    this.actionTracking = "";
    this.GetListBankCashout = function () {
        //0: all
        //1: nội địa
        //2: quốc tế
        utils.paragraphLoading('cashout_bank_online_t');
        utils.paragraphLoading('cashout_bank_t');
        utils.paragraphLoading('cashout_bank_recent_t');
        utils.getData(utils.trasactionApi() + "CashOut/GetListBank", { BankID: 0, Status: 1 }, function (data) {
            if (data.c >= 0 && data.p && data.p.length > 0) {
                cashout.listBankCashout = data.p;
                var bankOfflines = data.p.filter(function (item) {
                    return item.BankCode !== 'STB';
                });
                bankOfflines.forEach(function (item) {
                    switch (item.BankCode) {
                        case 'STB':
                            item.piority = 7;
                            break;
                        case 'VCB':
                            item.piority = 6;
                            break;
                        case 'CTG':
                            item.piority = 5;
                            break;
                        case 'BIDV':
                            item.piority = 4;
                            break;
                        case 'VARB':
                            item.piority = 3;
                            break;
                        case 'TCB':
                            item.piority = 2;
                            break;
                        case 'MSB':
                            item.piority = 1;
                            break;
                        default:
                            item.piority = 0;
                    }
                });

                bankOfflines.sort(function (a, b) {
                    return b.piority - a.piority;
                });

                $("#cashout_bank_t").html($("#cashout_bank_tmpl").tmpl({ listBank: bankOfflines }));

                var bankOnlines = data.p.filter(function (item) {
                    return item.BankCode === 'STB';
                });

                $("#cashout_bank_online_t").html($("#cashout_bank_online_tmpl").tmpl({ listBank: bankOnlines }));
                cashout.GetListCashoutRecent(null, null, 'cashout_bank_recent_t');
                //topup.GetListTopupRecent();
            }
        }, function (err) {
            console.log(err);
            $("#cashout_bank_t").html('');
            $("#cashout_bank_recent_t").html('');
            $("#cashout_bank_online_t").html('');
        });
    };

    this.GetListCashoutRecent = function (loading, takeAll, formID, serviceID) {
        //0: all
        //1: nội địa
        //2: quốc tế
        if (loading)
            utils.paragraphLoading(formID);
        utils.getData(utils.trasactionApi() + "payment/GetPaymentLogs", { serviceId: (common.transactionService.WithdrawalOffline + '|' + common.transactionService.WithdrawalOnline) }, function (data) {
            if (data.c >= 0 && data.p && data.p.length > 0) {
                console.log(data.p);
                var listBankRecent = [];
                if (!takeAll) {
                    var bankCodes = '';
                    $.each(data.p, function (i, el) {
                        if (bankCodes === '' || bankCodes.indexOf(el.JsonObject.BankCode) === -1) {
                            bankCodes += el.JsonObject.BankCode + '|';
                            listBankRecent.push(el);
                        }
                    });
                }
                else
                    listBankRecent = data.p;

                if (serviceID)
                    listBankRecent = listBankRecent.filter(function (item) {
                        return (item.JsonObject.ServiceID === serviceID);
                    });

                const $formId = $('#' + formID);
                if (listBankRecent.length !== 0) {
                    listBankRecent.sort(function (a, b) {
                        return b.JsonObject.TransactionID - a.JsonObject.TransactionID;
                    });
                    if (formID === 'cashout_log_recent_t') {
                        $formId.parents('#formCashoutRecent').show().siblings('#formCashoutMain').removeClass('col-center');
                    }
                    $formId.html($("#" + formID + 'mpl').tmpl({ listBankRecent: listBankRecent }));
                }

                else {
                    $formId.html('');
                    //Ẩn gd gần đây
                    if (formID === 'cashout_log_recent_t') {
                        $formId.parents('#formCashoutRecent').hide().siblings('#formCashoutMain').addClass('col-center');
                    }
                    else if (formID === 'cashout_bank_recent_t')
                        $formId.parents('#formBankRecent').hide();
                }
            }
        }, function (err) {
            console.log(err);
            const $formId = $('#' + formID);
            $formId.html('');
            //Ẩn gd gần đây
            if (formID === 'cashout_log_recent_t') {
                $formId.parents('#formCashoutRecent').hide().siblings('#formCashoutMain').addClass('col-center');
            }
            else if (formID === 'cashout_bank_recent_t')
                $formId.parents('#formBankRecent').hide();
        });
    };

    this.GetBankRemember = function (type, bankCode) {
        var $formID = $('#cashoutStep1'), $dlID;
        if (type === 2) {
            $dlID = $('#dl_bank_on');
        } else {
            $dlID = $('#dl_bank_off');
        }

        $formID.find('.input-dropdown input').css('width', 'calc(100% - 3rem)');
        $formID.find('.input-dropdown-content').hide();
        utils.getData(utils.trasactionApi() + "CashOut/BankGetRemember", { Type: type }, function (data) {
            if (data.c >= 0 && data.p && data.p.length > 0) {
                console.log(data.p);
                var bankRemembers = data.p.filter(function (item) {
                    return (item.BankCode === bankCode);
                });

                if (bankRemembers.length) {
                    $.each(bankRemembers,
                        function (i, el) {
                            var data = el.BankAccountID + '#' + el.BankOwnerName + '#' + el.BankBranch;
                            $dlID.append('<li><a href="javascript:;" data-remember="' +
                                data +
                                '">' +
                                el.BankAccountID +
                                '</a></li>');
                        });

                    $('.dropdown-input').dropdown({
                        inDuration: 300,
                        outDuration: 225,
                        constrainWidth: true, // Does not change width of dropdown to that of the activator
                        hover: false, // Activate on hover
                        gutter: 0, // Spacing from edge
                        belowOrigin: true, // Displays dropdown below the button
                        alignment: 'right', // Displays dropdown with edge aligned to the left of button
                        stopPropagation: false // Stops event propagation
                    });

                    //listening event

                    $formID.find('#cashout_online_content #bank_account, #cashout_offline_content #bank_account').focusin(function () {
                        var that = $(this);
                        setTimeout(function () {
                            that.parent().find('.input-dropdown-content .dropdown-button').dropdown('open');
                        }, 200);
                    });

                    $formID.find('#cashout_online_content #bank_account, #cashout_offline_content #bank_account').focusout(function () {
                        var that = $(this);
                        setTimeout(function () {
                            that.parent().find('.input-dropdown-content .dropdown-button').dropdown('close');
                        }, 200);
                    });

                    $dlID.find('li').on('click',
                        'a',
                        function () {
                            var data = $(this).data('remember');
                            if (!data) return;
                            var dataArray = data.split('#');
                            var $formCashout = type === 2
                                ? $('#cashout_online_content')
                                : $('#cashout_offline_content');

                            var $bankAccount = $formCashout.find('#bank_account');

                            $bankAccount.val(dataArray[0]).removeClass('error').siblings('label')
                                .addClass('active').siblings('.error-text').text('');
                            cashout.CheckBankAccount($bankAccount);
                            utils.bankCardFormat($bankAccount, null, dataArray[0]);
                            if (type !== 2) {
                                $formCashout.find('#bank_account_holder').removeClass('error').val(dataArray[1]).siblings('label')
                                    .addClass('active');
                                $formCashout.find('#bank_brand').removeClass('error').val(dataArray[2]).siblings('label')
                                    .addClass('active');
                            }
                        });
                    $formID.find('.input-dropdown input').css('width', 'calc(100% - 30px - 3rem)');
                    $formID.find('.input-dropdown-content').show();
                }
            }
        }, function (err) {
            console.log(err);
        });
    }

    this.CashoutBankDetail = function (t, type) {
        if (header.AccountInfo.Status !== common.accountStatus.CER) {
            if (header.AccountInfo.CurrentLang === 'en')
                ModalNotificationResultInit('danger',
                    'Account has not been certification',
                    null,
                    'Go home page',
                    'Certificate now',
                    function () { window.location.href = utils.rootUrl() + 'thong-tin' },
                    function () { window.location.href = utils.rootUrl() + 'thong-tin-tai-khoan' });
            else
                ModalNotificationResultInit('danger',
                    'Tài khoản chưa được chứng thực',
                    null,
                    'Về trang chủ',
                    'Chứng thực ngay',
                    function () { window.location.href = utils.rootUrl() + 'thong-tin' },
                    function () { window.location.href = utils.rootUrl() + 'thong-tin-tai-khoan' });
            return;
        }

        var bankInfo = $(t).data('bankinfo');
        bankInfo = bankInfo.split('#');
        let $bankElm = $('#cashout_bank_info');
        $bankElm.find('img').attr('src', utils.rootUrl() + 'Content/assets/images/brands/logo-banks/' + bankInfo[1] + '.png');
        $('#cashout_bankcode').val(bankInfo[1]);
        $bankElm.find('#cashout_bank_name').text(common.getbankFullName(bankInfo[1]));
        utils.getCaptcha('main_cashout', 'payment');
        if (type === 'online') {
            $('#cashout_online_content, #select_cashout_type').show();
            $('#cashout_offline_content').hide();
            cashout.GetListCashoutRecent(false, true, 'cashout_log_recent_t', 9);
            cashout.GetBankRemember(2, $('#cashout_bankcode').val());
            //reset height()
            $('#ts-child').css({ "height": "auto", "min-height": "550px" });
        } else {
            $('#cashout_offline_content').show();
            $('#cashout_online_content, #select_cashout_type').hide();
            cashout.GetListCashoutRecent(false, true, 'cashout_log_recent_t', 8);
            cashout.GetBankRemember(1, $('#cashout_bankcode').val());
            $('#ts-child').css({ "height": "auto", "min-height": "650px" });
        }
        this.ActionView("ts-parent", "next", "dhs");
        goToByScroll('#main_cashout');
    };

    this.ActionView = function (slideID, typeAction, destinationDiv) {
        var currentDiv = $("#" + slideID).find(".div_active");
        typeAction = !typeAction ? 'next' : typeAction;
        if (currentDiv.index() == 0 && typeAction == "prev")
            return;
        SlideToogle(slideID, typeAction, destinationDiv);
    };

    this.CashoutBankDetailRecent = function (t) {
        var bankcode = $(t).data('bankcode');
        if (!bankcode) return;
        var serviceid = $(t).data('serviceid');
        if (serviceid === 8)
            $('#cashout_bank_t').find('a[data-bankcode="' + bankcode + '"]').click();
        else
            $('#cashout_bank_online_t').find('a[data-bankcode="' + bankcode + '"]').click();
    };

    this.CalculateTotalAmount = function (id) {

        var $formid = $('#' + id);

        var amount = $formid.find('#cashout_amount').val();

        if (!amount) {
            if (header.AccountInfo.CurrentLang === 'en') {
                $formid.find('#cashout_total_amount').text('0VNĐ');
                $formid.find('#cashout_fee_rate').text('0VNĐ');
            }
            else {
                $formid.find('#cashout_total_amount').text('0VNĐ');
                $formid.find('#cashout_fee_rate').text('0VNĐ');
            }
            return;
        }

        utils.getData(utils.trasactionApi() + "CashOut/GetChargePolicy", { Amount: amount.replace(/[,.]/g, ''), ServiceID: id === 'cashout_offline_content' ? common.serviceConfig.CASHOUT_OFF : common.serviceConfig.CASHOUT_ONL }, function (data) {
            if (data.c >= 0 && data.d) {
                if (header.AccountInfo.CurrentLang === 'en') {
                    $formid.find('#cashout_total_amount').text(utils.formatMoney(data.d.GrandAmount) + 'VNĐ');
                    $formid.find('#cashout_fee_rate').text(utils.formatMoney(data.d.Fee) + 'VNĐ');
                }
                else {
                    $formid.find('#cashout_total_amount').text(utils.formatMoney(data.d.GrandAmount) + 'VNĐ');
                    $formid.find('#cashout_fee_rate').text(utils.formatMoney(data.d.Fee) + 'VNĐ');
                }
            }
        }, function (err) {
            console.log(err);
        });
    };

    this.CheckBankAccount = function (t) {
        var bankAccount = $(t).val();
        var bankCode = $('#cashout_bankcode').val();
        if (!bankAccount || bankAccount.length < 9 || !bankCode) return;
        utils.postData(utils.trasactionApi() + "CashOut/CheckBankAccount", { BankCardNumber: bankAccount.replace(/\s/g, ''), BankCode: bankCode }, function (data) {
            if (data.c >= 0)
                $(t).siblings('#cashout_bankaccount_name').text(data.d.fullName);
        }, function (err) {
            console.log(err);
        });
    }

    this.ConfirmCashout = function (t) {
        if ($('#cashout_online_content').is(':visible'))
            this.ConfirmCashoutOnline(t);
        else
            this.ConfirmCashoutOffline(t);
    }

    this.ConfirmCashoutOffline = function (t) {
        //Rút tiền off
        if ($(t).hasClass('disabled')) {
            return;
        }
        var $step1 = $('#cashoutStep1 #cashout_offline_content');
        $('.error-text, .success-text').text('');
        $('input').removeClass('error success');
        utils.translateLang('transaction.cashoutmoney');
        var bankAccount = $step1.find('#bank_account').val().trim();
        if (!bankAccount) {
            var $thisElement = $step1.find('#bank_account');
            $thisElement.addClass('error');
            $thisElement.siblings('.error-text').text(i18n.t('error.bankaccount_empty'));
            $thisElement.focus();
            return;
        }

        var bankAccountHolder = $step1.find('#bank_account_holder').val().trim();
        if (!bankAccountHolder) {
            var $thisElement = $step1.find('#bank_account_holder');
            $thisElement.addClass('error');
            $thisElement.siblings('.error-text').text(i18n.t('error.bankaccountholder_empty'));
            $thisElement.focus();
            return;
        }

        var bankBrand = $step1.find('#bank_brand').val().trim();
        if (!bankBrand) {
            var $thisElement = $step1.find('#bank_brand');
            $thisElement.addClass('error');
            $thisElement.siblings('.error-text').text(i18n.t('error.bankbranch_empty'));
            $thisElement.focus();
            return;
        }

        var amount = $step1.find('#cashout_amount').val();
        if (!amount) {
            var $thisElement = $step1.find('#cashout_amount');
            $thisElement.addClass('error');
            $thisElement.siblings('.error-text').text(i18n.t('error.amount_empty'));
            $thisElement.focus();
            return;
        }

        if (parseInt(amount.replace(/[,.]/g, '')) < 50000) {
            var $thisElement = $step1.find('#cashout_amount');
            $thisElement.addClass('error');
            $thisElement.siblings('.error-text').text(i18n.t('error.min_amount'));
            $thisElement.focus();
            return;
        }

        var reason = $step1.find('#txt_reason').val();
        if (!reason)
            reason = 'Rut tien tu tai khoan Pay365';
        else
            reason = utils.convertUTFStr(reason, ' ').trim();

        var captcha = $step1.find('#cashout_captcha').val();
        if (!captcha) {
            var $thisElement = $step1.find('#cashout_captcha');
            $thisElement.addClass('error');
            $thisElement.siblings('.error-text').text(i18n.t('error.vrfcode_empty'));
            $thisElement.focus();
            return;
        }
        //Amount int
        //BankCode string
        //verifyCaptcha string
        //Captcha string
        var bankCode = $('#cashout_bankcode').val();
        $(t).addClass('disabled');

        cashout.actionTracking = 'CashoutOffline-' + bankCode + '-' + amount;
        var param = {
            BankNumber: bankAccount,
            AccountName: bankAccountHolder,
            BranchName: bankBrand,
            Description: reason.replace(/[_]/g, '-'),
            isSave: $step1.find('#save_bank_off').is(":checked") ? 1 : 0,
            Amount: amount.replace(/[,.]/g, ''),
            BankCode: bankCode,
            Captcha: captcha,
            verifyCaptcha: $step1.find('#inputToken').val()
        };
        utils.loading();
        utils.postData(utils.trasactionApi() + "CashOut/WithdrawalOffline", param, function (data) {
            utils.unLoading();
            if (data.c >= 0) {
                var $step2 = $('#cashoutStep2');
                $step2.find('#bank_account_2').text(bankAccount);
                $step2.find('#bank_account_holder_2').text(bankAccountHolder).parent('tr').show();
                $step2.find('#bank_brand_2').text(bankBrand).parent('tr').show();
                $step2.find('#reason_2').text(reason);
                $step2.find('#amount_2').text(amount + 'VNĐ');
                $step2.find('#fee_2').text($('#cashout_offline_content #cashout_fee_rate').text());
                $step2.find('#total_amount_2').text($('#cashout_offline_content #cashout_total_amount').text());
                if (header.AccountInfo.CurrentLang === 'en') {
                    if (header.AccountInfo.SecurityType === common.accountSecureConfig.EMAIL) {
                        $step2.find('#p1_securecode').html('The system has sent a secure code to email: <span class="secondary">' + header.AccountInfo.Email + '</span>');
                    } else if (header.AccountInfo.SecurityType === common.accountSecureConfig.SMS || header.AccountInfo.SecurityType === 0) {
                        $step2.find('#p1_securecode').html("The OTP verify code has been sent to the number <span class='secondary'>" + header.AccountInfo.Username + "</span> (Free 5 SMS/24h) . </br> If you do not receive the code, click <span class='secondary'>Resend OTP</span> or send <span class='secondary'>P365 OTP</span> to <span class='secondary'>8100</span> (1000 VNĐ/SMS)");
                    }
                } else {
                    if (header.AccountInfo.SecurityType === common.accountSecureConfig.EMAIL) {
                        $step2.find('#p1_securecode').html('Hệ thống đã gửi 1 mã xác thực đến email: <span class="secondary">' + header.AccountInfo.Email + '</span>');
                    } else if (header.AccountInfo.SecurityType === common.accountSecureConfig.SMS || header.AccountInfo.SecurityType === 0) {
                        $step2.find('#p1_securecode').html("Mã xác thực đã được gửi về số điện thoại <span class='secondary'>" + header.AccountInfo.Username + "</span> (Miễn phí 5 SMS/24h) . </br> Không nhận được mã vui lòng click <span class='secondary'>Nhận lại OTP</span> hoặc soạn tin <span class='secondary'>P365 OTP</span> gửi <span class='secondary'>8100</span> (1000 VNĐ/SMS)");
                    }
                }
                $step2.data('action', 'offline');
                $('#formCashoutRecent').hide();
                $('#formCashoutMain').addClass('col-center');
                $('#ts-child').css("min-height", 'initial');
                cashout.ActionView("ts-child", "next", "cashoutStep2");
                return;
            }
            ga('send', 'event', 'Transaction_Cashout', cashout.actionTracking + '-StepCheckBank', 'Fail');
            common.saveLog(data);
            common.getFormDescription(data.c, '#cashoutStep1 #cashout_offline_content');
        }, function (err) {
            common.saveLog(err);
            $(t).removeClass('disabled');
            utils.getCaptcha('cashout_offline_content', 'payment');
            $('#cashout_offline_content #cashout_captcha').val('');
            utils.unLoading();
            console.log(err);
            if (utils.checkResponseIsValid(err)) {
                var dataErr = JSON.parse(err);
                common.getFormDescription(dataErr.c, '#cashoutStep1 #cashout_offline_content');
                ga('send', 'event', 'Transaction_Cashout', cashout.actionTracking + '-StepCheckBank', 'Fail');
                return;
            }
            common.getFormDescription(-999999, '#cashoutStep1 #cashout_offline_content');
            ga('send', 'event', 'Transaction_Cashout', cashout.actionTracking + '-StepCheckBank', 'Fail');
        });
    };

    this.ConfirmCashoutOnline = function (t) {
        if ($(t).hasClass('disabled')) {
            return;
        }
        var $step1 = $('#cashoutStep1 #cashout_online_content');
        $('.error-text, .success-text').text('');
        $('input').removeClass('error success');
        utils.translateLang('transaction.cashoutmoney');
        var cashoutType = $('input[type=radio][name=g_cashout_type]:checked').val();
        var bankAccount = $step1.find('#bank_account').val();
        if (!bankAccount) {
            var $thisElement = $step1.find('#bank_account');
            $thisElement.addClass('error');
            $thisElement.siblings('.error-text').text(cashoutType === 'i_cashout_card' ? i18n.t('error.bankaccount_empty2') : i18n.t('error.bankaccount_empty'));
            $thisElement.focus();
            return;
        }

        if (!(/^\d+$/.test(bankAccount.replace(/[ ]/g, '')))) {
            var $thisElement = $step1.find('#bank_account');
            $thisElement.addClass('error');
            $thisElement.siblings('.error-text').text(cashoutType === 'i_cashout_card' ? i18n.t('error.bank_card_invalid') : i18n.t('error.bank_account_number_invalid'));
            $thisElement.focus();
            return;
        }

        var amount = $step1.find('#cashout_amount').val();
        if (!amount) {
            var $thisElement = $step1.find('#cashout_amount');
            $thisElement.addClass('error');
            $thisElement.siblings('.error-text').text(i18n.t('error.amount_empty'));
            $thisElement.focus();
            return;
        }

        if (parseInt(amount.replace(/[,.]/g, '')) < 50000) {
            var $thisElement = $step1.find('#cashout_amount');
            $thisElement.addClass('error');
            $thisElement.siblings('.error-text').text(i18n.t('error.min_amount'));
            $thisElement.focus();
            return;
        }

        var reason = $step1.find('#txt_reason').val();
        if (!reason)
            reason = 'Rut tien tu tai khoan Pay365';
        else
            reason = utils.convertUTFStr(reason, ' ').trim();

        var captcha = $step1.find('#cashout_captcha').val();
        if (!captcha) {
            var $thisElement = $step1.find('#cashout_captcha');
            $thisElement.addClass('error');
            $thisElement.siblings('.error-text').text(i18n.t('error.vrfcode_empty'));
            $thisElement.focus();
            return;
        }
        var cashoutOnlineBankAccount = $step1.find('#cashout_bankaccount_name').text();
        var bankCode = $('#cashout_bankcode').val();
        cashout.actionTracking = 'CashoutOnline-' + bankCode + '-' + amount;
        $(t).addClass('disabled');
        var param = {
            BankCardNumber: bankAccount.replace(/\s/g, ''),
            Amount: amount.replace(/[,.]/g, ''),
            Description: reason.replace(/[_]/g, '-'),
            AccountName: cashoutOnlineBankAccount,
            BankCode: bankCode,
            isSave: ($step1.find('#save_bank_on').is(":checked") && cashoutOnlineBankAccount) ? 1 : 0,
            Captcha: captcha,
            verifyCaptcha: $step1.find('#inputToken').val(),
            culture: header.AccountInfo.CurrentLang
        };

        utils.loading();
        utils.postData(utils.trasactionApi() + "CashOut/WithdrawalOnline", param, function (data) {
            utils.unLoading();
            if (data.c >= 0) {
                var $step2 = $('#cashoutStep2');
                $step2.find('#bank_account_2').text(bankAccount);
                $step2.find('#bank_account_holder_2').text($('#cashout_bankaccount_name').text());
                if (header.AccountInfo.CurrentLang === 'en' && cashoutType === 'i_cashout_card') {
                    $step2.find('#bank_account_2').siblings('td').text('Card number');
                } else if (cashoutType === 'i_cashout_card') {
                    $step2.find('#bank_account_2').siblings('td').text('Số thẻ');
                    $step2.find('#bank_account_holder_2').siblings('td').text('Chủ thẻ');
                }

                $step2.find('#reason_2').text(reason);
                $step2.find('#amount_2').text(amount + 'VNĐ');
                $step2.find('#bank_brand_2').parent('tr').hide();
                $step2.find('#fee_2').text($('#cashout_online_content #cashout_fee_rate').text());
                $step2.find('#total_amount_2').text($('#cashout_online_content #cashout_total_amount').text());

                if (header.AccountInfo.CurrentLang === 'en') {
                    if (header.AccountInfo.SecurityType === common.accountSecureConfig.EMAIL) {
                        $step2.find('#p1_securecode').html('The system has sent a secure code to email: <span class="secondary">' + header.AccountInfo.Email + '</span>');
                        $step2.find('#p2_securecode').hide();
                    } else if (header.AccountInfo.SecurityType === common.accountSecureConfig.SMS || header.AccountInfo.SecurityType === 0) {
                        var des = "An OTP has been sent to phone number <span class='secondary'>" + header.AccountInfo.Username + "</span> (Free 5 SMS/24h) . </br> Did not receive OTP ? Click <span class='secondary'>Resend OTP</span> or compose a message using the <span class='secondary'>P365 OTP</span> syntax sent to <span class='secondary'>8100</span> (1000VNĐ/SMS)";
                        $step2.find('#p1_securecode').html(des);
                        $step2.find('#p2_securecode').show();
                    }
                } else {
                    if (header.AccountInfo.SecurityType === common.accountSecureConfig.EMAIL) {
                        $step2.find('#p1_securecode').html('Hệ thống đã gửi 1 mã xác thực đến email: <span class="secondary">' + header.AccountInfo.Email + '</span>');
                        $step2.find('#p2_securecode').hide();
                    } else if (header.AccountInfo.SecurityType === common.accountSecureConfig.SMS || header.AccountInfo.SecurityType === 0) {
                        var des = "Mã xác thực đã được gửi về số điện thoại <span class='secondary'>" + header.AccountInfo.Username +
                            "</span> (Miễn phí 5 SMS/24h). </br> Không nhận được mã vui lòng click <span class='secondary'>Nhận lại OTP</span> hoặc soạn tin <span class='secondary'>P365 OTP</span> gửi <span class='secondary'>8100</span> (1000VNĐ/SMS)";
                        $step2.find('#p1_securecode').html(des);
                        $step2.find('#p2_securecode').show();
                    }
                }
                $step2.data('action', 'online');
                $('#select_cashout_type').hide();
                $('#formCashoutRecent').hide();
                $('#formCashoutMain').addClass('col-center');
                $('#ts-child').css("min-height", 'initial');
                cashout.ActionView("ts-child", "next", "cashoutStep2");
                return;
            }
            common.saveLog(data);
            common.getFormDescription(data.c, '#cashoutStep1 #cashout_online_content');
            ga('send', 'event', 'Transaction_Cashout', cashout.actionTracking + '-StepCheckBank', 'Fail');
        }, function (err) {
            common.saveLog(err);
            $(t).removeClass('disabled');
            utils.getCaptcha('cashout_online_content', 'payment');
            $('#cashout_online_content #cashout_captcha').val('');
            utils.unLoading();
            console.log(err);
            if (utils.checkResponseIsValid(err)) {
                var dataErr = JSON.parse(err);
                common.getFormDescription(dataErr.c, '#cashoutStep1 #cashout_online_content');
                ga('send', 'event', 'Transaction_Cashout', cashout.actionTracking + '-StepCheckBank', 'Fail');
                return;
            }
            common.getFormDescription(-999999, '#cashoutStep1 #cashout_online_content');
            ga('send', 'event', 'Transaction_Cashout', cashout.actionTracking + '-StepCheckBank', 'Fail');
        });
    };

    this.ConfirmCashoutStep2 = function (t) {
        if ($(t).hasClass('disabled')) {
            return;
        }
        var $step2 = $('#cashoutStep2');
        var action = $step2.data('action');
        if (action !== 'online' && action !== 'offline') {
            ModalNotificationInit(common.getDescription(-999999));
        }
        $('.error-text, .success-text').text('');
        $('input').removeClass('error success');
        utils.translateLang('transaction.cashoutmoney');
        var otp = $step2.find('#otp_2').val();
        if (!otp) {
            var $thisElement = $step1.find('#otp_2');
            $thisElement.addClass('error');
            $thisElement.siblings('.error-text').text(i18n.t('error.securecodeEmpty'));
            $thisElement.focus();
            return;
        }
        $(t).addClass('disabled');
        utils.loading();
        var api = action === 'online' ? (utils.trasactionApi() + "CashOut/WithdrawalOnlineConfirm") : (utils.trasactionApi() + "CashOut/WithdrawalOfflineConfirm");
        utils.postData(api,
            { Otp: otp }, function (data) {
                utils.unLoading();
                if (data.c >= 0) {
                    //do sth
                    if (header.AccountInfo.CurrentLang === 'en') {
                        ModalNotificationResultInit(null, (action === 'online' ? null : 'Your withdrawal requests has been sent. We will inform you in 24h'), utils.renderModalContent({ _transid: data.d.TransactionID, _totalamount: (!data.d.Amount ? '' : (utils.formatMoney(data.d.Amount) + 'VNĐ')), _balance: ((!data.p || data.p.length === 0) ? '' : (utils.formatMoney(data.p[0]) + 'VNĐ')) }, 'cashout'), 'Go home page', 'Continue cashout', function () { window.location.href = utils.rootUrl() + 'thong-tin'; }, function () { window.location.href = utils.rootUrl() + 'cashout'; });
                    } else {
                        ModalNotificationResultInit(null, (action === 'online' ? null : 'Gửi yêu cầu rút tiền thành công. Hệ thống sẽ xử lý và thông báo trong vòng 24h'), utils.renderModalContent({ _transid: data.d.TransactionID, _totalamount: (!data.d.Amount ? '' : (utils.formatMoney(data.d.Amount) + 'VNĐ')), _balance: ((!data.p || data.p.length === 0) ? '' : (utils.formatMoney(data.p[0]) + 'VNĐ')) }, 'cashout'), 'Về trang chủ', 'Tiếp tục rút', function () { window.location.href = utils.rootUrl() + 'thong-tin'; }, function () { window.location.href = utils.rootUrl() + 'cashout'; });
                    }
                    ga('send', 'event', 'Transaction_Cashout', cashout.actionTracking + '-StepConfirm', 'Success');
                    return;
                }
                ga('send', 'event', 'Transaction_Cashout', cashout.actionTracking + '-StepConfirm', 'Fail');
                common.saveLog(data);
                common.getFormDescription(data.c, 'cashoutStep2');
            }, function (err) {
                common.saveLog(err);
                $(t).removeClass('disabled');
                utils.unLoading();
                console.log(err);
                if (utils.checkResponseIsValid(err)) {
                    var dataErr = JSON.parse(err);
                    common.getFormDescription(dataErr.c, 'cashoutStep2');
                    ga('send', 'event', 'Transaction_Cashout', cashout.actionTracking + '-StepConfirm', 'Fail');
                    return;
                }
                common.getFormDescription(-999999, 'cashoutStep2');
                ga('send', 'event', 'Transaction_Cashout', cashout.actionTracking + '-StepConfirm', 'Fail');
            });
    };

    this.BackStep = function (step) {
        $('#btConfirmStep1, #btConfirmStep2').removeClass('disabled');
        //Back lai b1
        if (step === 1) {
            var $step2 = $('#cashoutStep2');
            $step2.find("table tr td:nth-child(2) span").text('');
            $step2.find("table tr td:nth-child(2)").not(":has(span)").text('');
            $step2.find('#otp_2').val('');

            if ($step2.data('action') === 'online') {
                $('#cashout_online_content #cashout_captcha').val('');
                utils.refreshCaptcha('cashout_online_content', 'payment');
                $('#formCashoutRecent, #select_cashout_type').show();
                $('#formCashoutMain').removeClass('col-center');
                $('#ts-child').css("min-height", '550px');
                cashout.ActionView('ts-child', 'prev', 'cashoutStep1');
            } else {
                $('#cashout_offline_content #cashout_captcha').val('');
                $('#formCashoutRecent').show();
                $('#formCashoutMain').removeClass('col-center');
                utils.refreshCaptcha('cashout_offline_content', 'payment');
                $('#ts-child').css("min-height", '650px');
                cashout.ActionView('ts-child', 'prev', 'cashoutStep1');
            }
            $step2.data('action', undefined);
        }
        //Back lai step chon bank
        else if (step === 0) {
            var $step1 = $('#cashoutStep1');
            $step1.find('#cashout_bankaccount_name').text('');
            $step1.find('input').val('');
            $step1.find('textarea').val('').height(45);
            $step1.find('#dl_bank_off, #dl_bank_on').html('');
            cashout.ActionView('ts-parent', 'prev', 'listBankSelect');
        }


    }
};
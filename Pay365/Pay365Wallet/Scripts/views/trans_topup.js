topup = new function () {
    this.listBankTopup = {};
    this.actionTracking = "";
    this.GetListBankTopup = function (bankType) {
        //0: all
        //1: nội địa
        //2: quốc tế
        utils.paragraphLoading('topup_bank_t');
        utils.paragraphLoading('topup_bank_recent_t');
        utils.getData(utils.trasactionApi() + "Cashin/GetListBank", { BankID: 0, Status: 1 }, function (data) {
            if (data.c >= 0 && data.p && data.p.length > 0) {
                data.p.forEach(function (item) {
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

                data.p.sort(function (a, b) {
                    return b.piority - a.piority;
                });

                $("#topup_bank_t").html($("#topup_bank_tmpl").tmpl({ listBank: data.p }));
                //
                $("#topup_bank_t_OnlySTB").html($("#topup_bank_tmpl_OnlySTB").tmpl({ listBank: data.p }));

                topup.GetListTopupRecent(null, null, 'topup_bank_recent_t');
            }
        }, function (err) {
            console.log(err);
            $("#topup_bank_t").html('');
            $("#topup_bank_recent_t").html('');
        });
    };

    this.GetListTopupRecent = function (loading, takeAll, formID) {
        //0: all
        //1: nội địa
        //2: quốc tế
        if (loading)
            utils.paragraphLoading(formID);
        utils.getData(utils.trasactionApi() + "payment/GetPaymentLogs", { serviceId: common.transactionService.Cashin }, function (data) {
            if (data.c >= 0 && data.p && data.p.length > 0) {
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

                const $formId = $('#' + formID);
                if (listBankRecent.length !== 0) {
                    listBankRecent.sort(function (a, b) {
                        return b.JsonObject.TransactionID - a.JsonObject.TransactionID;
                    });
                    $formId.html($("#" + formID + 'mpl').tmpl({ listBankRecent: listBankRecent }));
                }
                else {
                    $formId.html('');
                    //Ẩn gd gần đây
                    if (formID === 'topup_bank_recent_t')
                        $formId.parents('#formBankRecent').hide();
                }
            }
        }, function (err) {
            console.log(err);
            const $formId = $('#' + formID);
            $formId.html('');
            //Ẩn gd gần đây
            if (formID === 'topup_bank_recent_t')
                $formId.parents('#formBankRecent').hide();
        });
    };

    this.actionView = function (IdSlide, typeAction, destinationDiv) {
        var currentDiv = $("#" + IdSlide).find(".div_active");
        currentDiv.find(".alert-danger").html('').hide();
        typeAction = typeAction === undefined ? 'next' : typeAction;

        if (currentDiv.index() == 0 && typeAction == "prev")
            return;

        if (typeAction == "prev") {
            currentDiv.find(".error-text").html('');
            currentDiv.find("input.error").removeClass("error");
        }
        destinationDiv = destinationDiv === undefined ? "listBankSelect" : destinationDiv;

        SlideToogle(IdSlide, typeAction, destinationDiv);
    };

    this.TopupBankDetail = function (t) {
        var bankInfo = $(t).data('bankinfo');
        bankInfo = bankInfo.split('#');
        let $bankElm = $('#topup_bank_info');
        $bankElm.find('img').attr('src', utils.rootUrl() + 'Content/assets/images/brands/logo-banks/' + bankInfo[1] + '.png');
        $('#topup_bankcode').val(bankInfo[1]);
        $bankElm.find('#topup_bank_name').text(common.getbankFullName(bankInfo[1]));
        $('#topup_account').val(utils.transactionAccountNumberFormat(null, null, header.AccountInfo.Username));
        $('#topup_account').siblings('label').addClass('active');
        $('#topup_account_name').text(header.AccountInfo.Fullname);
        $('#topup_bank_serviceid').val($(t).data('serviceid'));
        $('#topup_captcha, #cardContentStep1 #topup_amount').val('');
        utils.getCaptcha('main_topup_bank', 'payment');
        topup.GetListTopupRecent(false, true, 'topup_log_recent_t');
        payment.actionView("ts-parent", "next", "View_PaymentConfirm");
    };

    this.TopupBankDetailRecent = function (t) {
        var bankcode = $(t).data('bankcode');
        if (!bankcode) return;
        $('#topup_bank_t').find('a[data-bankcode="' + bankcode + '"]').click();
    };

    this.CalculateTotalAmount = function () {

        var amount = $('#topup_amount').val();
        if (!amount) {
            if (header.AccountInfo.CurrentLang === 'en') {
                $('#topup_total_amount').text('0đ');
                $('#topup_fee_rate').text('0đ');
            }
            else {
                $('#topup_total_amount').text('0đ');
                $('#topup_fee_rate').text('0đ');
            }
            return;
        }

        if (isNaN(amount.replace(/[,.]/g, ''))) {
            $('#topup_amount').val(utils.formatMoney($('#topup_amount').val().replace(/\D/g, '')));
            amount = $('#topup_amount').val();
        }

        var serviceID = $('#topup_bank_serviceid').val();
        if (!serviceID) return;
        utils.getData(utils.trasactionApi() + "Cashin/GetChargePolicy", { Amount: amount.replace(/[,.]/g, ''), ServiceID: serviceID }, function (data) {
            if (data.c >= 0 && data.d) {
                if (header.AccountInfo.CurrentLang === 'en') {
                    $('#topup_total_amount').text(utils.formatMoney(data.d.GrandAmount) + 'đ');
                    $('#topup_fee_rate').text(utils.formatMoney(data.d.Fee) + 'đ');
                }
                else {
                    $('#topup_total_amount').text(utils.formatMoney(data.d.GrandAmount) + 'đ');
                    $('#topup_fee_rate').text(utils.formatMoney(data.d.Fee) + 'đ');
                }
            }
        }, function (err) {
            console.log(err);
        });
    };

    this.GetTopupAccount = function (t) {
        var value = $(t).val();
        if (!value) {
            $(t).removeClass('error success');
            $(t).siblings('#topup_account_name').text('');
            return;
        }
        value = value.replace(/[-]/g, '');
        if (value === header.AccountInfo.Username) {
            $(t).removeClass('error');
            $(t).siblings('#topup_account_name').text(header.AccountInfo.Fullname);
            return;
        }
        var callback = function (response, userData) {
            if (response >= 0) {
                $(t).removeClass('error');
                $(t).siblings('#topup_account_name').text(userData[1]);
            }
            else {
                $(t).addClass('error');
                $(t).siblings('#topup_account_name').text(header.AccountInfo.CurrentLang === 'en' ? 'Account not exist' : 'Tài khoản không tồn tại');
                $(t).focus();
            }

        }
        common.GetAccountByUserName(value, callback);
    };

    this.ConfirmTopup = function () {
        if ($("#cardContentStep1 #bt_topup_confirm").hasClass('disabled')) {
            return;
        }
        $('.error-text, .success-text').text('');
        $('.p-error-text').remove();
        $('input').removeClass('error');
        utils.translateLang('transaction.topupmoney');
        var accountName = $('#topup_account').val();
        if (!accountName) {
            $('#topup_account').addClass('error');
            $('#topup_account').parent().find('.error-text').text(i18n.t('error.account_empty'));
            return;
        }
        var amount = $('#topup_amount').val();
        if (!amount) {
            $('#topup_amount').addClass('error');
            $('#topup_amount').parent().find('.error-text').text(i18n.t('error.amount_empty'));
            return;
        }

        if (parseInt(amount.replace(/[,.]/g, '')) < 10000) {
            $('#topup_amount').addClass('error');
            $('#topup_amount').parent().find('.error-text').text(i18n.t('error.bellow_min_amount'));
            return;
        }

        var captcha = $('#topup_captcha').val();
        if (!captcha) {
            $('#topup_captcha').addClass('error');
            $('#topup_captcha').parent().find('.error-text').text(i18n.t('error.captcha_empty'));
            return;
        }
        //Amount int
        //BankCode string
        //verifyCaptcha string
        //Captcha string
        var bankCode = $('#topup_bankcode').val();
        $("#cardContentStep1 #bt_topup_confirm").addClass('disabled');
        //sacom
        topup.actionTracking = 'CashinViaBank - ' + bankCode + '-' + amount;

        if (bankCode.toLowerCase() === 'stb') {
            var param = {
                UserName: accountName.replace(/[-]/g, ''),
                Amount: amount.replace(/[,.]/g, ''),
                BankCode: bankCode,
                Captcha: captcha,
                verifyCaptcha: $('#inputToken').val()
            };
            utils.loading();
            utils.postData(utils.trasactionApi() + "Cashin/OpenBankTopup", param, function (data) {
                utils.unLoading();
                if (data.c >= 0) {
                    var $step2 = $('#cardContentStep2');
                    $step2.find('#topup_account_2').text(accountName);
                    $step2.find('#amount_step2').text(amount);
                    $step2.find('#fee_step2').text($('#topup_fee_rate').text());
                    $step2.find('#total_step2').text($('#topup_total_amount').text());
                    //$('#cardContentStep1, #cardContentStep3').hide();
                    //$step2.show();
                    $('#formTopupRecent').hide();
                    $('#formTopupMain').addClass('col-center');
                    payment.actionView("ts-child", "next", "cardContentStep2");
                    return;
                }
                common.saveLog(data);
                utils.getCaptcha('main_topup_bank', 'payment');
                $('#topup_captcha').val('');
                common.getFormDescription(data.c, 'cardContentStep1');
                $('#cardContentStep1').parent('#ts-child').height(450);

                ga('send', 'event', 'Transaction_Cashin', topup.actionTracking + '-StepCheckBank', 'Fail');
            }, function (err) {
                common.saveLog(err);
                utils.getCaptcha('main_topup_bank', 'payment');
                $('#topup_captcha').val('');
                $("#cardContentStep1 #bt_topup_confirm").removeClass('disabled');
                $('#cardContentStep1').parent('#ts-child').height(450);
                utils.unLoading();
                console.log(err);
                if (utils.checkResponseIsValid(err)) {
                    var dataErr = JSON.parse(err);
                    common.getFormDescription(dataErr.c, 'cardContentStep1');
                    ga('send', 'event', 'Transaction_Cashin', topup.actionTracking + '-StepCheckBank', 'Fail');
                    return;
                }
                common.getFormDescription(-9999999, 'cardContentStep1');
                ga('send', 'event', 'Transaction_Cashin', topup.actionTracking + '-StepCheckBank', 'Fail');
            });
        }
        else {
            var param = {
                UserName: accountName.replace(/[-]/g, ''),
                Amount: amount.replace(/[,.]/g, ''),
                BankCode: bankCode,
                Captcha: captcha,
                verifyCaptcha: $('#inputToken').val()
            };
            utils.loading();
            utils.postData(utils.trasactionApi() + "Cashin/BankTopup", param, function (data) {
                if (data.c >= 0 && data.d && data.d.description && data.d.description.indexOf("napas") !== -1) {
                    window.location.href = data.d.description;
                    return;
                }
                common.saveLog(data);
                utils.getCaptcha('main_topup_bank', 'payment');
                $('#topup_captcha').val('');
                utils.unLoading();
                common.getFormDescription(data.c, 'cardContentStep1');
                $('#cardContentStep1').parent('#ts-child').height(450);
                ga('send', 'event', 'Transaction_Cashin', topup.actionTracking + '-StepCheckBank', 'Fail');
            }, function (err) {
                common.saveLog(err);
                utils.getCaptcha('main_topup_bank', 'payment');
                $('#topup_captcha').val('');
                utils.unLoading();
                console.log(err);
                $('#cardContentStep1').parent('#ts-child').height(450);
                $("#cardContentStep1 #bt_topup_confirm").removeClass('disabled');
                if (utils.checkResponseIsValid(err)) {
                    var dataErr = JSON.parse(err);
                    common.getFormDescription(dataErr.c, 'cardContentStep1');
                    ga('send', 'event', 'Transaction_Cashin', topup.actionTracking + '-StepCheckBank', 'Fail');
                    return;
                }
                common.getFormDescription(-9999999, 'cardContentStep1');
                ga('send', 'event', 'Transaction_Cashin', topup.actionTracking + '-StepCheckBank', 'Fail');
            });
        }
    };

    //Sacombank step2
    this.ConfirmTopupStep2 = function () {
        if ($("#cardContentStep2 #btConfirmStep2").hasClass('disabled')) {
            return;
        }
        $('.error-text, .success-text').text('');
        $('input').removeClass('error success');
        $('.p-error-text').remove();
        utils.translateLang('transaction.topupmoney');
        var $formID = $('#cardContentStep2');
        var cardNumber = $formID.find('#card_number').val();
        if (!cardNumber) {
            $('#card_number').addClass('error');
            $('#card_number').parent().find('.error-text').text(i18n.t('error.bank_account_number_empty'));
            return;
        }

        cardNumber = cardNumber.replace(/[ ]/g, '');
        if (!(/^\d+$/.test(cardNumber))) {
            $('#card_number').addClass('error');
            $('#card_number').parent().find('.error-text').text(i18n.t('error.bank_account_number_invalid'));
            return;
        }

        var accountHolder = $formID.find('#account_holder').val();
        if (!accountHolder) {
            $('#account_holder').addClass('error');
            $('#account_holder').parent().find('.error-text').text(i18n.t('error.bank_account_holder_empty'));
            return;
        }

        //FullName string
        //CardNumber string
        //Passport string
        var param = {
            CardNumber: cardNumber,
            FullName: accountHolder
        };

        $("#cardContentStep2 #btConfirmStep2").addClass('disabled');
        utils.loading();
        utils.postData(utils.trasactionApi() + "Cashin/OpenBankTopupTransaction", param, function (data) {
            utils.unLoading();
            if (data.c >= 0) {
                //$('#cardContentStep1, #cardContentStep2').hide(); $('#cardContentStep3').show();
                payment.actionView("ts-child", "next", "cardContentStep3");
                return;
            }
            common.saveLog(data);
            common.getFormDescription(data.c, 'cardContentStep2');
            $('#cardContentStep1').parent('#ts-child').height(480);
            ga('send', 'event', 'Transaction_Cashin', topup.actionTracking + '-StepCheckCardInfo', 'Fail');
        }, function (err) {
            common.saveLog(err);
            $("#cardContentStep2 #btConfirmStep2").removeClass('disabled');
            utils.unLoading();
            console.log(err);
            $('#cardContentStep1').parent('#ts-child').height(480);
            if (utils.checkResponseIsValid(err)) {
                var dataErr = JSON.parse(err);
                common.getFormDescription(dataErr.c, 'cardContentStep2');
                ga('send', 'event', 'Transaction_Cashin', topup.actionTracking + '-StepCheckCardInfo', 'Fail');
                return;
            }
            common.getFormDescription(-9999999, 'cardContentStep2');
            ga('send', 'event', 'Transaction_Cashin', topup.actionTracking + '-StepCheckCardInfo', 'Fail');
        });

    };

    this.ConfirmTopupStep3 = function () {

        if ($("#cardContentStep3 #btConfirmStep3").hasClass('disabled')) {
            return;
        }
        $('.error-text, .success-text').text('');
        $('input').removeClass('error success');
        utils.translateLang('transaction.topupmoney');
        var $formID = $('#cardContentStep3');
        var otp = $formID.find('#otp_3').val();
        if (!otp) {
            $('#otp_3').addClass('error');
            $('#otp_3').parent().find('.error-text').text(i18n.t('error.captcha_empty'));
            return;
        }
        $("#cardContentStep3 #btConfirmStep3").addClass('disabled');
        utils.loading();
        utils.postData(utils.trasactionApi() + "Cashin/OpenBankTopupConfirm", { Otp: otp }, function (data) {
            utils.unLoading();
            if (data.c >= 0) {
                $formID.find('#otp_3').attr('disabled', 'disabled');
                if (header.AccountInfo.CurrentLang === 'en') {
                    ModalNotificationResultInit(null, null, utils.renderModalContent({ _transid: data.d.TransactionID, _totalamount: (!data.d.Amount ? '' : (utils.formatMoney(data.d.Amount) + 'đ')), _balance: ((!data.p || data.p.length === 0) ? '' : (utils.formatMoney(data.p[0]) + 'đ')) }), 'Go home page', 'Continue cashin', function () { window.location.href = utils.rootUrl() + 'thong-tin'; }, function () { window.location.href = utils.rootUrl() + 'nap-tien'; });
                } else {
                    ModalNotificationResultInit(null, null, utils.renderModalContent({ _transid: data.d.TransactionID, _totalamount: (!data.d.Amount ? '' : (utils.formatMoney(data.d.Amount) + 'đ')), _balance: ((!data.p || data.p.length === 0) ? '' : (utils.formatMoney(data.p[0]) + 'đ')) }), 'Về trang chủ', 'Tiếp tục nạp', function () { window.location.href = utils.rootUrl() + 'thong-tin'; }, function () { window.location.href = utils.rootUrl() + 'nap-tien'; });
                }
                ga('send', 'event', 'Transaction_Cashin', topup.actionTracking + '-StepConfirm', 'Success');
                return;
            }
            common.saveLog(data);
            common.getFormDescription(data.c, 'cardContentStep3');
            ga('send', 'event', 'Transaction_Cashin', topup.actionTracking + '-StepConfirm', 'Fail');
        }, function (err) {
            common.saveLog(err);
            $("#cardContentStep3 #btConfirmStep3").removeClass('disabled');
            utils.unLoading();
            console.log(err);
            if (utils.checkResponseIsValid(err)) {
                var dataErr = JSON.parse(err);
                common.getFormDescription(dataErr.c, 'cardContentStep3');
                return;
            }
            common.getFormDescription(-9999999, 'cardContentStep3');
            ga('send', 'event', 'Transaction_Cashin', topup.actionTracking + '-StepConfirm', 'Fail');
        });
    };

    this.BackStep = function (step) {
        $('.p-error-text').remove();
        if (step === 2) {
            $("#cardContentStep3 #otp_3").removeAttr('disabled');
            $("#cardContentStep3 input").val('');
            $("#cardContentStep2 a, cardContentStep3 a").removeClass('disabled');
            payment.actionView('ts-child', 'prev', 'cardContentStep2');
        }
        else if (step === 1) {
            $("#cardContentStep3 #otp_3").removeAttr('disabled');
            $("#cardContentStep3 input, #cardContentStep2 input").val('');
            $("#cardContentStep1 a, #cardContentStep2 a, #cardContentStep3 a").removeClass('disabled');
            $('#formTopupRecent').show();
            $('#formTopupMain').removeClass('col-center');
            payment.actionView('ts-child', 'prev', 'cardContentStep1');
            utils.getCaptcha('main_topup_bank', 'payment');
            $('#topup_captcha').val('');
        }
    }

    this.SearchBank = function (formID) {
        var $formID = $('#' + formID);
        var searchValue = $('#search_bank').val().toLowerCase();
        if (searchValue === '') {
            $formID.find('.box-bank-icon').show();
            return;
        }

        $formID.find('.box-bank-icon').each(function () {
            var bankName = $(this).children('a').attr('data-bankname').toLowerCase();
            if (bankName.search(searchValue) > -1) {
                $(this).show();
            }
            else {
                var bankAlias = '';
                switch (bankName) {
                    case 'tienphongbank':
                        bankAlias = 'tpbank'
                        break;
                    case 'bvb':
                        bankAlias = 'baoviet'
                        break;
                    case 'navibank':
                        bankAlias = 'ncb'
                        break;
                    case 'phuongdong':
                        bankAlias = 'ocb'
                        break;
                }
                if (bankAlias && bankAlias.search(searchValue) > -1)
                    $(this).show();
                else
                    $(this).hide();
            }
        });
    };

    // Nạp qua thẻ gắn kết
    this.TopupBank_ByLinkCard = function () {
        utils.setCookie('LinkCard', false);
        var msg = "Bạn chưa liên kết với ngân hàng này. Bạn có muốn thực hiện liên kết không";
        var header = "Thất bại";
        var btnClose = "Đóng";
        var btnContinue = "Liên kết";
        if (header.AccountInfo.CurrentLang == 'en') {
            msg = "Sacombank have not linked with your account yet. Do you want to link your account?";
            header = "Fail";
            btnClose = "Close";
            btnContinue = "Link Card";
        }
        ModalNotificationResultInit('danger', header, msg, btnClose, btnContinue,
            function () {
                window.location.href = utils.rootUrl() + 'nap-tien';
            },
            function () {
                var setcookie = utils.setCookie('LinkCard', true); // set cookie
                window.location.href = utils.rootUrl() + 'link-card';
            });
    };
};
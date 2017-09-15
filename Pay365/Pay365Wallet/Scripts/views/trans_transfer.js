transfer = new function () {
    this.Amount = 0;
    this.Fee = 0;
    this.actionTracking = "";
    this.Transfer_Money = function () {
        $('.error-text').text('');
        utils.translateLang('transaction.transfermoney');

        var userName = $('#txtUsername').val().replace(/[-]/g, ''); // tk nhận
        if (!userName) {
            $('#txtUsername').addClass('error');
            $('#txtUsername').parent().find('.error-text').text(i18n.t('error.err1'));
            $('#txtUsername').focus();
            return;
        }

        if (!userName.match('^0')) {
            $('#txtUsername').addClass('error');
            $('#txtUsername').parent().find('.error-text').text(i18n.t('error.err6'));
            $('#txtUsername').focus();
            return;
        }

        if (userName.length < 9 || userName.length > 11) {
            $('#txtUsername').addClass('error');
            $('#txtUsername').parent().find('.error-text').text(i18n.t('error.err7'));
            $('#txtUsername').focus();
            return;
        }

        var amount = $('#txtAmount').val().replace(/[,.]/g, '');
        if (amount == '' || amount < 0) {
            $('#txtAmount').addClass('error');
            $('#txtAmount').parent().find('.error-text').text(i18n.t('error.err2'));
            $('#txtAmount').focus();
            return;
        }

        if (isNaN(amount)) {
            $('#txtAmount').addClass('error');
            $('#txtAmount').parent().find('.error-text').text(i18n.t('error.err8'));
            $('#txtAmount').focus();
            return;
        }

        if (parseFloat(amount) < 10000) {
            $('#txtAmount').addClass('error');
            $('#txtAmount').parent().find('.error-text').text(i18n.t('error.err9'));
            $('#txtAmount').focus();
            return;
        }

        if (parseFloat(amount) > 10000000) {
            $('#txtAmount').addClass('error');
            $('#txtAmount').parent().find('.error-text').text(i18n.t('error.err10'));
            $('#txtAmount').focus();
            return;
        }

        var reason = $('#txtReason').val();
        //if (!reason || reason.length < 5) {
        //    $('#txtReason').addClass('error');
        //    $('#txtReason').parent().find('.error-text').text(i18n.t('error.err3'));
        //    $('#txtReason').focus();
        //    return;
        //}

        var captcha = $('#txtTransfer_captcha').val();
        if (!captcha) {
            $('#txt_errorCaptcha').text(i18n.t('error.err4'));
            $('#txtTransfer_captcha').focus();
            return;
        }

        var verifyCaptcha = $('#inputToken').val();
        var culture = utils.getCurrentLanguage();

        var paramValid = {
            userName: userName,
            Amount: amount,
            Reason: reason,
            Captcha: captcha,
            verifyCaptcha: !captcha ? "" : verifyCaptcha,
            Culture: culture
        };
        transfer.actionTracking = "TransferMoney_Pay365Wallet - " + amount;
        var urlTransferApi = utils.trasactionApi() + "CashOut/Transfer";
        utils.loading();
        utils.postData(urlTransferApi, paramValid, function (data) {
            utils.unLoading();
            if (data.c >= 0) {
                // lấy thông tin 
                $('#lbl_transferAcc').text(header.AccountInfo.Username);
                $('#lbl_transferAccfullname').text(header.AccountInfo.Fullname);
                $('#lbl_receiveAcc').text(userName);
                $('#lbl_receiveAccname').text($('#transfer_account_name').text());
                $('#lbl_amount').html($('#txtAmount').val() + "<sup>VNĐ</sup>");
                $('#lbl_totalAmount').html($('#txtAmount').val() + "<sup>VNĐ</sup>");
                $('#lbl_fee').html(transfer.Fee + "<sup>VNĐ</sup>");

                var minAmount = header.AccountInfo.MinAmount;
                if (parseFloat(amount) < minAmount) {
                    $('#div_Otp').hide();
                } else {
                    if (data.c == 1) { // OTP SMS
                        var des = "Mã xác thực đã được gửi về số điện thoại <span class='secondary'>" +
                            header.AccountInfo.Username +
                            "</span> (Miễn phí 5 SMS/24h). </br> Không nhận được mã vui lòng click <span class='secondary'>Nhận lại OTP</span> hoặc soạn tin <span class='secondary'>P365 OTP</span> gửi <span class='secondary'>8100</span> (1000 VNĐ/SMS)";
                        if (header.AccountInfo.CurrentLang == "en") {
                            des = "The authentication code has been sent to phone <span class='secondary'>" +
                                header.AccountInfo.Username +
                                "</span> (Free 5 SMS/24h). </br> Do not receive the code, click <span class='secondary'>Resend OTP</span> or compose the message <span class='secondary'>P365 OTP</span> send <span class='secondary'>8100</span> (1000 VNĐ/SMS)";
                        }
                        $('#div_Otp').show();
                        $('#txt_typeOtp').html(des);
                    } else if (data.c == 2) { // OTP Email
                        var des = "Mã bảo mật đã được gửi về email <span class='secondary'>" +
                            header.AccountInfo.Email +
                            "</span>. Vui lòng nhập mã để xác nhận giao dịch";
                        if (header.AccountInfo.CurrentLang == "en") {
                            des = "Your Activation code has been sent to email  <span class='secondary'>" +
                                header.AccountInfo.Email +
                                "</span>. Please enter your code to confirm transaction";
                        }
                        $('#div_Otp').show();
                        $('#txt_typeOtp').html(des);
                    } else if (data.c == 3) { // OTP Voice
                        $('#div_Otp').show();
                    } else if (data.c == 4) { //OTP App
                        $('#div_Otp').show();
                    }
                }
                SlideToogle("ts-1", "next");
                setTimeout(function() {
                        $('#txt_secureCode').focus();
                    },
                    200);
            } else {
                var Msg = common.getDescription(data.c);
                utils.translateLang('transaction.transfermoney');
                var btnClose = $.t('error.btnClose');
                ModalNotificationInit(Msg, "", "error", "", btnClose);
                ga('send', 'event', 'Transaction_Transfer', transfer.actionTracking + '-StepCheck', 'Fail');
            }
        }, function (dataErr) {
            utils.unLoading();
            console.log(dataErr);
            utils.getCaptcha('form_captcha', 'payment');
            var btnClose = $.t('error.btnClose');
            var Msg = common.getDescription(-999999);
            utils.translateLang('transaction.transfermoney');
            if (typeof JSON.parse(dataErr) === "object") {
                var objReturn = JSON.parse(dataErr);
                Msg = common.getDescription(objReturn.c);
                switch (objReturn.c) {
                    case -10003:
                        $('#txt_errorCaptcha').text(Msg);
                        $('#txtTransfer_captcha').focus();
                        break;
                    case -10155:
                        $('#txtUsername').addClass('error');
                        $('#txtUsername').parent().find('.error-text').text(Msg);
                        $('#txtUsername').focus();
                        break;
                    case -10051:
                        $('#txtAmount').addClass('error');
                        $('#txtAmount').parent().find('.error-text').text(Msg);
                        $('#txtAmount').focus();
                        break;
                    case -10156:
                        var des = utils.formatString(Msg, "10.000.000 VNĐ");
                        $('#txtAmount').addClass('error');
                        $('#txtAmount').parent().find('.error-text').text(des);
                        $('#txtAmount').focus();
                        break;
                    //case -10117:
                    //    $('#txtReason').addClass('error');
                    //    $('#txtReason').parent().find('.error-text').text(Msg);
                    //    $('#txtReason').focus();
                    //    break;
                    default:
                        ModalNotificationInit(Msg, "", "error", "", btnClose);
                        break;
                }
            }
            else {
                ModalNotificationInit(Msg, "", "error", "", btnClose);
            }
            ga('send', 'event', 'Transaction_Transfer', transfer.actionTracking + '-StepCheck', 'Fail');
            return;
        });
    };

    this.ConfirmTransfer = function () {
        utils.translateLang('transaction.transfermoney');
        var sercureType = header.AccountInfo.SecurityType;
        var secureCode = $('#txt_secureCode').val();
        if (sercureType > 0 && transfer.Amount > header.AccountInfo.MinAmount) {
            if (!secureCode) {
                $('#txt_secureCode').addClass('error');
                $('#txt_secureCode').parent().find('.error-text').text(i18n.t('error.OtpEmpty'));
                $('#txt_secureCode').focus();
                return;
            }
        }
        var params = {
            OtpType: header.AccountInfo.SecurityType,
            Otp: secureCode
        };

        var urlTransferApi = utils.trasactionApi() + "CashOut/TransferConfirm";
        utils.loading();
        var btnClose = $.t('error.btnClose');
        utils.postData(urlTransferApi, params, function (data) {
            utils.unLoading();
            if (data.c >= 0) {
                var message = "Chuyển tiền thành công";
                if (header.AccountInfo.CurrentLang == 'en') {
                    message = "Transfer money successfull";
                }
                // lấy thông tin 
                ModalNotificationInit(message, "", "success", "", btnClose);
                setTimeout(function () {
                    window.location.href = utils.rootUrl() + 'chuyen-tien';
                }, 5000);
                ga('send', 'event', 'Transaction_Transfer', transfer.actionTracking + '-StepConfirm', 'Success');
            }
        }, function (dataErr) {
            console.log(dataErr);
            utils.unLoading();
            utils.refreshCaptcha('form_captcha', 'payment');
            var msg = common.getDescription(-999999);
            if (typeof JSON.parse(dataErr) === "object") {
                var objReturn = JSON.parse(dataErr);
                msg = common.getDescription(objReturn.c);
                switch (objReturn.c) {
                    default:
                        ModalNotificationInit(msg, "", "error", "", btnClose);
                        break;
                }
            }
            else {
                ModalNotificationInit(msg, "", "error", "", btnClose);
            }
            ga('send', 'event', 'Transaction_Transfer', transfer.actionTracking + '-StepConfirm', 'Fail');
            return;
        });
    };

    this.GetListTransferRecent = function () {

        utils.paragraphLoading('list_recent_t');
        utils.postData(utils.trasactionApi() + "Payment/GetHistory", { ServiceID: common.serviceConfig.TRANSFER, Top: 5 }, function (data) {
            if (data.p.length > 0) {
                console.log(data.p);
                var listHistory = {
                    List: null
                };
                listHistory.List = data.p;
                $("#list_recent_t").html($("#list_recent_tmpl").tmpl(listHistory));

                $('.collapsible').collapsible({
                    accordion: true
                });

                var listAccount = [];
                $.each(listHistory.List, function (k, v) {
                    var find = listAccount.indexOf(v.RelatedUsername);
                    if (find <= -1) {
                        listAccount.push(v.RelatedUsername);
                    }
                });

                $.each(listAccount, function (k, v) {
                    var item = '<li><a data-value="' + v + '">' + v + '</a></li>';
                    $("#ddr-input-phone").append(item);
                });

                var dropdown = $("#ddr-input-phone").siblings(".dropdown-button");
                dropdown.dropdown('open');

                $("#ddr-input-phone li").on('click', 'a', function () {
                    $('#txtUsername').val(utils.transactionAccountNumberFormat(null, null, $(this).data('value'))).siblings('label').addClass('active');
                    transfer.GetTransferAccount($('#txtUsername'));
                });
            } else
                $("#list_recent_t").html("");
        });
    };

    this.GetTransfer_TotalAmount = function (amount) {
        // service chuyển tiền
        var serviceId = common.serviceConfig.TRANSFER;
        utils.getData(utils.trasactionApi() + "CashOut/GetChargePolicy", { Amount: amount.replace(/[,.]/g, ''), ServiceID: serviceId }, function (data) {
            if (data.c >= 0 && data.d) {
                transfer.Fee = data.d.Fee;
                transfer.Amount = parseFloat(amount.replace(/[,.]/g, ''));
                $('#Transfee').text(transfer.Fee + " VNĐ");
                $('#totalPayment').html(utils.formatMoney(data.d.GrandAmount) + " VNĐ");
            }
        }, function (err) {
            console.log(err);
        });
    };

    this.GetTransferAccount = function (t) {
        var value = $(t).val();
        if (!value) {
            $(t).removeClass('error success');
            $(t).siblings('#transfer_account_name').text('');
            return;
        }
        value = value.replace(/[-]/g, '');
        if (value === header.AccountInfo.Username) {
            $(t).removeClass('error');
            $(t).siblings('#transfer_account_name').text(header.AccountInfo.Fullname);
            return;
        }
        var callback = function (response, userData) {
            if (response >= 0) {
                $(t).removeClass('error');
                $(t).siblings('#transfer_account_name').text(userData[1]);
            }
            else {
                $(t).removeClass('success').addClass('error');
                $(t).siblings('#transfer_account_name').text(header.AccountInfo.CurrentLang === 'en' ? 'Account not exist' : 'Tài khoản không tồn tại');
                $(t).focus();
            }
        }
        common.GetAccountByUserName(value, callback);
    };

    this.Btn_Back = function () {
        utils.refreshCaptcha('form_captcha', 'payment');
        var currentDiv = $("#ts-1").find(".div_slide.div_active");
        var backDiv = currentDiv.prev();
        $('#txtTransfer_captcha').val('');
        setTimeout(function () {
            $('#txtTransfer_captcha').focus();
        }, 400);
        SlideToogle("ts-1", "prev");
    };

}
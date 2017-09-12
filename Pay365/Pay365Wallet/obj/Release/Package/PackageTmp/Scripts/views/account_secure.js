account_secure = new function () {
    this.secureType = 0;
    this.secureName = "";
    this.minAmount = 0;
    this.statusBtn = true;
    this.pageLoad = function () {
        if (header.AccountInfo != null) {
            $(".txtUsrName").text(utils.numberPhoneFormat(header.AccountInfo.Username));
            $(".txtEmailAddress").text(header.AccountInfo.Email);
            account_secure.secureType = header.AccountInfo.SecurityType;
            account_secure.minAmount = header.AccountInfo.MinAmount;

            if (account_secure.secureType > 0) {
                if (account_secure.secureType == 1) {
                    account_secure.secureName = "OTP SMS";
                    $("#boxChangeLimitSecure .security-image").find('img').attr("src", utils.rootUrl() + "Content/assets/images/security-sms.svg");
                }
                else if (account_secure.secureType == 2) {
                    account_secure.secureName = "OTP Email";
                    $("#boxChangeLimitSecure .security-image").find('img').attr("src", utils.rootUrl() + "Content/assets/images/security-email.svg");
                }
                else if (account_secure.secureType == 3) {
                    account_secure.secureName = "OTP Voice";
                    $("#boxChangeLimitSecure .security-image").find('img').attr("src", utils.rootUrl() + "Content/assets/images/security-voice.svg");
                }
                else if (account_secure.secureType == 4) {
                    account_secure.secureName = "OTP App";
                    $("#boxChangeLimitSecure .security-image").find('img')
                        .attr("src", utils.rootUrl() + "Content/assets/images/security-app.svg");
                }
                $(".txtTypeSecure").text(account_secure.secureName);
                $(".txtLimitSecure").html(utils.formatMoney(account_secure.minAmount) + "<sup>VNĐ</sup>");
                $("#boxSecureType p.primary").hide();
                $("#secureType_" + account_secure.secureType).find("p.primary").show();
                $("#secureType_" + account_secure.secureType).find(".LimitCurrent").html(utils.formatMoney(account_secure.minAmount) + "<sup>VNĐ</sup>");
                $("#boxSecureType").find(".pricing.active").removeClass("active");
                $("#secureType_" + account_secure.secureType).addClass("active");
                var button = $("#btnChangeLitmitation").html();
                $("#secureType_" + account_secure.secureType).find(".button").html(button);
            }
            else {
                utils.translateLang('profile.account');
                $('#div_limitSecure').remove();
                if (header.AccountInfo.CurrentLang == "en") {
                    $(".txtTypeSecure").text("Not register");
                } else {
                    $(".txtTypeSecure").text("Chưa đăng ký");
                }
                $("#boxSecureType p.primary").hide();
            }
        }
    };
    this.actionSecure = function (type, typeAction, destinationDiv) {
        var currentDiv = $("#dv_account_secure").find(".div_active");
        typeAction = typeAction === undefined ? 'next' : typeAction;
        switch (type) {
            case 1://SMS
                destinationDiv = "boxRegisterOTPSMS";
                SlideToogle("dv_account_secure", typeAction, destinationDiv);
                break;
            case 2://Email
                destinationDiv = "boxRegisterOTPEmail";
                SlideToogle("dv_account_secure", typeAction, destinationDiv);
                $("#boxRegisterOTPEmail").keypress(function (event) {
                    if (event.which == 13) {
                        event.preventDefault();
                        account_secure.RegisterSecureOTP(2);
                    }
                });
                setTimeout(function () {
                    $("#txtLimitOTPEmail").focus();
                }, 300);
                break;
            case 3://App
                destinationDiv = "boxRegisterOTPApp";
                SlideToogle("dv_account_secure", typeAction, destinationDiv);
                break;
            case 4://Voice
                destinationDiv = "boxRegisterOTPVoice";
                SlideToogle("dv_account_secure", typeAction, destinationDiv);
                $("#boxRegisterOTPVoice").keypress(function (event) {
                    if (event.which == 13) {
                        event.preventDefault();
                        account_secure.RegisterSecureOTP(3);
                    }
                });
                setTimeout(function () {
                    $("#txtLimitOTPVoice").focus();
                }, 300);
                break;
            case 5://changeLimitSecure
                if (account_secure.secureType <= 0) {
                    $("#modal_content").text($.t('accountSecure.notRegisterOTP'));
                    $('#modal-alert').modal('open');
                    return;
                }
                destinationDiv = "boxChangeLimitSecure";
                SlideToogle("dv_account_secure", typeAction, destinationDiv);

                $("#boxChangeLimitSecure").keypress(function (event) {
                    if (event.which == 13) {
                        event.preventDefault();
                        account_secure.ChangeLimitSecure();
                    }
                });
                setTimeout(function () {
                    $("#txtNewLimitSecure").focus();
                }, 300);
                break;
            default://back or next by condition
                if (currentDiv.index() == 0 && typeAction == "prev")
                    return;
                destinationDiv = destinationDiv === undefined ? "boxSecureType" : destinationDiv;
                if (typeAction == "prev") {
                    currentDiv.find("label.active").removeClass("active");
                    currentDiv.find("input.error").removeClass("error");
                    currentDiv.find("input.success").removeClass("success");
                    currentDiv.find(".error-text").html('');
                }
                SlideToogle("dv_account_secure", typeAction, destinationDiv);
                break;
        }
    };


    this.RegisterSecureOTP = function (secureType) {
        utils.translateLang('profile.account');
        $("#boxRegisterOTPEmail").find(".alert-danger").html('').hide();
        if (secureType == 3) {
            $('#modal-alert #modal_content').text("Chức năng đang được xây dựng");
            $('#modal-alert').modal('open');
            return;
        }

        var secureName = "";
        if (account_secure.statusBtn == false || (secureType != 2 && secureType != 3))
            return;
        secureName = secureType === 2 ? "OTP Email" : secureType === 3 ? "OTP Voice" : "";
        var currentDiv = "boxRegisterOTPEmail";
        var minmoney = $("#txtLimitOTPEmail");
        if (secureType == 3) //Voice
        {
            currentDiv = "boxRegisterOTPVoice";
            minmoney = $("#txtLimitOTPVoice");
        }

        var valueLimit = minmoney.val().replace(/[,.]/g, '');
        if (valueLimit == '') {
            minmoney.focus();
            minmoney.siblings('.error-text').html($.t('accountSecure.minAmountEmpty'));
            minmoney.siblings('.error-text').show();
            minmoney.addClass('error');
            return;
        }
        if (!utils.validateNumberOnly(valueLimit) || valueLimit < 0) {
            $minmoney.focus();
            minmoney.siblings('.error-text').html($.t('accountSecure.minAmountInvalid'));
            minmoney.siblings('.error-text').show();
            minmoney.addClass('error');
            return;
        }
        if (secureType == 3)
            $("#boxRegisterOTPVoice .txtUsrName").click();
        else
            $("#boxRegisterOTPEmail .txtUsrName").click();

        var model = {
            SecurityType: secureType,
            MinAmount: valueLimit,
            culture: "vi"
        };
        var txtSecureType = "";
        if (secureType == 1)
            txtSecureType = "OTP_SMS";
        else if (secureType == 2)
            txtSecureType = "OTP_Email";
        else if (secureType == 3)
            txtSecureType = "OTP_Voice";
        var urlAccountApi = utils.linkIdApi() + "Account/SecurityCreate";
        account_secure.statusBtn = false;
        var btnClose = $.t('accountSecure.btnClose');
        var nextDiv = $("#boxRegisterOTPConfirm");
        utils.loading();
        utils.postData(urlAccountApi, model, function (data) {
            utils.unLoading();
            account_secure.statusBtn = true;
            account_changepass.statusBtn = true;
            var callbackClose = function () {
                account_secure.actionSecure(0, "prev", "boxSecureType");
                window.location = utils.rootUrl() + "thong-tin";
            };
            var text = utils.formatString($.t('accountSecure.registerOTPEmailSuccess'), header.AccountInfo.Email);
            ModalNotificationInit(text, callbackClose, "success", $.t('accountSecure.registerSuccess'), btnClose, 5000);
            ga('send', 'event', 'Account_Security', 'Register_OTPEmail', 'Success');
        }, function (dataErr) {
            utils.unLoading();
            account_secure.statusBtn = true;
            var Msg = '';
            if (typeof JSON.parse(dataErr) === "object") {
                var objReturn = JSON.parse(dataErr);
                if (objReturn.c == -10148)// Yêu cầu bảo mật bằng OTP
                {
                    account_secure.actionSecure(0, "next", "boxRegisterOTPConfirm");
                    nextDiv.find(".typeSecureReg").text(account_secure.secureName);
                    nextDiv.find(".limitSecureReg").html(utils.formatMoney(valueLimit) + "<sup>VNĐ</sup>");
                    nextDiv.find("#btnConfirmReg").attr("onclick", "account_secure.RegisterSecure_confirm(" + secureType + ");");
                    nextDiv.find("#btnBackReg").attr("onclick", "account_secure.actionSecure(0,'prev','" + currentDiv + "');");
                    nextDiv.find("#hd_title").text($.t('accountSecure.registerSecure') + " " + secureName);

                    $("#r_new_limit").hide();
                    nextDiv.find("#btnResendOTP").hide();
                    nextDiv.find("#txtNoteSecure2").hide();
                    var noteSecure = "";
                    var secureType_current = account_secure.secureType;
                    if (dataErr.p && typeof dataErr.p == "object" && dataErr.p.length > 0 && parseInt(dataErr.p[0].SecurityType) > 0)
                        secureType_current = parseInt(dataErr.p[0].SecurityType);

                    if (secureType_current == 1) {
                        noteSecure = utils.formatString($.t('accountSecure.noteRegisterSMS'), header.AccountInfo.Username);
                        $("#boxRegisterOTPConfirm .security-image").find('img').attr("src", utils.rootUrl() + "Content/assets/images/security-sms.svg");
                        $("#txtNoteSecure2").show();
                    }
                    else if (secureType_current == 2) {
                        noteSecure = utils.formatString($.t('accountSecure.noteRegisterEmail'), header.AccountInfo.Email);
                        $("#boxRegisterOTPConfirm .security-image").find('img').attr("src", utils.rootUrl() + "Content/assets/images/security-email.svg");
                        nextDiv.find("#btnResendOTP").attr("onclick", "account_secure.Resend_OTP(" + 1 + ");");
                        nextDiv.find("#btnResendOTP").show();
                    }
                    else if (secureType_current == 3) {
                        noteSecure = $.t('accountSecure.noteSecureApp');
                        $("#boxRegisterOTPConfirm .security-image").find('img').attr("src", utils.rootUrl() + "Content/assets/images/security-app.svg");
                    }
                    else {
                        noteSecure = $.t('accountSecure.noteSecureVoice');
                        $("#boxRegisterOTPConfirm .security-image").find('img').attr("src", utils.rootUrl() + "Content/assets/images/security-voice.svg");
                    }

                    nextDiv.find("#txtNoteSecure").html(noteSecure);

                    $("#boxRegisterOTPConfirm").keypress(function (event) {
                        if (event.which == 13) {
                            event.preventDefault();
                            account_secure.RegisterSecure_confirm(secureType);
                        }
                    });
                    setTimeout(function () {
                        $("#txtVerifyCode").focus();
                    }, 300);
                    return;
                }
                Msg = common.getDescription(objReturn.c);
                switch (objReturn.c) {
                    case -50: case -1://TK ko tồn tại
                    case -628: case -10137://Email chưa xác thực
                    case -10001: //chưa login
                    case -10002: case -10008: case -600://dữ liệu ko hợp lệ
                    case -10010: //TK bị tạm khóa
                    case -10052: case -10049: case -10150: //TK chưa đăng ký bảo mật (dành cho đổi hạn mức)
                    case -10144://loại bảo mật ko đúng
                        $("#boxRegisterOTPEmail").find(".alert-danger").html('<i class="fa fa-warning"></i>' + Msg).show(); break;
                    case -10145: //hạn mức không đúng
                        account_secure.SwapErrorResult(minmoney, Msg); break;
                    default: ModalNotificationInit(Msg, "", "error", "", btnClose); break;
                }
            }
            else {
                Msg = common.getDescription(-999999);
                ModalNotificationInit(Msg, "", "error", "", btnClose);
            }
            ga('send', 'event', 'Account_Security', 'Register_' + txtSecureType, 'Fail_StepCheck');
            return;
        });

    };
    this.ChangeLimitSecure = function () {
        $("#boxChangeLimitSecure").find(".alert-danger").html('').hide();
        utils.translateLang('profile.account');
        var minAmount = $("#txtNewLimitSecure");
        var valueLimit = minAmount.val().replace(/[,.]/g, '');
        var currentDiv = "boxChangeLimitSecure";
        if (valueLimit == '') {
            minAmount.focus();
            minAmount.siblings('.error-text').html($.t('accountSecure.minAmountEmpty'));
            minAmount.siblings('.error-text').show();
            minAmount.addClass('error');
            return;
        }
        if (!utils.validateNumberOnly(valueLimit) || valueLimit < 0) {
            minAmount.focus();
            minAmount.siblings('.error-text').html($.t('accountSecure.minAmountInvalid'));
            minAmount.siblings('.error-text').show();
            minAmount.addClass('error');
            return;
        }
        if (parseInt(valueLimit) === account_secure.minAmount) {
            minAmount.focus();
            minAmount.siblings('.error-text').html("Hạn mức mới phải khác so với hạn mức hiện tại");
            minAmount.siblings('.error-text').show();
            minAmount.addClass('error');
            return;
        }

        var noteSecure = "";
        var secureType_current = account_secure.secureType;
        var urlAccountApi = utils.linkIdApi() + "Account/SecurityChangeMinAmount";
        account_secure.statusBtn = false;
        var btnClose = $.t('accountSecure.btnClose');
        var nextDiv = $("#boxRegisterOTPConfirm");
        utils.loading();
        utils.postData(urlAccountApi, {}, function (data) {
            utils.unLoading();
            account_secure.statusBtn = true;
            if (data.c >= 0) {
                account_secure.actionSecure(0, "next", "boxRegisterOTPConfirm");
                nextDiv.find(".typeSecureReg").text(account_secure.secureName);
                nextDiv.find(".limitSecureReg").html(utils.formatMoney(account_secure.minAmount) + "<sup>VNĐ</sup>");
                nextDiv.find(".txtNewLimitSecure").html(utils.formatMoney(valueLimit) + "<sup>VNĐ</sup>");
                nextDiv.find("#btnConfirmReg").attr("onclick", "account_secure.ChangeLimitSecure_confirm();");
                nextDiv.find("#btnBackReg").attr("onclick", "account_secure.actionSecure(0,'prev','" + currentDiv + "');");
                nextDiv.find("#btnResendOTP").hide();
                nextDiv.find("#txtNoteSecure2").hide();
                if (data.p && typeof data.p == "object" && data.p.length > 0 && parseInt(data.p[0].SecurityType) > 0)
                    secureType_current = parseInt(data.p[0].SecurityType);
                if (secureType_current == 1) {
                    noteSecure = utils.formatString($.t('accountSecure.noteUpdateLimitSMS'), header.AccountInfo.Username);
                    $("#boxRegisterOTPConfirm .security-image").find('img').attr("src", utils.rootUrl() + "Content/assets/images/security-sms.svg");
                    $("#txtNoteSecure2").show();
                }
                else if (secureType_current == 2) {
                    noteSecure = utils.formatString($.t('accountSecure.noteUpdateLimitEmail'), header.AccountInfo.Email);
                    $("#boxRegisterOTPConfirm .security-image").find('img').attr("src", utils.rootUrl() + "Content/assets/images/security-email.svg");
                    nextDiv.find("#btnResendOTP").attr("onclick", "account_secure.Resend_OTP(" + 2 + ");");
                    nextDiv.find("#btnResendOTP").show();
                }
                else if (secureType_current == 3) {
                    noteSecure = $.t('accountSecure.noteSecureApp');
                    $("#boxRegisterOTPConfirm .security-image").find('img').attr("src", utils.rootUrl() + "Content/assets/images/security-app.svg");
                }
                else {
                    noteSecure = $.t('accountSecure.noteSecureVoice');
                    $("#boxRegisterOTPConfirm .security-image").find('img').attr("src", utils.rootUrl() + "Content/assets/images/security-voice.svg");
                }

                nextDiv.find("#hd_title").text($.t('accountSecure.changeLimit'));
                nextDiv.find("#txtNoteSecure").html(noteSecure);
                $("#r_new_limit").show();
                $("#boxRegisterOTPConfirm").keypress(function (event) {
                    if (event.which == 13) {
                        event.preventDefault();
                        account_secure.ChangeLimitSecure_confirm();
                    }
                });
                setTimeout(function () {
                    $("#txtVerifyCode").focus();
                }, 300);
                return;
            }
        }, function (dataErr) {
            utils.unLoading();
            account_secure.statusBtn = true;
            var Msg = '';
            if (typeof JSON.parse(dataErr) === "object") {
                var objReturn = JSON.parse(dataErr);
                if (objReturn.c == -10148)// Yêu cầu bảo mật bằng OTP
                {
                    account_secure.actionSecure(0, "next", "boxRegisterOTPConfirm")
                    nextDiv.find(".typeSecureReg").text(account_secure.secureName);
                    nextDiv.find(".limitSecureReg").html(utils.formatMoney(account_secure.minAmount) + "<sup>VNĐ</sup>");
                    nextDiv.find(".txtNewLimitSecure").html(utils.formatMoney(valueLimit) + "<sup>VNĐ</sup>");
                    nextDiv.find("#btnConfirmReg").attr("onclick", "account_secure.ChangeLimitSecure_confirm();");
                    nextDiv.find("#btnBackReg").attr("onclick", "account_secure.actionSecure(0,'prev','" + currentDiv + "');");

                    nextDiv.find("#btnResendOTP").hide();
                    nextDiv.find("#txtNoteSecure2").hide();
                    if (data.p && typeof data.p == "object" && data.p.length > 0 && parseInt(data.p[0].SecurityType) > 0)
                        secureType_current = parseInt(data.p[0].SecurityType);

                    if (secureType_current == 1) {
                        noteSecure = utils.formatString($.t('accountSecure.noteUpdateLimitSMS'), header.AccountInfo.Username);
                        $("#boxRegisterOTPConfirm .security-image").find('img').attr("src", utils.rootUrl() + "Content/assets/images/security-sms.svg");
                        $("#txtNoteSecure2").show();
                    }
                    else if (secureType_current == 2) {
                        noteSecure = utils.formatString($.t('accountSecure.noteUpdateLimitEmail'), header.AccountInfo.Email);
                        $("#boxRegisterOTPConfirm .security-image").find('img').attr("src", utils.rootUrl() + "Content/assets/images/security-email.svg");
                        nextDiv.find("#btnResendOTP").attr("onclick", "account_secure.Resend_OTP(" + 2 + ");");
                        nextDiv.find("#btnResendOTP").show();
                    }
                    else if (secureType_current == 3) {
                        noteSecure = $.t('accountSecure.noteSecureApp');
                        $("#boxRegisterOTPConfirm .security-image").find('img').attr("src", utils.rootUrl() + "Content/assets/images/security-app.svg");
                    }
                    else {
                        noteSecure = $.t('accountSecure.noteSecureVoice');
                        $("#boxRegisterOTPConfirm .security-image").find('img').attr("src", utils.rootUrl() + "Content/assets/images/security-voice.svg");
                    }

                    nextDiv.find("#hd_title").text($.t('accountSecure.changeLimit'));
                    nextDiv.find("#txtNoteSecure").html(noteSecure);

                    $("#r_new_limit").show();
                    $("#boxRegisterOTPConfirm").keypress(function (event) {
                        if (event.which == 13) {
                            event.preventDefault();
                            account_secure.ChangeLimitSecure_confirm();
                        }
                    });
                    setTimeout(function () {
                        $("#txtVerifyCode").focus();
                    }, 300);
                    return;
                }
                Msg = common.getDescription(objReturn.c);
                switch (objReturn.c) {
                    case -50: case -1://TK ko tồn tại
                    case -628: case -10137://Email chưa xác thực
                    case -10001: //chưa login
                    case -10002: case -10008: case -600://dữ liệu ko hợp lệ
                    case -10010: //TK bị tạm khóa
                    case -10052: case -10049: case -10150: //TK chưa đăng ký bảo mật (dành cho đổi hạn mức)
                    case -10144://loại bảo mật ko đúng
                        $("#boxChangeLimitSecure").find(".alert-danger").html('<i class="fa fa-warning"></i>' + Msg).show(); break;
                    case -10145: //hạn mức không đúng
                        account_secure.SwapErrorResult(minAmount, Msg); break;
                    default: ModalNotificationInit(Msg, "", "error", "", btnClose); break;
                }
            }
            else {
                Msg = common.getDescription(-999999);
                ModalNotificationInit(Msg, "", "error", "", btnClose);
            }
            var txtSecureType = "";
            if (secureType_current == 1)
                txtSecureType = "OTP_SMS";
            else if (secureType_current == 2)
                txtSecureType = "OTP_Email";
            else if (secureType_current == 3)
                txtSecureType = "OTP_Voice";
            else if (secureType_current == 4)
                txtSecureType = "OTP_App";
            ga('send', 'event', 'Account_Security', 'ChangeLimit_' + txtSecureType, 'Fail_StepCheck');
            return;
        });

    }

    this.ChangeLimitSecure_confirm = function () {
        utils.translateLang('profile.account');
        $("#boxRegisterOTPConfirm").find(".alert-danger").html('').hide();
        if (account_secure.statusBtn == false)
            return;
        if (account_secure.secureType <= 0) {
            //TK chưa đăng ký bảo mật
            return;
        }
        var minAmount = $("#txtNewLimitSecure");
        var AmountValue = minAmount.val().replace(/[,.]/g, '');
        var secureCode = $("#txtSecureCode");
        var currentDiv = $("#dv_account_secure").find(".div_active");
        var backDivID = "boxChangeLimitSecure";

        if (AmountValue == '') {
            account_secure.actionSecure(0, "prev", backDivID)
            minAmount.siblings('.error-text').html($.t("accountSecure.minAmountEmpty"));
            minAmount.siblings('.error-text').show();
            minAmount.addClass('error');
            setTimeout(function () { minAmount.focus(); }, 300);
            return;
        }
        if (!utils.validateNumberOnly(AmountValue)) {
            account_secure.actionSecure(0, "prev", backDivID)
            minAmount.siblings('.error-text').html($.t("accountSecure.minAmountInvalid"));
            minAmount.siblings('.error-text').show();
            minAmount.addClass('error');
            setTimeout(function () { minAmount.focus(); }, 300);
            return;
        }
        if (parseInt(AmountValue) === account_secure.minAmount) {
            account_secure.actionSecure(0, "prev", backDivID)
            minAmount.siblings('.error-text').html("Hạn mức mới phải khác so với hạn mức hiện tại");
            minAmount.siblings('.error-text').show();
            minAmount.addClass('error');
            setTimeout(function () { minAmount.focus(); }, 300);
            return;
        }
        var confirmCode = $('#txtVerifyCode');
        if (confirmCode.val().trim() === '') {
            confirmCode.focus();
            confirmCode.siblings('.error-text').html($.t('accountSecure.inputConfirmCode'));
            confirmCode.siblings('.error-text').show();
            confirmCode.addClass('error');
            return;
        }

        if (confirmCode.val().trim().length !== 6) {
            confirmCode.siblings('.error-text').html($.t('accountSecure.confirmCodeInvalid'));
            confirmCode.siblings('.error-text').show();
            confirmCode.addClass('error');
            confirmCode.focus();
            return;
        }
        $("#boxRegisterOTPConfirm .txtUsrName").click();
        var model = {
            MinAmount: AmountValue,
            Otp: confirmCode.val().trim()
        }
        var txtSecureType = "";
        if (account_secure.secureType == 1)
            txtSecureType = "OTP_SMS";
        else if (account_secure.secureType == 2)
            txtSecureType = "OTP_Email";
        else if (account_secure.secureType == 3)
            txtSecureType = "OTP_Voice";
        else if (account_secure.secureType == 4)
            txtSecureType = "OTP_App";

        var urlAccountApi = utils.linkIdApi() + "Account/SecurityChangeMinAmountOTP";
        var btnClose = $.t('accountSecure.btnClose');
        account_secure.statusBtn = false;
        utils.loading();
        utils.postData(urlAccountApi, model, function (data) {
            utils.unLoading();
            account_secure.statusBtn = true;
            var callbackClose = function () {
                // đổi hạn mức thành công.
                window.location = utils.rootUrl() + 'thong-tin-tai-khoan';
                //account_secure.actionSecure(0, "prev", "boxSecureType");
                //location.reload();
            };
            //ModalPopupShow('success', $.t('accountSecure.success'), $.t('accountSecure.updateLimitSecureSuccess'), null, $.t('accountSecure.btnClose'), callbackClose, callbackClose)
            ModalNotificationInit($.t('accountSecure.updateLimitSecureSuccess'), callbackClose, "success", $.t('accountSecure.success'), btnClose, 5000);
            ga('send', 'event', 'Account_Security', 'ChangeLimit_' + txtSecureType, 'Success_StepConfirm');
        }, function (dataErr) {
            utils.unLoading();
            var Msg = common.getDescription(-999999);
            account_secure.statusBtn = true;
            if (typeof JSON.parse(dataErr) === "object") {
                var objReturn = JSON.parse(dataErr);
                Msg = common.getDescription(objReturn.c);
                switch (objReturn.c) {
                    case -50: case -1://TK ko tồn tại
                    case -628: case -10137://Email chưa xác thực
                    case -10001: //chưa login
                    case -10002: case -10008: case -600://dữ liệu ko hợp lệ
                    case -10010: //TK bị tạm khóa
                    case -10052: case -10049: case -10150: //TK chưa đăng ký bảo mật (dành cho đổi hạn mức)
                    case -10144://loại bảo mật ko đúng
                        $("#boxRegisterOTPConfirm").find(".alert-danger").html('<i class="fa fa-warning"></i>' + Msg).show(); break;
                    case -10145: //hạn mức không đúng
                        account_secure.actionSecure(0, "prev", backDivID);
                        account_secure.SwapErrorResult(minAmount, Msg); break;
                    case -111: case -6: case -7: case -10015: case -10021: case 10148://OTP fail
                        account_secure.SwapErrorResult(confirmCode, Msg); break;
                    default: ModalNotificationInit(Msg, "", "error", "", btnClose); break;
                }
            }
            else {
                ModalNotificationInit(Msg, "", "error", "", btnClose);
            }
            ga('send', 'event', 'Account_Security', 'ChangeLimit_' + txtSecureType, 'Fail_StepConfirm');
            return;
        });

    };
    this.RegisterSecure_confirm = function (SecurityType) {
        utils.translateLang('profile.account');
        $("#boxRegisterOTPConfirm").find(".alert-danger").html('').hide();
        if (account_secure.statusBtn == false || (SecurityType != 2 && SecurityType != 3))
            return;

        var currentDiv = $("#dv_account_secure").find(".div_active");
        var minAmount = $("#txtLimitOTPEmail");

        var backDivID = "boxRegisterOTPEmail";
        if (SecurityType === 3) {
            backDivID = "boxRegisterOTPVoice";
            minAmount = $("#txtLimitOTPVoice");
        }

        var AmountValue = minAmount.val().replace(/[,.]/g, '');
        if (AmountValue == '') {
            account_secure.actionSecure(0, "prev", backDivID)
            minAmount.siblings('.error-text').html($.t("accountSecure.minAmountEmpty"));
            minAmount.siblings('.error-text').show();
            minAmount.addClass('error');
            setTimeout(function () { minAmount.focus(); }, 300);
            return;
        }
        if (!utils.validateNumberOnly(AmountValue)) {
            account_secure.actionSecure(0, "prev", backDivID)
            minAmount.siblings('.error-text').html($.t("accountSecure.minAmountInvalid"));
            minAmount.siblings('.error-text').show();
            minAmount.addClass('error');
            setTimeout(function () { minAmount.focus(); }, 300);
            return;
        }
        var confirmCode = $('#txtVerifyCode');
        if (confirmCode.val().trim() === '') {
            confirmCode.focus();
            confirmCode.siblings('.error-text').html($.t('accountSecure.inputConfirmCode'));
            confirmCode.siblings('.error-text').show();
            confirmCode.addClass('error');
            return;
        }

        if (confirmCode.val().trim().length !== 6) {
            confirmCode.siblings('.error-text').html($.t('accountSecure.confirmCodeInvalid'));
            confirmCode.siblings('.error-text').show();
            confirmCode.addClass('error');
            confirmCode.focus();
            return;
        }
        $("#boxRegisterOTPConfirm .txtUsrName").click();
        var model = {
            MinAmount: AmountValue,
            Otp: confirmCode.val().trim(),
            SecurityType: SecurityType
        }
        var txtSecureType = "";
        if (SecurityType == 1)
            txtSecureType = "OTP_SMS";
        else if (SecurityType == 2)
            txtSecureType = "OTP_Email";
        else if (SecurityType == 3)
            txtSecureType = "OTP_Voice";
        var urlAccountApi = utils.linkIdApi() + "Account/SecurityCreateVerifyOTP";
        account_secure.statusBtn = false;
        var btnClose = $.t('accountSecure.btnClose');
        utils.loading();
        utils.postData(urlAccountApi, model, function (data) {
            utils.unLoading();
            account_secure.statusBtn = true;
            var callbackClose = function () {
                account_secure.actionSecure(0, "prev", "boxSecureType");
                window.location = utils.rootUrl() + "thong-tin";
            };
            //ModalPopupShow('success', $.t('accountSecure.success'), $.t('accountSecure.registerSuccess'), null, $.t('accountSecure.btnClose'), callbackClose, callbackClose)
            var text = utils.formatString($.t('accountSecure.registerOTPEmailSuccess'), header.AccountInfo.Email);
            ModalNotificationInit(text, callbackClose, "success", $.t('accountSecure.registerSuccess'), btnClose, 5000);
            ga('send', 'event', 'Account_Security', 'Register_' + txtSecureType, 'Success_StepConfirm');
        }, function (dataErr) {
            utils.unLoading();
            var Msg = common.getDescription(-999999);
            account_secure.statusBtn = true;
            if (typeof JSON.parse(dataErr) === "object") {
                var objReturn = JSON.parse(dataErr);
                Msg = common.getDescription(objReturn.c);
                switch (objReturn.c) {
                    case -50: case -1://TK ko tồn tại
                    case -628: case -10137://Email chưa xác thực
                    case -10001: //chưa login
                    case -10002: case -10008: case -600://dữ liệu ko hợp lệ
                    case -10010: //TK bị tạm khóa
                    case -10052: case -10049: case -10150: //TK chưa đăng ký bảo mật (dành cho đổi hạn mức)
                    case -10144://loại bảo mật ko đúng
                        $("#boxRegisterOTPConfirm").find(".alert-danger").html('<i class="fa fa-warning"></i>' + Msg).show(); break;
                    case -10145: //hạn mức không đúng
                        account_secure.actionSecure(0, "prev", backDivID);
                        account_secure.SwapErrorResult(minAmount, Msg); break;
                    case -111: case -6: case -7: case -10015: case -10021: case 10148://OTP fail
                        account_secure.SwapErrorResult(confirmCode, Msg); break;
                    default: ModalNotificationInit(Msg, "", "error", "", btnClose); break;
                }

            }
            else {
                ModalNotificationInit(Msg, "", "error", "", btnClose);
            }
            ga('send', 'event', 'Account_Security', 'Register_' + txtSecureType, 'Fail_StepConfirm');
            return;
        });
    };
    this.Resend_OTP = function (type) {
        utils.translateLang('profile.account');
        var btnClose = $.t('accountSecure.btnClose');

        if (cacheJS.get({ email: header.AccountInfo.Email, type: 'payment' })) {
            var msgErr = utils.getCurrentLanguage() === 'en' ? 'Time between 2 re-send activation code is minimum 60s' : 'Khoảng cách giữa 2 lần gửi lại mã kích hoạt tối thiểu là 60s';
            ModalNotificationInit(msgErr, "", "error", "", btnClose);
            return;
        }
        var culture = utils.getCurrentLanguage();
        var urlPaymentApi = utils.trasactionApi() + "Payment/ResendOTP";
        utils.loading();
        utils.postData(urlPaymentApi, {}, function (data) {
            utils.unLoading();
            cacheJS.set({ email: header.AccountInfo.Email, type: 'secure' }, 'resend', 60, null);
            var content = "";

            if (type && type == 1)//đăng ký
            {
                content = utils.formatString($.t('accountSecure.resendRegisterEmail'), header.AccountInfo.Email);
                ga('send', 'event', 'Account_Security', 'Register_Security_ResendOTPEmail', 'Success');
            }
            else //đổi hạn mức
            {
                content = utils.formatString($.t('accountSecure.resendChangeEmail'), header.AccountInfo.Email);
                ga('send', 'event', 'Account_Security', 'ChangeLimit_Security_ResendOTPEmail', 'Success');
            }
            ModalNotificationInit(content, null, "success", $.t('accountSecure.titleResendOTP'), btnClose, 5000);

        }, function (dataErr) {
            utils.unLoading();
            account_secure.statusBtn = true;

            var Msg = common.getDescription(-999999);
            if (typeof JSON.parse(dataErr) === "object") {
                var objReturn = JSON.parse(dataErr);
                Msg = common.getDescription(objReturn.c);
                ModalNotificationInit(Msg, "", "error", "", btnClose);
            }
            else {
                ModalNotificationInit(Msg, "", "error", "", btnClose);
            }
            if (type && type == 1)//đăng ký
            {
                ga('send', 'event', 'Account_Security', 'Register_Security_ResendOTPEmail', 'Fail');
            }
            else //đổi hạn mức
            {
                ga('send', 'event', 'Account_Security', 'ChangeLimit_Security_ResendOTPEmail', 'Fail');
            }
            return;
        });
    }
    this.SwapErrorResult = function (Target, Msg) {
        $(Target).siblings('.error-text').html(Msg);
        $(Target).siblings('.error-text').show();
        $(Target).addClass('error');
        $(Target).focus();
    }
}

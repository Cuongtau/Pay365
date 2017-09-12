account_changepass = new function () {
    this.UrlBack = '';
    this.statusBtn = true;
    this.AccountName = '';
    this.Vw_ForgotPassword = function () {
        utils.translateLang('profile.password');
        $('#formLogin').toggleClass("div_active div_hidden");
        $('#formForgetPass').toggleClass("div_hidden div_active");
    }
    this.Vw_FormLogin = function () {
        $('#formForgetPass').toggleClass("div_active div_hidden");
        $('#formLogin').toggleClass("div_hidden div_active");
    }
    this.Vw_ResetPassViaSMS = function () {
        utils.translateLang('profile.password');

        $("#inputEmail").hide();
        $(".tit_rs_sms").show();
        $(".tit_rs_email").hide();
        $("#formForgetPass > .foot").hide();
        SlideToogle("ts-1", "next");

        setTimeout(function () {
            $("#txtUsername").focus();
        }, 300);
        $("#recoveryForm_checkinput").keypress(function (event) {
            if (event.which == 13) {
                event.preventDefault();
                account_changepass.ResetPass_CheckInput();
            }
        });
        return;
    }

    this.Vw_ResetPassViaEmail = function () {
        utils.translateLang('profile.password');
        $("#inputEmail").show();
        $(".tit_rs_sms").hide();
        $(".tit_rs_email").show();
        $("#formForgetPass > .foot").hide();
        SlideToogle("ts-1", "next");

        setTimeout(function () {
            $("#txtUsername").focus();
        }, 300);
        $("#recoveryForm_checkinput").keypress(function (event) {
            if (event.which == 13) {
                event.preventDefault();
                account_changepass.ResetPass_CheckInput();
            }
        });
        return;
    }
    this.ResetPass_CheckInput = function () {
        utils.translateLang('profile.password');
        $("#resetPassStep1").find(".p-error-text").html('').hide();
        if (!account_changepass.statusBtn)
            return;
        var username = $('#txtUsername');
        var email = $("#txtEmail");
        $(".error-text").html('');
        var obj_resetPass = {};
        var urlAccountApi = utils.linkIdApi() + "Account/ResetPassSMSCheck";
        var isEmail = email.is(":visible");
        if (username.val().trim() === '') {
            username.focus();
            username.siblings('.error-text').html(i18n.t('forgetPass.inputAcc'));
            username.siblings('.error-text').show();
            username.addClass('error');
            return;
        }

        if (!username.val().trim().match('^0')) {
            username.focus();
            username.siblings('.error-text').html($.t('forgetPass.userNameInvalid'));
            username.siblings('.error-text').show();
            username.addClass('error');
            return;
        }

        if (username.val().trim().length < 9 || username.val().trim().length > 11) {
            username.focus();
            username.siblings('.error-text').html($.t('forgetPass.usernameInvalidLength'));
            username.siblings('.error-text').show();
            username.addClass('error');
            return;
        }
        var culture = utils.getCurrentLanguage();
        obj_resetPass = {
            Username: username.val().trim(),
            email: email.val().trim(),
            culture: culture
        };
        if (!isEmail) //Trg hợp SMS
        {
            delete obj_resetPass.email;
            delete obj_resetPass.culture;
            $("#content_msg_sms").show();
            $("#content_msg_email").hide();
        }
        else { //Email
            if (email.val().trim() === "") {
                email.siblings('.error-text').html($.t('forgetPass.inputEmail'));
                email.siblings('.error-text').show();
                email.addClass('error');
                email.focus();
                return;
            };
            if (!utils.validateEmail(email.val().trim())) {
                email.siblings('.error-text').html($.t('forgetPass.emailFail'));
                email.siblings('.error-text').show();
                email.addClass('error');
                email.focus();
                return;
            };
            $("#content_msg_sms").hide();
            $("#content_msg_email").show();
            urlAccountApi = utils.linkIdApi() + "Account/SendEmailResetPass";
        }

        account_changepass.statusBtn = false;
        utils.loading();
        utils.postData(urlAccountApi, obj_resetPass, function (data) {
            utils.unLoading();
            account_changepass.statusBtn = true;
            if (data.c >= 0) {
                if (isEmail) {
                    $("#sendOTP_Email").text(email.val().trim());
                    $("#resendOTP").show();
                }
                else {
                    $("#resendOTP").hide();
                    $("#sendOTP_Mobile").text(username.val().trim());
                }

                //window.location.href = utils.rootUrl() + "login";
                //return;

                SlideToogle("ts-1", "next");
                utils.translateLang('profile.password');

                account_changepass.InstanceFormValidation();

                setTimeout(function () {
                    $("#txtConfirmCode").focus();
                }, 600);
                $("#recoveryForm_ChangePass").keypress(function (event) {
                    if (event.which == 13) {
                        event.preventDefault();
                        $("#recoveryForm_ChangePass").submit();
                    }
                });
                return;
            }
        }, function (dataErr) {
            utils.unLoading();
            account_changepass.statusBtn = true;
            var btnClose = i18n.t('forgetPass.btnClose');
            var Msg = common.getDescription(-999999);
            if (typeof JSON.parse(dataErr) === "object") {
                var objReturn = JSON.parse(dataErr);
                if (objReturn.c == -10136) {
                    if (isEmail) {
                        $("#sendOTP_Email").text(email.val().trim());
                        $("#resendOTP").show();
                    }
                    else {
                        $("#resendOTP").hide();
                        $("#sendOTP_Mobile").text(username.val().trim());
                    }

                    SlideToogle("ts-1", "next");
                    utils.translateLang('profile.password');

                    account_changepass.InstanceFormValidation();

                    setTimeout(function () {
                        $("#txtConfirmCode").focus();
                    }, 600);
                    $("#recoveryForm_ChangePass").keypress(function (event) {
                        if (event.which == 13) {
                            event.preventDefault();
                            $("#recoveryForm_ChangePass").submit();
                        }
                    });
                    return;
                }
                Msg = common.getDescription(objReturn.c);
                switch (objReturn.c) {
                    case -10046:case -10137:case -42:
                        account_changepass.SwapErrorResult(email, Msg);
                        break;
                    case -1: case -33: case -48: case -50:
                        account_changepass.SwapErrorResult(username, Msg);
                        break;
                    default:
                        $("#resetPassStep1").find(".p-error-text").html(Msg).show();
                        break;
                }
            }
            else {
                ModalNotificationInit(Msg, "", "error", "", btnClose);
            }
            if (email == "") {
                ga('send', 'event', 'Reset_Password', 'ResetBySMS_Check', 'Fail');
            }
            else {
                ga('send', 'event', 'Reset_Password', 'ResetByEmail_Check', 'Fail');
            }
            return;
        });
    }

    this.ResetPassword_Confirm = function (bv) {
        utils.translateLang('profile.password');
        $("#resetPassStep2").find(".p-error-text").html('').hide();
        if (!account_changepass.statusBtn)
            return;
        var userName = $("#txtUsername").val();
        var email = $("#txtEmail").val();
        var confirmCode = $('#txtConfirmCode');

        if (confirmCode.val().trim() === '') {
            bv.updateStatus('confirmCode', 'INVALID', 'notEmpty');
            return;
        }

        if (confirmCode.val().trim().length !== 6) {
            bv.updateMessage('confirmCode', 'blank', $.t('forgetPass.confirmCodeInvalid')); // Show the custom message
            bv.updateStatus('confirmCode', 'INVALID', 'blank');
            return;
        }
        if (userName === "" && email === "")
            return;

        var password = $('#txtPasswordChange');
        if (password.val().trim() === '') {
            bv.updateStatus('newPassword', 'INVALID', 'notEmpty');
            return;
        }

        if (password.val().length < 6 || password.val().length > 18 || password.val().search(/[a-z]/) < 0 || password.val().search(/[0-9]/) < 0) {
            bv.updateStatus('newPassword', 'INVALID', 'regexp');
            return;
        };

        var repassword = $('#txtRePasswordChange');
        if (repassword.val().trim() === '') {
            bv.updateStatus('confirmPassword', 'INVALID', 'notEmpty');
            return;
        }

        if (repassword.val().trim() !== password.val().trim()) {
            bv.updateStatus('confirmPassword', 'INVALID', 'identical');
            return;
        }
        var obj_resetPass = {
            Username: userName,
            email: email,
            Password: password.val().trim(),
            Otp: confirmCode.val().trim()
        };
        var urlAccountApi = utils.linkIdApi() + "Account/ResetPasswordBySMS";

        if (email == "") {
            delete obj_resetPass.email;
        }
        else {
            urlAccountApi = utils.linkIdApi() + "Account/ResetPasswordByEmail";
        }

        account_changepass.statusBtn = false;
        utils.loading();
        utils.postData(urlAccountApi, obj_resetPass, function (data) {
            utils.unLoading();
            account_changepass.statusBtn = true;
            $("#popup_success").css("overflow", "inherit").modal("open");
            $('#recoveryForm_ChangePass').bootstrapValidator("resetForm", true);

            var countdwn = setInterval(function () {
                var time = $("#countdwn").text();
                time = parseInt(time);
                if (time == 1)
                    clearInterval(countdwn);

                time -= 1;
                if (time == 0)
                    time = 5;
                $("#countdwn").text(time);
            },1000);

            setTimeout(function () {
                $("#popup_success").modal("close");
                SlideToogle("ts-1", "prev", "typeReset");
                account_changepass.Vw_FormLogin();
            }, 5000);
            if (email == "") {
                ga('send', 'event', 'Reset_Password', 'ResetBySMS_Confirm', 'Success');
            }
            else {
                ga('send', 'event', 'Reset_Password', 'ResetByEmail_Confirm', 'Success');
            }
            
        }, function (dataErr) {
            utils.unLoading();
            account_changepass.statusBtn = true;

            var btnClose = i18n.t('forgetPass.btnClose');
            var Msg = common.getDescription(-999999);
            if (typeof JSON.parse(dataErr) === "object") {
                var objReturn = JSON.parse(dataErr);
                Msg = common.getDescription(objReturn.c);
                switch (objReturn.c) {
                    case -10006: case -10007: case -10026: case -10027: case -10028: case -663:
                        account_changepass.SwapErrorResult_Bv(bv, 'newPassword', Msg);
                        break;
                    case -10015:case -7: case -6: case -111:
                        account_changepass.SwapErrorResult_Bv(bv, 'confirmCode', Msg);
                        break;
                    default:
                        $("#resetPassStep2").find(".p-error-text").html(Msg).show();
                        break;
                }
            }
            else {
                ModalNotificationInit(Msg, "", "error", "", btnClose);
            }
            if (email == "") {
                ga('send', 'event', 'Reset_Password', 'ResetBySMS_Confirm', 'Fail');
            }
            else {
                ga('send', 'event', 'Reset_Password', 'ResetByEmail_Confirm', 'Fail');
            }
            return;
        });

    }

    this.ChangeText = function (t) {
        var selector = t.currentTarget;
        $(selector).removeClass("error");
        $(selector).siblings(".error-text").html('');
    }

    this.backStep = function (type) {
        var currentDiv = $("#ts-1").find(".div_active");
        var backDiv = currentDiv.prev();
        currentDiv.find("label.active").removeClass("active");
        currentDiv.find("input.error").removeClass("error");
        currentDiv.find("input.success").removeClass("success");

        if (currentDiv.index() === 1 || currentDiv.is(':nth-child(1)')) {
            $("#txtEmail").val('');
            $("#txtUsername").val('');
            currentDiv.find(".error-text").text('');
            $("#formForgetPass > .foot").show();
        }
        else if (currentDiv.index() === 2 || currentDiv.is(':nth-child(2)')) {
            $('#recoveryForm_ChangePass').bootstrapValidator("resetForm", true);
            var bv = $('#recoveryForm_ChangePass').data("bootstrapValidator");
            bv.destroy();
            $("#txtUsername").focus();
        }
        SlideToogle("ts-1", "prev");
    }
    this.backChangePass = function () {
        var currentDiv = $("#ts-1").find(".div_active");
        var backDiv = currentDiv.prev();
        currentDiv.find("label.active").removeClass("active");
        $('#changePassword').find("input.error").removeClass("error");
        $('#changePassword').find("input.success").removeClass("success");
        if (currentDiv.index() === 1 || currentDiv.is(':nth-child(1)')) {
            $('#changePassword').bootstrapValidator("resetForm", true);
            var bv = $('#changePassword').data("bootstrapValidator");
            bv.destroy();
        }
        SlideToogle("ts-1", "prev");
    }
    this.SwapErrorResult_Bv = function (bv, field, Msg) {
        bv.updateMessage(field, 'blank', Msg);
        bv.updateStatus(field, 'INVALID', 'blank');
    }
    this.SwapErrorResult = function (Target, Msg) {
        $(Target).siblings('.error-text').html(Msg);
        $(Target).siblings('.error-text').show();
        $(Target).addClass('error');
        $(Target).focus();
    }
    this.Vw_ChangePassword = function () {
        SlideToogle("ts-1", "next");
        utils.translateLang('profile.password');
        account_changepass.InstanceFormValidation(3);
        setTimeout(function () {
            $("#txtOldPass").focus();
        }, 300);

    }

    this.ChangePassword = function (bv) {
        utils.translateLang('profile.password');
        if (!account_changepass.statusBtn)
            return;
        var passwordOld = $('#txtOldPass');
        if (passwordOld.val().trim() === '') {
            bv.updateStatus('oldPass', 'INVALID', 'notEmpty');
            return;
        }
        var passwordNew = $('#txtNewPass');
        if (passwordNew.val().trim() === '') {
            bv.updateStatus('newPass', 'INVALID', 'notEmpty');
            return;
        }
        if (passwordOld.val().trim() === passwordNew.val().trim()) {
            bv.updateStatus('newPass', 'INVALID', 'different');
            return;
        }

        if (passwordNew.val().length < 6 || passwordNew.val().length > 18 || passwordNew.val().search(/[a-z]/) < 0 || passwordNew.val().search(/[0-9]/) < 0) {
            bv.updateStatus('newPass', 'INVALID', 'regexp');
            return;
        };

        var repasswordNew = $('#txtConfirmPass');
        if (repasswordNew.val().trim() === '') {
            bv.updateStatus('confirmPass', 'INVALID', 'notEmpty');
            return;
        }
        if (repasswordNew.val().trim() !== passwordNew.val().trim()) {
            bv.updateStatus('confirmPass', 'INVALID', 'identical');
            return;
        }

        var paramValid = {
            OldPassword: passwordOld.val().trim(),
            NewPassword: passwordNew.val().trim()
        };

        var urlAccountApi = utils.linkIdApi() + "Account/ChangePassword";
        account_changepass.statusBtn = false;
        utils.loading();
        utils.postData(urlAccountApi, paramValid, function (data) {
            utils.unLoading();
            account_changepass.statusBtn = true;
            if (data.c >= 0) {
                $("#popup_success").css("overflow", "inherit").modal("open");
                $('#changePassword').bootstrapValidator("resetForm", true);
                SlideToogle("ts-1", "prev");
                $('#changePassword').find("input.error").removeClass("error");
                $('#changePassword').find("input.success").removeClass("success");
                var countdwn = setInterval(function () {
                    var time = $("#countdwn").text();
                    time = parseInt(time);
                    if (time == 1)
                        clearInterval(countdwn);

                    time -= 1;
                    $("#countdwn").text(time);
                }, 1000);
                setTimeout(function () {
                    $("#popup_success").modal("close");
                    common.logOut();
                }, 5000);
                ga('send', 'event', 'Reset_Password', 'ChangePassword', 'Success');
                return;
            }
        }, function (dataErr) {
            utils.unLoading();
            account_changepass.statusBtn = true;
            var btnClose = $.t('changePass.btnClose');
            var Msg = common.getDescription(-999999);
            if (typeof JSON.parse(dataErr) === "object") {
                var objReturn = JSON.parse(dataErr);
                Msg = common.getDescription(objReturn.c);
                switch (objReturn.c) {
                    case -613:
                        account_changepass.SwapErrorResult_Bv(bv, 'oldPass', Msg); 
                        break;
                    case -10006: case -10007: case -10026: case -10027: case -10028: case -663:
                        account_changepass.SwapErrorResult_Bv(bv, 'newPass', Msg);
                        break;
                    default:
                        ModalNotificationInit(Msg, "", "error", "", btnClose);
                        break;
                }
            }
            else {
                ModalNotificationInit(Msg, "", "error", "", btnClose);
            }
            ga('send', 'event', 'Reset_Password', 'ChangePassword', 'Fail');
            return;
        });
    };


    this.InstanceFormValidation = function (type) {
        //type default : Reset MK SMS, 2: reset MK Email, 3: đổi MK
        var slideId, slideActive;
        if (type !== 3) {
            $('#recoveryForm_ChangePass').bootstrapValidator({
                message: 'This value is not valid',
                group: ".form-data",
                fields: {
                    confirmCode: {
                        container: '#errConfirmCode',
                        message: $.t('forgetPass.inputConfirmCode'),
                        onError: function (e, data) {
                            var bv = data.bv;
                            var arr_field_err = bv.getInvalidFields();
                            if (arr_field_err.length > 0 && $.inArray($("#txtConfirmCode")[0], arr_field_err) >= 0) {
                                setTimeout(function () {
                                    $("#txtConfirmCode").focus();
                                }, 300);
                            }
                        },
                        validators: {
                            notEmpty: {
                                message: $.t('forgetPass.inputConfirmCode')
                            },
                            blank: {}
                        }
                    },
                    newPassword: {
                        container: '#errNewPass',
                        message: $.t('changePass.errorNew'),
                        onSuccess: function (e, data) {
                            var target = e.currentTarget;
                            var newpass = target.value;
                            var bv = data.bv;
                            var renewpass = $("#txtRePasswordChange").val();
                            $(target).siblings(".rule").find("li").removeClass("success").addClass("success");
                            if (renewpass !== "") {
                                if (newpass === renewpass)
                                    bv.updateStatus('confirmPassword', 'VALID', 'identical');
                                else
                                    bv.updateStatus('confirmPassword', 'INVALID', 'identical');
                            }
                        },
                        onError: function (e, data) {
                            var target = e.currentTarget;
                            var bv = data.bv;
                            var arr_field_err = bv.getInvalidFields();
                            var valueInp = target.value;
                            var $_li_nth1 = $(target).siblings(".rule").find("li:nth-child(1)");
                            var $_li_nth2 = $(target).siblings(".rule").find("li:nth-child(2)");
                            if (valueInp.length < 6 || valueInp.length > 18)
                                $_li_nth1.removeClass("success");
                            else if (!$_li_nth1.hasClass("success"))
                                $_li_nth1.addClass("success");

                            var reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^?&*()-_.+=]+$/;
                            var chkPass = reg.test(valueInp);
                            if (!chkPass)
                                $_li_nth2.removeClass("success");
                            else if (!$_li_nth1.hasClass("success"))
                                $_li_nth2.addClass("success");
                        },
                        validators: {
                            notEmpty: {
                                message: $.t('changePass.errorNew')
                            },
                            regexp: {
                                regexp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^?&*()-_.+=]{6,18}$/,
                                message: $.t('changePass.errorPass')
                            },
                            blank: {}
                        }
                    },
                    confirmPassword: {
                        container: '#errConfirmPass',
                        message: $.t('changePass.errorReNew'),
                        onError: function (e, data) {
                            var bv = data.bv;
                            var arr_field_err = bv.getInvalidFields();
                        },
                        validators: {
                            notEmpty: {
                                message: $.t('changePass.errorReNew')
                            },
                            identical: {
                                field: 'newPassword',
                                message: $.t('changePass.errorMatch'),
                            }
                        }
                    }
                }
            })
                .on('error.field.bv', function (e, data) {
                    $(e.target).removeClass("success").addClass("error");
                    data.bv.disableSubmitButtons(false);
                    slideId = $('#ts-1');
                    slideActive = slideId.find('.div_active');
                    slideId.height(slideActive.outerHeight(true));//height() + parseInt(slideActive.css('margin-bottom')) + parseInt(slideActive.css('margin-top')));
                })
                .on('success.field.bv', function (e, data) {
                    $(e.target).removeClass("error");
                    data.bv.disableSubmitButtons(false);
                    slideId = $('#ts-1');
                    slideActive = slideId.find('.div_active');
                    slideId.height(slideActive.outerHeight(true));//height() + parseInt(slideActive.css('margin-bottom')) + parseInt(slideActive.css('margin-top')));
                })
                .on('error.form.bv', function (e) {
                    e.preventDefault();
                    slideId = $('#ts-1');
                    slideActive = slideId.find('.div_active');
                    slideId.height(slideActive.outerHeight(true));//height() + parseInt(slideActive.css('margin-bottom')) + parseInt(slideActive.css('margin-top')));
                })
                .on('success.form.bv', function (e) {
                    e.preventDefault();
                    var $form = $(e.target);
                    var bv = $form.data('bootstrapValidator');
                    slideId = $('#ts-1');
                    slideActive = slideId.find('.div_active');
                    slideId.height(slideActive.outerHeight(true));//height() + parseInt(slideActive.css('margin-bottom')) + parseInt(slideActive.css('margin-top')));
                    account_changepass.ResetPassword_Confirm(bv);

                });
        }
        else {
            $('#changePassword').bootstrapValidator({
                message: 'This value is not valid',
                group: ".form-group",
                fields: {
                    oldPass: {
                        container: '#errOldPass',
                        message: $.t('changePass.errorOld'),
                        onSuccess: function (e, data) {
                            var target = e.currentTarget;
                            var oldpass = target.value;
                            var bv = data.bv;
                            var newpass = $("#txtNewPass").val();
                            if (newpass !== "") {
                                if (newpass === oldpass)
                                    bv.updateStatus('newPass', 'INVALID', 'different');
                                else
                                    bv.updateStatus('newPass', 'VALID', 'different');
                            }
                        },
                        onError: function (e, data) {
                            var bv = data.bv;
                            var arr_field_err = bv.getInvalidFields();
                            if (arr_field_err.length > 0 && $.inArray($("#txtOldPass")[0], arr_field_err) >= 0) {
                                setTimeout(function () {
                                    $("#txtOldPass").focus();
                                }, 300);
                            }
                        },
                        validators: {
                            notEmpty: {
                                message: $.t('changePass.errorOld')
                            },
                            blank: {}
                        }
                    },
                    newPass: {
                        container: '#errNewPass',
                        message: $.t('changePass.errorNew'),
                        onSuccess: function (e, data) {
                            var target = e.currentTarget;
                            var newpass = target.value;
                            var bv = data.bv;
                            var confirmpass = $("#txtConfirmPass").val();
                            $(target).siblings(".rule").find("li").removeClass("success").addClass("success");
                            if (confirmpass !== "") {
                                if (newpass === confirmpass)
                                    bv.updateStatus('confirmPass', 'VALID', 'identical');
                                else
                                    bv.updateStatus('confirmPass', 'INVALID', 'identical');
                            }
                        },
                        onError: function (e, data) {
                            var target = e.currentTarget;
                            var bv = data.bv;
                            var arr_field_err = bv.getInvalidFields();
                            var valueInp = target.value;
                            var $_li_nth1 = $(target).siblings(".rule").find("li:nth-child(1)");
                            var $_li_nth2 = $(target).siblings(".rule").find("li:nth-child(2)");
                            if (valueInp.length < 6 || valueInp.length > 18) 
                                $_li_nth1.removeClass("success");
                            else if (!$_li_nth1.hasClass("success"))
                                $_li_nth1.addClass("success");

                            var reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^?&*()-_.+=]+$/;
                            var chkPass = reg.test(valueInp);
                            if (!chkPass)
                                $_li_nth2.removeClass("success");
                            else if (!$_li_nth1.hasClass("success"))
                                $_li_nth2.addClass("success");
                        },
                        validators: {
                            notEmpty: {
                                message: $.t('changePass.errorNew')
                            },
                            different: {
                                field: 'oldPass',
                                message: $.t('changePass.newPassInvalid')
                            },
                            regexp: {
                                regexp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^?&*()-_.+=]{6,18}$/,
                                message: $.t('changePass.errorPass')
                            },
                            blank: {}
                        }
                    },
                    confirmPass: {
                        container: '#errConfirmPass',
                        message: $.t('changePass.errorReNew'),
                        onError: function (e, data) {
                            var bv = data.bv;
                            var arr_field_err = bv.getInvalidFields();
                        },
                        validators: {
                            notEmpty: {
                                message: $.t('changePass.errorReNew')
                            },
                            identical: {
                                field: 'newPass',
                                message: $.t('changePass.errorMatch')
                            },
                            blank: {}
                        }
                    }
                }
            })
                .on('error.field.bv', function (e, data) {
                    $(e.target).removeClass("success").addClass("error");
                    data.bv.disableSubmitButtons(false);

                    slideId = $('#ts-1');
                    slideActive = slideId.find('.div_active');
                    slideId.height(slideActive.outerHeight(true));//height() + parseInt(slideActive.css('margin-bottom')) + parseInt(slideActive.css('margin-top')));
                })
                .on('success.field.bv', function (e, data) {
                    $(e.target).removeClass("error");
                    data.bv.disableSubmitButtons(false);

                    slideId = $('#ts-1');
                    slideActive = slideId.find('.div_active');
                    slideId.height(slideActive.outerHeight(true));//height() + parseInt(slideActive.css('margin-bottom')) + parseInt(slideActive.css('margin-top')));
                })
                .on('error.form.bv', function (e) {
                    e.preventDefault();

                    slideId = $('#ts-1');
                    slideActive = slideId.find('.div_active');
                    slideId.height(slideActive.outerHeight(true));//height() + parseInt(slideActive.css('margin-bottom')) + parseInt(slideActive.css('margin-top')));
                })
                .on('success.form.bv', function (e) {
                    e.preventDefault();
                    var $form = $(e.target);
                    var bv = $form.data('bootstrapValidator');

                    slideId = $('#ts-1');
                    slideActive = slideId.find('.div_active');
                    slideId.height(slideActive.outerHeight(true));//height() + parseInt(slideActive.css('margin-bottom')) + parseInt(slideActive.css('margin-top')));
                    account_changepass.ChangePassword(bv);
                });

        }

    }
    this.ResendOTPEmail = function () {
        if (account_changepass.statusBtn === false)
            return;
        utils.translateLang('profile.password');
        var username = $('#txtUsername');
        var email = $("#txtEmail");
        var content = '';
        if (username.val().trim() === '') {
            content = common.getDescription(-999999);
            ModalNotificationInit(content, null, "error");
            return;
        }
        
        if (email.val().trim() === "") {
            content = common.getDescription(-999999);
            ModalNotificationInit(content, null, "error");
            return;
        };
        if (!utils.validateEmail(email.val().trim())) {
            content = common.getDescription(-999999);
            ModalNotificationInit(content, null, "error");
            return;
        };

        if (cacheJS.get({ email: email.val().trim(), type: 'resetPass' })) {
            content = utils.getCurrentLanguage() === 'en' ? 'Time between 2 re-send activation code is minimum 60s' : 'Khoảng cách giữa 2 lần gửi lại mã kích hoạt tối thiểu là 60s';
            ModalNotificationInit(content, null, "error");
            return;
        }
        var culture = utils.getCurrentLanguage();
        obj_resetPass = {
            Username: username.val().trim(),
            email: email.val().trim(),
            culture: culture
        };
        var btnClose = $.t('forgetPass.btnClose');
        var urlAccountApi = utils.linkIdApi() + "Account/SendEmailResetPass";
        account_changepass.statusBtn = false;
        utils.loading();
        utils.postData(urlAccountApi, obj_resetPass, function (data) {
            utils.unLoading();
            account_changepass.statusBtn = true;
            content = utils.formatString($.t('forgetPass.resendOTPEmail'), obj_resetPass.email);
            ModalNotificationInit(content, null, "success", $.t('forgetPass.titleResendOTP'), btnClose);
            
            cacheJS.set({ email: email.val().trim(), type: 'resetPass' }, 'resend', 60, null);
            ga('send', 'event', 'Reset_Password', 'ResetByEmail_ResendOTP', 'Success');
        }, function (dataErr) {
            utils.unLoading();
            account_changepass.statusBtn = true;

            var Msg = common.getDescription(-999999);
            if (typeof JSON.parse(dataErr) === "object") {
                var objReturn = JSON.parse(dataErr);
                Msg = common.getDescription(objReturn.c);
                ModalNotificationInit(Msg, "", "error", "", btnClose);
            }
            else {
                ModalNotificationInit(Msg, "", "error", "", btnClose);
            }
            ga('send', 'event', 'Reset_Password', 'ResetByEmail_ResendOTP', 'Fail');
            return;
        });
    }
};
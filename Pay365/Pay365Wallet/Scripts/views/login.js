login = new function () {
    this.Login = function () {
        if ($("#formLogin #btLogin").hasClass('disabled')) {
            return;
        }
        utils.translateLang('common.register');
        $('.error-text, .success-text').text('');
        $('input').removeClass('error success');
        $('.p-error-text').remove();

        var accountName = $('#login_phone').val().trim();
        if (!accountName) {
            $('#login_phone').addClass('error');
            $('#login_phone').parent().find('.error-text').text(i18n.t('message.usernameEmpty'));
            $('#login_phone').focus();
            return;
        }

        var password = $('#login_password').val().trim();
        if (!password) {
            $('#login_password').addClass('error').parent().find('.eye').addClass('eye-error');
            $('#login_password').parent().find('.error-text').text(i18n.t('message.passwordEmpty'));
            $('#login_password').focus();
            return;
        }

        var captcha = $('#formLogin #form_login_captcha #login_captcha').val();
        if ($('#formLogin #form_login_captcha').is(":visible") && !captcha) {
            $('#formLogin #form_login_captcha #login_captcha').addClass('error');
            $('#formLogin #form_login_captcha #login_captcha').parent().find('.error-text').text(i18n.t('message.captchaEmpty'));
            $('#formLogin #form_login_captcha #login_captcha').focus();
            return;
        }

        var param = {
            PhoneNumber: accountName,
            Password: password,
            PasswordMD5: md5(password),
            SourceId: 1,
            Captcha: captcha,
            verifyCaptcha: !captcha ? '' : $('#formLogin #form_login_captcha #inputToken').val()
        };

        var callback = function (data) {
            $("#formLogin #btLogin").removeClass('disabled');
            if (typeof data === "object") {
                //Sang trang kich hoat
                if (data.c >= 0) {
                    //tk chua kich hoat thi sang form kh
                    if (data.d && data.d.Status === 0) {
                        register.ActiveAccountView(accountName, data.d.Email, '#tab-1');
                        ga('send', 'event', 'Login and Signup', 'Login_NotActive', 'Fail');
                        utils.unLoading();
                    }
                    //Truong hop yeu cau nhap otp dang nhap
                    else if (data.d && data.d.IsOtp === 1) {
                        utils.unLoading();
                        if (data.d.OtpToken) {
                            //Ko lay dc token thi bao loi cho KH
                            $('#notification_modal #modal_content').text(i18n.t('message.otpTokenEmpty'));
                            $('#notification_modal').modal('open');
                            ga('send', 'event', 'Login and Signup', 'Login_OTP', 'Fail');
                            return;
                        }
                        ga('send', 'event', 'Login and Signup', 'Login_OTP', 'Success_DirectViewOTP');
                        //Done thi sang trang login OTP
                        login.LoginOTPView(accountName, data.d.OtpToken);
                    }
                    else {
                        var returnAction = utils.getParameterByName('return');
                        if (returnAction === 'topup')
                            window.location.href = utils.rootUrl() + 'nap-tien';
                        else if (returnAction === 'cashout')
                            window.location.href = utils.rootUrl() + 'rut-tien';
                        else if (returnAction === 'transfer')
                            window.location.href = utils.rootUrl() + 'chuyen-tien';
                        else
                            window.location.href = utils.rootUrl() + 'thong-tin';

                        ga('send', 'event', 'Login and Signup', 'Login', (returnAction != "" && returnAction != null) ? 'Success_Direct_' + returnAction : "Success");
                    }
                    return;
                }
                else if (data.c === -49) {
                    register.ActiveAccountView(accountName, '#tab-1'); utils.unLoading();
                    ga('send', 'event', 'Login and Signup', 'Login_NotActive', 'Fail');
                    return;
                }
                common.saveLog(data, accountName);
                utils.unLoading();
                $('#notification_modal #modal_content').text(common.getDescription(data.c));
                $('#notification_modal').modal('open');
                ga('send', 'event', 'Login and Signup', 'Login', 'Fail');
            }
            else if (utils.checkResponseIsValid(data)) {
                common.saveLog(data, accountName);
                data = JSON.parse(data);
                var responseCode = data.c;
                if (responseCode === -49) {
                    register.ActiveAccountView(accountName, null, '#tab-1'); utils.unLoading();
                    ga('send', 'event', 'Login and Signup', 'Login_NotActive', 'Fail');
                    return;
                }
                else if (responseCode === -10009) {
                    utils.unLoading();
                    if ($('#formLogin #form_login_captcha').is(":visible")) {
                        responseCode = -10023;
                    }
                    $('#formLogin #form_login_captcha').show();
                    utils.getCaptcha('formLogin');
                    common.getFormDescription(responseCode, 'formLogin');
                    ga('send', 'event', 'Login and Signup', 'Login_Captcha', 'Fail');
                    return;
                }
                //captcha ko ddungs
                else if (responseCode === -10003) {
                    utils.unLoading();
                    $('#formLogin #form_login_captcha').show();
                    utils.getCaptcha('formLogin');
                    common.getFormDescription(responseCode, 'formLogin');
                    ga('send', 'event', 'Login and Signup', 'Login_Captcha', 'Fail');
                    return;
                }
                else if (responseCode === -10010) {//Tai khoan bi tam khoa do dang nhap sau nhieu lan
                    utils.unLoading();
                    var time = data.p[1];
                    var minutes = Math.floor(time / 60);
                    var seconds = time - minutes * 60;
                    if (utils.getCurrentLanguage() === 'en') {
                        var contentTempLock = '<div class="strike"><div id="timer_countdown" class="time">' + (minutes + ':' + (seconds < 10 ? ('0' + seconds) : seconds)) + '</div><div class="strike-description"><p>Your account has temporarily been locked for 5 minutes due to 5 failed login attempts. Please try again later</p><strong class="secondary">Hotline: 093-4626-505</strong></div></div>';
                        $('#content_login').html(contentTempLock);
                        $('#footer_login').html('<a href="' + utils.rootUrl() + 'dang-nhap" class="btn btn-flat btn-primary uppercase">Sign in to another account</a>');
                    } else {
                        var contentTempLock = '<div class="strike"><div id="timer_countdown" class="time">' + (minutes + ':' + (seconds < 10 ? ('0' + seconds) : seconds)) + '</div><div class="strike-description"><p>Tài khoản của bạn bị khóa 5 phút do nhập sai quá 5 lần. Vui lòng chờ hết thời gian khóa và thực hiện đăng nhập lại.</p><strong class="secondary">Liên hệ CSKH 093-4626-505</strong></div></div>';
                        $('#content_login').html(contentTempLock);
                        $('#footer_login').html('<a href="' + utils.rootUrl() + 'dang-nhap" class="btn btn-flat btn-primary uppercase">Đăng nhập tài khoản khác</a>');
                    }

                    var htmlTimer = $('#timer_countdown').text();
                    var interval = setInterval(function () {
                        var timer = htmlTimer.split(':');
                        var minutes = parseInt(timer[0], 10);
                        var seconds = parseInt(timer[1], 10);
                        --seconds;
                        minutes = (seconds < 0) ? --minutes : minutes;
                        if (minutes < 0) { clearInterval(interval); $('#timer_countdown').hide(); location.reload(); }
                        seconds = (seconds < 0) ? 59 : seconds;
                        seconds = (seconds < 10) ? '0' + seconds : seconds;
                        //minutes = (minutes < 10) ?  minutes : minutes;
                        $('#timer_countdown').html(minutes + ':' + seconds);
                        htmlTimer = minutes + ':' + seconds;
                    }, 1000);

                    ga('send', 'event', 'Login and Signup', 'Login_BlockAccount', 'Fail');
                    return;
                }
                common.getFormDescription(responseCode, 'formLogin');
                utils.unLoading();
                ga('send', 'event', 'Login and Signup', 'Login_BlockAccount', 'Fail');
                return;
            }
            else {
                common.getFormDescription(-999999, 'formLogin');
                ga('send', 'event', 'Login and Signup', 'Login', 'Fail');
            }
            utils.unLoading();
        };
        $("#formLogin #btLogin").addClass('disabled');
        utils.loading();
        utils.postData(utils.linkIdApi() + 'Account/Authentication', param, callback, callback);
    };

    this.LoginOTPView = function (accountName, otpToken) {
        utils.loading();
        $.get(utils.rootUrl() + 'Home/LoginOTP', { accountName: accountName }).done(function (data) {
            utils.unLoading();
            $('#tab-1').html(data);
            $('#form_login_otp #OTPLoginToken').val(otpToken);
        });
    };

    this.ConfirmLoginOTP = function () {
        if ($("#form_login_otp #btLoginOTp").hasClass('disabled')) {
            return;
        }
        utils.translateLang('common.register');
        $('.error-text, .success-text').text('');
        $('input').removeClass('error success');
        var otp = $('#login_otp').val().trim();
        if (!otp) {
            $('#login_otp').addClass('error');
            $('#login_otp').parent().find('.error-text').text(i18n.t('message.otpEmpty'));
            $('#login_otp').focus();
            return;
        }

        var token = $('#form_login_otp #OTPLoginToken').val();
        if (!token) {
            $('#login_otp').addClass('error');
            $('#login_otp').parent().find('.error-text').text(i18n.t('message.otpTokenEmpty'));
            return;
        }

        var param = {
            Otp: otp,
            OtpToken: token,
            OtpType: 1
        };

        var callback = function (data) {
            $("#form_login_otp #btLoginOTp").removeClass('disabled');
            if (typeof data === "object") {
                //Sang trang kich hoat
                if (data.c >= 0) {
                    //tk chua kich hoat thi sang form kh
                    if (data.d && data.d.Status === 0) {
                        register.ActiveAccountView(accountName, data.d.Email, '#tab-1');
                        utils.unLoading();
                        ga('send', 'event', 'Login and Signup', 'Login_NotActive', 'Fail');
                        return;
                    }
                    else {
                        var returnAction = utils.getParameterByName('return');
                        if (returnAction === 'topup')
                            window.location.href = utils.rootUrl() + 'nap-tien';
                        else if (returnAction === 'cashout')
                            window.location.href = utils.rootUrl() + 'rut-tien';
                        else if (returnAction === 'transfer')
                            window.location.href = utils.rootUrl() + 'chuyen-tien';
                        else
                            window.location.href = utils.rootUrl() + 'thong-tin';

                        ga('send', 'event', 'Login and Signup', 'Login_OTP', (returnAction != "" && returnAction != null) ? 'Success_Direct_' + returnAction : "Success");
                    }
                    return;
                }
                else if (data.c === -49) {
                    register.ActiveAccountView(accountName, null, '#tab-1'); utils.unLoading();
                    ga('send', 'event', 'Login and Signup', 'Login_NotActive', 'Fail'); return;
                }
                common.saveLog(data, 'login_otp');
                utils.unLoading();
                $('#notification_modal #modal_content').text(common.getDescription(data.c));
                $('#notification_modal').modal('open');
                ga('send', 'event', 'Login and Signup', 'Login_OTP', 'Fail');
            }
            else if (utils.checkResponseIsValid(data)) {
                console.log(data);
            }
            common.saveLog(data, 'login_otp');
            $('#notification_modal #modal_content').text(common.getDescription(-999999));
            ga('send', 'event', 'Login and Signup', 'Login_OTP', 'Fail');
        };
        $("#form_login_otp #btLoginOTp").addClass('disabled');
        utils.loading();
        utils.postData(utils.linkIdApi() + 'Account/CheckOTP', param, callback, callback);
    };

    this.Signout = function () {
        var lang = utils.getCurrentLanguage();
        var header = "Thông báo";
        var content = "Bạn có muốn đăng xuất khỏi ví điện tử Pay365 từ thiết bị này không ?";
        var btnContinue = "Đăng xuất";
        var btnClode = "Hủy";
        if (lang === 'en') {
            header = "Notification";
            content = "You want to logout ?";
            btnContinue = "Logout";
            btnClode = "Close";
        }

        ModalPopupShow('danger', header, content, btnClode, btnContinue, function () {
            $('#modal_notification_result').modal("close");
        }, function () {
            utils.getData(utils.linkIdApi() + "Account/LogOut", {}, function (data) {
                ga('send', 'event', 'Login and Signup', 'LogOut', 'Success');
                if (data.c >= 0)
                    window.location.href = utils.rootUrl();
            }, function (err) {
                console.log(err);
                window.location.href = utils.rootUrl();
            });
        });
    };
};
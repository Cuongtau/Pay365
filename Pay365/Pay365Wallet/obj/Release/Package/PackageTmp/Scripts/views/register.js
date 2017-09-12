register = new function () {
    this.ConfirmRegister = function () {
        if ($("#form_register #btRegister").hasClass('disabled')) {
            return;
        }
        utils.translateLang('common.register');
        $('.error-text, .success-text').text('');
        $('input, .input-radio').removeClass('error success');
        $('.p-error-text').remove();

        var accountName = $('#reg_account_name').val().trim();
        if (!accountName) {
            $('#reg_account_name').addClass('error');
            $('#reg_account_name').parent().find('.error-text').text(i18n.t('message.usernameEmpty'));
            $('#reg_account_name').focus();
            return;
        }

        if (!utils.checkVNPhoneNumber(accountName)) {
            $('#reg_account_name').addClass('error').parent().find('.error-text').text(i18n.t('message.usernameIllegal'));
            $('#reg_account_name').focus();
            return;
        }

        var password = $('#reg_password').val().trim();
        if (!password) {
            $('#reg_password').addClass('error').parent().find('.error-text').text(i18n.t('message.passwordEmpty'));
            $('#reg_password').focus();
            return;
        }

        if (password.length < 6 || password.length > 18) {
            $('#reg_password').addClass('error').parent().find('.error-text').text(i18n.t('message.passwordLengthInvalid'));
            $('#reg_password').focus();
            return;
        }

        if (utils.validatePassword(password)) {
            $('#reg_password').addClass('error').parent().find('.error-text').text(i18n.t('message.passwordContainInvalid'));
            $('#reg_password').focus();
            return;
        }

        var repassword = $('#reg_repassword').val().trim();
        if (!repassword) {
            $('#reg_repassword').addClass('error').parent().find('.error-text').text(i18n.t('message.repasswordEmpty'));
            $('#reg_repassword').focus();
            return;
        }

        if (repassword !== password) {
            $('#reg_repassword').addClass('error').parent().find('.error-text').text(i18n.t('message.repasswordIncorrect'));
            $('#reg_repassword').focus();
            return;
        }

        var fullname = $('#reg_fullname').val().trim();
        if (!fullname) {
            $('#reg_fullname').addClass('error').parent().find('.error-text').text(i18n.t('message.fullnameEmpty'));
            $('#reg_fullname').focus();
            return;
        }
        var email = $('#reg_email').val().trim();
        if (!email) {
            $('#reg_email').addClass('error').parent().find('.error-text').text(i18n.t('message.emailEmpty'));
            $('#reg_email').focus();
            return;
        }

        if (!utils.validateEmail(email)) {
            $('#reg_email').addClass('error').parent().find('.error-text').text(i18n.t('message.emailIllegal'));
            $('#reg_email').focus();
            return;
        }

        var dob = $('#reg_birth').val().trim();

        if (!dob) {
            $('#reg_birth').addClass('error').parent().find('.error-text').text(i18n.t('message.dobEmpty'));
            $('#reg_birth').focus();
            return;
        }

        var momentDob = moment(dob + ' 23:59:59', "DD/MM/YYYY HH:mm:ss", true);
        if (!momentDob.isValid()) {
            $('#reg_birth').addClass('error').parent().find('.error-text').text(i18n.t('message.dobIllegal'));
            $('#reg_birth').focus();
            return;
        }

        if (momentDob._d >= moment(new Date())._d) {
            $('#reg_birth').addClass('error').parent().find('.error-text').text(i18n.t('message.dobIllegal'));
            $('#reg_birth').focus();
            return;
        }

        var gender = $("input:radio[name='reg_gerne']:checked").val();
        if (!gender) {
            $('#group_gerne').addClass('error').parent().find('.error-text').text(i18n.t('message.genderEmpty'));
            return;
        }
        var captcha = $('#reg_captcha').val().trim();
        if (!captcha) {
            $('#reg_captcha').addClass('error').parent().find('.error-text').text(i18n.t('message.captchaEmpty'));
            $('#reg_captcha').focus();
            return;
        }

        if (!$('#reg_term').is(':checked')) {
            $('#notification_modal #modal_content').text(i18n.t('message.termsUncheck'));
            $('#notification_modal').modal('open');
            return;
        }

        var param = {
            PhoneNumber: accountName,
            Password: password,
            FullName: fullname,
            Email: email,
            BirthDate: dob,
            Gender: gender,
            Captcha: captcha,
            verifyCaptcha: $('#form_register #inputToken').val(),
            culture: utils.getCurrentLanguage() === 'en' ? 'en' : 'vi'
        };

        var callback = function (data) {
            $("#form_register #btRegister").removeClass('disabled');
            utils.unLoading();
            common.saveLog(data, accountName);
            if (typeof data === "object") {
                //Sang trang kich hoat
                if (data.c === 0) {
                    register.ActiveAccountView(accountName, email);

                    ga('send', 'event', 'Login and Signup', 'Register', 'Success');
                    return;
                }                
                common.getFormDescription(data.c, 'form_register');
            }
            else if (utils.checkResponseIsValid(data)) {               
                var responseCode = JSON.parse(data).c;
                common.getFormDescription(responseCode, 'form_register');
            }
            else
                common.getFormDescription(-999999, 'form_register');

            ga('send', 'event', 'Login and Signup', 'Register', 'Fail');
            utils.refreshCaptcha('form_register');
            $('#reg_captcha').val('');
        };

        $("#form_register #btRegister").addClass('disabled');
        utils.loading();
        utils.postData(utils.linkIdApi() + 'Account/RegisterAccount', param, callback, callback);
    }

    this.ActiveAccountView = function (accountName, email, parentID) {
        parentID = !parentID ? '#tab-2' : parentID;
        utils.loading();
        $.get(utils.rootUrl() + 'Register/ActiveAccount', { accountName: accountName, email: email }).done(function (data) {
            utils.unLoading();
            $(parentID).html(data);
            ga('send', 'pageview', 'active-account');
        });
    }

    this.ConfirmActiveAccount = function () {
        if ($("#form_active_account #btActiveAccount").hasClass('disabled')) {
            return;
        }

        utils.translateLang('common.register');
        $('.error-text, .success-text').text('');
        $('input').removeClass('error success');
        $('.p-error-text').remove();

        var activeCode = $('#form_active_account #active_code').val().trim();
        if (!activeCode) {
            $('#active_code').addClass('error');
            $('#active_code').parent().find('.error-text').text(i18n.t('message.activecodeEmpty'));
            $('#active_code').focus();
            return;
        };

        var param = {
            Otp: activeCode
        };
        var callback = function (data) {
            $('#form_active_account #btActiveAccount').removeClass('disabled');
            utils.unLoading();
            common.saveLog(data, 'active_account');
            if (typeof data === "object") {
                //Sang trang chu ben trong
                if (data.c >= 0) {
                    window.location.href = utils.rootUrl() + 'thong-tin';

                    ga('send', 'event', 'Login and Signup', 'Register_Active', 'Success');
                    return;
                }               
                common.getFormDescription(data.c, 'form_active_account');
            }
            else if (utils.checkResponseIsValid(data)) {
                var responseCode = JSON.parse(data).c;
                common.getFormDescription(responseCode, 'form_active_account');
                ga('send', 'event', 'Login and Signup', 'Register_Active', 'Fail');
                return;
            }
            else
                common.getFormDescription(-999999, 'form_active_account');

            ga('send', 'event', 'Login and Signup', 'Register_Active', 'Fail');
        }

        $('#form_active_account #btActiveAccount').addClass('disabled');
        utils.loading();
        utils.postData(utils.linkIdApi() + 'Account/ActiveAccount', param, callback, callback);
    };

    this.ResendActiveCode = function (email) {
        if (cacheJS.get({ email: email, type: 'active' })) {
            $('#modal-alert #modal_content').text(utils.getCurrentLanguage() === 'en' ? 'Time between 2 re-send activation code is minimum 60s' : 'Khoảng cách giữa 2 lần gửi lại mã kích hoạt tối thiểu là 60s');
            $('#modal-alert').modal('open');
            return;
        }
        var culture = utils.getCurrentLanguage();
        var callback = function (data) {
            utils.unLoading();
            if (data.c >= 0) {
                if (culture === 'en') {
                    $('#modal-alert #modal_content').text('Resend active code successfully');
                    $('#active_notify').text(!email
                        ? 'An activation code has been sent to your email'
                        : ('An activation code has been sent to email: ' + email));
                } else {
                    $('#modal-alert #modal_content').text('Nhận lại mã kích hoạt thành công');
                    $('#active_notify').text(!email
                        ? 'Một mã kích hoạt đã được gửi đến email của bạn'
                        : ('Một mã kích hoạt đã được gửi đến email: ' + email));
                }
                $('#modal-alert').modal('open');
                if (email)
                    cacheJS.set({ email: email, type: 'active' }, 'resend', 60, null);

                ga('send', 'event', 'Login and Signup', 'Register_ResendActiveCode', 'Success');
            }
            else {
                common.saveLog(data, ('resend_active_code_' + email));
            }
        };

        var callbackFail = function (data) {
            common.saveLog(data, ('resend_active_code_' + email));
            utils.unLoading();
            if (typeof data === "object") {
                var responseCode = data.c;
                $('#modal-alert #modal_content').text(common.getDescription(responseCode));
                $('#modal-alert').modal('open');
            }
            else if (utils.checkResponseIsValid(data)) {
                var responseCode = JSON.parse(data).c;
                $('#modal-alert #modal_content').text(common.getDescription(responseCode));
                $('#modal-alert').modal('open');
            }
            else {
                $('#modal-alert #modal_content').text(common.getDescription(-999999));
                $('#modal-alert').modal('open');
            }
            ga('send', 'event', 'Login and Signup', 'Register_ResendActiveCode', 'Fail');
        };
        utils.loading();
        utils.postData(utils.linkIdApi() + 'Account/ReSendOTPActive', { culture: culture }, callback, callbackFail);
    };
};
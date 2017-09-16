common = new function () {
    this.getDescription = function (c) {
        utils.translateLang('common.errorcode');
        var description = "";
        switch (c) {
            case 0:
                description = i18n.t('Error.DONE');
                break;
            case -1:
                description = i18n.t('Error.ACCOUNT_NOTEXISTED');
                break;
            case -2:
                description = i18n.t('Error.NOT_PERMISSION');
                break;
            case -6:
                description = i18n.t('Error.OTP_EXPIRE');
                break;
            case -7:
                description = i18n.t('Error.OTP_INVALID');
                break;
            case -13:
                description = i18n.t('Error.CARDS_NOT_ENOUGH');
                break;
            case - 19:
                description = i18n.t('Error.TRANSACTION_PROCESSING');
                break;
            case -33:
                description = i18n.t('Error.ACCOUNT_UNACTIVE');
                break;
            case -41:
                description = i18n.t('Error.EMAIL_EXISTED');
                break;
            case -42:
                description = i18n.t('Error.EMAIL_NOTFOUND');
                break;
            case -46:
                description = i18n.t('Error.ACCOUNT_EXISTED');
                break;
            case -48:
                description = i18n.t('Error.ACCOUNT_BLOCKED');
                break;
            case -49:
                description = i18n.t('Error.ACCOUNT_ISNOTACCTIVE');
                break;
            case -50:
                description = i18n.t('Error.ACCOUNT_NOTFOUND');
                break;
            case -51:
                description = i18n.t('Error.NOT_ENOUGH_MONEY_CORE');
                break;
            case -53:
                description = i18n.t('Error.INVALID_PASSWORD');
                break;
            case -111:
                description = i18n.t('Error.OTPINVALID_OR_USED');
                break;
            case -144:
                description = i18n.t('Error.STATUS_INVALID');
                break;
            case -600:
                description = i18n.t('Error.INPUT_DATA_INVALID');
                break;
            case -611:
                description = i18n.t('Error.EMAIL_ACTIVED');
                break;
            case -612:
                description = i18n.t('Error.MOBILE_ACTIVED');
                break;
            case -613:
                description = i18n.t('Error.OLDPASSWORD_NOTFOUND');
                break;
            case -628:
                description = i18n.t('Error.C_EMAIL_NOT_VERIFY');
                break;
            case -631:
                description = i18n.t('Error.ACCOUNT_NOT_LOCK');
                break;
            case -632:
                description = i18n.t('Error.SEND_OTP_MAX');
                break;
            case -641:
                description = i18n.t('Error.MOBILE_EXISTED');
                break;
            case -642:
                description = i18n.t('Error.MOBILE_NOTFOUND');
                break;
            case -654:
                description = i18n.t('Error.OLDMOBILE_INVALID');
                break;
            case -657:
                description = i18n.t('Error.DUPLICATE_DATA');
                break;
            case -663:
                description = i18n.t('Error.UNLOCK_DENIED');
                break;
            case -10001:
                description = i18n.t('Error.NOT_LOGIN');
                break;
            case -10002:
                description = i18n.t('Error.EXPIRED_SESSION');
                break;
            case -10003:
                description = i18n.t('Error.CAPTCHA_INVALID');
                break;
            case -10004:
                description = i18n.t('Error.USERNAME_REQUIRED');
                break;
            case -10005:
                description = i18n.t('Error.USERNAME_LENGTH');
                break;
            case -10006:
                description = i18n.t('Error.PASSWORD_REQUIRED');
                break;
            case -10007:
                description = i18n.t('Error.PASSWORD_LENGTH');
                break;
            case -10008:
                description = i18n.t('Error.INVALID_DATA');
                break;
            case -10009:
                description = i18n.t('Error.CAPTCHA_REQUIRED');
                break;
            case -10010:
                description = i18n.t('Error.BLOCK_ACCOUNT');
                break;
            case -10011:
                description = i18n.t('Error.FAILED_LOGIN');
                break;
            case -10012:
                description = i18n.t('Error.LOGININFO_EXPRIZE');
                break;
            case -10013:
                description = i18n.t('Error.BLOCK_IP');
                break;
            case -10014:
                description = i18n.t('Error.BLOCKED_IP');
                break;
            case -10015:
                description = i18n.t('Error.INVALID_OTP');
                break;
            case -10016:
                description = i18n.t('Error.ACCESS_DENIED');
                break;
            case -10018:
                description = i18n.t('Error.TOKEN_INVALID');
                break;
            case -10021:
                description = i18n.t('Error.OTP_REQUIRED');
                break;
            case -10022:
                description = i18n.t('Error.SYSTEM_TIMEOUT');
                break;
            case -10023:
                description = i18n.t('Error.USERNAMEORPASSWORD_INVALID');
                break;
            case -10024:
                description = i18n.t('Error.REPASSWORD_INVALID');
                break;
            case -10025:
                description = i18n.t('Error.TERMSOFUSE_AGGREE_INVALID');
                break;
            case -10026:
                description = i18n.t('Error.PASSWORD_NOT_CONTAINT_USERNAME');
                break;
            case -10027:
                description = i18n.t('Error.PASSWORD_NOT_IN_USERNAME');
                break;
            case -10028:
                description = i18n.t('Error.USERNAME_INVALID_KEY');
                break;
            case -10029:
                description = i18n.t('Error.SYSTEM_EXCEPTION');
                break;
            case -10030:
                description = i18n.t('Error.IP_REGISTER_MAX');
                break;
            case -10031:
                description = i18n.t('Error.REGISTER_SUCCESS_NONE_LOGIN');
                break;
            case -10032:
                description = i18n.t('Error.REGISTER_FAILED');
                break;
            case -10034:
                description = i18n.t('Error.PASSPORT_INVALID');
                break;
            case -10035:
                description = i18n.t('Error.PASSPORT_CREATED');
                break;
            case -10037:
                description = i18n.t('Error.MOBILE_CREATED');
                break;
            case -10038:
                description = i18n.t('Error.EMAIL_CREATED');
                break;
            case -10040:
                description = i18n.t('Error.OLDEMAIL_DUBLICATE_NEWEMAIL');
                break;
            case -10041:
                description = i18n.t('Error.OLDMOBILE_DUBLICATE_NEWMOBILE');
                break;
            case -10046:
                description = i18n.t('Error.EMAIL_INVALID');
                break;
            case -10047:
                description = i18n.t('Error.MOBILE_INVALID');
                break;
            case -10048:
                description = i18n.t('Error.PASSWORD_NOT_STRONG');
                break;
            case -10049:
                description = i18n.t('Error.ACCOUNT_NOTREG_SECURITY_EMAIL');
                break;
            case -10050:
                description = i18n.t('Error.ACCOUNT_NOTREG_SECURITY_MOBILE');
                break;
            case -10051:
                description = i18n.t('Error.NOT_ENOUGH_MONEY_PAYMENT');
                break;
            case -10052:
                description = i18n.t('Error.SECURITY_NOT_REGISTER');
                break;
            case -10054:
                description = i18n.t('Error.CARDTYPE_REQUIRET');
                break;
            case -10055:
                description = i18n.t('Error.CARDCODE_NOTEXISTED_OR_USED');
                break;
            case -10056:
                description = i18n.t('Error.TRANSACTION_FAILED');
                break;
            case -10057:
                description = i18n.t('Error.CARD_USED');
                break;
            case -10058:
                description = i18n.t('Error.CARD_BLOCKED');
                break;
            case -10059:
                description = i18n.t('Error.CARD_EXPRIZED');
                break;
            case -10100:
                description = i18n.t('Error.CARD_NOT_ACTIVE');
                break;
            case -10101:
                description = i18n.t('Error.CARDSERI_OR_CARDCODE_INVALID');
                break;
            case -10102:
                description = i18n.t('Error.PRIZEVALUE_BETWEEN_MIN_MAX');
                break;
            case -10103:
                description = i18n.t('Error.CARD_INVALID');
                break;
            case -10104:
                description = i18n.t('Error.CARD_NOT_REGISTER_INTERNETBAMKING');
                break;
            case -10105:
                description = i18n.t('Error.MAX_OTP_FAILED');
                break;
            case -10106:
                description = i18n.t('Error.CANNOT_CONNECTTO_SERVER');
                break;
            case -10107:
                description = i18n.t('Error.CONNECT_SERVER_ERROR');
                break;
            case -10108:
                description = i18n.t('Error.CARD_AMOUNT_REQUIRED');
                break;
            case -10109:
                description = i18n.t('Error.ACCOUNT_NOT_REGISTER_SMSBANKING');
                break;
            case -10110:
                description = i18n.t('Error.TIME_SMSBANKING_ACTIVE');
                break;
            case -10111:
                description = i18n.t('Error.ORDER_INFO_EXPRIZE');
                break;
            case -10112:
                description = i18n.t('Error.ACCOUNT_NOT_REGISTER_APP_OTP');
                break;
            case -10113:
                description = i18n.t('Error.AMOUNT_MONEY_LOCK_REQUIRED');
                break;
            case -10114:
                description = i18n.t('Error.AMOUNT_MONEY_UNLOCK_REQUIRED');
                break;
            case -10115:
                description = i18n.t('Error.CARD_PRIZE_INVALID');
                break;
            case -10116:
                description = i18n.t('Error.RENICKNAME_INVALID');
                break;
            case -10117:
                description = i18n.t('Error.TRANSFER_REASON_REQUIRED');
                break;
            case -10118:
                description = i18n.t('Error.TRANSFER_PRIZE_MIN');
                break;
            case -10119:
                description = i18n.t('Error.AUTHEN_SOCIAL_FAILED');
                break;
            case -10130:
                description = i18n.t('Error.BIRTH_DATE_INVALID');
                break;
            case -10131:
                description = i18n.t('Error.FULLNAME_INVALID');
                break;
            case -10132:
                description = i18n.t('Error.ACCOUNT_NOTACTIVE');
                break;
            case -10133:
                description = i18n.t('Error.ACCOUNT_ACTIVED');
                break;
            case -10136:
                description = i18n.t('Error.EMAIL_OVER_SEND');
                break;
            case -10137:
                description = i18n.t('Error.EMAIL_NOT_VERIFY');
                break;
            case -10138:
                description = i18n.t('Error.USERNAME_INVALID');
                break;
            case -10141:
                description = i18n.t('Error.PRIZEVALUE_ZERO');
                break;
            case -10142:
                description = i18n.t('Error.PRIZEVALUE_INVALID');
                break;
            case -10143:
                description = i18n.t('Error.NOTTRANSFERTO_SELF');
                break;
            case -10144:
                description = i18n.t('Error.SECURITYTYPE_INVALID');
                break;
            case -10145:
                description = i18n.t('Error.MIN_AMOUNT_INVALID');
                break;
            case -10146:
                description = i18n.t('Error.IMAGE_INVALID');
                break;
            case -10147:
                description = i18n.t('Error.IMAGE_INVALID');
                break;
            case -10148:
                description = i18n.t('Error.SECURITY_OTP_REQUIRED');
                break;
            case -10149:
                description = i18n.t('Error.NOT_FOUND_EMAIL_CONTENT');
                break;
            case -10150:
                description = i18n.t('Error.ACCOUNT_NOT_REGISTER_SECURITY');
                break;
            case -10152:
                description = i18n.t('Error.HISTORY_DATA_NOTEXIST');
                break;
            case -10153:
                description = i18n.t('Error.MIN_AMOUNT_OVER_VALUE');
                break;
            case -10155:
                description = i18n.t('Error.NOTTRANSFER_YOURSEFT');
                break;
            case -10156:
                description = i18n.t('Error.MAX_AMOUNT_OUTOF_RANGER');
                break;
            case -10157:
                description = i18n.t('Error.ACCOUNT_UNVERIFY');//Tài khoản chưa chứng thực ko thể rút tiền
                break;
            case -20016:
                description = i18n.t('Error.NOT_ENOUGH_MONEY');
                break;
            case -100027:
                description = i18n.t('Error.BANKACCOUNT_NOTEXISTED');
                break;
            case -100101:
                description = i18n.t('Error.PAYMENT_FAIL');
                break;
            case -100200:
                description = i18n.t('Error.PAYMENT_RECEIACCOUNT_NOT_EXITED');
                break;
            case -100300:
                description = i18n.t('Error.PAYMENT_RECEIACCOUNT_NOT_SUPPORT');
                break;
            case -99:
                description = i18n.t('Error.SYSTEM_ERROR');
                break;
            default:
                description = i18n.t('Error.DEFAULT');
                break;
        }
        return description;
    };

    //ThangNN: hien thi desc va focus vao elm theo formID, input class
    this.getFormDescription = function (c, formID) {
        var description = this.getDescription(c);
        var hasElement = true;
        formID = formID.indexOf('#') !== -1 ? formID : ('#' + formID);
        var $formID = $(formID);
        $formID.remove('.p-error-text');
        switch (c) {
            //captcha error
            case -10003:
            case -10009:
                var $captcha = $formID.find('.captcha-focus');
                hasElement = $captcha.length !== 0 ? true : false;
                $captcha.addClass('error');
                $captcha.parent().find('.error-text').text(description);
                $captcha.focus();
                break;
            //Username err
            case -10004:
            case -10005:
            case -10138:
            case -10023:
            case -10028:
            case -10043:
            case -50:
            case -46:
            case -48:
            case -49:
            case -1:
                var $user = $formID.find('.user-focus');
                hasElement = $user.length !== 0 ? true : false;
                $user.addClass('error');
                $user.parent().find('.error-text').text(description);
                $user.focus();
                break;
            //Password err
            case -10006:
            case -53:
            case -10007:
            case -10026:
            case -10027:
            case -10048:
                var $pw = $formID.find('.password-focus');
                hasElement = $pw.length !== 0 ? true : false;
                $pw.addClass('error');
                $pw.parent().find('.error-text').text(description);
                $pw.focus();
                break;
            //Re password err
            case -10024:
                var $repw = $formID.find('.repassword-focus');
                hasElement = $repw.length !== 0 ? true : false;
                $repw.addClass('error');
                $repw.parent().find('.error-text').text(description);
                $repw.focus();
                break;
            //Fullname err
            case -10131:
                var $fullname = $formID.find('.fullname-focus');
                hasElement = $fullname.length !== 0 ? true : false;
                $fullname.addClass('error');
                $fullname.parent().find('.error-text').text(description);
                $fullname.focus();
                break;
            //Email err
            case -10038:
            case -10046:
            case -10136:
            case -10137:
            case -41:
            case -42:
            case -611:
                var $email = $formID.find('.email-focus');
                hasElement = $email.length !== 0 ? true : false;
                $email.addClass('error');
                $email.parent().find('.error-text').text(description);
                $email.focus();
                break;
            //OTP err
            case -6:
            case -7:
            case -111:
            case -10021:
            case -10015:
                var $otp = $formID.find('.otp-focus');
                hasElement = $otp.length !== 0 ? true : false;
                $otp.addClass('error');
                $otp.parent().find('.error-text').text(description);
                $otp.focus();
                break;
            //Amount err
            case -10156://Số tiền vượt quá hạn mức
                var $amount = $formID.find('.amount-focus');
                hasElement = $amount.length !== 0 ? true : false;
                $amount.addClass('error');
                if (formID.indexOf('cashout') !== -1)
                    $amount.parent().find('.error-text').text(utils.formatString(description, '10.000.000 VNĐ'));
                else
                    $amount.parent().find('.error-text').text(utils.formatString(description, ''));
                $amount.focus();
                break;
            default:
                hasElement = false;
        }

        if (!hasElement) {
            if ($formID.find('.p-error-text').length !== 0)
                $formID.find('.p-error-text').text(description);
            else
                $("<p class = 'p-error-text'>" + description + "</p>").insertBefore($formID.find('.form-group:first'));
        }
    }

    this.CheckAuthenticated = function (callback, failCallback, is_async) {
        utils.getData(utils.linkIdApi() + 'Account/CheckAuthenticated', null, callback, failCallback, "", is_async);
    };

    this.GetAccountByUserName = function (userName, callback) {
        if (!userName) return;
        utils.getData(utils.trasactionApi() + 'payment/GetAccountInfo',
            { username: userName },
            function (data) {
                if (data.c >= 0) {
                    if (typeof callback === 'function')
                        callback(data.c, data.p);
                    return;
                }
                callback(-1);

            },
            function (err) {
                console.log(err);
                callback(-1);
            },
            null);
    };

    this.phoneNumberNetwork = function (phoneNumber, callback, isAsynch) {
        if (!phoneNumber) return false;
        return utils.postData(utils.linkIdApi() + 'Account/CheckPhoneInNetwork', { PhoneNumber: phoneNumber }, callback, callback, null, !isAsynch ? false : true);
    };

    this.saveLog = function(error, userName) {
        if (!userName && (!header || !header.AccountInfo || header.AccountInfo.AccountID <= 0)) return;
        if (typeof error === "object")
            error = JSON.stringify(error);
        var logInfo = (!userName ? header.AccountInfo.Username : userName) + '|error: ' + error + '|function: ' + window.location.href;
        $.get(utils.rootUrl() + 'Common/SaveClientLog', { log: logInfo}).done(function () {});
    };

    this.logOut = function () {
        utils.getData(utils.linkIdApi() + 'Account/Logout', null, function () {

            ga('send', 'event', 'Login and Signup', 'LogOut', 'Success');
            location.href = utils.rootUrl();
        });
    };

    this.guideConfig = { FAQ: 11, ACCOUNT: 13, WALLET: 14, SHOPPING: 15, SEARCHGUIDE: '11,13,14,15' };

    this.NewsConfig = {
        ALL_CATE: "10"
    };

    this.transactionService = {
        TopupTelco: 1,//nạp tiền trả trước
        TopupTelcoFromBank: 2,// nạp tiền trả trước từ ngân hàng
        TopupTelcoAfter: 3,//Nạp tiền trả sau
        TopupTelcoAfterFromBank: 4,//Nạp tiền trả sau từ ngân hàng,
        TopupGame: 5,//Nạp tài khoản game,
        BuyCard: 6,//Mua mã thẻ
        BankTopup: 7,// nạp tiền từ ngân hàng
        WithdrawalOffline: 8,//rút tiền offline
        WithdrawalOnline: 9,// rút tiền online,
        TransferBankCard: 10,//Chuyển tiền từ thẻ ngân hàng
        TransferCreditCard: 11,//Chuyển tiền từ thẻ quốc tế
        Cashin: 7,
        TransferMoney: 12
    };

    this.bankTopupConfig =
    [
        {
            "BankCode": "VCB",
            "BankName": "Vietcombank",
            "BankFullName": "Ngân hàng TMCP Ngoại Thương Việt Nam",
            "BankFullNameEN": "Bank for Foreign Trade of Vietnam"
        },
        {
            "BankCode": "TCB",
            "BankName": "Techcombank",
            "BankFullName": "Ngân hàng TMCP Kỹ thương Việt Nam",
            "BankFullNameEN": "Vietnam Technological and Joint Stock Commercial Bank"
        },
        {
            "BankCode": "VIB",
            "BankName": "VIB Bank",
            "BankFullName": "Ngân hàng TMCP Quốc tế",
            "BankFullNameEN": "Vietnam International Joint Stock Commercial Bank"
        },
        {
            "BankCode": "ABB",
            "BankName": "ABBank",
            "BankFullName": "Ngân hàng TMCP An Bình",
            "BankFullNameEN": "An Binh Joint Stock Commercial Bank"
        },
        {
            "BankCode": "STB",
            "BankName": "Sacombank",
            "BankFullName": "Ngân hàng TMCP Sài Gòn Thương Tín",
            "BankFullNameEN": "Saigon Thuong Tin Joint Stock Commercial Bank"
        },
        {
            "BankCode": "NVB",
            "BankName": "Navibank",
            "BankFullName": "Ngân hàng TMCP Quốc dân",
            "BankFullNameEN": "National Citizen Joint Stock Commercial Bank"
        },
        {
            "BankCode": "CTG",
            "BankName": "Vietinbank",
            "BankFullName": "Ngân hàng TMCP Công thương Việt Nam",
            "BankFullNameEN": "Vietnam Joint Stock Commercial Bank for Industry and Trade"
        },
        {
            "BankCode": "DAB",
            "BankName": "DongABank",
            "BankFullName": "Ngân hàng TMCP Đông Á",
            "BankFullNameEN": "DongA Joint Stock Commercial Bank"
        },
        {
            "BankCode": "HDB",
            "BankName": "HDBank",
            "BankFullName": "Ngân hàng TMCP Phát triển Nhà TP.HCM",
            "BankFullNameEN": "Ho Chi Minh Development Joint Stock Commercial Bank"
        },
        {
            "BankCode": "VAB",
            "BankName": "VietABank",
            "BankFullName": "Ngân hàng TMCP Việt Á",
            "BankFullNameEN": "Viet A Joint Stock Commercial Bank"
        },
        {
            "BankCode": "VPB",
            "BankName": "VPBank",
            "BankFullName": "Ngân hàng TMCP Việt Nam Thịnh Vượng",
            "BankFullNameEN": "Vietnam Prosperity Joint Stock Commercial Bank"
        },
        {
            "BankCode": "ACB",
            "BankName": "ACB",
            "BankFullName": "Ngân hàng TMCP Á Châu",
            "BankFullNameEN": "Asia Commercial Bank"
        },
        {
            "BankCode": "GPB",
            "BankName": "GPBank",
            "BankFullName": "Ngân hàng TMCP Dầu Khí Toàn Cầu",
            "BankFullNameEN": "Saigon Bank For Industry and Trade"
        },
        {
            "BankCode": "EIB",
            "BankName": "Eximbank",
            "BankFullName": "Ngân hàng TMCP Xuất Nhập Khẩu Việt Nam",
            "BankFullNameEN": "Vietnam Commercial Joint Stock Export Import Bank"
        },
        {
            "BankCode": "OJB",
            "BankName": "OceanBank",
            "BankFullName": "Ngân hàng TM TNHH MTV Đại Dương",
            "BankFullNameEN": "Ocean Commercial One Member Limited Liability Bank"
        },
        {
            "BankCode": "NASB",
            "BankName": "BacABank",
            "BankFullName": "Ngân hàng TMCP Bắc Á",
            "BankFullNameEN": "Bac A  Joint Stock Commercial Bank"
        },
        {
            "BankCode": "OCB",
            "BankName": "OricomBank",
            "BankFullName": "Ngân hàng TMCP Phương Đông",
            "BankFullNameEN": "Orient Joint Stock Commercial Bank"
        },
        {
            "BankCode": "TPB",
            "BankName": "TPBank",
            "BankFullName": "Ngân hàng TMCP Tiên Phong",
            "BankFullNameEN": "Tien Phong Joint Stock Commercial Bank"
        },
        {
            "BankCode": "LPB",
            "BankName": "LienVietPostBank",
            "BankFullName": "Ngân hàng TMCP Bưu Điện Liên Việt",
            "BankFullNameEN": "LienViet Post Joint Stock Commercial Bank"
        },
        {
            "BankCode": "SEAB",
            "BankName": "Seabank",
            "BankFullName": "Ngân hàng TMCP Đông Nam Á",
            "BankFullNameEN": "Southeast Asia  Joint Stock Commercial Bank"
        },
        {
            "BankCode": "BIDV",
            "BankName": "BIDV",
            "BankFullName": "Ngân hàng TMCP Đầu tư và phát triển Việt Nam",
            "BankFullNameEN": "Bank for Investment and Development of Vietnam JSC"
        },
        {
            "BankCode": "VARB",
            "BankName": "AgriBank",
            "BankFullName": "Ngân hàng Nông nghiệp & Phát triển Nông thôn",
            "BankFullNameEN": "Vietnam Bank for Agriculture and Rural Development"
        },
        {
            "BankCode": "BVB",
            "BankName": "BaoVietBank",
            "BankFullName": "Ngân hàng TMCP Bảo Việt",
            "BankFullNameEN": "Bao Viet Joint Stock Commercial Bank"
        },
        {
            "BankCode": "SHB",
            "BankName": "SHB",
            "BankFullName": "Ngân hàng TMCP Sài Gòn - Hà Nội",
            "BankFullNameEN": "Saigon – Hanoi Joint Stock Commercial Bank"
        },
        {
            "BankCode": "KLB",
            "BankName": "KienLongBank",
            "BankFullName": "Ngân hàng TMCP Kiên Long",
            "BankFullNameEN": "Kien Long Joint Stock Commercial Bank"
        },
        {
            "BankCode": "SCB",
            "BankName": "SCB",
            "BankFullName": "Ngân hàng TMCP Sài Gòn",
            "BankFullNameEN": "Saigon Bank For Industry and Trade"
        },
        {
            "BankCode": "Visa",
            "BankName": "Visa Card",
            "BankFullName": "Visa Card",
            "BankFullNameEN": "Visa Card"
        },
        {
            "BankCode": "Mastercard",
            "BankName": "Master Card",
            "BankFullName": "Master Card",
            "BankFullNameEN": "Master Card"
        },
        {
            "BankCode": "Amex",
            "BankName": "American Express",
            "BankFullName": "American Express",
            "BankFullNameEN": "American Express"
        },
        {
            "BankCode": "JCB",
            "BankName": "JCB",
            "BankFullName": "JCB",
            "BankFullNameEN": "JCB"
        }
    ];

    this.getbankName = function (bankCode) {
        var arrayBank = this.bankTopupConfig;
        for (var i = 0, len = arrayBank.length; i < len; i++) {
            if (arrayBank[i].BankCode === bankCode) return arrayBank[i].BankName;
        }
        return bankCode;
    };

    this.getbankFullName = function (bankCode) {
        var arrayBank = this.bankTopupConfig;
        if (header.AccountInfo.CurrentLang === 'en') {
            for (var i = 0, len = arrayBank.length; i < len; i++) {
                if (arrayBank[i].BankCode === bankCode) return arrayBank[i].BankFullNameEN;
            }
        } else {
            for (var i = 0, len = arrayBank.length; i < len; i++) {
                if (arrayBank[i].BankCode === bankCode) return arrayBank[i].BankFullName;
            }
        }
        return bankCode;
    };
    this.serviceConfig = { BUYCARD: 210001, CASHOUT_OFF: 200002, CASHOUT_ONL: 200003, TRANSFER: 230001, RECEIVETRANSFER: 130001, TOPUPTELCOBEFORE: 210002, TOPUPTELCOAFTER: 210003, TOPUPBANK: 100003 };
    this.accountSecureConfig = { SMS: 1, EMAIL: 2, VOICE: 3, APP: 4 };
    this.accountStatus = { UNCER: 1, REQUEST: 2, CER: 3 }
};

jsExportExcel = new function () {
    // Test script to generate a file from JavaScript such
    // that MS Excel will honor non-ASCII characters.

    // Simple type mapping; dates can be hard
    // and I would prefer to simply use `datevalue`
    // ... you could even add the formula in here.

    this.emitXmlHeader = function (sampleData) {
        var headerRow = '<ss:Row>\n';
        for (var colName in sampleData) {
            headerRow += '  <ss:Cell>\n';
            headerRow += '    <ss:Data ss:Type="String">';
            headerRow += colName + '</ss:Data>\n';
            headerRow += '  </ss:Cell>\n';
        }
        headerRow += '</ss:Row>\n';
        return '<?xml version="1.0"?>\n' +
            '<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n' +
            '<ss:Worksheet ss:Name="Sheet1">\n' +
            '<ss:Table>\n\n' + headerRow;
    };

    this.emitXmlFooter = function () {
        return '\n</ss:Table>\n' +
            '</ss:Worksheet>\n' +
            '</ss:Workbook>\n';
    };

    this.jsonToSsXml = function (jsonObject) {
        var row;
        var col;
        var xml;
        var data = typeof jsonObject != "object" ? JSON.parse(jsonObject) : jsonObject;

        if (data.length === 0) return;

        xml = this.emitXmlHeader(data[0]);

        for (row = 0; row < data.length; row++) {
            xml += '<ss:Row>\n';

            for (col in data[row]) {
                xml += '  <ss:Cell>\n';
                xml += '    <ss:Data ss:Type="String">';
                xml += data[row][col] + '</ss:Data>\n';
                xml += '  </ss:Cell>\n';
            }

            xml += '</ss:Row>\n';
        }

        xml += this.emitXmlFooter();
        return xml;
    };

    this.download = function (content, filename, contentType, idDownload) {
        content = this.jsonToSsXml(content);
        if (!content) return;
        if (!contentType) contentType = 'application/octet-stream';
        var a = document.getElementById(idDownload);
        var blob = new Blob([content], {
            'type': contentType
        });
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
    };
    //callfunction: download(jsonToSsXml(testJson), 'test.xls', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
}
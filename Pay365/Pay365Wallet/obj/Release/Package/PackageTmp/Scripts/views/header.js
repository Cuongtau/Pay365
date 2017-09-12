
header = new function () {
    this.AccountInfo = {
        AccountID: 0,
        AccountType: 0,
        ActivatedTime: "0001-01-01T00:00:00",
        Avatar: null,
        Balance: 0,
        Birthday: null,
        CreatedTime: null,
        Email: "",
        EmailStatus: 0,
        Fullname: "",
        Gender: false,
        Job: null,
        LastChange: "0001-01-01T00:00:00",
        LocationID: 0,
        NationalID: 0,
        DistrictID: 0,
        OtpToken: null,
        Passport: null,
        PermanentAddress: null,
        Position: null,
        RemoteIP: null,
        ResidentialAddress: null,
        SourceID: 0,
        Status: 0,
        Username: "",
        MinAmount: 0,
        SecurityType: 0,
        National: {},
        Location: {},
        District: {}
    };

    this.SecureInfo = null;
    this.PageLoad = function () {
        // Local
        //window.isAuthenticate = 'true';
        //
        //common.CheckAuthenticated();
        //if (window.isAuthenticate.toLowerCase() === 'true') {
        //    header.getAccountInfo();
        //    header.SetTimeOut_Authenticate();
        //} else {
        //    window.location = utils.rootUrl() + 'login';
        //}
        
        utils.loading();
        common.CheckAuthenticated(function (data) {
            header.getAccountInfo();
            header.SetTimeOut_Authenticate();
        }, function (err) {
            utils.unLoading();
            if (utils.checkResponseIsValid(err)) {
                var responseCode = JSON.parse(err).c;
                switch (responseCode) {
                case -10001: // Chua dang nhap
                    window.location = utils.rootUrl() + 'dang-nhap';
                    break;
                case -10132:// Chua kich hoat, sang form kich hoat
                    window.location.href = utils.rootUrl() + 'active-account';
                    break;
                case -10021:// Chua nhap otp login -> sang form nhap otp
                    //device
                    break;
                default:
                    window.location = utils.rootUrl();
                    break;
                }
            }
        },false);
    };

    this.getAccountInfo = function () {
        utils.getData(utils.linkIdApi() + "Account/GetAccountInfo", {}, function (data) {
            utils.unLoading();
            header.AccountInfo = data.d;
            header.AccountInfo.CurrentLang = utils.getCurrentLanguage();
            header.BindTemp();
            $("#contentPage").show();
        }, function (err) {            
            utils.unLoading();
            console.log(err);
            window.location = utils.rootUrl() + 'dang-nhap';
        }, "", false);
    };

    this.getAccountSecureInfo = function () {
        utils.getData(utils.linkIdApi() + "Account/SecurityGetInfo", {}, function (data) {
            if (data != null && typeof data.d === 'object' && data.d.AccountID > 0) {
                header.AccountInfo.MinAmount = data.d.MinAmount;
                header.AccountInfo.SecurityType = data.d.SecurityType;
            }
        }, function (err) {
            utils.unLoading();
            console.log(err);
        }, "", false);
    };

    this.SetTimeOut_Authenticate = function () {
        var time = 2 * 60 * 1000;
        setInterval(function () {
            common.CheckAuthenticated(function (data) {
            },
                function (err) {
                    console.log(err);
                    if (utils.checkResponseIsValid(err)) {
                        var responseCode = JSON.parse(err).c;
                        switch (responseCode) {
                            case -10001: // Chua dang nhap
                                window.location = utils.rootUrl() + 'dang-nhap';
                                break;
                            default:
                                window.location = utils.rootUrl() + 'dang-nhap';
                                break;
                        }
                    }
                });
        }, time);
    };

    this.ClickBtnNotification = function () {

        var notifi_out = $('.notif-box').height();
        var notifi_in = $('.notif').parent().height();
        if (notifi_in < notifi_out) {
            $('.notif-box').height(notifi_in);
        }

        $(".notifications-section").parent().toggleClass("notifications-section-open");
        $("#overpage").toggleClass("overlay");
    };

    this.BindTemp = function () {
        $("#balance_t").html($("#balance_tmpl").tmpl(header.AccountInfo));  // header

        header.AccountInfo.Avatar = !header.AccountInfo.Avatar
            ? header.AccountInfo.Avatar
            : (header.AccountInfo.Avatar + '?v=' + new Date().getTime());

        $("#account_info_menuleft").html($("#account_info_tmpt_menuleft").tmpl(header.AccountInfo)); // menu left

        $("#account_info").html($("#account_info_tmpl").tmpl(header.AccountInfo)); // thong tin tk

        $("#acc_balance_t").html($("#acc_balance_tmpl").tmpl(header.AccountInfo));

        $("#acc_secure_t").html($("#acc_secure_tmpl").tmpl(header.AccountInfo));
       
        $("#avatar_t").html($("#avatar_tmpl").tmpl(header.AccountInfo)); // avatar

        $("#avatar_t_1").html($("#avatar_tmpl_1").tmpl(header.AccountInfo)); // avatar thong tin ( index )

        $("#acc_changeInfo_t").html($("#acc_changeInfo_tmpl").tmpl(header.AccountInfo)); // thay đổi thông tin cá nhân

        $("#acc_info_update_t").html($("#acc_info_update_tmpl").tmpl(header.AccountInfo)); // thay đổi thông tin cá nhân

        $("#mission_t").html($("#mission_tmpl").tmpl(header.AccountInfo)); /// mission

        $("#secure_info_t").html($("#secure_info_tmpl").tmpl(header.AccountInfo)); // Trang information

        setTimeout(function () {
            payMainLoad();
        }, 150);
    }
}

header.PageLoad();
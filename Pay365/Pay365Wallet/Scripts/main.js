window.main_init = {
    rootUrl: 'http://localhost:6886/',
    linkIdApi: 'http://id.alpha.pay365.vn/api/',
    profileApi: 'http://profile.alpha.pay365.vn/api/',
    checkLogin: function () {
        $.ajax({
            type: "GET",
            url: main_init.linkIdApi + 'Account/CheckAuthenticated',
            data: '',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            cache: false,
            crossDomain: true,
            async: false,
            xhrFields: { withCredentials: true },
            success: function (data) {
                window.location.href = main_init.rootUrl + 'information';
            }
        });
    },
};


   

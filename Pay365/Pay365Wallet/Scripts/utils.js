window.utils = {
    rootUrl: function () {
        //return '//alpha.pay365.vn/';
        return 'http://localhost:59869/';
    },
    linkIdApi: function () {
        return 'http://id.alpha.pay365.vn/api/';
    },
    linkNewApi: function () {
        return 'http://news.pay365.vn/api/';
    },

    profileApi: function () {
        return 'http://profile.alpha.pay365.vn/api/';
    },

    trasactionApi: function () {
        return 'http://payment.pay365.vn/api/';
    },
    

    translateLang: function (namespace) {
        //test i18n
        i18n.setDefaultNamespace(namespace); //set file resource để sử dụng cho view tương ứng
        $(".translang").i18n(); //dịch
    },

    convertUTFStr: function (str, separation) {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        separation = !separation ? "-" : separation;
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,
            separation);
        str = str.replace(/-+-/g, separation);
        str = str.replace(/^\-+|\-+$/g, "");
        return str;
    },

    showTooltip: function (clientid, text) {
        if ($('.tooltip').length <= 0) {
            $('#tooltip').html('<div class="tooltip"><div class="tool_cont">' + text + '</div></div>');
            var top = $('#' + clientid).offset().top;
            var left = $('#' + clientid).offset().left;
            $('#tooltip').css('top', (top + 20) + 'px');
            $('#tooltip').css('left', (left + 98) + 'px');
            $('#tooltip').css('position', 'absolute');
            $('#tooltip').css('z-index', '11');
            $('#tooltip').css('display', 'block');
        }
    },

    hideTooltip: function () {
        $('.tooltip').remove();
    },

    documentHeight: function () {
        return $(document).height();
    },

    documentWidth: function () {
        return $(document).width();
    },

    windowHeight: function () {
        return $(window).height();
    },

    windowWidth: function () {
        return $(window).width();
    },

    loading: function (idLoad) {
        this.unLoading();
        var html =
            '<div id = "LoadingContainer" class="loading"><div class="preloader-wrapper big active"><div class="spinner-layer spinner-blue"><div class="circle-clipper left">    <div class="circle"></div></div><div class="gap-patch">    <div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-red"><div class="circle-clipper left">    <div class="circle"></div></div><div class="gap-patch">    <div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-yellow"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-green"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div></div>';
        if (idLoad)
            $('#' + idLoad).append(html);
        else
            $('body').append(html);
    },

    unLoading: function () {
        $('#LoadingContainer').remove();
    },

    // Hàm lấy xâu định dạng theo kiểu tiền tệ: 1234123 --> 1.234.123
    formatMoney: function (argValue) {
        if (argValue == 0) return '0';
        var comma = (1 / 2 + '').charAt(1);
        var digit = ',';
        if (comma == '.') {
            digit = '.';
        }

        var sSign = "";
        if (argValue < 0) {
            sSign = "-";
            argValue = -argValue;
        }

        var sTemp = "" + argValue;
        var index = sTemp.indexOf(comma);
        var digitExt = "";
        if (index != -1) {
            digitExt = sTemp.substring(index + 1);
            sTemp = sTemp.substring(0, index);
        }

        var sReturn = "";
        while (sTemp.length > 3) {
            sReturn = digit + sTemp.substring(sTemp.length - 3) + sReturn;
            sTemp = sTemp.substring(0, sTemp.length - 3);
        }
        sReturn = sSign + sTemp + sReturn;
        if (digitExt.length > 0) {
            sReturn += comma + digitExt;
        }
        return sReturn;
    },

    // Hàm convert chuỗi json Datetime sang Date
    // value: chuỗi jSon datetime
    jSonToDate: function (value) {
        value = value.replace('/Date(', '');
        value = value.replace(')/', '');
        var expDate = new Date(parseInt(value));
        return expDate;
    },

    // Hàm convert chuỗi json Datetime sang chuối ngày tháng
    // value: chuỗi jSon datetime
    // option:
    //      0: dd/MM/yyyy hh:mm:ss
    //      1: dd/MM/yyyy
    //      2: hh:mm:ss dd/MM/yyyy
    //      3: yyyy/MM/dd hh:mm:ss
    //      5: hhmm
    jSonDateToString: function (value, option) {
        if (typeof (option) == 'undefined') {
            option = 0;
        }
        var expDate = this.jSonToDate(value);
        var day = expDate.getDate();
        var month = expDate.getMonth() + 1;
        var year = expDate.getFullYear();
        var hour = expDate.getHours();
        var minute = expDate.getMinutes();
        var second = expDate.getSeconds();
        if (day < 10) day = "0" + day;
        if (month < 10) month = "0" + month;
        if (hour < 10) hour = "0" + hour;
        if (minute < 10) minute = "0" + minute;
        if (second < 10) second = "0" + second;
        switch (option) {
            case 0:
                return day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
                break;
            case 1:
                return day + '/' + month + '/' + year;
                break;
            case 2:
                return hour + ':' + minute + ':' + second + ' ' + day + '/' + month + '/' + year;
                break;
            case 3:
                return year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
                break;
            case 4:
                return year + '/' + month + '/' + day;
                break;
            case 5:
                return day + 'h' + minute;
                break;
            default:
                return expDate.toString();
                break;
        }
    },

    //Kéo thanh crollbar lên đầu
    scrollTop: function () { $("html:not(:animated),body:not(:animated)").animate({ scrollTop: 0 }, 'slow'); },
    popupScrollTop: function (elm) { $('#' + elm).animate({ scrollTop: 0 }, "slow"); },
    scrollBottom: function () {
        $("html:not(:animated),body:not(:animated)").animate({ scrollTop: utils.documentHeight() }, 'slow');
    },
    validateDate: function (dtValue) {
        try {
            var dtRegex = new RegExp(/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{4}\b/);
            var status = dtRegex.test(dtValue);
            if (!status) return status;
            var arr = dtValue.toString().split('/');
            if (arr.length != 3) return false;
            var day = parseInt(arr[0]);
            var month = parseInt(arr[1]);
            var year = parseInt(arr[2]);
            if (day < 0 || day > 31) return false;
            if (month > 12) return false;
            return true;
        } catch (e) {
            return false;
        }
    },
    // Check format email xem có chính xác hay không
    validateEmail: function (email) {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return filter.test(email);
    },
    //Check chuỗi ký tự gồm ký tự chuẩn và số ._ 
    validateOnlyLetter: function (text) {
        var filter = /^[a-zA-Z]+$/;
        return filter.test(text);
    },
    //Check chuỗi ký tự gồm ký tự chuẩn và số ._ 
    validateLetter: function (text) {
        var filter = /^[a-zA-Z0-9]+$/;
        return filter.test(text);
    },
    //Check Password
    validateLetterPassword: function (text) {
        var filter = /^[a-zA-Z0-9\.\_~!@#$%^&*(:)-+=]+$/;
        return filter.test(text);
    },
    validateNumberOnly: function (text) {
        var filter = /^[0-9]+$/;
        return filter.test(text);
    },

    validatePassword: function (password) {
        return (password.search(/[a-zA-Z]/) < 0 || password.search(/[0-9]/) < 0);
    },

    checkOnlyNumber: function (obj, e) {
        var whichCode =
            (window.Event && e.which)
                ? e.which
                : e.keyCode; /*if (whichCode == 13) { this.onPlaceOrder(); return false; }*/
        if (whichCode == 9) return true;
        if ((whichCode >= 48 && whichCode <= 57) || whichCode == 8) {
            var n = obj.value.replace(/,/g, "");
            if (whichCode == 8) {
                if (n.length != 0)
                    n = n.substr(0, n.length - 1);
            }
            if (parseFloat(n) == 0) n = '';
            return true;
        }
        e.returnValue = false;
        return false;
    },

    //Bắt validate ngay khi keypress, cấm nhập số
    charCodeOnly: function (event) {
        var regex = new RegExp("^[a-zA-Z ]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    },

    checkOnlyAlphabets: function (evt) {
        var e = window.event || evt;
        var charCode = e.which || e.keyCode;
        if (charCode > 47 && charCode < 58) {
            if (window.event) //IE
                window.event.returnValue = false;
            else //Firefox
                e.preventDefault();
        }
        return true;
    },
    // type=0:letter, 1 : number, 2:only letter, 3: password, 4 UserName
    inputExtender: function (id, type) {
        try {
            var val = $('#' + id).val();
            if (val == '' || val == 'undefined') {
                return;
            }

            var str = '';
            switch (type) {
                case 0:
                    for (var index = 0; index < val.length; index++) {
                        if (utils.validateLetter(val.charAt(index))) {
                            str += val.charAt(index);
                        }
                        $('#' + id).val(str);
                    }

                    break;
                case 1:
                    for (var index = 0; index < val.length; index++) {
                        if (utils.validateNumberOnly(val.charAt(index))) {

                            str += val.charAt(index);
                        }
                    }

                    $('#' + id).val(str);

                    break;
                case 2:
                    for (var index = 0; index < val.length; index++) {
                        if (utils.validateOnlyLetter(val.charAt(index))) {
                            str += val.charAt(index);
                        }
                        $('#' + id).val(str);
                    }
                    break;
                case 3:
                    for (var index = 0; index < val.length; index++) {
                        if (utils.validateLetterPassword(val.charAt(index))) {
                            str += val.charAt(index);
                        }
                        $('#' + id).val(str);
                    }
                    break;
                case 4:
                    for (var index = 0; index < val.length; index++) {
                        if (!utils.validateNumberOnly(val.charAt(index))) {
                            $('#' + id).val(val.replace(val.charAt(index), ''));
                        }
                    }
                    break;
            }
        } catch (err) {
        }
    },

    formDateTime: function (date, takeHours) {
        var format = '';
        var d = new Date(date);
        if (!takeHours) {
            format = [
                d.getDate().padLeft(),
                (d.getMonth() + 1).padLeft(),
                d.getFullYear()
            ].join('/');
            return format;
        }

        format = [
            d.getDate().padLeft(),
            (d.getMonth() + 1).padLeft(),
            d.getFullYear()
        ].join('/') +
            ' ' +
            [
                d.getHours().padLeft(),
                d.getMinutes().padLeft(),
                d.getSeconds().padLeft()
            ].join(':');
        return format;
    },

    showPopup: function (text) {
        var url = this.rootUrl() + "common/PopupView?content=" + encodeURIComponent(text);
        $('#divPopup').load(url);
    },

    //Đóng popup
    closePopup: function () {
        $('#divPopup').empty();
    },

    showPopupCloseRedrirect: function (text, link, img, btntext) {
        var url = this.rootUrl() +
            "common/PopupView?content=" +
            encodeURIComponent(text) +
            "&link=" +
            encodeURIComponent(link) +
            "&img=" +
            encodeURIComponent(img) +
            "&btnText=" +
            encodeURIComponent(btntext);
        $('#divPopup').load(url);
    },

    showPopupConfirmRedirect: function (text, link, img, btntext) {
        var url = this.rootUrl() +
            "common/PopupView?content=" +
            encodeURIComponent(text) +
            "&link=" +
            encodeURIComponent(link) +
            "&img=" +
            encodeURIComponent(img) +
            "&btnText=" +
            encodeURIComponent(btntext) +
            "&isPopupConfirm=true";
        $('#divPopup').load(url);
    },

    clearErrorMessage: function (fieldid) {
        $('#' + fieldid).empty();
    },

    formatNumber: function (pSStringNumber) {
        pSStringNumber += '';
        var x = pSStringNumber.split(',');
        var x1 = x[0];
        var x2 = x.length > 1 ? ',' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + '.' + '$2');

        return x1 + x2;
    },
    numberPhoneFormat: function (string) {
        var phone = "";
        if (string.length <= 10)
            phone = string.replace(/\D*(\d{3})\D*(\d{3})\D*(\d{3})\D*/, '$1-$2-$3');
        else
            phone = string.replace(/\D*(\d{4})\D*(\d{4})\D*(\d{3})\D*/, '$1-$2-$3');
        return phone;
    },

    formatPhoneInput: function (ctrl, e) {
        //Check if arrow keys are pressed - we want to allow navigation around textbox using arrow keys
        var evnt = e || window.event;
        var keyCode = (window.event) ? e.keyCode : e.which;
        if (keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40) {
            return;
        }
        var val = ctrl.value;
        val = val.replace(/[-]/g, "");
        ctrl.value = "";
        val += '';

        var rgx = /\D*(\d{3})/;
        if (val.length > 3 && val.length <= 6) {
            rgx = /\D*(\d{3})\D*(\d{1})/;
            val = val.replace(rgx, '$1-$2');
        } else if (val.length > 6 && val.length <= 10) {
            rgx = /\D*(\d{3})\D*(\d{3})\D*(\d{1})\D*/;
            val = val.replace(rgx, '$1-$2-$3');
        }
        if (val.length > 10) {
            rgx = /\D*(\d{4})\D*(\d{4})\D*(\d{3})\D*/;
            val = val.replace(rgx, '$1-$2-$3');
        }

        ctrl.value = val;
    },
    setMenuSubTitle: function (text) {
        if ($('#subMenuTitle').length >= 0)
            $('#subMenuTitle').html(text);
    },


    //Hàm chuyển số thành chữ
    numberToText: function (baso) {
        var ChuSo = new Array(" không ",
            " một ",
            " hai ",
            " ba ",
            " bốn ",
            " năm ",
            " sáu ",
            " bảy ",
            " tám ",
            " chín ");
        var Tien = new Array("", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ");
        var tram;
        var chuc;
        var donvi;
        var KetQua = "";
        tram = parseInt(baso / 100);
        chuc = parseInt((baso % 100) / 10);
        donvi = baso % 10;
        if (tram == 0 && chuc == 0 && donvi == 0) return "";
        if (tram != 0) {
            KetQua += ChuSo[tram] + " trăm ";
            if ((chuc == 0) && (donvi != 0)) KetQua += " linh ";
        }
        if ((chuc != 0) && (chuc != 1)) {
            KetQua += ChuSo[chuc] + " mươi";
            if ((chuc == 0) && (donvi != 0)) KetQua = KetQua + " linh ";
        }
        if (chuc == 1) KetQua += " mười ";
        switch (donvi) {
            case 1:
                if ((chuc != 0) && (chuc != 1)) {
                    KetQua += " mốt ";
                } else {
                    KetQua += ChuSo[donvi];
                }
                break;
            case 5:
                if (chuc == 0) {
                    KetQua += ChuSo[donvi];
                } else {
                    KetQua += " lăm ";
                }
                break;
            default:
                if (donvi != 0) {
                    KetQua += ChuSo[donvi];
                }
                break;
        }
        return KetQua;
    },

    moneyToText: function (SoTien) {
        var ChuSo = new Array(" không ",
            " một ",
            " hai ",
            " ba ",
            " bốn ",
            " năm ",
            " sáu ",
            " bảy ",
            " tám ",
            " chín ");
        var Tien = new Array("", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ");
        var lan = 0;
        var i = 0;
        var so = 0;
        var KetQua = "";
        var tmp = "";
        var ViTri = new Array();
        if (SoTien < 0) return "Số tiền âm !";
        if (SoTien == 0) return "Không đồng !";
        if (SoTien > 0) {
            so = SoTien;
        } else {
            so = -SoTien;
        }
        if (SoTien > 8999999999999999) {
            //SoTien = 0;
            return "Số quá lớn!";
        }
        ViTri[5] = Math.floor(so / 1000000000000000);
        if (isNaN(ViTri[5]))
            ViTri[5] = "0";
        so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
        ViTri[4] = Math.floor(so / 1000000000000);
        if (isNaN(ViTri[4]))
            ViTri[4] = "0";
        so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
        ViTri[3] = Math.floor(so / 1000000000);
        if (isNaN(ViTri[3]))
            ViTri[3] = "0";
        so = so - parseFloat(ViTri[3].toString()) * 1000000000;
        ViTri[2] = parseInt(so / 1000000);
        if (isNaN(ViTri[2]))
            ViTri[2] = "0";
        ViTri[1] = parseInt((so % 1000000) / 1000);
        if (isNaN(ViTri[1]))
            ViTri[1] = "0";
        ViTri[0] = parseInt(so % 1000);
        if (isNaN(ViTri[0]))
            ViTri[0] = "0";
        if (ViTri[5] > 0) {
            lan = 5;
        } else if (ViTri[4] > 0) {
            lan = 4;
        } else if (ViTri[3] > 0) {
            lan = 3;
        } else if (ViTri[2] > 0) {
            lan = 2;
        } else if (ViTri[1] > 0) {
            lan = 1;
        } else {
            lan = 0;
        }
        for (i = lan; i >= 0; i--) {
            tmp = this.DocSo3ChuSo(ViTri[i]);
            KetQua += tmp;
            if (ViTri[i] > 0) KetQua += Tien[i];
            if ((i > 0) && (tmp.length > 0)) KetQua += ','; //&& (!string.IsNullOrEmpty(tmp))
        }
        if (KetQua.substring(KetQua.length - 1) == ',') {
            KetQua = KetQua.substring(0, KetQua.length - 1);
        }
        KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2);
        KetQua += " đồng";
        return KetQua; //.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
    },

    setCookie: function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },

    getCookie: function (name) {
        var value = '; ' + document.cookie;
        var parts = value.split('; ' + name + '=');
        if (parts.length == 2) return parts.pop().split(';').shift();
    },

    // lấy ngôn ngữ hiện tại
    getCurrentLanguage: function () {
        var lang = utils.getCookie('culture');
        if (lang == null || lang == "") {
            lang = 'vi';
        }
        return lang;
    },

    //Mở popup gọi từ CodeBehide
    showPopupCS: function (text) {
        var html =
            '<div id="popupwrap" class="popup_mini"><div class="c2_naptien_title"><p style="cursor: default;">THÔNG BÁO</p><a href="javascript:void(0);" onclick="utils.hidePopupCS()" id="divClose" class="c2_naptien_link">Đóng</a><div class="clear"></div></div>' +
            '<div style="padding: 10px 10px 20px 10px; line-height: 20px; text-align: center;">' +
            text +
            '</div></div>' +
            '<div id="overlayPopup"></div>' +
            '<style id="styleoverlayPopup" type="text/css">#overlayPopup{position: absolute;z-index: 1200;top: 0;left: 0;width: 100%;display: block;opacity: .80;background: #ccc;filter: alpha(opacity=60);-moz-opacity: 0.8;}</style>';

        $('#divPopup').html(html);
        var width = $('.popup_mini').width();
        var height = $('.popup_mini').height();
        var topOffset = (((utils.windowHeight() - height) / 2) * 100) / utils.windowHeight();
        var leftOffset = (((utils.windowWidth() - width) / 2) * 100) / utils.windowWidth();
        $('#popupwrap').css('width', width + 'px');
        $('#popupwrap').css('left', leftOffset + "%");
        $('#popupwrap').css("top", topOffset + "%");
        $('#popupwrap').css('z-index', 1300);
        $('#popupwrap').css('position', 'fixed');
        $('#overlayPopup').css('height', utils.documentHeight());
    },

    //Đóng popup gọi từ CodeBehide
    hidePopupCS: function () {
        $('#divPopup').empty();
    },

    forceNumber: function (obj, e) {     
        var whichCode =
            (window.Event && e.which)
                ? e.which
                : e.keyCode; /*if (whichCode == 13) { this.onPlaceOrder(); return false; }*/
        if (whichCode === 9 || whichCode === 13) {
            return true;
        }
        //else if (whichCode == 13) { $(e.currentTarget).keyup(e); return true;}
        if ((whichCode >= 48 && whichCode <= 57) || whichCode == 8) {
            var n = obj.value.replace(/,/g, "");
            if (whichCode == 8) {
                if (n.length != 0)
                    n = n.substr(0, n.length - 1);
            }
            if (parseFloat(n) == 0) {
                n = '';
            }
            return true;
        }
        e.returnValue = false;
        return false;
    },

    forceNumber_Comma: function (obj, e) {
        var whichCode =
            (window.Event && e.which)
                ? e.which
                : e.keyCode; /*if (whichCode == 13) { this.onPlaceOrder(); return false; }*/
        if (whichCode == 9) return true;
        if ((whichCode >= 48 && whichCode <= 57) || whichCode == 8 || whichCode == 46) {
            var n = obj.value.replace(/,/g, "");
            if (whichCode == 8) {
                if (n.length != 0)
                    n = n.substr(0, n.length - 1);
            }
            if (parseFloat(n) == 0) {
                n = '';
            }
            return true;
        }
        e.returnValue = false;
        return false;
    },

    letterOnly: function (t) {
        //Chi dc phep nhap chu, cho phep unicode
        //t.value = t.value.replace(/[0-9\-!^+)-_=@#$%&*({}|\\:':",.<>`~]/g, '');
        t.value = t.value.replace(/[0-9\-!^-_=@#$%&*({}|\:'",.<>`~]/g, '');
    },

    replaceAll: function (sources, strTarget, strSubString) {
        var strText = sources;
        var intIndexOfMatch = strText.indexOf(strTarget);

        // Keep looping while an instance of the target string
        // still exists in the string.
        while (intIndexOfMatch != -1) {
            // Relace out the current instance.
            strText = strText.replace(strTarget, strSubString)

            // Get the index of any next matching substring.
            intIndexOfMatch = strText.indexOf(strTarget);
        }

        return (strText);
    },

    formatString: function (str, param) {

        var args = param.toString().split(',');
        for (var i = 0; i < args.length; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "");
            str = utils.replaceAll(str, '{' + i + '}', args[i].toString());
        }
        return str;
    },

    // Banner
    loadInner_BannerDoubleClick: function () {
        var href = window.location.href;
        var tienich = href.indexOf("tien-ich");
        var tintuc = href.indexOf("tin-tuc");
        var vidientu = href.indexOf("vi-dien-tu");

        var html = "";
        if (tintuc > 0) {
            utils.bannerDoubleClick_News();
        }

        if (tienich > 0) {
            utils.bannerDoubleClick_Utility();
        }

        if (vidientu > 0) {
            utils.bannerDoubleClick_BottomRight();
        }

    },

    bannerDoubleClick_News: function () {
        var m;
        ShowDoubleClickNew = function (no) {
            var numberCurrent = 0;
            clearTimeout(m);
            console.log("ShowDoubleClickNew");

            $("#pageNews a").removeClass('active');
            var total = $(".allslide_new").length;
            $(".allslide_new").hide();
            $("#p" + no).show();
            var total = $(".allslide_new").length;
            $("#page" + no).addClass('active');
            var pageNew = no < total ? parseInt(no, 10) + 1 : 1;
            m = setTimeout('ShowDoubleClickNew(' + pageNew + ')', 6 * 1000);
        }

        var html = "";
        // VTCPAY_Tintuc_Topright_01_300x300
        html += "<div id='p1' class='allslide_new'><div id='div-gpt-ad-1432114310346-0' style='height: 250px; width: 270px;'>";
        html += "<script type='text/javascript'>";
        html += "googletag.cmd.push(function () { googletag.display('div-gpt-ad-1432114310346-0'); });";
        html += "</script>";
        html += "</div></div>";
        // VTCPAY_Tintuc_topright_02_300x300
        html += "<div id='p2' class='allslide_new' style='display:none'><div id='div-gpt-ad-1432115586166-0' style='height: 250px; width: 270px;'>";
        html += "<script type='text/javascript'>";
        html += "googletag.cmd.push(function () { googletag.display('div-gpt-ad-1432115586166-0');});";
        html += "</script>";
        html += "</div></div>";
        // VTCPAY_Tintuc_Topright_03_300x300
        html += "<div id='p3' class='allslide_new' style='display:none'><div id='div-gpt-ad-1432115689906-0' style='height: 250px; width: 270px;'>";
        html += "<script type='text/javascript'>";
        html += "googletag.cmd.push(function () { googletag.display('div-gpt-ad-1432115689906-0');});";
        html += "</script>";
        html += "</div></div>";

        // pager
        html += '<div id="pageNews" style="text-align: center; margin:56px 0px 0px 40px;" class="cycle-pager">';
        html += '<span><a onclick="ShowDoubleClickNew(1)" id="page1" class="active"></a></span>';
        html += '<span><a onclick="ShowDoubleClickNew(2)" id="page2"></a></span>';
        html += '<span><a onclick="ShowDoubleClickNew(3)" id="page3"></a></span>';
        html += '</div>';

        $("#advertising").html(html);

        ShowDoubleClickNew("1");

        //$('#pageNews span a').live('click', function (e) {
        //    clearTimeout(m);
        //    console.log("ShowDoubleClickNew");
        //    var no = $(e.target).attr("id").split('page')[1];            
        //    ShowDoubleClickNew(parseInt(no));
        //});
    },

    bannerDoubleClick_Utility: function () {
        var t;
        ShowDoubleClick = function (no) {
            var numberCurrent = 0;
            clearTimeout(t);
            console.log("ShowDoubleClick");

            $("#pageUltity a").removeClass('active');
            var total = $(".allslide_utility").length;
            $(".allslide_utility").hide();
            $("#t" + no).show();
            var total = $(".allslide_utility").length;
            $("#page_ulity" + no).addClass('active');
            var pageNew = no < total ? parseInt(no, 10) + 1 : 1;
            t = setTimeout('ShowDoubleClick(' + pageNew + ')', 6 * 1000);
        }

        var html = "";
        // VTCPAY_Tienich_bottomright_01_270x250
        html += "<div id='t1' class='allslide_utility'><div id='div-gpt-ad-1432115080670-0' style='height: 250px; width: 270px;'>";
        html += "<script type='text/javascript'>";
        html += "googletag.cmd.push(function () { googletag.display('div-gpt-ad-1432115080670-0');});";
        html += "</script>";
        html += "</div></div>";
        // VTCPAY_Tienich_bottomright_02_270x250
        html += "<div id='t2' class='allslide_utility' style='display:none'><div id='div-gpt-ad-1432115934308-0' style='height: 250px; width: 270px;'>";
        html += "<script type='text/javascript'>";
        html += "googletag.cmd.push(function () { googletag.display('div-gpt-ad-1432115934308-0');});";
        html += "</script>";
        html += "</div></div>";
        // VTCPAY_Tienich_Bottomright_03_270x250
        html += "<div id='t3' class='allslide_utility' style='display:none'><div id='div-gpt-ad-1432116040337-0' style='height: 250px; width: 270px;'>";
        html += "<script type='text/javascript'>";
        html += "googletag.cmd.push(function () { googletag.display('div-gpt-ad-1432116040337-0');});";
        html += "</script>";
        html += "</div></div>";

        // pager
        html += '<div id="pageUltity" style="text-align: center; margin: 5px 0px 0px 0px;" class="cycle-pager">';
        html += '<span><a onclick="ShowDoubleClick(1)" id="page_ulity1" class="active"></a></span>';
        html += '<span><a onclick="ShowDoubleClick(2)" id="page_ulity2"></a></span>';
        html += '<span><a onclick="ShowDoubleClick(3)" id="page_ulity3"></a></span>';
        html += '</div>';

        $("#advertising").html(html);

        ShowDoubleClick("1");
    },

    bannerDoubleClick_BottomRight: function () {
        $(".allslide_bottom").remove();
        var html = "";
        // VTCPAY_Vidientu_bottomright_01_680x100
        html += "<div id='b1' class='allslide_bottom'><div id='div-gpt-ad-1432114852697-0' style='height: 100px; width: 680px;'>";
        html += "<script type='text/javascript'>";
        html += "googletag.cmd.push(function () { googletag.display('div-gpt-ad-1432114852697-0');});";
        html += "</script>";
        html += "</div></div>";

        $("#content .page").append(html);
    },

    getParameterByName: function (name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    replaceUrlParam: function (url, paramName, paramValue) {
        if (paramValue == null)
            paramValue = '';
        var pattern = new RegExp('\\b(' + paramName + '=).*?(&|$)')
        if (url.search(pattern) >= 0) {
            return url.replace(pattern, '$1' + paramValue + '$2');
        }
        return url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue;
    },

    relative_time: function (date_str) {
        if (!date_str) { return; }
        date_str = $.trim(date_str);
        date_str = date_str.replace(/\.\d\d\d+/, ""); // remove the milliseconds
        date_str = date_str.replace(/-/, "/").replace(/-/, "/"); //substitute - with /
        date_str = date_str.replace(/T/, " ").replace(/Z/, " UTC"); //remove T and substitute Z with UTC
        date_str = date_str.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // +08:00 -> +0800
        var parsed_date = new Date(date_str);
        var relative_to = (arguments.length > 1) ? arguments[1] : new Date(); //defines relative to what ..default is now
        var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
        delta = (delta < 2) ? 2 : delta;
        var lang = utils.getCurrentLanguage();
        var day = parsed_date.getDate();
        var month = parsed_date.getMonth() + 1;
        var hour = parsed_date.getHours();
        var minute = parsed_date.getMinutes();
        var r = '';
        var mDay = Math.floor(delta / 86400);
        var mMonth = Math.floor(delta / 2592000);
        var mYear = Math.floor(delta / 31536000);

        if (mYear >= 1) {
            r = (lang == 'vi' ? mYear + ' năm trước' : mYear == 1 ? 'a year' : mYear + ' years' + ' ago');
        }
        else if (mMonth >= 1) {
            r = (lang == 'vi' ? mMonth + ' tháng trước' : mMonth == 1 ? 'a month' : mMonth + ' months' + ' ago');
        }
        else if (mDay >= 1) {
            r = (lang == 'vi' ? (mDay == 1 ? ('Hôm qua lúc ' + hour + ':' + minute) : (day + ' tháng ' + month + ' lúc ' + hour + ':' + minute)) : (mDay == 1 ? ('Yesterday at ' + utils.formatAMPM(parsed_date)) : (utils.getMonthText(month) + ' ' + day + ' at ' + utils.formatAMPM(parsed_date))));
        }
        else if (delta < 5) {
            r = lang == 'vi' ? 'Vừa xong' : 'Just now';
        }
        else if (delta < 60) {
            r = delta + (lang == 'vi' ? ' giây trước' : ' seconds ago');
        } else if (delta < 120) {
            r = (lang == 'vi' ? '1 phút trước' : 'a minute ago');
        } else if (delta < (45 * 60)) {
            r = (parseInt(delta / 60, 10)).toString() + (lang == 'vi' ? ' phút trước' : ' minutes ago');
        } else if (delta < (2 * 60 * 60)) {
            r = 'an hour ago';
        } else if (delta < (24 * 60 * 60)) {
            r = '' + (parseInt(delta / 3600, 10)).toString() + (lang == 'vi' ? ' giờ trước' : ' hours ago');
        }
        return r;
    },

    getMonthText: function (month) {
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        return month[month];
    },

    formatAMPM: function (parsed_date) {
        var hours = parsed_date.getHours();
        var minutes = parsed_date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    },

    getBrowser: function () {
        if (browser.prototype._cachedResult)
            return browser.prototype._cachedResult;

        // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
        var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

        // Firefox 1.0+
        var isFirefox = typeof InstallTrigger !== 'undefined';

        // At least Safari 3+: "[object HTMLElementConstructor]"
        var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

        var isCocCoc = navigator.userAgent.indexOf('coc_coc') >= 0;

        // Chrome 1+
        var isChrome = !!window.chrome && !isOpera && !isCocCoc;

        // At least IE6
        var isIE = /*@cc_on!@*/false || !!document.documentMode;

        // Edge 20+
        //var isEdge = !isIE && !!window.StyleMedia;

        return browser.prototype._cachedResult =
            isOpera ? '11' :
                isFirefox ? '6' :
                    isSafari ? '10' :
                        isCocCoc ? '9' :
                            isChrome ? '7' :
                                isIE ? '8' :
                                    //isEdge ? 'Edge' :
                                    "12";
    },

    localStorageHelper: function (type, key, data) {
        try {
            if (typeof (Storage) === "undefined") return '';
            //set
            if (type === 0) {
                if (data === null || data === undefined || data === '') return;
                if (key === 'device_secure') {
                    localStorage.setItem(key, CryptoJS.AES.encrypt(data, "4cab17a1134e44d298506398cafd5235"));
                }
                else {
                    localStorage.setItem(key, data);
                }
            }
            //get
            else {
                if (key === 'device_secure') {
                    var decrypted = CryptoJS.AES.decrypt(localStorage.getItem(key), "4cab17a1134e44d298506398cafd5235");
                    return decrypted.toString(CryptoJS.enc.Utf8);
                }
                return localStorage.getItem(key);
            }
        } catch (e) {
            console.log(e.message);
            return '';
        }
    },

    getCaptcha: function (rootID, api) {
        var url = this.linkIdApi() + "Captcha/Get";
        if (api === 'payment')
            url = this.trasactionApi() + "Captcha/Get";

        $.get(url, { length: 4, width: 140, height: 40 }).done(function (captcha) {
            if (rootID) {
                $('#' + rootID + ' #inputToken').val(captcha[0]);
                $('#' + rootID + ' #imgCaptcha').attr('src', 'data:image/jpeg;base64,' + captcha[1]);
                $('#' + rootID + ' #captcha').val('');
            } else {
                $('#inputToken').val(captcha[0]);
                $('#imgCaptcha').attr('src', 'data:image/jpeg;base64,' + captcha[1]);
                $('#captcha').val('');
            }
        });

    },

    refreshCaptcha: function (rootID, api) {
        var url = this.linkIdApi() + "Captcha/Get";
        if (api === 'payment')
            url = this.trasactionApi() + "Captcha/Get";

        $.get(url, { length: 4, width: 140, height: 40 }).done(function (captcha) {
            if (rootID) {
                $('#' + rootID + ' #inputToken').val(captcha[0]);
                $('#' + rootID + ' #imgCaptcha').attr('src', 'data:image/jpeg;base64,' + captcha[1]);
                $('#' + rootID + ' #captcha').val('');
            } else {
                $('#inputToken').val(captcha[0]);
                $('#imgCaptcha').attr('src', 'data:image/jpeg;base64,' + captcha[1]);
                $('#captcha').val('');
            }
        });
    },

    //ThangNN: Định dạng cho số thẻ, số tài khoản: aaaa bbbb cccc dddd
    bankCardFormat: function (t, e, value) {
        if (value) {
            $(t).val(value.match(new RegExp('.{1,4}', 'g')).join(' '));
            return;
        }
        var keycode = (window.event) ? e.keyCode : e.which;
        if (keycode == 17 || (keycode == 65 && event.ctrlKey)) return;
        var originalValue = $(t).val().split(' ').join(''); // remove space
        if (originalValue.length > 0) {
            originalValue = originalValue.match(new RegExp('.{1,4}', 'g')).join(' '); // add space
        }
        $(t).val(originalValue);
    },
    //ThangNN: Định dạng cho số tk nhap vao input, số tài khoản: aaa-bbb-cccc
    transactionAccountNumberFormat: function (t, e, value) {
        if (value) {
            return this.numberPhoneFormat(value);
        }
        return this.formatPhoneInput(t, e);
    },
    //ThangNN: Resize anh truoc khi load vao DOM
    imageResizeByCanvas: function (base64, width, height) {
        return new Promise(function (resolve, reject) {
            var image = new Image();
            image.src = base64;
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            var maxW = width;
            var maxH = height;
            image.onload = function () {
                var iw = image.width;
                var ih = image.height;
                var scale = Math.min((maxW / iw), (maxH / ih));
                var iwScaled = iw * scale;
                var ihScaled = ih * scale;
                canvas.width = iwScaled; // target width
                canvas.height = ihScaled; // target height
                ctx.drawImage(image,
                    0, 0, iw, ih,
                    0, 0, iwScaled, ihScaled
                );
                resolve(canvas.toDataURL());
            };
        });
    },
    postData: function (url, param, callBack, failCallback, contentType, async) {
        try {
            contentType = !contentType ? 'application/json; charset=utf-8' : contentType;
            async = async == false ? false : true;
            $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(param),
                contentType: contentType,
                dataType: "json",
                cache: false,
                crossDomain: true,
                async: async,
                xhrFields: { withCredentials: true },
                success: function (data) {
                    if (typeof callBack === 'function')
                        callBack(data);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    if (typeof failCallback === 'function')
                        failCallback(xhr.responseText);
                }
            });
        }
        catch (err) { }
    },
    postDataValidate: function (url, param, _beforeSend, callBack, failCallback, contentType) {
        try {
            contentType = !contentType ? 'application/json; charset=utf-8' : contentType;
            $.ajax({
                beforeSend: _beforeSend,
                type: "POST",
                url: url,
                data: JSON.stringify(param),
                contentType: contentType,
                dataType: "json",
                cache: false,
                crossDomain: true,
                xhrFields: { withCredentials: true },
                success: function (data) {
                    if (typeof callBack === 'function')
                        callBack(data);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    if (typeof failCallback === 'function')
                        failCallback(xhr.responseText);
                }
            });
        }
        catch (err) { }
    },
    getData: function (url, param, callBack, failCallback, contentType, async) {
        try {
            contentType = !contentType ? 'application/json; charset=utf-8' : contentType;
            async = async == false ? false : true;
            $.ajax({
                type: "GET",
                url: url,
                data: param,
                contentType: contentType,
                dataType: "json",
                cache: false,
                crossDomain: true,
                async: async,
                xhrFields: { withCredentials: true },
                success: function (data) {
                    if (typeof callBack === 'function')
                        callBack(data);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    if (typeof failCallback === 'function')
                        failCallback(xhr.responseText);
                }
            });
        }
        catch (err) { }
    },

    checkResponseIsValid: function (responseJson) {
        if (!responseJson) return false;
        return responseJson.indexOf('{"c') !== -1;
    },
    ChangeText: function (t) {
        if (t.which == 13)
            return;

        var selector = t.currentTarget;
        $(selector).removeClass("error");
        $(selector).siblings(".error-text").html('');
        $(selector).parents(".p-error-text").html('');
    },

    formatCurrency: function (ctrl, e) {
        //Check if arrow keys are pressed - we want to allow navigation around textbox using arrow keys
        var evnt = e || window.event;
        var keyCode = (window.event) ? e.keyCode : e.which;
        if (keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40) {
            return;
        }
        var val = ctrl.value;
        val = val.replace(/[.,]/g, "")
        ctrl.value = "";
        val += '';
        x = val.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';

        var rgx = /(\d+)(\d{3})/;

        //custom dot (.) or comma(,) here
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2');
        }

        ctrl.value = x1 + x2;
    },

    checkNumeric: function (e) {
        var keyCode = (window.event) ? e.keyCode : e.which;
        return (keyCode >= 48 && keyCode <= 57) || keyCode === 8;
    },

    getRandomValues: function (arr, count) {
        var result = [];
        var _tmp = arr.slice();
        for (var i = 0; i < count; i++) {
            var index = Math.ceil(Math.random() * 10) % _tmp.length;
            result.push(_tmp.splice(index, 1)[0]);
        }
        return result;
    },

    paragraphLoading: function (parentID, height) {
        if (!height) {
            var htmlElement = '<div class="timeline-wrapper"><div class="timeline-item"><div class="animated-background"><div class="background-masker header-top"></div><div class="background-masker header-left"></div><div class="background-masker header-right"></div><div class="background-masker header-bottom"></div><div class="background-masker subheader-left"></div><div class="background-masker subheader-right"></div><div class="background-masker subheader-bottom"></div><div class="background-masker content-top"></div><div class="background-masker content-first-end"></div><div class="background-masker content-second-line"></div><div class="background-masker content-second-end"></div><div class="background-masker content-third-line"></div><div class="background-masker content-third-end"></div></div></div></div>';
            $('#' + parentID).html(htmlElement);
            return;
        }
        var htmlElement = '<div class="timeline-wrapper"><div class="timeline-item" style="min-height: ' + height + 'px"><div class="animated-background"><div class="background-masker header-top"></div><div class="background-masker header-left"></div><div class="background-masker header-right"></div><div class="background-masker header-bottom"></div><div class="background-masker subheader-left"></div><div class="background-masker subheader-right"></div><div class="background-masker subheader-bottom"></div><div class="background-masker content-top"></div><div class="background-masker content-first-end"></div><div class="background-masker content-second-line"></div><div class="background-masker content-second-end"></div><div class="background-masker content-third-line"></div><div class="background-masker content-third-end"></div></div></div></div>';
        $('#' + parentID).html(htmlElement);
    },
    paragraphTargetLoading: function (target, height) {
        if (!height) {
            var htmlElement = '<div class="timeline-wrapper"><div class="timeline-item"><div class="animated-background"><div class="background-masker header-top"></div><div class="background-masker header-left"></div><div class="background-masker header-right"></div><div class="background-masker header-bottom"></div><div class="background-masker subheader-left"></div><div class="background-masker subheader-right"></div><div class="background-masker subheader-bottom"></div><div class="background-masker content-top"></div><div class="background-masker content-first-end"></div><div class="background-masker content-second-line"></div><div class="background-masker content-second-end"></div><div class="background-masker content-third-line"></div><div class="background-masker content-third-end"></div></div></div></div>';
            $(target).html(htmlElement);
            return;
        }
        var htmlElement = '<div class="timeline-wrapper"><div class="timeline-item" style="min-height: ' + height + 'px"><div class="animated-background"><div class="background-masker header-top"></div><div class="background-masker header-left"></div><div class="background-masker header-right"></div><div class="background-masker header-bottom"></div><div class="background-masker subheader-left"></div><div class="background-masker subheader-right"></div><div class="background-masker subheader-bottom"></div><div class="background-masker content-top"></div><div class="background-masker content-first-end"></div><div class="background-masker content-second-line"></div><div class="background-masker content-second-end"></div><div class="background-masker content-third-line"></div><div class="background-masker content-third-end"></div></div></div></div>';
        $(target).html(htmlElement);
    },
    renderModalContent: function (args, type) {
        var content = '';
        if (utils.getCurrentLanguage() === 'en') {
            content = '<p>{_notification}</p><table class="table-data"><tbody><tr><td>Transaction id :</td><td>{_transid}</td></tr><tr><td>Amount :</td><td>{_totalamount}</td></tr><tr><td>Balance :</td><td>{_balance}</td></tr></tbody></table>';
        } else {
            if (type === 'cashout')
                content = '<p>{_notification}</p><table class="table-data"><tbody><tr><td>Mã giao dịch :</td><td>{_transid}</td></tr><tr><td>Số tiền rút :</td><td>{_totalamount}</td></tr><tr><td>Số dư :</td><td>{_balance}</td></tr></tbody></table>';
            else
                content = '<p>{_notification}</p><table class="table-data"><tbody><tr><td>Mã giao dịch :</td><td>{_transid}</td></tr><tr><td>Số tiền nạp :</td><td>{_totalamount}</td></tr><tr><td>Số dư :</td><td>{_balance}</td></tr></tbody></table>';
        }
        content = content.replace(/{[^{}]+}/g, function (key) {
            return args[key.replace(/[{}]+/g, "")] || "";
        });
        return content;
    },

    checkVNPhoneNumber: function (phone) {
        if (!phone || phone.length < 10 || phone.length > 11) return false;
        if (isNaN(phone)) return false;
        var prefix = ['096', '097', '098', '0162', '0163', '0164',
            '0165', '0166', '0167', '0168', '0169', '086', '091', '094',
            '0123', '0124', '0125', '0127', '0129', '088', '090', '093',
            '0120', '0121', '0122', '0126', '0128', '089', '095', '092',
            '0188', '0186', '099', '0199'];
        var phonePrefix = phone.substring(0, phone.length - 7);
        if (prefix.includes(phonePrefix))
            return true;
        return false;
    }
};

$('body').on({
    click: function () {
        ShowHiddenPassword(this);
    }
}, '.eye');


function ShowHiddenPassword(t) {
    var inText = $(t).text();
    if (inText == "") {
        $(t).toggleClass("eye-off");
        inText = $(t).hasClass('eye-off') ? "visibility_off" : "visibility";
    }
    else {
        inText = (inText == "remove_red_eye" || inText == "visibility") ? "visibility_off" : "visibility";
        $(t).text(inText);
    }
    $(t).siblings('.input-password').attr('type', inText === "visibility" ? "password" : "text");
};

var vnNumber = new Intl.NumberFormat("vi-VN");

//ThangNN: Export excel using html: tableToExcel('tableid','export file name')
var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template =
            '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) },
        format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    return function (table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
        window.location.href = uri + base64(format(template, ctx))
    }
})();

function GetDate(jsonDate, type) {
    if (jsonDate == null || jsonDate === "") {
        return "";
    }
    var subdate = jsonDate.substr(0, 10);
    var year = subdate.substr(0, 4);
    var month = subdate.substring(5, 7);
    var day = subdate.substr(8, 10);

    var subdate2 = jsonDate.substring(11, 19);
    var hour = subdate2.substring(0, 2);
    var minute = subdate2.substring(3, 5);
    var second = subdate2.substring(6, 8);
    if (type == 0 || type == null || type == undefined) {
        return day + "/" + month + "/" + year;
    } else {
        return day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second;
    }
}

function Substring_textnews(str, lengsub) {
    if (str === null || str === "" || str === undefined) {
        return str;
    }
    if (lengsub > str.length) {
        return str;
    }
    var st = str.substring(0, lengsub);
    return st + " ........";
};

function Substring_LinkCard(str) {
    console.log(str);
    if (str === null || str === "" || str === undefined) {
        return;
    }
    var leng = str.length;
    if (leng <= 4) {
        return str;
        console.log(str);
    }
    else {
        return str.substring(leng - 4, leng);
        console.log(str);
    }
};

function topBar() {
    if ($(window).width() > 768) {
        $('.top-bar').css({
            backgroundColor: 'transparent',
            borderBottom: 'none',
            '-webkit-backdrop-filter': 'blur(0px)',
            'backdrop-filter': 'blur(0px)',
        });

        if ($(window).scrollTop() > 1) {
            $('body').addClass('topbarFixed');
            $('.btn-top').addClass('active');
        }
        else {
            $('body').removeClass('topbarFixed');
            $('.btn-top').removeClass('active');
        }
        return;
    }

    var top, height, hsl, alpha, light, border, blur, ratio;
    height = 100;
    top = $(window).scrollTop();
    ratio = top / height;
    alpha = ratio > 0.7 ? 0.7 : ratio;
    light = ratio * 100;
    hsl = "hsla(360, 0%, " + light + "%, " + alpha + ")";
    border = "1px solid rgba(238, 238, 238, " + alpha + ")";
    blur = ratio * 2;
    $('.top-bar').css({
        backgroundColor: hsl,
        borderBottom: border,
        '-webkit-backdrop-filter': 'blur(' + blur + 'px)',
        'backdrop-filter': 'blur(' + blur + 'px)',
    });
}

function goToByScroll(id) {
    //id = id.replace("link", "");
    $('html,body').animate({ scrollTop: ($(id).offset().top - 65) }, 'slow');
}

function countdown() {
    var date = new Date('Sep 15 2017 08:00:00');
    var time = date.getTime() / 1000;
    $('#countdown').attr('data-time', time);
    $("#countdown").kkcountdown({
        dayText: 'Ngày ',
        daysText: 'Ngày ',
        hoursText: 'Giờ ',
        minutesText: 'Phút ',
        secondsText: 'Giây',
        displayZeroDays: true,
        callback: function () { },
        rusNumbers: false
    });
}
function counter() {
    $(".odometer").each(function () {
        $(this).text($(this).attr("data-to"));
    });
}

function initHeightColumn() {
    var winHeight, blocks, topLogo, userInfo, notification, notif_count;
    winHeight = $(window).height();
    topLogo = $('.sidebar .logo').height();
    userInfo = $('.sidebar .userinfo').height();
    blocks = $('.sidebar .blocks');
    blocks.height(winHeight - (topLogo + userInfo));

    notification = $('.notif-box');
    notif_count = $('.notifications-section .count').height();
    notification.height(winHeight - topLogo);
}

function payMainLoad() {
    //materialize
    setTimeout(function () {
        $('[data-tooltip]').tooltip();
    }, 500);

    $('select').material_select();
    $('.modal').modal();
    $('body').click(function () {
        $('#headerSearchColumn').removeClass('show');
        if ($('body').hasClass('hideSidebar')) {
            $('.sidebar .menu-item').removeClass('expand');
        }
    });
    $('#headerBtnToggleSearch').click(function (e) {
        e.stopPropagation();
        $('#headerSearchColumn').addClass('show').find('input').focus();
    });
    $('#headerSearchColumn').click(function (e) {
        e.stopPropagation();
    });

    $('.sidebar-item-link').click(function () {
        if ($(this).parent().hasClass('expand')) {
            $('.sidebar .menu-item').removeClass('expand');
            return;
        }
        $('.sidebar .menu-item').removeClass('expand');

        if ($(this).parent().find('.submenu').length) {
            $(this).parent().addClass('expand');
        }
    });

    $('#button-user-header').click(function (e) {
        e.stopPropagation();
        $('#header-content').toggleClass('show');
    });

    $('.sidebar').click(function (e) {
        e.stopPropagation();
    });

    //$('.datepicker').pickadate({
    //    selectMonths: true,
    //    selectYears: 180,
    //    today: 'Hôm nay',
    //    clear: 'Xóa',
    //    close: 'Đồng ý',
    //    closeOnSelect: false,
    //    format: 'dd/mm/yyyy',
    //    monthsFull: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    //    monthsShort: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    //    weekdaysFull: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
    //    weekdaysShort: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
    //});

    $('.input-field .eye').click(function () {
        var input = $(this).parent().find('input');
        if (input.prop('type') == 'password') {
            input.prop('type', 'text');
        }
        else {
            input.prop('type', 'password');
        }
    });
    $('.tab-slides').each(function (i, e) {
        var slides, slide, translate, slideHeight, buttonSlide, wrapSlide;

        slides = $(this);
        slide = slides.children('.div_active');
        slideHeight = slide.outerHeight(true);//height() + parseInt(slide.css('margin-bottom')) + parseInt(slide.css('margin-top'));
        if (slideHeight == 0) {
            var parent = slide.parents('.div_hidden');
            if (parent.length <= 0) {
                parent = slide.parents('.div_next');
            }

            parent.attr("style", "display:block");
            slideHeight = slide.outerHeight(true); //height() + parseInt(slide.css('margin-bottom')) + parseInt(slide.css('margin-top'));
            parent.removeAttr("style");
        }
        slides.height(slideHeight);
    });
    $('.collapsible').collapsible({
        accordion: true,
        onOpen: function (el) {
            var collapsible = $('.collapsible:not([data-collapse-number=' + el.parent().data('collapse-number') + '])');
            collapsible.find('li').removeClass('active');
            collapsible.find('.collapsible-header').removeClass('active');
            collapsible.find('.collapsible-body').css('display', 'none');
        }
    });

    $('.dropdown-input').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: true, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'right', // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
    });
    if (!Array.prototype.filter) {
        Array.prototype.filter = function (fun /*, thisp */) {
            "use strict";

            if (this === void 0 || this === null)
                throw new TypeError();

            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== "function")
                throw new TypeError();

            var res = [];
            var thisp = arguments[1];
            for (var i = 0; i < len; i++) {
                if (i in t) {
                    var val = t[i]; // in case fun mutates this
                    if (fun.call(thisp, val, i, t))
                        res.push(val);
                }
            }

            return res;
        };
        console.log(Array.prototype.filter);
    }
    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            value: function (predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;

                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }

                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];

                // 5. Let k be 0.
                var k = 0;

                // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                    // d. If testResult is true, return kValue.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                    }
                    // e. Increase k by 1.
                    k++;
                }

                // 7. Return undefined.
                return undefined;
            }
        });
    }
   
    
}
function isElementInView(element, fullyInView) {
    var pageTop = $(window).scrollTop();
    var pageBottom = pageTop + $(window).height();
    var elementTop = $(element).offset().top;
    var elementBottom = elementTop + $(element).height();

    if (fullyInView === true) {
        return ((pageTop < elementTop) && (pageBottom > elementBottom));
    } else {
        return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
    }
};

function Pay365Carousel(options) {
    var autoplay, sliderOption, option;
    option = $.extend({
        target: null,
        sliderOptions: {}
    }, options);

    sliderOption = $.extend({
        autoplay: false,
        interval: 1000,
        navNext: null,
        navPrev: null
    }, option.sliderOptions);

    var target = option.target;

    this.start = function () {
        if (target && $(target).length) {
            $(target).carousel(sliderOption);
            $(target).find(sliderOption.navPrev).click(function () {
                $(target).carousel('prev');
                return false;
            });
            $(target).find(sliderOption.navNext).click(function () {
                $(target).carousel('next');
                return false;
            });
            if (sliderOption.autoplay) {
                this.run();
                $(target).hover(this.stop, this.run);
            }
        }
    };
    this.stop = function () {
        clearInterval(autoplay);
    };
    this.run = function () {
        autoplay = setInterval(function () {
            $(target).carousel('next');
        }, sliderOption.interval);
    };
};

function sideBar() {
    var isMobile = navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || (navigator.userAgent.match(/iPad/i) && $(window).width() < 992)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
        || $(window).width() < 992;

    $('.hideSidebar .menu .menu-item').unbind('hover');
    if (isMobile) {
        $('#button-collapse').unbind('click');
        $('#button-collapse').sideNav({
            menuWidth: 256,
            edge: 'right',
            closeOnClick: true,
            draggable: true,
            onOpen: function (el) {
                $('body').removeClass('hideSidebar').addClass('showSidebar');
            },
            onClose: function (el) {
                $('body').removeClass('hideSidebar').removeClass('showSidebar');
            },
        }
        );
        return;
    }
    var getCookie = utils.getCookie('menu');
    if (getCookie == 'false' || getCookie == null || getCookie == undefined) {
        $('body').removeClass('hideSidebar');
    } else {
        $('body').addClass('hideSidebar');
    }
    $('#button-collapse').unbind('sideNav');
    $('#button-collapse').click(function () {
        $('body').removeClass('showSidebar').toggleClass('hideSidebar');
        var check = $('body').hasClass("hideSidebar");
        if (check) {
            utils.setCookie('menu', true);
        } else {
            utils.setCookie('menu', false);
        }

        /*$('.hideSidebar .menu .menu-item').hover(function(){
            console.log('hover');
            $(this).find('a .name').css('display','block');
        }, function(){
            $(this).find('a .name').hide();
        });*/
    });
}

function SlideToogle(dt_slide, dt_toogle, id_next) {
    var slideId, slideNext, slideActive, slide, slideNextHeight;
    var index = 1;

    slideId = $('#' + dt_slide);
    slideActive = slideId.children('.div_active');
    slide = slideId.children('.slide');
    if (slide.length <= 0) {
        slide = slideId.children('.div_slide');
    }
    if (id_next != undefined && id_next != "") {
        var index_next = $("#" + id_next).index();
        index = Math.abs(slideActive.index() - index_next);
    }
    if (dt_toogle === 'next') {
        slideNext = slideActive.index() + index;
        slideNext = slideNext > slide.length ? slide : slideNext;
    }
    else if (dt_toogle === 'prev') {
        slideNext = slideActive.index() - index;
        slideNext = slideNext < 0 ? 0 : slideNext;
    }
    var slideNextElm = slide.eq(slideNext);
    slideNextHeight = slideNextElm.outerHeight(true);//.height() + parseInt(slideNextElm.css('margin-bottom')) + parseInt(slideNextElm.css('margin-top'));
    if (slideNextHeight == 0) {
        var parent = slideId.parents('.div_hidden');
        if (parent.length <= 0) {
            parent = slideId.parents('.div_next');
        }

        parent.attr("style", "display:block");
        slideHeight = slide.outerHeight(true); //height() + parseInt(slide.css('margin-bottom')) + parseInt(slide.css('margin-top'));
        parent.removeAttr("style");
    }
    $.each(slide, function (k, v) {
        var idxCrr = $(v).index();
        if (idxCrr < slideNext && !$(v).hasClass("div_prev"))
            $(v).removeClass("div_next div_active").addClass("div_prev");
        else if (idxCrr === slideNext)
            slideNextElm.removeClass("div_next div_prev").addClass("div_active");
        else if (!$(v).hasClass("div_next"))
            $(v).removeClass("div_prev div_active").addClass("div_next");
    });
    slideId.height(slideNextHeight);
    return false;
}

//Modal thong bao ket qua giao dich
function ModalNotificationResultInit(type, header, content, btClose, btContinue, callbackClose, callBackContinue, timeoutAutoClose) {
    var $popup = $('#modal_notification_result');
    if (type === 'danger') {
        $popup.find('h4').html('<i class="material-icons icon-danger">clear</i>' + (!header ? (utils.getCurrentLanguage() === 'en' ? 'Transaction fail' : 'Giao dịch thất bại') : header));
        $popup.find('#bt_continue').addClass('btn-danger');
    }

    else if (type === 'warning') {
        $popup.find('h4').html('<i class="material-icons icon-warning">priority_high</i>' + (!header ? (utils.getCurrentLanguage() === 'en' ? 'Transaction wait to confirm' : 'Giao dịch chờ xử lý') : header));
        $popup.find('#bt_continue').addClass('btn-warning');
    }
    else {
        $popup.find('h4').html('<i class="material-icons icon-success">check</i>' + (!header ? (utils.getCurrentLanguage() === 'en' ? 'Transaction success' : 'Giao dịch thành công') : header));
        $popup.find('#bt_continue').addClass('btn-success');
    }
    if (content)
        $popup.find('#content').html(content);

    if (btClose)
        $popup.find('#bt_close').text(btClose);

    if (btContinue)
        $popup.find('#bt_continue').text(btContinue);

    if (typeof callbackClose === 'function') {
        $('#bt_close').on('click', function () {
            callbackClose();
        });
    }
    if (typeof callBackContinue === 'function') {
        $('#bt_continue').on('click', function () {
            callBackContinue();
        });
    }
    $("#modal_notification_result").modal({
        dismissible: false
    });
    $popup.modal('open');
}

//Modal thong bao ket qua giao dich
function ModalPopupShow(type, header, content, btClose, btContinue, callbackClose, callBackContinue) {
    var $popup = $('#modal_notification_result');
    if (type === 'danger') {
        $popup.find('h4').html('<i class="material-icons icon-danger">clear</i>' + (!header ? 'Giao dịch thất bại' : header));
        $popup.find('#bt_continue').addClass('btn-danger');
    }

    else if (type === 'warning') {
        $popup.find('h4').html('<i class="material-icons icon-warning">priority_high</i>' + (!header ? 'Giao dịch đang xử lý' : header));
        $popup.find('#bt_continue').addClass('btn-warning');
    }
    else {
        $popup.find('h4').html('<i class="material-icons icon-success">check</i>' + (!header ? '' : header));
        $popup.find('#bt_continue').addClass('btn-success');
    }
    if (content)
        $popup.find('#content').html(content);

    if (btClose)
        $popup.find('#bt_close').text(btClose);
    else
        $popup.find('#bt_close').hide();

    if (btContinue)
        $popup.find('#bt_continue').text(btContinue);

    if (typeof callbackClose === 'function') {
        $('#bt_close').on('click', function () {
            callbackClose();
        });
    }
    if (typeof callBackContinue === 'function') {
        $('#bt_continue').on('click', function () {
            callBackContinue();
        });
    }

    if (btContinue === 'Đăng xuất' || btContinue === 'Logout')
        $popup.modal({
            dismissible: true
        });
    else
        $popup.modal({
            dismissible: false
        });
    $popup.modal('open');
}

//Modal thong bao chung
function ModalNotificationInit(content, callBack, type, header, button, isAutoClose) {
    var $popup = $('#modal-alert');
    $popup.find('#btnAlert').removeClass("btn-danger btn-warning btn-success");
    if (type === 'error') {
        $popup.find('h4').html('<i class="material-icons icon-danger">priority_high</i>' + (!header ? '' : header));
        $popup.find('#btnAlert').addClass('btn-danger');
    }
    if (type === 'danger') {
        $popup.find('h4').html('<i class="material-icons icon-danger">clear</i>' + (!header ? '' : header));
        $popup.find('#btnAlert').addClass('btn-danger');
    }
    else if (type === 'warning') {
        $popup.find('h4').html('<i class="material-icons icon-warning">priority_high</i>' + (!header ? '' : header));
        $popup.find('#btnAlert').addClass('btn-warning');
    }
    else if (type === 'success') {
        $popup.find('h4').html('<i class="material-icons icon-success">check</i>' + (!header ? '' : header));
        $popup.find('#btnAlert').addClass('btn-success');
    }
    else
        $popup.find('#btnAlert').addClass('btn-success');

    if (button)
        $popup.find('#btnAlert').text(button);
    if (typeof callBack === 'function') {
        $popup.modal({
            complete: function () {
                callBack();
            } // Callback for Modal close
        });
    }

    $popup.find('#modal_content').html(content);
    $popup.modal('open');
    if (isAutoClose) {
        setTimeout(function () {
            $popup.modal("close");
        }, isAutoClose);
    }
}

function ModalBuyCardSuccess(header, content, btClose, btContinue, callbackClose, callBackContinue) {
    var $popup = $('#modal-payment');

    $popup.find('h4').html('<i class="material-icons icon-success">check</i>' + (!header ? '' : header));
    if (content)
        $popup.find('#content').html(content);

    if (btClose)
        $popup.find('#bt_back').text(btClose);
    else
        $popup.find('#bt_back').hide();

    if (btContinue)
        $popup.find('#bt_next').text(btContinue);

    if (typeof callbackClose === 'function') {
        $('#bt_back').on('click', function () {
            callbackClose();
        });

        $(document).click(function (event) {
            var $target = $(event.target);
            if (!$target.is('#bt_back') && !$('#modal-payment').has($target).length && $('#modal-payment').is(':visible')) {
                callbackClose();
            }
        });
    }
    if (typeof callBackContinue === 'function') {
        $('#bt_next').on('click', function () {
            callBackContinue();
        });
    }

    $popup.modal({
        dismissible: false
    });
    $popup.modal('open');
}


var Base64 = {

    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }

        return string;
    }

};

// usage
//=> 3..padLeft() => '03'
//=> 3..padLeft(100,'-') => '--3' 
Number.prototype.padLeft = function (base, chr) {
    var len = (String(base || 10).length - String(this).length) + 1;
    return len > 0 ? new Array(len).join(chr || '0') + this : this;
}
function trackingPageView() {
    if (document.location.pathname.indexOf('cai-dat-bao-mat') > -1) {
        ga('send', 'pageview', 'cai-dat-bao-mat');
    }
    if (document.location.pathname.indexOf('doi-han-muc-bao-mat') > -1) {
        ga('send', 'pageview', 'doi-han-muc-bao-mat');
    }
    else if (document.location.pathname.indexOf('nap-tien') > -1) {
        ga('send', 'pageview', 'nap-tien');
    }
    else if (document.location.pathname.indexOf('chuyen-tien') > -1) {
        ga('send', 'pageview', 'chuyen-tien');
    }
    else if (document.location.pathname.indexOf('rut-tien') > -1) {
        ga('send', 'pageview', 'rut-tien');
    }
    else if (document.location.pathname.indexOf('nap-dien-thoai') > -1) {
        ga('send', 'pageview', 'nap-dien-thoai');
    }
    else if (document.location.pathname.indexOf('mua-the-dien-thoai') > -1) {
        ga('send', 'pageview', 'mua-the-dien-thoai');
    }
    else if (document.location.pathname.indexOf('mua-the-game') > -1) {
        ga('send', 'pageview', 'mua-the-game');
    }
    else if (document.location.pathname.indexOf('nap-game') > -1) {
        ga('send', 'pageview', 'nap-game');
    }
    else if (document.location.pathname.indexOf('tin-tuc') > -1) {

        ga('send', 'pageview', document.location.pathname);
    }
    else if (document.location.pathname.indexOf('thong-tin-tai-khoan') > -1) {
        ga('send', 'pageview', 'thong-tin-tai-khoan');
    }
    else if (document.location.pathname.indexOf('lich-su-giao-dich') > -1) {
        ga('send', 'pageview', 'lich-su-giao-dich');
    }
    else if (document.location.pathname.indexOf('thong-tin') > -1) {
        ga('send', 'pageview', 'thong-tin');
    }
    else if (document.location.pathname.indexOf('dang-nhap') > -1) {
        ga('send', 'pageview', 'dang-nhap');
    }
    else if (document.location.pathname.indexOf('dang-ky') > -1) {
        ga('send', 'pageview', 'dang-ky');
    }
    else if (document.location.pathname.indexOf('gioi-thieu') > -1) {
        ga('send', 'pageview', 'gioi-thieu');
    }
    else if (document.location.pathname.indexOf('ve-chung-toi') > -1) {
        ga('send', 'pageview', document.location.pathname);
    }
    else if (document.location.pathname.indexOf('lien-he') > -1) {
        ga('send', 'pageview', 'lien-he');
    }
    else if (document.location.pathname.indexOf('search') > -1) {
        ga('send', 'pageview', 'search-page');
    }
    else if (document.location.pathname.indexOf('quen-mat-khau') > -1)
        ga('send', 'pageview', 'quen-mat-khau');
    else if (document.location.pathname.indexOf('huong-dan') > -1)
        ga('send', 'pageview', document.location.pathname);
    else
        ga('send', 'pageview', 'trang-chu');
}

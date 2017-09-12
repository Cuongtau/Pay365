Utils = new function () {

    function rootUrl() {
        var rooturl = 'http://localhost:57022/';
        if (location.host.toString().indexOf('localhost') >= 0) { rooturl = 'http://localhost:57022/'; }
        if (location.host.toString().indexOf('sandbox') >= 0) { rooturl = 'http://sandbox.vtcpay.vn/pay2.0/billingreport/'; }
        return rooturl;
    };
    this.UrlRoot = rootUrl();

    this.DocumentHeght = function () {
        return $(document).height();
    };
    this.GetFullHeight = function () {
        return parseInt($(document).scrollTop() + $('html').height());
    };
    this.DocumentWidth = function () { return $(document).width(); };
    this.WindowHeight = function () { return $(window).height(); };
    this.WindowWidth = function () { return $(window).width(); };
    this.Loading = function () {
        //this.UnLoading();
        var html = '<div id="LoadingContainer"><div  id="Loading" style="display: none; text-align: center; overflow-y: none; vertical-align: middle;"><img src="' + this.UrlRoot + 'images/loading.gif" alt="ebank loadding" /></div>';
        html += '<div  id="LoadingOverlay" style="height: 100%"></div>';
        html += '<style> #Loading{	width: 300px;	height: 300px;	z-index: 99000;	position: fixed;padding: 5px;}#LoadingOverlay{	-moz-opacity: 0.8;	opacity: .80;	filter: alpha(opacity=10);	position: absolute;	z-index: 3000;	top: 0;	left: 0;width: 100%;height: 100%;display: none;	background-color: #fff;}</style></div>';
        $('body').append(html);
        $('#Loading');
        $('#LoadingOverlay').show();
        var leftOffset = (this.WindowWidth() - 300) / 2;
        var topOffset = (this.GetFullHeight() - 300) / 2;
        $('#Loading').css('width', 300);
        $('#Loading').css('height', 300);
        $('#Loading').css('left', leftOffset);
        $('#Loading').css('top', '47%'); //topOffset);
        $('#Loading').show();
        $('#LoadingOverlay').css('height', '100%');
    };
    this.UnLoading = function () {
        $('#LoadingContainer').remove();
    };
    this.ReplaceAll = function (sources, strTarget, strSubString) {
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
    };
    this.dateTypeFormatter = function (date, type) {
        date = date.replace(/\-/g, "/"); // repalace "-" = "/" (chạy trên trình duyệt firefox)
        var index = date.indexOf('.');
        if (index >= 0) {
            date = date.substr(0, index);
        }
        var datetime = new Date(date);
        var y = datetime.getFullYear();
        var m = datetime.getMonth() + 1;
        var d = datetime.getDate();
        var h = datetime.getHours();
        var mi = datetime.getMinutes();
        var se = datetime.getSeconds();
        if (type == 0) {
            return (d < 10 ? ('0' + d) : d) + '/' + (m < 10 ? ('0' + m) : m) + '/' + y;
        }
        else if (type == 2)
            return (m < 10 ? ('0' + m) : m) + '/' + y;
        else
            return (d < 10 ? ('0' + d) : d) + '/' + (m < 10 ? ('0' + m) : m) + '/' + y + ' ' + (h < 10 ? ('0' + h) : h) + ':' + (mi < 10 ? ('0' + mi) : mi) + ':' + (se < 10 ? ('0' + se) : se);
    };
    this.validateDateTime = function (_text) {
        var filter = /^\d{4}[\-\/.]\d{2}[\-\/.]\d{2}T\d{2}:\d{2}:\d{2}$/; return filter.test(_text);
    };

    this.IsvalidateDate = function (_text) {
        var filter = /^\d{2}[\-\/.]\d{2}[\-\/.]\d{4}\s+\d{2}:\d{2}:\d{2}$/; return filter.test(_text);
    };
    //Format số
    this.FormatNumber = function (_str) {
        _str += ''; x = _str.split(','); x1 = x[0]; x2 = x.length > 1 ? ',' + x[1] : ''; var rgx = /(\d+)(\d{3})/; while (rgx.test(x1)) x1 = x1.replace(rgx, '$1' + '.' + '$2'); var result = (x1 + x2).split('.'); if (result.length <= 1) return x1 + x2;
        return result[0] + '.' + parseInt(result[1].length > 2 ? result[1].substr(0, 2) : result[1]);
    };
    this.FormatNumberRate = function (_str) {
        if (parseFloat(_str) > 100)
            _str = 100;
        _str += ''; x = _str.split(','); x1 = x[0]; x2 = x.length > 1 ? ',' + x[1] : ''; var rgx = /(\d+)(\d{3})/; while (rgx.test(x1)) x1 = x1.replace(rgx, '$1' + '.' + '$2'); var result = (x1 + x2).split('.'); if (result.length <= 1) return x1 + x2;
        return result[0] + '.' + parseInt(result[1].length > 2 ? result[1].substr(0, 2) : result[1]);
    };
    // Hàm lấy xâu định dạng theo kiểu tiền tệ: 1234123 --> 1.234.123
    this.formatMoney = function (argValue) {
        var str1 = argValue.replace(/[,.]/g, "");
        argValue = parseInt(str1);
        var _comma = (1 / 2 + '').charAt(1);
        var _digit = ',';
        if (_comma == '.') {
            _digit = '.';
        }

        var _sSign = "";
        if (argValue < 0) {
            _sSign = "-";
            argValue = -argValue;
        }

        var _sTemp = "" + argValue;
        var _index = _sTemp.indexOf(_comma);
        var _digitExt = "";
        if (_index != -1) {
            _digitExt = _sTemp.substring(_index + 1);
            _sTemp = _sTemp.substring(0, _index);
        }

        var _sReturn = "";
        while (_sTemp.length > 3) {
            _sReturn = _digit + _sTemp.substring(_sTemp.length - 3) + _sReturn;
            _sTemp = _sTemp.substring(0, _sTemp.length - 3);
        }
        _sReturn = _sSign + _sTemp + _sReturn;
        if (_digitExt.length > 0) {
            _sReturn += _comma + _digitExt;
        }
        return _sReturn;
    };
};
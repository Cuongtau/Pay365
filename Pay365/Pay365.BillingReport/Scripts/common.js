var serieLine = [];
var seriePie = [];
var typeDate = '%d-%m-%Y';
var interval = 24 * 60 * 60 * 1000

var optionLine = {
    chart: {
        type: 'line',
        borderRadius: 2,
        borderWidth: 1,
        zoomType: 'x'
    },
    title: {
        text: null,
        x: -20 //center
    },
    subtitle: {
        text: null,
        x: -20
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
            millisecond: typeDate,
            second: typeDate,
            minute: typeDate,
            hour: typeDate,
            day: typeDate,
            week: typeDate,
            month: typeDate,
            year: typeDate
        },
        minTickInterval: interval
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Giá trị'
        }
        , plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    plotOptions: {
        line: {
            marker: {
                enabled: true,
                radius: 0.7,
                symbol: 'circle'
            },
            lineWidth: 1.7,
        },
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    legend: {
        enabled: false
        //align: 'right',
        //verticalAlign: 'top',
        //layout: 'vertical',
        //floating:true,
        //x: -100,
        //y: 30
    },
    tooltip: {
        useHTML: true,
        headerFormat: '<small>{point.key}</small><table style="width:auto">',
        pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
            '<td style="text-align: right;padding:0"><b> {point.y}</b></td></tr>',
        footerFormat: '</table>',
        xDateFormat: typeDate,
        dateTimeLabelFormats: {
            minute: typeDate
        }
    },
    series: serieLine
};

var optionPie = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: null
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.5,
                cy: 0.3,
                r: 0.7
            },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    }),
    plotOptions: {
        pie: {
            size: 220,
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            },
            showInLegend: true
        }
    },
    legend: {
        enabled: true,
        align: 'right',
        verticalAlign: 'top',
        layout: 'vertical',
        x: -300,
        y: 100,
        floating: true
    },
    series: [{
        name: "",
        colorByPoint: true,
        data: seriePie
    }]
};
//-------------------------------------------------------------Chart REPORT ---------------------------------------------------
//Chart
function BalanceReportLineChart() {
    var fromDate = $("#fromDate").val();
    var toDate = $("#toDate").val();
    var urlChart = Utils.UrlRoot + "ReportSystem/BalanceReportLineChart";
    Utils.Loading();
    $.ajax({
        type: 'GET',
        url: urlChart,
        data: {
            DataType: $("#ddlTypeData").val(),
            FromDate: fromDate,
            ToDate: toDate
        },
        success: function (data) {
            if (data != null) {
                optionLine.series = [data];
                typeDate = '%d/%m';
                optionLine.xAxis = {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        millisecond: typeDate,
                        second: typeDate,
                        minute: typeDate,
                        hour: typeDate,
                        day: typeDate,
                        week: typeDate,
                        month: typeDate,
                        year: typeDate
                    }
                };
                Highcharts.chart('ReportChart', optionLine);
            }
            else
                $('#ReportChart').empty();

            Utils.UnLoading();
        },
        error: function () {
            utils.UnLoading();
            Command: toastr["error"]("Hệ thống bận, vui lòng thử lại sau !", "Lỗi");
        }
    });
};
function AccountReportLineChart() {
    var fromDate = $("#fromDate").val();
    var toDate = $("#toDate").val();
    var urlChart = Utils.UrlRoot + "ReportAccount/AccountReportLineChart";
    Utils.Loading();
    $.ajax({
        type: 'GET',
        url: urlChart,
        data: {
            DataType: $("#ddlTypeData").val(),
            FromDate: fromDate,
            ToDate: toDate
        },
        success: function (data) {
            if (data != null) {
                optionLine.series = [data];
                typeDate = '%d/%m';
                optionLine.xAxis = {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        millisecond: typeDate,
                        second: typeDate,
                        minute: typeDate,
                        hour: typeDate,
                        day: typeDate,
                        week: typeDate,
                        month: typeDate,
                        year: typeDate
                    }
                };
                Highcharts.chart('ReportChart', optionLine);
            }
            else
                $('#ReportChart').empty();

            Utils.UnLoading();
        },
        error: function () {
            utils.UnLoading();
            Command: toastr["error"]("Hệ thống bận, vui lòng thử lại sau !", "Lỗi");
        }
    });
};
function TransInputReportLineChart() {
    var fromDate = $("#fromDate").val();
    var toDate = $("#toDate").val();
    var urlChart = Utils.UrlRoot + "ReportTransaction/TransInputReportLineChart";
    $.ajax({
        type: 'GET',
        url: urlChart,
        data: {
            DataType: $("#ddlTypeData").val(),
            PayType: $("#ddlPayType").val(),
            FromDate: fromDate,
            ToDate: toDate
        },
        success: function (data) {
            if (data != null) {
                optionLine.series = [data];
                typeDate = '%d/%m';
                optionLine.xAxis = {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        millisecond: typeDate,
                        second: typeDate,
                        minute: typeDate,
                        hour: typeDate,
                        day: typeDate,
                        week: typeDate,
                        month: typeDate,
                        year: typeDate
                    }
                };
                optionLine.tooltip = {
                    formatter: function () {
                        var s = '<b>' + Highcharts.dateFormat(typeDate,
                                          new Date(this.x)) + '</b>';

                        $.each(this.points, function () {
                            s += '<br/><span style="color:' + this.point.color + '">\u25CF</span> ' + this.series.name + ': <b>' +
                                Highcharts.numberFormat(this.y, 0, ',', '.') + '</b><br/>';
                        });

                        return s;
                    },
                    valueSuffix: '',
                    shared: true,
                    dateTimeLabelFormats: {
                        minute: typeDate,
                    },
                    xDateFormat: typeDate
                },
                Highcharts.chart('ReportChart', optionLine);
            }
            else
                $('#ReportChart').empty();
        },
        error: function () {
            Command: toastr["error"]("Hệ thống bận, vui lòng thử lại sau !", "Lỗi");
        }
    });
};
function TransferReportLineChart() {
    var fromDate = $("#fromDate").val();
    var toDate = $("#toDate").val();
    var urlChart = Utils.UrlRoot + "ReportTransaction/TransferReportLineChart";
    $.ajax({
        type: 'GET',
        url: urlChart,
        data: {
            DataType: $("#ddlTypeData").val(),
            FromDate: fromDate,
            ToDate: toDate
        },
        success: function (data) {
            if (data != null) {
                optionLine.series = [data];
                optionLine.xAxis.dateTimeLabelFormats = optionLine.tooltip.dateTimeLabelFormats = {
                    minute: '%d-%m %H:%M'
                },
                typeDate = '%d/%m';
                optionLine.xAxis = {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        millisecond: typeDate,
                        second: typeDate,
                        minute: typeDate,
                        hour: typeDate,
                        day: typeDate,
                        week: typeDate,
                        month: typeDate,
                        year: typeDate
                    }
                };
                optionLine.tooltip.xDateFormat = '%d-%m %H:%M';
                Highcharts.chart('ReportChart', optionLine);
            }
            else
                $('#ReportChart').empty();
        },
        error: function () {
            Command: toastr["error"]("Hệ thống bận, vui lòng thử lại sau !", "Lỗi");
        }
    });
};
function TransferReportPieChart() {
    var fromDate = $("#fromDate").val();
    var toDate = $("#toDate").val();
    var urlChart = Utils.UrlRoot + "ReportTransaction/TransferReportPieChart";
    $.ajax({
        type: 'GET',
        url: urlChart,
        data: {
            DataType: $("#ddlTypeData").val(),
            FromDate: fromDate,
            ToDate: toDate
        },
        success: function (data) {
            if (data != null && data.length > 0) {
                optionPie.series[0].data = data;
                //optionPie.
                Highcharts.chart('ReportChart', optionPie);
            }
            else
                $('#ReportChart').empty();
        },
        error: function () {
            Command: toastr["error"]("Hệ thống bận, vui lòng thử lại sau !", "Lỗi");
        }
    });
};

function RefundReportLineChart() {
    var fromDate = $("#fromDate").val();
    var toDate = $("#toDate").val();
    var urlChart = Utils.UrlRoot + "ReportTransaction/RefundReportLineChart";
    $.ajax({
        type: 'GET',
        url: urlChart,
        data: {
            transType: $("#ddlTransType").val(),
            FromDate: fromDate,
            ToDate: toDate
        },
        success: function (data) {
            if (data != null && data.data.length > 0) {
                optionLine.series = [data];
                optionLine.xAxis.dateTimeLabelFormats = optionLine.tooltip.dateTimeLabelFormats = {
                    minute: '%d-%m %H:%M'
                },
                optionLine.tooltip.xDateFormat = '%d-%m %H:%M';
                typeDate = '%d/%m';
                optionLine.xAxis = {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        millisecond: typeDate,
                        second: typeDate,
                        minute: typeDate,
                        hour: typeDate,
                        day: typeDate,
                        week: typeDate,
                        month: typeDate,
                        year: typeDate
                    }
                };
                Highcharts.chart('ReportChart', optionLine);
            }
            else
                $('#ReportChart').empty();
        },
        error: function () {
            Command: toastr["error"]("Hệ thống bận, vui lòng thử lại sau !", "Lỗi");
        }
    });
};
function MerchantReportPieChart() {
    var fromDate = $("#fromDate").val();
    var toDate = $("#toDate").val();
    var urlChart = Utils.UrlRoot + "ReportMerchant/MerchantReportPieChart";
    $.ajax({
        type: 'GET',
        url: urlChart,
        data: {
            chartType: $("#ddlTypeData").val(),
            FromDate: fromDate,
            ToDate: toDate
        },
        success: function (data) {
            if (data != null && data.length > 0) {
                optionPie.series[0].data = data;
                //optionPie.
                Highcharts.chart('ReportChart', optionPie);
            }
            else
                $('#ReportChart').empty();
        },
        error: function () {
            Command: toastr["error"]("Hệ thống bận, vui lòng thử lại sau !", "Lỗi");
        }
    });
}
function MerchantReportLineChart() {
    var fromDate = $("#fromDate").val();
    var toDate = $("#toDate").val();
    var urlChart = Utils.UrlRoot + "ReportMerchant/MerchantReportLineChart";
    $.ajax({
        type: 'GET',
        url: urlChart,
        data: {
            chartType: $("#ddlTypeData").val(),
            FromDate: fromDate,
            ToDate: toDate,
            merchantType: $("#ddlMerchantType").val(),
            bankType: $("#ddlBankType").val()
        },
        success: function (data) {
            if (data != null && data.data.length > 0) {
                optionLine.series = [data];
                typeDate = '%d/%m';
                optionLine.xAxis = {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        millisecond: typeDate,
                        second: typeDate,
                        minute: typeDate,
                        hour: typeDate,
                        day: typeDate,
                        week: typeDate,
                        month: typeDate,
                        year: typeDate
                    }
                };
                Highcharts.chart('ReportChart', optionLine);
            }
            else
                $('#ReportChart').empty();
        },
        error: function () {
            Command: toastr["error"]("Hệ thống bận, vui lòng thử lại sau !", "Lỗi");
        }
    });
}
//vẽ chart
function ChartCashout() {
    var Chart = parseInt($("#ddlSelectChart").val());
    if (Chart <= 0) {
        $('#ReportChart').empty();
        return;
    }

    switch (Chart) {
        case 1: {
            if (serieLine == null || serieLine.length <= 0) {
                $('#ReportChart').empty();
            }
            else {
                optionLine.chart.type = "line";
                optionLine.series = serieLine;
                $('#ReportChart').highcharts(optionLine);
            }
        }; break;
        case 2: {

            if (seriePie == null || seriePie.length <= 0) {
                $('#ReportChart').empty();
            }
            else {
                optionPie.series[0].data = seriePie;
                $('#ReportChart').highcharts(optionPie);
            }
        }; break;
        case 3: {
            if (serieLine == null || serieLine.length <= 0) {
                $('#ReportChart').empty();
            }
            else {
                optionLine.chart.type = "areaspline";
                optionLine.series = serieLine;
                $('#ReportChart').highcharts(optionLine);
            }
        }; break;
        default: {
            $('#ReportChart').empty();
        }; break;
    }
};
function ChartRefund() {
    var typeChart = parseInt($("#ddlSelectChart").val());
    if (typeChart == 0) {
        $('#ReportChart').empty();
        return;
    }

    if (typeChart == 1) {
        RefundReportLineChart();
    }
    else {
        optionPie.series[0].data = seriePie;
        $('#ReportChart').highcharts(optionPie);
    }

};
function ChartTransfer() {
    var typeChart = parseInt($("#ddlSelectChart").val());
    if (typeChart == 0) {
        $('#ReportChart').empty();
        return;
    }
    var typeData = parseInt($("#ddlTypeData").val());
    if (typeData == 0) {
        Command: toastr["warning"]("Bạn chưa chọn kiểu dữ liệu để vẽ biểu đồ !", "Thông báo");
        $('#ReportChart').empty();
        return;
    }

    if (typeChart == 1) {
        TransferReportLineChart();
    }
    else {
        TransferReportPieChart();
    }

};
function ChartTransactionInput() {
    var typeChart = parseInt($("#ddlSelectChart").val());
    if (typeChart == 0) {
        $('#ReportChart').empty();
        return;
    }
    var typeData = parseInt($("#ddlTypeData").val());
    if (typeData == 0) {
        Command: toastr["warning"]("Bạn chưa chọn kiểu dữ liệu để vẽ biểu đồ !", "Thông báo");
        return;
    }
    Highcharts.setOptions({
        colors: ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
    });
    Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.5,
                cy: 0.3,
                r: 0.7
            },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    });

    if (typeChart == 1) {
        TransInputReportLineChart();
    }
    else {
        optionPie.series = seriePie;
        Highcharts.chart('ReportChart', optionPie);
    }

};
function ChartMerchant() {
    var typeChart = parseInt($("#ddlSelectChart").val());
    if (typeChart == 0) {
        $('#ReportChart').empty();
        return;
    }
    var typeData = parseInt($("#ddlTypeData").val());
    if (typeData == 0) {
        Command: toastr["warning"]("Bạn chưa chọn kiểu dữ liệu để vẽ biểu đồ !", "Thông báo");
        return;
    }
    Highcharts.setOptions({
        colors: ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
    });
    Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.5,
                cy: 0.3,
                r: 0.7
            },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    });

    if (typeChart == 1) {
        MerchantReportLineChart();
    }
    else {
        MerchantReportPieChart();
    }

};
function ChartBalance() {
    var typeChart = parseInt($("#ddlSelectChart").val());
    if (typeChart == 0) {
        $('#ReportChart').empty();
        return;
    }
    var typeData = parseInt($("#ddlTypeData").val());
    if (typeData == 0) {
        Command: toastr["warning"]("Bạn chưa chọn kiểu dữ liệu để vẽ biểu đồ !", "Thông báo");
        $('#ReportChart').empty();
        return;
    }

    var fromDate = $("#fromDate").val();
    var toDate = $("#toDate").val();
    var urlChart = Utils.UrlRoot + "ReportSystem/BalanceReportLineChart";
    if (typeChart == 2)
        urlChart = Utils.UrlRoot + "ReportSystem/BalanceReportPieChart";

    $.ajax({
        type: 'GET',
        url: urlChart,
        data: {
            DataType: $("#ddlTypeData").val(),
            FromDate: fromDate,
            ToDate: toDate
        },
        success: function (data) {
            if (data != null) {
                if (typeChart == 2) {
                    optionPie.series[0].name = $("#ddlTypeData :selected").text();
                    optionPie.series[0].data = data;
                }
                else {
                    optionLine.series = [data];
                }

                if (typeChart == 2)
                    Highcharts.chart('ReportChart', optionPie);
                else
                    Highcharts.chart('ReportChart', optionLine);
            }
            else
                $('#ReportChart').empty();
        },
        error: function () {
            Command: toastr["error"]("Hệ thống bận, vui lòng thử lại sau !", "Lỗi");
        }
    });

};
function ChartAccount() {
    var typeChart = parseInt($("#ddlSelectChart").val());
    if (typeChart == 0) {
        $('#ReportChart').empty();
        return;
    }
    var typeData = parseInt($("#ddlTypeData").val());
    if (typeData == 0) {
        Command: toastr["warning"]("Bạn chưa chọn kiểu dữ liệu để vẽ biểu đồ !", "Thông báo");
        $('#ReportChart').empty();
        return;
    }

    if (typeChart == 1) {
        AccountReportLineChart();
    }
    else {
        optionPie.series = seriePie;
        Highcharts.chart('ReportChart', optionPie);
    }
};


//------------------------------------------------------------- REPORT ---------------------------------------------------
//Tổng hợp báo cáo TK
function GeneralReportAccount(currentPage) {
    parameters = {
        FromDate: $("#fromDate").val(),
        ToDate: $("#toDate").val()
    };
    Utils.Loading();
    var urlRequestAns = Utils.UrlRoot + "ReportAccount/GeneralAccountPartial";
    $.ajax({
        type: 'GET',
        url: urlRequestAns,
        data: parameters,
        success: function (data) {
            $("#ReportPartial").html(data);
            Utils.UnLoading();
        },
        error: function () {
            Utils.UnLoading();
        }
    });
};

//Tổng hợp báo cáo Merchant
function GeneralReportMerchant() {
    var fromDate = "";
    var toDate = "";
    fromDate = $("#fromDate").val();
    toDate = $("#toDate").val();

    var parameters = {
        merchantType: $("#ddlMerchantType").val(),
        merchantName: $("#txtMerchantName").val(),
        merchantAccount: $("#txtMerchantAccount").val(),
        bankType: $("#ddlBankType").val(),
        FromDate: fromDate,
        ToDate: toDate
    };
    Utils.Loading();
    var urlRequestAns = Utils.UrlRoot + "ReportMerchant/GeneralMerchantReportPartial";
    $.ajax({
        type: 'GET',
        url: urlRequestAns,
        data: parameters,
        success: function (data) {
            $("#ReportPartial").html(data);
            Utils.UnLoading();
        },
        error: function () {
            Utils.UnLoading();
            bootbox.alert("Hệ thống đang bận. Xin thử lại sau !");
        }
    });
}

//Báo cáo chi tiết Merchant
function ReportMerchantDetail() {
    var fromDate = "";
    var toDate = "";
    fromDate = $("#fromDate").val();
    toDate = $("#toDate").val();
    var listBank = "";

    //danh sách dịch vụ check
    var listBankSelect = $("#ddlListBank").val();
    if (listBankSelect != null && listBankSelect.length > 0) {
        $.each(listBankSelect, function (key, val) {
            listBank += val + ",";
        });
    }

    // console.log(listServices);
    if (listBank.length > 0)
        listBank = listBank.substring(0, listBank.length - 1);
    var parameters = {
        bankId: listBank,
        FromDate: fromDate,
        ToDate: toDate,
        merchantType: $("#ddlMerchantType").val(),
        merchantName: $("#txtMerchantName").val(),
        merchantAccount: $("#txtMerchantAccount").val()
    };
    Utils.Loading();
    var urlRequestAns = Utils.UrlRoot + "ReportMerchant/ReportMerchantDetailPartial";
    $.ajax({
        type: 'GET',
        url: urlRequestAns,
        data: parameters,
        success: function (data) {
            $("#ReportPartial").html(data);
            Utils.UnLoading();
        },
        error: function () {
            Utils.UnLoading();
            bootbox.alert("Hệ thống đang bận. Xin thử lại sau !");
        }
    });
};

//Báo cáo tổng hợp số dư hệ thống 
function GeneralReportBalance() {
    var fromDate = "";
    var toDate = "";
    fromDate = $("#fromDate").val();
    toDate = $("#toDate").val();
    var parameters = {
        AccountTypeID: $("#ddlAccountType").val(),
        DataType: $("#ddlTypeData").val(),
        FromDate: fromDate,
        ToDate: toDate
    };
    Utils.Loading();
    var urlRequestAns = Utils.UrlRoot + "ReportSystem/GetReportBalanceGetPage";
    $.ajax({
        type: 'POST',
        url: urlRequestAns,
        data: parameters,
        success: function (data) {
            $("#ReportPartial").html(data);
            Utils.UnLoading();
        },
        error: function () {
            Utils.UnLoading();
            bootbox.alert("Hệ thống đang bận. Xin thử lại sau !");
        }
    });
};

//Quản trị rủi ro
function RiskManagementReport() {
    var fromDate = "";
    var toDate = "";
    fromDate = $("#fromDate").val();
    toDate = $("#toDate").val();

    var parameters = {
        accountName: $("#txtAccountName").val(),
        warning: $("#ddlType").val(),
        FromDate: fromDate,
        ToDate: toDate
    };
    Utils.Loading();
    var urlRequestAns = Utils.UrlRoot + "ReportSystem/RiskManagementReportPartial";
    $.ajax({
        type: 'GET',
        url: urlRequestAns,
        data: parameters,
        success: function (data) {
            $("#ReportPartial").html(data);
            Utils.UnLoading();
        },
        error: function () {
            Utils.UnLoading();
            bootbox.alert("Hệ thống đang bận. Xin thử lại sau !");
        }
    });
};

//Tổng hợp giao dịch Nạp
function GeneralTransactionTopup() {
    var fromDate = "";
    var toDate = "";
    fromDate = $("#fromDate").val();
    toDate = $("#toDate").val();
    var listBank = "";

    //danh sách dịch vụ check
    var listBankSelect = $("#ddlListBank").val();
    if (listBankSelect != null && listBankSelect.length > 0) {
        $.each(listBankSelect, function (key, val) {
            listBank += val + ",";
        });
    }

    // console.log(listServices);
    if (listBank.length > 0)
        listBank = listBank.substring(0, listBank.length - 1);
    var parameters = {
        bankId: listBank,
        payType: $("#ddlPayType").val(),
        FromDate: fromDate,
        ToDate: toDate
    };
    Utils.Loading();
    var urlRequestAns = Utils.UrlRoot + "ReportTransaction/GeneralTransactionInputPartial";
    $.ajax({
        type: 'GET',
        url: urlRequestAns,
        data: parameters,
        success: function (data) {
            $("#ReportPartial").html(data);
            Utils.UnLoading();
        },
        error: function () {
            Utils.UnLoading();
            bootbox.alert("Hệ thống đang bận. Xin thử lại sau !");
        }
    });
};

//Báo cáo chi tiết giao dịch Nap
function ReportTranssactionTopupDetail() {
    var fromDate = "";
    var toDate = "";
    fromDate = $("#fromDate").val();
    toDate = $("#toDate").val();
    var listBank = "";

    //danh sách dịch vụ check
    var listBankSelect = $("#ddlListBank").val();
    if (listBankSelect != null && listBankSelect.length > 0) {
        $.each(listBankSelect, function (key, val) {
            listBank += val + ",";
        });
    }

    // console.log(listServices);
    if (listBank.length > 0)
        listBank = listBank.substring(0, listBank.length - 1);
    var parameters = {
        bankId: listBank,
        payType: $("#ddlPayType").val(),
        FromDate: fromDate,
        ToDate: toDate,
        AccountType: $("#ddlAccountType").val(),
        AccountName: $("#txtAccountName").val(),
        CreatedUser: $("#txtCreatedUser").val()
    };
    Utils.Loading();
    var urlRequestAns = Utils.UrlRoot + "ReportTransaction/TransactionInputDetailPartial";
    $.ajax({
        type: 'GET',
        url: urlRequestAns,
        data: parameters,
        success: function (data) {
            $("#ReportPartial").html(data);
            Utils.UnLoading();
        },
        error: function () {
            Utils.UnLoading();
            bootbox.alert("Hệ thống đang bận. Xin thử lại sau !");
        }
    });
};

//Tổng hợp báo cáo rút tiền
function GeneralReportCastout() {
    var fromDate = "";
    var toDate = "";
    fromDate = $("#fromDate").val();
    toDate = $("#toDate").val();

    var parameters = {
        bankId: $("#ddlListBank").val(),
        payType: $("#ddlPayType").val(),
        FromDate: fromDate,
        ToDate: toDate,
        bankRefTransID: $("#txtBankRefTransID").val(),
        accountPay: $("#txtAccountName").val(),
        accountBank: $("#txtBankAccount").val()
    };
    Utils.Loading();
    var urlRequestAns = Utils.UrlRoot + "ReportTransaction/ReportCastoutPartial";
    $.ajax({
        type: 'POST',
        url: urlRequestAns,
        data: parameters,
        success: function (data) {
            $("#ReportPartial").html(data);
            Utils.UnLoading();
        },
        error: function () {
            Utils.UnLoading();
            bootbox.alert("Hệ thống đang bận. Xin thử lại sau !");
        }
    });
}; 

//Tổng hợp chuyển tiền
function GeneralReportTransfer() {
    parameters = {
        accountTransfer: $("#txtAccountTransfer").val(),
        accountReceive: $("#txtAccountReceive").val(),
        FromDate: $("#fromDate").val(),
        ToDate: $("#toDate").val()
    };
    Utils.Loading();
    var urlRequestAns = Utils.UrlRoot + "ReportTransaction/ReportTransferPartial";
    $.ajax({
        type: 'GET',
        url: urlRequestAns,
        data: parameters,
        success: function (data) {
            $("#ReportPartial").html(data);
            Utils.UnLoading();
        },
        error: function () {
            Utils.UnLoading();
        }
    });
}

//Tổng hợp gd Hoàn tiền
function GeneralReportRefund() {
    var fromDate = "";
    var toDate = "";
    fromDate = $("#fromDate").val();
    toDate = $("#toDate").val();
    var listBank = "";
    var listWebsite = "";
    var listBankSelect = $("#ddlListBank").val();
    if (listBankSelect != null && listBankSelect.length > 0) {
        $.each(listBankSelect, function (key, val) {
            listBank += val + ",";
        });
    }
    var listWebSelect = $("#ddlWebsite").val();
    if (listWebSelect != null && listWebSelect.length > 0) {
        $.each(listWebSelect, function (key, val) {
            listWebsite += val + ",";
        });
    }
    if (listBank.length > 0)
        listBank = listBank.substring(0, listBank.length - 1);

    if (listWebsite.length > 0)
        listWebsite = listWebsite.substring(0, listWebsite.length - 1);

    var parameters = {
        lstBank: listBank,
        lstWebsite: listWebsite,
        transType: $("#ddlTransType").val(),
        FromDate: fromDate,
        ToDate: toDate,
        accountName: $("#txtAccountName").val()
    };
    Utils.Loading();
    var urlRequestAns = Utils.UrlRoot + "ReportTransaction/ReportRefundPartial";
    $.ajax({
        type: 'POST',
        url: urlRequestAns,
        data: parameters,
        success: function (data) {
            $("#ReportPartial").html(data);
            Utils.UnLoading();
        },
        error: function () {
            Utils.UnLoading();
            bootbox.alert("Hệ thống đang bận. Xin thử lại sau !");
        }
    });
};

//Tổng hợp báo cáo VTC MasterCard
function GeneralReportMasterCard() {
    var fromDate = "";
    var toDate = "";
    fromDate = $("#fromDate").val();
    toDate = $("#toDate").val();

    var parameters = {
        FromDate: fromDate,
        ToDate: toDate
    };
    Utils.Loading();
    var urlRequestAns = Utils.UrlRoot + "ReportMasterCard/MasterCardGeneralPartial";
    $.ajax({
        type: 'GET',
        url: urlRequestAns,
        data: parameters,
        success: function (data) {
            $("#ReportPartial").html(data);
            Utils.UnLoading();
        },
        error: function () {
            Utils.UnLoading();
            bootbox.alert("Hệ thống đang bận. Xin thử lại sau !");
        }
    });
};
//Tổng hợp báo cáo nạp VTC MasterCard
function ReportTopupMasterCard() {
    var fromDate = "";
    var toDate = "";
    var accountName = "";
    fromDate = $("#fromDate").val();
    toDate = $("#toDate").val();
    accountName = $("#txtAccountName").val();
    var parameters = {
        FromDate: fromDate,
        ToDate: toDate,
        AccountName: accountName
    };
    Utils.Loading();
    var urlRequestAns = Utils.UrlRoot + "ReportMasterCard/MasterCardTopupPartial";
    $.ajax({
        type: 'GET',
        url: urlRequestAns,
        data: parameters,
        success: function (data) {
            $("#ReportPartial").html(data);
            Utils.UnLoading();
        },
        error: function () {
            Utils.UnLoading();
            bootbox.alert("Hệ thống đang bận. Xin thử lại sau !");
        }
    });
};
//----------------------------------------------------------Hệ thống------------------------------------------//
//Danh sách User
function ListUsers() {
    location.href = Utils.UrlRoot + "Home/ManagerUser";
};

// Lấy thông tin User
function ViewUserData(id) {
    Utils.Loading();
    $.ajax({
        type: 'GET',
        url: Utils.UrlRoot + "Home/GetUserInfo",
        data: {
            'id': id
        },
        success: function (data) {
            Utils.UnLoading();
            $("#TemplateContent").html(data);
            $("html,body").animate({ scrollTop: 0 }, 'fast');

        }
    });
}

// Đổi Mật Khẩu 
function ViewChangePass() {
    Utils.Loading();
    $.ajax({
        type: 'GET',
        url: Utils.UrlRoot + "Home/ChangePassword",
        data: {},
        success: function (data) {
            Utils.UnLoading();
            $("#changepass").html(data);
        }
    });
}

//Update Status User
function UpdateStatusUser(id, status) {
    var type = "Vô hiệu hóa";
    if (status == 0) {
        type = "Kích hoạt";
    }
    bootbox.confirm("Bạn muốn " + type + " Tài khoản này ?", function (conf) {
        if (conf == 1) {
            var urlUpstatus = Utils.UrlRoot + "Home/UpdateActiveUser";
            Utils.Loading();
            $.ajax({
                type: 'POST',
                url: urlUpstatus,
                data: { id: id },
                success: function (data) {
                    Utils.UnLoading();
                    if (data.ResponseCode >= 0) {
                        Command: toastr["success"](data.Description, "Thông báo");
                        setTimeout(function () {
                            ListUsers();
                        }, 3000);
                    }
                    else {
                        Command: toastr["error"](data.Description, "Thông báo");
                        return;
                    }
                },
                error: function () {
                    Utils.UnLoading();
                    Command: toastr["error"]("Lỗi hệ thống. Vui lòng thử lại !", "Thông báo");
                }
            });
        }
        return;
    });
};


//Danh sách ứng dụng
function ListFunction() {
    location.href = Utils.UrlRoot + "Home/ManagerFunction";
};
//Sắp xếp chức năng
function FunctionOrder() {
    location.href = Utils.UrlRoot + "Home/FunctionOrder";
};
// View Detail Function
function ViewDataFunction(id) {
    Utils.Loading();
    $.ajax({
        type: 'GET',
        url: Utils.UrlRoot + "Home/GetFunctionInfo",
        data: {
            'id': id
        },
        success: function (data) {
            Utils.UnLoading();
            $("#TemplateContent").html(data);
            $("html,body").animate({ scrollTop: 0 }, 'fast');
        }
    });
}

//Log Screen
function logscreen() {
    location.href = Utils.UrlRoot + "Account/LockedUserView";
};
function formatlabel(num) {
    var isNegative = false;
    var formattedNumber;
    if (num < 0) {
        isNegative = true;
    }
    num = Math.abs(num)
    if (num >= 1000000000) {
        formattedNumber = (num / 1000000000).toFixed(2).replace(/\.0$/, '') + ' Tỷ';
    } else if (num >= 1000000) {
        formattedNumber = (num / 1000000).toFixed(2).replace(/\.0$/, '') + 'm';
    } else if (num >= 1000) {
        formattedNumber = (num / 1000).toFixed(2).replace(/\.0$/, '') + 'k';
    } else {
        formattedNumber = num;
    }
    if (isNegative) { formattedNumber = '-' + formattedNumber; }
    return formattedNumber;
}
function legendFormatter(label, series) {
    return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
}
function labelFormatter(label, series) {
    var IndexToMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var month = IndexToMonth[new Date(label).getMonth()];
    var year = new Date(label).getFullYear();
    return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + year + ' ' + month + "<br/>" + Math.round(series.percent) + "% </div>";
}
function legendLabel(label) {
    var IndexToMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var month = IndexToMonth[new Date(label).getMonth()];
    var year = new Date(label).getFullYear();
    return "<div style='font-size:8pt;'>" + year + ' ' + month + "</div>";
}

function recursive(bool, data, inputCheckAll, inputCheck) {
    if (data == null || data == undefined || data.length == 0)
        return;
    if (bool == null || bool == undefined)
        bool = true;
    $.each(data, function () {
        if ($(this).treegrid('isLeaf')) {
            if (bool) {
                $(this).find('input.' + inputCheck).prop('checked', true);
                $(this).find('input.IsView').prop('checked', true);
            }
            else {
                $(this).find('input.' + inputCheck).prop('checked', false);
            }
        }
        else {
            var item = $(this).find('input.' + inputCheckAll);
            if (bool) {
                item.prop('checked', true);
                $(this).find('input.CheckAllView').prop('checked', true);
            }
            else {
                item.prop('checked', false);
            }
            var id = $(this).find('input.' + inputCheckAll).attr('id');
            var listchild = $('.treegrid-' + id).treegrid('getChildNodes');
            recursive(bool, listchild, inputCheckAll, inputCheck);
        }
    });
};
function parentCheck($parent, $check, inputCheckAll, inputCheck) {
    if ($parent == null || $parent == undefined)
        return;
    var parent = $parent.treegrid('getParentNode');

    var id = $parent.treegrid('getNodeId');
    var parentId = $('.treegrid-' + id).treegrid('getParentNodeId');
    if (!$check) {
        $parent.find(inputCheckAll).prop('checked', false);
        if (parent != null && parent != undefined)
            parentCheck(parent, $check, inputCheckAll, inputCheck);
        else return;
    }
    else {
        var check = true;
        var children = $parent.treegrid('getChildNodes');
        $.each(children, function () {
            var $this = $(this);
            var checkChild = false;
            if ($this.treegrid('isLeaf')) {
                checkChild = $this.find(inputCheck).prop('checked');
            }
            else {
                checkChild = $this.find(inputCheckAll).prop('checked');
            }
            if (!checkChild) {
                check = false;
            }
        });
        $parent.find(inputCheckAll).prop('checked', check);
        if (parent != null && parent != undefined)
            parentCheck(parent, $check, inputCheckAll, inputCheck);
        else return;
    }
};
function rowspanDTable(oSettings, divId, time) {
    if (oSettings.aiDisplay.length <= 0)
        return;
    $("#" + divId + " tr td").removeAttr("hidden").removeAttr("rowspan");
    for (i = 0; i < oSettings.nTBody.childElementCount; i++) {
        for (j = 0; j < oSettings.nTBody.rows[i].childElementCount; j++) {
            var count = 1;
            var cellIndex = parseInt(oSettings.nTBody.rows[i].cells[j]._DT_CellIndex.column);
            if (oSettings.aoColumns[cellIndex].sType != "num" && oSettings.aoColumns[cellIndex].sType != "num-fmt") {
                if (oSettings.aoColumns[cellIndex].sType == "date") {
                    var strdate = oSettings.nTBody.rows[i].cells[j].textContent.toString().trim();
                    var n = strdate.indexOf("T");
                    if (n >= 0) {
                        if (n > 0) {
                            strdate = strdate.replace("T", " ");// replace time
                        }
                        else {
                            strdate = strdate.replace("T", "");// replace time
                        }
                        if (parseInt(time) == 0) { //ngày

                            var date = Utils.dateTypeFormatter(strdate, 0);
                            $('#' + divId + ' tbody tr:eq(' + i + ') td:eq(' + j + ')').text(date);
                        }
                        else if (parseInt(time) == 2) {
                            var date = Utils.dateTypeFormatter(strdate, 2);
                            $('#' + divId + ' tbody tr:eq(' + i + ') td:eq(' + j + ')').text(date);
                        }
                        else { // giờ
                            var date = Utils.dateTypeFormatter(strdate, 1);
                            $('#' + divId + ' tbody tr:eq(' + i + ') td:eq(' + j + ')').text(date);
                        }
                    }
                    if (i == 0 || (i > 0 && oSettings.nTBody.rows[i - 1].cells[j].textContent != oSettings.nTBody.rows[i].cells[j].textContent)) {
                        for (index = i + 1; index < oSettings.nTBody.childElementCount; index++) {
                            var strdate = oSettings.nTBody.rows[index].cells[j].textContent.toString();
                            if (oSettings.aoColumns[cellIndex].sType == "date") {
                                var n = strdate.indexOf("T");
                                if (n >= 0) {
                                    strdate = strdate.replace("T", " ");// replace time
                                    if (parseInt(time) == 0) {
                                        strdate = Utils.dateTypeFormatter(strdate, 0);
                                        //$('#' + divId + ' tbody tr:eq(' + i + ') td:eq(' + j + ')').text(date);
                                    }
                                    else if (parseInt(time) == 2) {
                                        strdate = Utils.dateTypeFormatter(strdate, 2);
                                    }
                                    else {
                                        strdate = Utils.dateTypeFormatter(strdate, 1);
                                        //$('#' + divId + ' tbody tr:eq(' + i + ') td:eq(' + j + ')').text(date);
                                    }
                                }
                            }
                            if (oSettings.nTBody.rows[i].cells[j].textContent != strdate)
                                break;
                            count++;
                        }
                        if (count > 1) {
                            $('#' + divId + ' tbody tr:eq(' + i + ') td:eq(' + j + ')').attr("rowspan", count);
                        }
                    }
                    else
                        $('#' + divId + ' tbody tr:eq(' + i + ') td:eq(' + j + ')').attr("hidden", "true");

                }

            }
            else {
                var number = oSettings.nTBody.rows[i].cells[j].textContent.toString();
                if (number != "" && number != null) {
                    var n = number.indexOf(" ");
                    if (n < 0) {
                        number = Utils.formatMoney(number);
                        $('#' + divId + ' tbody tr:eq(' + i + ') td:eq(' + j + ')').css("text-align", "right").text(number);
                    }
                    else {
                        $('#' + divId + ' tbody tr:eq(' + i + ') td:eq(' + j + ')').text(number);
                    }
                }
            }
        }

    }
}

var ignoreColumn = [];
var ignoreRow = [];
var rowspans = [];

function parseString(cell, rowIndex, colIndex) {
    var onCellData = null;
    var onCellHtmlData = null;
    var numbers =
        {
            html: {
                decimalMark: '.',
                thousandsSeparator: ','
            },
            output: {
                decimalMark: '.',
                thousandsSeparator: ','
            }
        };
    var escape = false;
    var result = '';
    var htmlContent = false;
    if (cell != null) {
        var $cell = $(cell);
        var htmlData = $cell.html();

        if (typeof onCellHtmlData === 'function')
            htmlData = onCellHtmlData($cell, rowIndex, colIndex, htmlData);

        if (htmlContent === true) {
            result = $.trim(htmlData);
        }
        else {
            var text = htmlData.replace(/\n/g, '\u2028').replace(/<br\s*[\/]?>/gi, '\u2060');
            var obj = $('<div/>').html(text).contents();
            text = '';
            $.each(obj.text().split("\u2028"), function (i, v) {
                if (i > 0)
                    text += " ";
                text += $.trim(v);
            });

            $.each(text.split("\u2060"), function (i, v) {
                if (i > 0)
                    result += "\n";
                result += $.trim(v).replace(/\u00AD/g, ""); // remove soft hyphens
            });

            if (numbers.html.decimalMark != numbers.output.decimalMark ||
                numbers.html.thousandsSeparator != numbers.output.thousandsSeparator) {
                var number = parseNumber(result);

                if (number !== false) {
                    var frac = ("" + number).split('.');
                    if (frac.length == 1)
                        frac[1] = "";
                    var mod = frac[0].length > 3 ? frac[0].length % 3 : 0;

                    result = (number < 0 ? "-" : "") +
                             (numbers.output.thousandsSeparator ? ((mod ? frac[0].substr(0, mod) + numbers.output.thousandsSeparator : "") + frac[0].substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + numbers.output.thousandsSeparator)) : frac[0]) +
                             (frac[1].length ? numbers.output.decimalMark + frac[1] : "");
                }
            }
        }

        if (escape === true) {
            result = escape(result);
        }

        if (typeof onCellData === 'function') {
            result = onCellData($cell, rowIndex, colIndex, result);
        }
    }

    return result;
}
function ForEachVisibleCell(tableRow, selector, rowIndex, rowCount, cellcallback) {
    if ($.inArray(rowIndex, ignoreRow) == -1 &&
        $.inArray(rowIndex - rowCount, ignoreRow) == -1) {

        var $row = $(tableRow).filter(function () {
            return $(this).data("tableexport-display") != 'none' &&
                   ($(this).is(':visible') ||
                    $(this).data("tableexport-display") == 'always' ||
                    $(this).closest('table').data("tableexport-display") == 'always');
        }).find(selector);
        var rowColspan = 0;
        var idx = 0;
        $row.each(function (colIndex) {

            if ($(this).data("tableexport-display") == 'always' ||
                ($(this).css('display') != 'none' &&
                 $(this).css('visibility') != 'hidden' &&
                 $(this).data("tableexport-display") != 'none')) {
                if ($.inArray(colIndex, ignoreColumn) == -1 &&
                    $.inArray(colIndex - $row.length, ignoreColumn) == -1) {
                    if (typeof (cellcallback) === "function") {
                        var c, Colspan = 0;
                        var r, Rowspan = 0;

                        // handle rowspans from previous rows
                        if (typeof rowspans[rowIndex] != 'undefined' && rowspans[rowIndex].length > 0) {
                            for (c = 0; c <= idx; c++) {
                                if (typeof rowspans[rowIndex][c] != 'undefined') {
                                    cellcallback(null, rowIndex, c);
                                    delete rowspans[rowIndex][c];
                                    idx++;
                                }
                            }
                        }
                        if ($(this).is("[colspan]")) {
                            Colspan = parseInt($(this).attr('colspan'));
                            rowColspan += Colspan > 0 ? Colspan - 1 : 0;
                        }

                        if ($(this).is("[rowspan]"))
                            Rowspan = parseInt($(this).attr('rowspan'));

                        // output content of current cell
                        cellcallback(this, rowIndex, idx);

                        // handle colspan of current cell
                        for (c = 1; c < Colspan; c++) {
                            cellcallback(null, rowIndex, colIndex + c);
                            idx++;
                        }

                        if (colIndex == $row.length - 1) {
                            if (typeof rowspans[rowIndex] != 'undefined' && rowspans[rowIndex].length > 0) {
                                for (c = idx + 1; c < rowspans[rowIndex].length; c++) {
                                    if (typeof rowspans[rowIndex][c] != 'undefined') {
                                        cellcallback(null, rowIndex, c);
                                        delete rowspans[rowIndex][c];
                                    }
                                }
                            }

                        }

                        // store rowspan for following rows
                        if (Rowspan) {
                            for (r = 1; r < Rowspan; r++) {
                                if (typeof rowspans[rowIndex + r] == 'undefined')
                                    rowspans[rowIndex + r] = [];

                                rowspans[rowIndex + r][idx] = "";

                                for (c = 1; c < Colspan; c++)
                                    rowspans[rowIndex + r][idx] = "";
                            }
                        }
                        idx++;
                    }
                }
            }
            if (colIndex == $row.length - 1) {
                idx = 0;
            }
        });
    }
}
function utf8Encode(string) {
    string = string.replace(/\x0d\x0a/g, "\x0a");
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
}

function base64encode(input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = utf8Encode(input);
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
                keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}
var saveAs = saveAs || function (e) { "use strict"; if (typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) { return } var t = e.document, n = function () { return e.URL || e.webkitURL || e }, r = t.createElementNS("http://www.w3.org/1999/xhtml", "a"), i = "download" in r, o = function (e) { var t = new MouseEvent("click"); e.dispatchEvent(t) }, a = /Version\/[\d\.]+.*Safari/.test(navigator.userAgent), f = e.webkitRequestFileSystem, u = e.requestFileSystem || f || e.mozRequestFileSystem, s = function (t) { (e.setImmediate || e.setTimeout)(function () { throw t }, 0) }, c = "application/octet-stream", d = 0, l = 500, w = function (t) { var r = function () { if (typeof t === "string") { n().revokeObjectURL(t) } else { t.remove() } }; if (e.chrome) { r() } else { setTimeout(r, l) } }, p = function (e, t, n) { t = [].concat(t); var r = t.length; while (r--) { var i = e["on" + t[r]]; if (typeof i === "function") { try { i.call(e, n || e) } catch (o) { s(o) } } } }, v = function (e) { if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)) { return new Blob(["\ufeff", e], { type: e.type }) } return e }, y = function (t, s, l) { if (!l) { t = v(t) } var y = this, m = t.type, S = false, h, R, O = function () { p(y, "writestart progress write writeend".split(" ")) }, g = function () { if (R && a && typeof FileReader !== "undefined") { var r = new FileReader; r.onloadend = function () { var e = r.result; R.location.href = "data:attachment/file" + e.slice(e.search(/[,;]/)); y.readyState = y.DONE; O() }; r.readAsDataURL(t); y.readyState = y.INIT; return } if (S || !h) { h = n().createObjectURL(t) } if (R) { R.location.href = h } else { var i = e.open(h, "_blank"); if (i == undefined && a) { e.location.href = h } } y.readyState = y.DONE; O(); w(h) }, b = function (e) { return function () { if (y.readyState !== y.DONE) { return e.apply(this, arguments) } } }, E = { create: true, exclusive: false }, N; y.readyState = y.INIT; if (!s) { s = "download" } if (i) { h = n().createObjectURL(t); r.href = h; r.download = s; setTimeout(function () { o(r); O(); w(h); y.readyState = y.DONE }); return } if (e.chrome && m && m !== c) { N = t.slice || t.webkitSlice; t = N.call(t, 0, t.size, c); S = true } if (f && s !== "download") { s += ".download" } if (m === c || f) { R = e } if (!u) { g(); return } d += t.size; u(e.TEMPORARY, d, b(function (e) { e.root.getDirectory("saved", E, b(function (e) { var n = function () { e.getFile(s, E, b(function (e) { e.createWriter(b(function (n) { n.onwriteend = function (t) { R.location.href = e.toURL(); y.readyState = y.DONE; p(y, "writeend", t); w(e) }; n.onerror = function () { var e = n.error; if (e.code !== e.ABORT_ERR) { g() } }; "writestart progress write abort".split(" ").forEach(function (e) { n["on" + e] = y["on" + e] }); n.write(t); y.abort = function () { n.abort(); y.readyState = y.DONE }; y.readyState = y.WRITING }), g) }), g) }; e.getFile(s, { create: false }, b(function (e) { e.remove(); n() }), b(function (e) { if (e.code === e.NOT_FOUND_ERR) { n() } else { g() } })) }), g) }), g) }, m = y.prototype, S = function (e, t, n) { return new y(e, t, n) }; if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) { return function (e, t, n) { if (!n) { e = v(e) } return navigator.msSaveOrOpenBlob(e, t || "download") } } m.abort = function () { var e = this; e.readyState = e.DONE; p(e, "abort") }; m.readyState = m.INIT = 0; m.WRITING = 1; m.DONE = 2; m.error = m.onwritestart = m.onprogress = m.onwrite = m.onabort = m.onerror = m.onwriteend = null; return S }(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this.content); if (typeof module !== "undefined" && module.exports) { module.exports.saveAs = saveAs } else if (typeof define !== "undefined" && define !== null && define.amd != null) {
    define([],
        function () { return saveAs; });
}
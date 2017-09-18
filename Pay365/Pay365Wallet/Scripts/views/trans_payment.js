payment = new function () {
    this.discount = 0;
    this.discountGame = 0;
    this.urlPaymentApi = utils.trasactionApi();
    this.listCateProduct = []; //1000001:mua mã thẻ, 1000002: thẻ game, 1000003: nạp tiền đt, 1000004:nạp tiền game
    this.listProducts = [];
    this.listSystem = [];
    this.topupType = 1;
    this.cid;
    this.pid;
    this.pcode;
    this.serviceId;
    this.ConfigCateId =
        {
            buyCardTelco: 1000001,
            buyCardGame: 1000002,
            topupMobile: 1000003,
            topupGame: 1000004
        };
    this.configTelco = [
        { 'Code': 'VTEL', 'Name': 'Viettel', 'Prefix': '096,097,098,0162,0163,0164,0165,0166,0167,0168,0169,086' },
        { 'Code': 'GPC', 'Name': 'VinaPhone', 'Prefix': '091,094,0123,0124,0125,0127,0129,088' },
        { 'Code': 'VMS', 'Name': 'Mobifone', 'Prefix': '090,093,0120,0121,0122,0126,0128,089' },
        { 'Code': 'VNM', 'Name': 'VietNamMobile', 'Prefix': '092,0188,0186' }
    ];
    this.topupGameAmount = [100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000, 20000000];
    this.productPayment = null;
    this.listCard = [];
    this.listCateGame = [];
    this.listProductGame = [];
    this.listCardSelected = [];
    this.listPaymentLogRecent = null;
    this.listTelcoRecent = null;
    this.listAccGameRecent = null;
    this.secureType = 0;
    this.actionTracking = "";
    //Từ đầu số điện thoại -> nhà mạng
    this.getTelco = function (val) {
        var obj = null;
        if (val === null || val === "" || val.length < 10)
            return;

        var prefix = val;
        prefix = val.substring(0, val.length - 7);

        $(payment.configTelco).each(function (index, data) {
            if (prefix.length > 4)
                prefix = prefix.substring(0, 4);
            var prefixNumber = data.Prefix.split(',');
            var find_obj = $.inArray(prefix, prefixNumber);
            if (find_obj >= 0)
                obj = data;
        })
        return obj;
    };
    //Khởi tạo view
    this.Init = function (type) {
        if (parseInt(type) === 1) {
            payment.GetListCategoryProduct(payment.ConfigCateId.topupMobile);
            $("#ddl_selectAmount").addClass("focus");
            $("#ddl_selectAmount").addClass("input-dropdown");
            $("#ddl_selectAmount").find(".select-wrapper").show();
            //$("#ddl_selectAmount").find("input[type=text]").attr("disabled", "disabled");
            $("#btnPaymentCheckInput").attr("onclick", "payment.TopupMobile_checkInput();");
            $("#btnPaymentConfirm").attr("onclick", "payment.TopupMobile_Confirm();");

            payment.BindTempPaymentRecent(1, "loading", function () {
                payment.getListAccountTopup();
            });

            $("#payment_step1").keypress(function (event) {
                if (event.which == 13) {
                    event.preventDefault();
                    payment.TopupMobile_checkInput();
                }
            });
            $("#txtPhoneNumber").focusin(function () {
                if ($(this).parent().find('.input-dropdown-content .dropdown-button').hasClass('active'))
                    return;

                let dropdown = $(this).parent().find('.input-dropdown-content .dropdown-button');
                setTimeout(function () {
                    dropdown.dropdown('open');
                }, 200);

            });
            $("#txtPhoneNumber").focusout(function () {
                if ($(this).parent().find('.input-dropdown-content .dropdown-button').hasClass('active')) {
                    let dropdown = $(this).parent().find('.input-dropdown-content .dropdown-button');
                    setTimeout(function () {
                        dropdown.dropdown('close');
                    }, 200);
                }
            });
            $("#txtPhoneNumber").focus();

        }
        else if (parseInt(type) === 2) {
            payment.GetListCategoryProduct(payment.ConfigCateId.topupGame);
            $("#btnPaymentCheckInput").attr("onclick", "payment.TopupGame_checkInput();");
            $("#btnPaymentConfirm").attr("onclick", "payment.TopupGame_Confirm();");
            $("#ddl_selectAmount").removeClass("input-dropdown");
            $("#ddl_selectAmount").find(".input-dropdown-content").hide();
            $("#ddl_selectAmount").removeClass("focus");
            $("#ddl_selectAmount").find(".dropdown-button").removeClass("select-only");
            payment.BindListCard();
            payment.BindTempPaymentRecent(5, "loading", function () {
                $(".box-bank-icon .bank-icon").on('mousemove', function (e) {
                    $(this).find('img').removeClass("animated zoomIn");
                    var target = e.currentTarget; var findIcon = $(target).find('img');
                    findIcon.addClass('animated zoomIn');
                }).on('mouseout', function (e) {
                    var target = e.currentTarget; var findIcon = $(target).find('img');
                    findIcon.removeClass('animated zoomIn');
                });
            });
            $("#payment_step1").keypress(function (event) {
                if (event.which == 13) {
                    event.preventDefault();
                    payment.TopupGame_checkInput();
                }
            });

            $("#txtNickname").focusin(function () {
                if ($(this).parent().find('.input-dropdown-content .dropdown-button').hasClass('active'))
                    return;

                let dropdown = $(this).parent().find('.input-dropdown-content .dropdown-button');
                setTimeout(function () {
                    dropdown.dropdown('open');
                }, 200);

            });
            $("#txtNickname").focusout(function () {
                if ($(this).parent().find('.input-dropdown-content .dropdown-button').hasClass('active')) {
                    let dropdown = $(this).parent().find('.input-dropdown-content .dropdown-button');
                    setTimeout(function () {
                        dropdown.dropdown('close');
                    }, 200);
                }
            });
        }
        else if (parseInt(type) === 3) {
            payment.GetListCategoryProduct(payment.ConfigCateId.buyCardTelco);
            $("#btnPaymentCheckInput").attr("onclick", "payment.BuyCard_checkInput();");
            $("#btnPaymentConfirm").attr("onclick", "payment.BuyCard_Confirm();");
            payment.BindListCard();
            payment.BindTempPaymentRecent(6, "loading", function () {
                $(".box-bank-icon .bank-icon").on('mousemove', function (e) {
                    $(this).find('img').removeClass("animated zoomIn");
                    var target = e.currentTarget; var findIcon = $(target).find('img');
                    findIcon.addClass('animated zoomIn');
                }).on('mouseout', function (e) {
                    var target = e.currentTarget; var findIcon = $(target).find('img');
                    findIcon.removeClass('animated zoomIn');
                });
            });
            $("#payment_step1").keypress(function (event) {
                if (event.which == 13) {
                    event.preventDefault();
                    payment.BuyCard_checkInput();
                }
            });
        }
        else if (parseInt(type) === 4) {
            payment.GetListCategoryProduct(payment.ConfigCateId.buyCardGame);
            $("#btnPaymentCheckInput").attr("onclick", "payment.BuyCard_checkInput();");
            $("#btnPaymentConfirm").attr("onclick", "payment.BuyCard_Confirm();");
            payment.BindListCard();
            payment.BindTempPaymentRecent(4, "loading", function () {
                $(".box-bank-icon .bank-icon").on('mousemove', function (e) {
                    $(this).find('img').removeClass("animated zoomIn");
                    var target = e.currentTarget; var findIcon = $(target).find('img');
                    findIcon.addClass('animated zoomIn');
                }).on('mouseout', function (e) {
                    var target = e.currentTarget; var findIcon = $(target).find('img');
                    findIcon.removeClass('animated zoomIn');
                });
            });
            $("#payment_step1").keypress(function (event) {
                if (event.which == 13) {
                    event.preventDefault();
                    payment.BuyCard_checkInput();
                }
            });
        }
        else {
            payment.GetListCategoryProduct(payment.ConfigCateId.topupMobile);
            payment.GetListCategoryGame(payment.ConfigCateId.topupGame);
            $("#View_PaymentConfirm").modal({
                dismissible: false,
                ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.

                },
                complete: function () {
                    $("#txtVerifyCode").removeClass("error");
                    $("#txtVerifyCode").val('');
                    $("#txtVerifyCode").siblings(".error-text").html('');
                    $("#txtVerifyCode").parent().find(".alert-danger").html('').hide();
                } // Callback for Modal close
            });
            //Lấy ds log nạp mobile
            payment.getPaymentLogs(1, function (data) {
                payment.getListAccountTopup('', data);
            });
            //Lấy ds log nạp game
            payment.getPaymentLogs(5, function (data) {
                payment.listAccGameRecent = data;
            });

            $('#txtPhoneNumber, #txtNickname').focusin(function (e) {
                if ($(this).parent().find('.input-dropdown-content .dropdown-button').hasClass('active'))
                    return;

                let dropdown = $(this).parent().find('.input-dropdown-content .dropdown-button');
                setTimeout(function () {
                    dropdown.dropdown('open');
                }, 200);
            });
            $("#txtPhoneNumber, #txtNickname").focusout(function () {
                if ($(this).parent().find('.input-dropdown-content .dropdown-button').hasClass('active')) {
                    let dropdown = $(this).parent().find('.input-dropdown-content .dropdown-button');
                    setTimeout(function () {
                        dropdown.dropdown('close');
                    }, 200);
                }
            });
            $('#txtPhoneNumber, #txtNickname').click(function (e) {
                let dropdown = $(this).parent().find('.input-dropdown-content .dropdown-button');
                setTimeout(function () {
                    dropdown.dropdown('open');
                }, 100);
            });
            $("#payment_topupMobile").keypress(function (event) {
                if (event.which == 13) {
                    event.preventDefault();
                    payment.TopupMobileMain_CheckInput();
                }
            });
            $("#payment_topupGame").keypress(function (event) {
                if (event.which == 13) {
                    event.preventDefault();
                    payment.TopupGameMain_CheckInput();
                }
            });
            $("#View_PaymentConfirm").keypress(function (event) {
                if (event.which == 13) {
                    event.preventDefault();
                    $("#btnPaymentConfirm").click();
                }
            });
            $("#ddr-select-gameAmount").parent().find(".dropdown-content.active li").click(function () {
                let dropdown = $(this).closest('.select-wrapper').find('input.select-dropdown.active');
                dropdown.dropdown('close');
            });
            $('#payment_topupMobile #payment_step1, #payment_topupGame').bind('heightChange', function () {
                $('#payment_topupMobile #payment_step1').removeAttr('style');
                $('#payment_topupGame').removeAttr('style');
                var heigh1 = $('#payment_topupMobile #payment_step1').height();
                var heigh2 = $('#payment_topupGame').height();
                if (heigh1 == heigh2)
                    return;
                var totalHeight1 = $('#payment_topupMobile #payment_step1').height();
                var totalHeight2 = $('#payment_topupGame').height();

                //$('#payment_topupMobile #payment_step1').children().each(function () {
                //    if ($(this).is(":visible")) {
                //        var currHeight = $(this).outerHeight(true);
                //        totalHeight1 = totalHeight1 + currHeight;
                //    }
                //});
                //$('#payment_topupGame').children().each(function () {
                //    if ($(this).is(":visible")) {
                //        var currHeight = $(this).outerHeight(true);
                //        totalHeight2 = totalHeight2 + currHeight;
                //    }
                //});
                if (totalHeight1 > totalHeight2)
                    $('#payment_topupGame').height(totalHeight1);
                else
                    $('#payment_topupMobile #payment_step1').height(totalHeight2);
            });
            payment.changeSelectGameAmount();
            $("#btnPaymentGameCheckInput").addClass("disabled");
        }
        $("#discount").text(parseFloat(payment.discount) + "%");
        $("#txtQuantity").change(function (event) {
            utils.ChangeText(event);
            payment.calculateTotalAmount();
        });
    };
    //Tìm kiếm sản phẩm textsearch
    this.searchListProduct = function () {
        var textSearch = $("#input-id").val();

        if (textSearch.trim() == "") {
            $("#list-item-payment").find(".box-bank-icon").show();
            return;
        }
        var textUTF = utils.convertUTFStr(textSearch);
        var word = textUTF.split('-');
        var listItem = $("#list-item-payment").find("a.bank-icon");
        if (listItem === undefined || listItem.length <= 0)
            return;
        $("#list-item-payment").find(".box-bank-icon").hide();
        $.each(listItem, function (key, val) {
            var $productName = $(val).find(".productName").text();
            var $productNameUTF = utils.convertUTFStr($productName);
            var prdName = $productNameUTF.split('-');

            if (textSearch === $productName || $productName.indexOf(textSearch) >= 0 || $productNameUTF.indexOf(textUTF) >= 0) {
                $(val).parent().show();
                return;
            }

        });
    };
    //Lấy ds danh mục sp
    this.GetListCategoryProduct = function (parentCateId, cateId) {
        var parent_CateId = !parentCateId ? -1 : parentCateId;
        var cate_Id = !cateId ? 0 : cateId;
        utils.getData(payment.urlPaymentApi + "payment/ProductGetCategories", { ParentCategoryID: parent_CateId, CategoryID: cate_Id }, function (data) {
            if (data.c >= 0) {
                if (data.p != null && data.p.length > 0) {
                    data.p = data.p.filter(function (x) { return x.IsWeb === true; });
                    data.p.sort(function (a, b) {
                        if (a.IsHot === b.IsHot && a.DisplayOrder === b.DisplayOrder)
                            return 0;
                        else if (a.IsHot === b.IsHot)
                            return a.DisplayOrder > b.DisplayOrder ? 1 : -1;
                        else if (!a.IsHot && b.IsHot)
                            return 1;
                        else
                            return -1;
                    });
                }
                payment.listCateProduct = data.p;
                return;
            }
        }, function (dataErr) {
            console.log(dataErr);
            return;
        }, "", false);
    };
    //Lấy ds game topup
    this.GetListCategoryGame = function (parentCateId, cateId) {
        var parent_CateId = !parentCateId ? -1 : parentCateId;
        var cate_Id = !cateId ? 0 : cateId;
        utils.getData(payment.urlPaymentApi + "payment/ProductGetCategories", { ParentCategoryID: parent_CateId, CategoryID: cate_Id }, function (data) {
            if (data.c >= 0 && data.p != null && data.p.length > 0) {
                data.p = data.p.filter(function (x) { return x.IsWeb === true && x.Status === 1; });
                data.p.sort(function (a, b) {
                    if (a.IsHot === b.IsHot && a.DisplayOrder === b.DisplayOrder)
                        return 0;
                    else if (a.IsHot === b.IsHot)
                        return a.DisplayOrder > b.DisplayOrder ? 1 : -1;
                    else if (!a.IsHot && b.IsHot)
                        return 1;
                    else
                        return -1;
                });
                payment.listCateGame = data.p;
                $("#ddr-select-game option").each(function (key, val) {
                    if (key > 0) {
                        var x = document.getElementById("ddr-select-game");
                        x.remove(1);
                    }
                });
                $("#ddr-select-game").material_select();
                $.each(payment.listCateGame, function (k, v) {
                    var item = '<option value="' + v.CategoryID + '" data-icon="' + v.Logo + '" class="left circle">' + v.CategoryName + '</option >';
                    $("#ddr-select-game").append(item);
                });
                $("#ddr-select-game").material_select();
                return;
            }
        }, function (dataErr) {
            console.log(dataErr);
            return;
        }, "", false);
    };
    //xử lý khi thay đổi game topup
    this.changeSelectGame = function (target) {
        $(target).parent().siblings("label.error").removeClass("error");
        $(target).parent().siblings(".error-text").text('');
        $(target).siblings("input.error").removeClass("error");
        $(target).siblings("input.select-dropdown").attr("style", "color: #4e465b;font-weight:500;");
        $("#payment_topupGame").trigger('heightChange');
        //bind ds tk đã nạp
        var cateId = $(target).val();
        payment.cid = parseInt(cateId);
        payment.GetListProductGame(payment.cid, 0, header.AccountInfo.Username, function (data) {
            if (data != null && data.length > 0) {
                payment.discountGame = parseFloat(data[0].DiscountRate);
                payment.pcode = data[0].ProductCode;
                $("#ddr-select-gameAmount").html('');
                $("#ddr-select-gameAmount").material_select();
                $.each(payment.topupGameAmount, function (k, v) {
                    var p_discount = payment.discountGame;
                    var p_amount = v - (v * p_discount / 100);

                    var item = '<option value="' + v + '" data-content="' + utils.formatMoney(v) + ' <sup>VNĐ</sup><strong class=\'label secondary\' style=\'float:right;font-weight:400;margin-top:3px\'>' + utils.formatMoney(p_amount) + '<sup>VNĐ</sup></strong>">' + utils.formatMoney(v) + '</option>';
                    $("#ddr-select-gameAmount").append(item);
                });
                $("#ddr-select-gameAmount").material_select();
                payment.changeSelectGameAmount();
            }
        }, function (err) {
            console.log(err);
        }, false);
        //Lấy ds mệnh giá theo cId

        payment.getListAccountTopup(parseInt(cateId), payment.listAccGameRecent);

        if ($("#txtNickname").val().trim() === "" || $("#txtNickname").hasClass("error")) {
            $("#txtNickname").focus();
        }
    }
    //Lấy ds sản phẩm
    this.GetListProducts = function (cateId, productId, username, callback, callbackErr, asyn) {
        var objReq = {
            CategoryID: !cateId ? -1 : cateId,
            ProductID: !productId ? 0 : productId,
            Username: !username ? "" : username
        };
        utils.getData(payment.urlPaymentApi + "payment/ProductGetProducts", objReq, function (data) {
            if (data.c >= 0) {
                if (data.p != null && data.p.length > 0)
                    data.p = data.p.filter(function (x) { return x.IsWeb === true; });

                payment.listProducts = data.p;

                if (typeof callback === "function")
                    callback(data.p);
            }
        }, function (dataErr) {
            if (typeof callbackErr === "function")
                callbackErr(dataErr);
        }, "", asyn);
    };
    this.GetListProductGame = function (cateId, productId, username, callback, callbackErr, asyn) {
        var objReq = {
            CategoryID: !cateId ? -1 : cateId,
            ProductID: !productId ? 0 : productId,
            Username: !username ? "" : username
        };
        utils.getData(payment.urlPaymentApi + "payment/ProductGetProducts", objReq, function (data) {
            if (data.c >= 0) {
                if (data.p != null && data.p.length > 0)
                    data.p = data.p.filter(function (x) { return x.IsWeb === true; });

                payment.listProductGame = data.p;
                if (typeof callback === "function")
                    callback(data.p);
            }
        }, function (dataErr) {
            if (typeof callbackErr === "function")
                callbackErr(dataErr);
        }, "", asyn);
    };
    //Lấy ds mệnh giá
    this.GetListAmount = function (target, nextOpen) {

        var currChk = $("#payment_step1").find("input[type=radio]:checked");
        var typeChk = currChk.attr("id");

        var mobileValue = $(target).val();

        mobileValue = mobileValue.replace(/[-]/g, '');
        var telco = payment.getTelco(mobileValue);
        if (telco == null) {
            $("#ddr-select-amount").html('');
            var findVwMain = $("#payment_topupMobile");
            if (findVwMain && findVwMain.length == 1) {
                var item = '<option value="" disabled selected>' + (utils.getCurrentLanguage() == 'en' ? 'Unit price' : 'Mệnh giá') + '</option>';
                $("#ddr-select-amount").append(item);
            }
            //$("#ddr-select-amount").material_select();
            return;
        }
        var telco_Code = telco.Code;

        if (typeChk == "tra-truoc")
            telco_Code += "@BEFORE";
        else
            telco_Code += "@AFTER";
        var m_category = payment.listCateProduct.find(function (x) {
            return x.ParentCategoryID === payment.ConfigCateId.topupMobile && x.CategoryCode == telco_Code
        });
        if (m_category != null && m_category.CategoryID > 0)
            payment.cid = m_category.CategoryID;

        payment.GetListProducts(payment.cid, 0, header.AccountInfo.Username, function (data) {
            if (data != null && data.length > 0) {
                if (typeChk == "tra-sau") {
                    payment.pid = data[0].ProductID;
                    payment.discount = parseFloat(data[0].DiscountRate);
                    $("#discount").text(payment.discount + "%");
                    return;
                }
                else {
                    $("#ddr-select-amount").html('');
                    $("#ddr-select-amount").material_select();
                    $.each(data, function (k, v) {
                        var p_discount = parseFloat(v.DiscountRate);
                        var p_amount = parseInt(v.PartnerValue) - (parseInt(v.PartnerValue) * p_discount / 100);
                        var item = '<option' + (k == 0 ? ' seclected' : '') + ' data-pid="' + v.ProductID + '" data-pcode="' + v.ProductCode + '" value="' + v.PartnerValue + '" data-content="' + utils.formatMoney(v.PartnerValue) + ' <sup>VNĐ</sup><strong class=\'label secondary\' style=\'float:right;font-weight:400;margin-top:3px\'>' + utils.formatMoney(p_amount) + '<sup>VNĐ</sup></strong>">' + utils.formatMoney(v.PartnerValue) + '</option>';
                        $("#ddr-select-amount").append(item);
                    });
                    $("#ddr-select-amount").material_select();
                    if (!$("#ddr-select-amount").parent().siblings('label').hasClass('active'))
                        $("#ddr-select-amount").parent().siblings('label').addClass('active');
                    if (nextOpen && !$("#txtPhoneNumber").hasClass("error") && $("#txtPhoneNumber").val().trim() != "") {
                        var dropdown = $("#ddr-select-amount").parent().find('input.select-dropdown');
                        dropdown.dropdown('open');
                    }
                    $("#ddl_selectAmount .dropdown-content.active li").click(function (e) {
                        dropdown.dropdown('close');
                    });
                    payment.calculateTotalAmount();
                }
            }
        }, function (dataErr) {
            return;
        });
    };
    //giao dịch gần đây
    //1: nạp tiền trả trước
    //2: nạp tiền trả trước từ ngân hàng
    //3: Nạp tiền trả sau
    //4: Nạp tiền trả sau từ ngân hàng,
    //5: Nạp tài khoản game,
    //6: Mua mã thẻ
    this.getPaymentLogs = function (serviceId, callback, callbackError) {
        utils.getData(utils.trasactionApi() + "payment/GetPaymentLogs", { serviceId: serviceId }, function (data) {
            if (data.c >= 0 && data.p && data.p.length > 0) {
                if (typeof callback == "function")
                    callback(data.p);
            }
        }, function (err) {
            console.log(err);
            if (typeof callbackError == "function")
                callbackError();
        });
    };

    this.BindTempPaymentRecent = function (serviceId, loading, callback) {
        if (loading)
            utils.paragraphLoading('payment_recent_t');
        utils.getData(utils.trasactionApi() + "payment/GetPaymentLogs", { serviceId: serviceId }, function (data) {
            if (data.c >= 0 && data.p && data.p.length > 0) {
                payment.listPaymentLogRecent = data.p;
                payment.listPaymentLogRecent.sort(function (a, b) {
                    return parseFloat(b.JsonObject.TransactionID) - parseFloat(a.JsonObject.TransactionID);
                });
                var listProductRecent = [];
                $.each(payment.listPaymentLogRecent, function (key, val) {
                    payment.listPaymentLogRecent[key].CateInfo = null;
                    var m_cate = payment.listCateProduct.find(function (c) {
                        return c.CategoryID === val.JsonObject.CategoryID
                    });
                    if (m_cate != null && m_cate != undefined) {
                        payment.listPaymentLogRecent[key].CateInfo = m_cate;
                        var findCate = listProductRecent.find(function (c) {
                            return c.CategoryID === m_cate.CategoryID
                        });
                        if (((serviceId == 6 && listProductRecent.length < 2) || serviceId == 4 || serviceId == 5) && (key == 0 || findCate == undefined))
                            listProductRecent.push(m_cate);
                    }
                });

                $("#list_item_recent_t").html($("#list_item_recent_tmpl").tmpl({ listPaymentRecent: listProductRecent })).show();
                $("#payment_recent_t").html($("#payment_recent_t_tmpl").tmpl({ listPaymentRecent: payment.listPaymentLogRecent }));
                if (typeof callback == "function")
                    callback();
            }
            else
                $("#list_item_recent_t").html('').hide();
        }, function (err) {
            console.log(err);
            $("#payment_recent_t").html('');
        });
    };

    //Bind danh sách thẻ bán
    this.BindListCard = function () {
        $("#list-item-payment").html('');
        var l_category = payment.listCateProduct;
        if (l_category != null && l_category.length > 0) {

            $.each(l_category, function (k, v) {
                var item = '<div class="box-bank-icon service"><a href="javascript:;" onclick="payment.Vw_BuyCard(this);" data-ccode="' + v.CategoryCode + '" data-cid="' + v.CategoryID + '" class="bank-icon"><img src="' + ((v.Logo == null || v.Logo == "") ? utils.rootUrl() + "/Content/assets/images/logo.jpg" : v.Logo) + '" alt="' + v.Description + '"><span class="badge">' + (parseFloat(v.DiscountRate) > 0 ? "-" + v.DiscountRate + "%" : "") + '</span><span class="productName">' + v.Description + '</a></div>';
                $("#list-item-payment").append(item);
            });
        }
    }
    //Lấy ds tài khoản nạp gần đây
    this.getListAccountTopup = function (cid, logRecent) {

        var paymentLog = payment.listPaymentLogRecent;
        if (logRecent)
            paymentLog = logRecent;

        if (paymentLog == null || paymentLog.length <= 0)
            return;
        var type = 2;
        var listAccount = [];

        var ddl_id = "ddr-input-phone";
        //tài khoản game
        if (cid) {
            paymentLog = paymentLog.filter(function (x) { return x.JsonObject.CategoryID === parseInt(cid); });
            type = 3;
            ddl_id = "ddr-input-nick";
        }
        else { //số mobile nạp
            var currChk = $("#payment_step1").find("input[type=radio]:checked");
            var typeChk = currChk.attr("id");
            var typeTopupMobile = "@BEFORE";
            if (typeChk == "tra-sau")
                typeTopupMobile = "@AFTER";
            var lstCateID = payment.listCateProduct.filter(function (x) { return x.CategoryCode.indexOf(typeTopupMobile) >= 0 });
            if (lstCateID != undefined && lstCateID != null && lstCateID.length > 0)
                paymentLog = paymentLog.filter(function (e) {
                    return lstCateID.find(function (c) {
                        return c.CategoryID === e.JsonObject.CategoryID
                    });
                });
        }
        $("#" + ddl_id).html('');
        if (paymentLog == null || paymentLog == undefined || paymentLog.length <= 0)
            return;
        $.each(paymentLog, function (k, v) {
            var find = listAccount.indexOf(v.JsonObject.UserName);
            if (find <= -1) {
                var item = '<li><a data-value="' + v.JsonObject.UserName + '">' + v.JsonObject.UserName + '</a></li>';
                if (!cid) {
                    var m_cate = payment.listCateProduct.find(function (x) {
                        return x.CategoryID === v.JsonObject.CategoryID;
                    });
                    console.log(m_cate.Logo);
                    item = '<li><a data-value="' + v.JsonObject.UserName + '">' + v.JsonObject.UserName + '<img src="' + m_cate.Logo + '" align="right" width="70" height="30"/></a></li>';
                }
                $("#" + ddl_id).append(item);
                listAccount.push(v.JsonObject.UserName);
            }
        });

        //$.each(listAccount, function (k, v) {
        //    var item = '<li><a data-value="' + v + '">' + v + '</a></li>';
        //    $("#" + ddl_id).append(item);
        //});
        $("#" + ddl_id + " li").click(function (e) {
            var target = e.currentTarget;
            payment.selectInputValue(target, type);
        });
    };
    //Lấy chi tiết giao dịch
    this.getTransactionDetail = function (target, transId) {
        var idContent = $(target).find("#trans_detail_t").html();
        if (idContent.trim() !== '')
            return;

        if (transId == null || transId == undefined || parseInt(transId) <= 0)
            return;
        var objReq = {
            TransID: parseInt(transId)
        };
        utils.paragraphTargetLoading($(target).find("#trans_detail_t"));
        utils.postData(payment.urlPaymentApi + "payment/GetHistory", objReq, function (data) {
            if (data.c >= 0 && data.p && data.p.length > 0) {
                var TransDetail = data.p[0];

                $(target).find("#trans_detail_t").html($("#trans_detail_tmpl").tmpl(TransDetail));
            }
        }, function (dataErr) {

        });
    }

    this.actionView = function (IdSlide, typeAction, destinationDiv) {
        var currentDiv = $("#" + IdSlide).find(".div_active");
        currentDiv.find(".alert-danger").html('').hide();
        typeAction = typeAction === undefined ? 'next' : typeAction;

        if (currentDiv.index() == 0 && typeAction == "prev")
            return;
        else if (currentDiv.index() == 1 && typeAction == "prev") {
            $("#ddr-select-amount").val('');
            $("#ddr-select-amount").material_select();
            $("#txtQuantity").val('1');
            $("#payment_recent_t li.active").find(".collapsible-header").click();
        }
        if (typeAction == "prev") {
            currentDiv.find(".error-text").html('');
            currentDiv.find("input.error").val('');
            currentDiv.find("input.error").removeClass("error");
            $("#payment_recent_t li.active").find(".collapsible-header").click();
        }
        destinationDiv = destinationDiv === undefined ? "View_ListItem" : destinationDiv;

        SlideToogle(IdSlide, typeAction, destinationDiv);
    };
    //Thay đổi loại topup mobile (trước/sau)
    this.select_Type = function (event) {
        var target = event.target;
        var chk = $(target).prop("checked");
        if (chk == false)
            return;
        var dropdown = $("#txtPhoneNumber").parent().find('.input-dropdown-content .dropdown-button');
        $("#txtAmount").val('');
        //$("#txtAmount").siblings("label.active").removeClass("active");
        $("#payment_step1").find(".alert-danger").html('').hide();
        $("#totalAmount").html("0<sup>VNĐ</sup>");
        payment.getListAccountTopup();
        var id = $(target).attr("id");
        if (id == "tra-truoc") {
            $("#ddl_selectAmount").addClass("focus");
            $("#ddl_selectAmount").addClass("input-dropdown");
            $("#ddl_selectAmount").find(".select-wrapper").show();
            $("#txtAmount").attr("type", "hidden");
            payment.GetListAmount($("#txtPhoneNumber"), true);
            $("#choose_amount").hide();
        }
        else {
            $("#ddl_selectAmount").removeClass("input-dropdown");
            $("#ddl_selectAmount").find(".select-wrapper").hide();
            $("#ddl_selectAmount").removeClass("focus");
            $("#txtAmount").attr("type", "text");
            //payment.GetListAmount($("#txtPhoneNumber"), true, true);
            $("#choose_amount").show();
        }
        if ($("#txtPhoneNumber").val().trim() === "" || $("#txtPhoneNumber").hasClass("error")) {
            $("#txtPhoneNumber").focus();
        }
        else if ($("#txtAmount").val().trim() == "" || $("#txtAmount").hasClass("error")) {
            if (id == "tra-sau")
                $("#txtAmount").focus();
        }
    };
    this.change_TopupMobile = function (event) {
        var target = event.target;
        var chk = $(target).prop("checked");
        if (chk == false)
            return;
        $("#txtAmount").val('');
        $("#payment_step1").find(".alert-danger").html('').hide();
        $("#totalAmount").html("0<sup>VNĐ</sup>");
        var dropdown = $("#txtPhoneNumber").parent().find('.input-dropdown-content .dropdown-button');
        var id = $(target).attr("id");

        if (id == "tra-truoc") {
            $("#ddl_selectAmount").addClass("focus");
            $("#ddl_selectAmount").addClass("input-dropdown");
            $("#ddl_selectAmount").find(".select-wrapper").show();
            $("#txtAmount").attr("type", "hidden");
            payment.GetListAmount($("#txtPhoneNumber"), true);
        }
        else {
            $("#ddl_selectAmount").removeClass("input-dropdown");
            $("#ddl_selectAmount").removeClass("focus");
            $("#ddl_selectAmount").find(".select-wrapper").hide();
            $("#txtAmount").attr("type", "text");
            //payment.GetListAmount($("#txtPhoneNumber"), true);
        }
        if ($("#txtPhoneNumber").val().trim() == "" || $("#txtPhoneNumber").hasClass("error")) {
            $("#txtPhoneNumber").focus();
        }
        else if ($("#txtAmount").val().trim() == "" || $("#txtAmount").hasClass("error")) {
            if (id == "tra-sau") $("#txtAmount").focus();
        }
    };
    //Thay đổi mệnh giá
    this.changeAmount = function () {
        utils.translateLang('transaction.payment');
        var amount = $("#txtAmount");
        amount.siblings('.error-text').html('');
        amount.removeClass('error');

        var AmountValue = amount.val().replace(/[,.]/g, '');
        var totalAmount = 0;
        if (parseInt(AmountValue) < 6000) {
            amount.siblings('.error-text').html($.t("error.amountMin"));
            amount.siblings('.error-text').show();
            amount.addClass('error');
        }
        var mobileValue = $("#txtPhoneNumber").val();
        var telco = payment.getTelco(mobileValue);
        if (telco != null && telco != undefined) {
            var telco_Code = telco.Code;
            if (telco_Code === "GPC" && parseInt(AmountValue) > 1000000) {
                AmountValue = 1000000;
                amount.value = utils.formatMoney(AmountValue);
                amount.siblings('.error-text').html($.t("error.amountMax"));
                amount.siblings('.error-text').show();
                amount.addClass('error');
            }
        }

        if (!utils.validateNumberOnly(AmountValue) || parseInt(AmountValue) < 0) {
            totalAmount = 0;
            $("#totalAmount").html("0<sup>VNĐ</sup>");
            return;
        }
        totalAmount = parseInt(AmountValue);
        if (payment.discount > 0) {
            totalAmount -= Math.round(totalAmount * (parseFloat(payment.discount) / 100));
        }

        totalAmount = utils.formatMoney(totalAmount) + "<sup>VNĐ</sup>";
        $("#totalAmount").html(totalAmount);
    };

    this.changeSelectAmount = function () {
        var amount = $("#ddr-select-amount option:selected");
        if (amount.val() === "")
            return;
        $("#ddr-select-amount").parent().siblings("label.error").removeClass("error");
        $("#ddr-select-amount").parent().siblings(".error-text").text('');
        $("#ddr-select-amount").siblings("input.error").removeClass("error");

        payment.calculateTotalAmount();
        $("#ddr-select-amount").siblings("input.select-dropdown").attr("style", "color: #4e465b;font-weight:500;");
        $("#payment_step1").trigger('heightChange');
    };
    this.calculateTotalAmount = function () {
        var amount = $("#ddr-select-amount option:selected");
        payment.pid = amount.data("pid");
        payment.pcode = amount.data("pcode");
        if (payment.pid == null || payment.pid == undefined)
            return;

        if (amount.val() === "")
            return;
        payment.productPayment = payment.listProducts.find(function (p) {
            return p.ProductID === parseInt(payment.pid);
        });
        payment.discount = parseFloat(payment.productPayment.DiscountRate);
        var quantity = $("#txtQuantity").val();
        var AmountValue = amount.val().replace(/[,.]/g, '');
        var totalAmount = 0;
        if (!quantity)
            quantity = 1;
        $("#discount").text(payment.discount + "%");
        if (!utils.validateNumberOnly(AmountValue) || parseInt(AmountValue) < 0 || !utils.validateNumberOnly(quantity) || parseInt(quantity) < 0) {
            totalAmount = 0;
            $("#totalAmount").text(totalAmount);
            return;
        }
        totalAmount = parseInt(AmountValue) * parseInt(quantity);
        if (payment.discount > 0) {
            totalAmount -= Math.round(totalAmount * (parseFloat(payment.discount) / 100));
        }

        totalAmount = utils.formatMoney(totalAmount) + "<sup>VNĐ</sup>";
        $("#totalAmount").html(totalAmount);
    }
    this.changeSelectGameAmount = function (type) {
        var discount_id = "discountGame";
        var totalAmount_id = "totalAmountGame";
        if (type && type == 1) {
            discount_id = "discount";
            totalAmount_id = "totalAmount";
        }
        $("#ddr-select-gameAmount").parent().siblings("label.error").removeClass("error");
        $("#ddr-select-gameAmount").parent().siblings(".error-text").text('');
        $("#ddr-select-gameAmount").siblings("input.error").removeClass("error");
        var amount = $("#ddr-select-gameAmount option:selected");
        if (amount.val() === "")
            return;
        var AmountValue = amount.val().replace(/[,.]/g, '');
        //payment.productPayment = payment.listProducts.find(p => p.ProductID === parseInt(payment.pid));
        //payment.discount = parseFloat(payment.productPayment.DiscountRate);
        //var quantity = $("#txtQuantity").val();
        var totalAmount = AmountValue;
        $("#" + discount_id).text(payment.discountGame + "%");

        if (!utils.validateNumberOnly(AmountValue) || parseInt(AmountValue) < 0) {
            totalAmount = "0<sup>VNĐ</sup>";
            $("#" + totalAmount_id).html(totalAmount);
            return;
        }
        if (payment.discountGame > 0) {
            totalAmount -= Math.round(totalAmount * (parseFloat(payment.discountGame) / 100));
        }

        totalAmount = utils.formatMoney(totalAmount) + "<sup>VNĐ</sup>";
        $("#" + totalAmount_id).html(totalAmount);
        $("#ddr-select-gameAmount").siblings("input.select-dropdown").attr("style", "color: #4e465b;font-weight:500;");
        $("#payment_topupMobile #payment_step1").trigger('heightChange');
    };

    this.selectInputValue = function (target, typeFormat) {
        var value_select = $(target).find("a").attr('data-value');

        var $_input = $(target).parents('.input-dropdown-content').siblings('input')
        var $_label = $_input.next('label');
        $_input.removeClass("error");
        $_input.siblings(".error-text").html('');
        $("#payment_step1").trigger('heightChange');
        if (typeFormat === 1)//money
        {
            value_select = utils.formatMoney(value_select);
            $_input.val(value_select);
            payment.pid = $(target).find("a").attr("data-pid");
            payment.pcode = $(target).find("a").attr("data-pcode");
            payment.productPayment = payment.listProducts.find(function (p) {
                return p.ProductID === parseInt(payment.pid);
            });
            payment.discount = parseFloat(payment.productPayment.DiscountRate);
            payment.pid = parseInt(payment.pid);
            $("#discount").text(payment.discount + "%");
            payment.changeAmount();
        }
        else if (typeFormat === 2)//phone
        {
            value_select = utils.numberPhoneFormat(value_select);
            $_input.val(value_select);
            payment.GetListAmount($_input, true);
            if ($("#txtAmount").val().trim() == "" || $("#txtAmount").hasClass("error")) {
                if ($("#tra-sau").prop("checked")) $("#txtAmount").focus();
            }
        }
        else if (typeFormat === 3) //NickName
        {
            $_input.val(value_select);
            //var dropdown = $("#ddr-select-gameAmount").parent().find('.select-dropdown');
            //dropdown.dropdown('open');
            $("#ddr-select-gameAmount").parent().find(".dropdown-content.active li").click(function (e) {
                let dropdown = $(this).closest('.select-wrapper').find('input.select-dropdown.active');
                dropdown.attr("style", "color: #4e465b;font-weight:500;");
                dropdown.dropdown('close');
            });
        }

        if (!$_label.hasClass('active'))
            $_label.addClass('active');

    };

    this.TopupMobile_checkInput = function () {
        utils.translateLang('transaction.payment');
        $("#payment_step1").find(".alert-danger").html('').hide();

        if ($("#btnPaymentCheckInput").hasClass('disabled'))
            return;
        var currChk = $("#payment_step1").find("input[type=radio]:checked");
        var typeChk = currChk.attr("id");
        var mobile = $("#txtPhoneNumber");
        var mobileValue = mobile.val().replace(/[-]/g, '');
        if (mobileValue === '') {
            mobile.focus();
            mobile.siblings('.error-text').html(i18n.t('error.inputPhone'));
            mobile.siblings('.error-text').show();
            mobile.addClass('error');
            return;
        }

        if (!mobileValue.match('^0')) {
            mobile.focus();
            mobile.siblings('.error-text').html($.t('error.phoneInvalid'));
            mobile.siblings('.error-text').show();
            mobile.addClass('error');
            return;
        }

        if (mobileValue.length < 9 || mobileValue.length > 11) {
            mobile.focus();
            mobile.siblings('.error-text').html($.t('error.phoneInvalid'));
            mobile.siblings('.error-text').show();
            mobile.addClass('error');
            return;
        }
        var AmountValue = "";
        var topupAmount = $("#txtAmount");
        var telco = payment.getTelco(mobileValue);
        if (telco == null) {
            mobile.focus();
            mobile.siblings('.error-text').html($.t('error.phoneInvalid'));
            mobile.siblings('.error-text').show();
            mobile.addClass('error');
            return;
        }
        var telco_Code = telco.Code;
        var drw_mobile = mobile.parent().find('.input-dropdown-content .dropdown-button');
        if (typeChk == "tra-truoc") {
            topupAmount = $("#ddr-select-amount option:selected");
            AmountValue = topupAmount.val().replace(/[,.]/g, '');
            var ddr_select = $("#ddr-select-amount");
            if (AmountValue == '') {
                ddr_select.parent().siblings('.error-text').html($.t("error.amountSelect"));
                ddr_select.parent().siblings('.error-text').show();
                ddr_select.parent().siblings('label').addClass('error');
                ddr_select.siblings("input.select-dropdown").addClass('error');
                if (drw_mobile.hasClass('active'))
                    drw_mobile.dropdown('close');
                return;
            }
            telco_Code += "@BEFORE";

            payment.pcode = $("#ddr-select-amount option:selected").attr('data-pcode');
            payment.topupType = 1;
        }
        else {
            AmountValue = topupAmount.val().replace(/[,.]/g, '');

            if (AmountValue == '') {
                topupAmount.siblings('.error-text').html($.t("error.amountInput"));
                topupAmount.siblings('.error-text').show();
                topupAmount.addClass('error');
                if (drw_mobile.hasClass('active'))
                    drw_mobile.dropdown('close');
                setTimeout(function () { topupAmount.focus(); }, 300);
                return;
            }
            if (parseInt(AmountValue) < 6000) {
                topupAmount.siblings('.error-text').html($.t("error.amountMin"));
                topupAmount.siblings('.error-text').show();
                topupAmount.addClass('error');
                if (drw_mobile.hasClass('active'))
                    drw_mobile.dropdown('close');
                setTimeout(function () { topupAmount.focus(); }, 300);
                return;
            }
            if (telco_Code === "GPC" && parseInt(AmountValue) > 1000000) {
                AmountValue = 1000000;
                topupAmount.value = utils.formatMoney(AmountValue);
                topupAmount.siblings('.error-text').html($.t("error.amountMax"));
                topupAmount.siblings('.error-text').show();
                topupAmount.addClass('error');
                if (drw_mobile.hasClass('active'))
                    drw_mobile.dropdown('close');
                setTimeout(function () { topupAmount.focus(); }, 300);
                return;
            }
            telco_Code += "@AFTER";
            payment.pcode = telco_Code;
            payment.topupType = 2;
        }

        if (!utils.validateNumberOnly(AmountValue)) {
            topupAmount.siblings('.error-text').html($.t("error.amountInvalid"));
            topupAmount.siblings('.error-text').show();
            topupAmount.addClass('error');
            if (drw_mobile.hasClass('active'))
                drw_mobile.dropdown('close');
            setTimeout(function () { topupAmount.focus(); }, 300);
            return;
        }

        var m_category = payment.listCateProduct.find(function (x) {
            return x.ParentCategoryID === payment.ConfigCateId.topupMobile && x.CategoryCode == telco_Code;
        });
        if (m_category == null || m_category == undefined) {
            $("#payment_step1").find(".alert-danger").html('<i class="fa fa-warning"></i>' + common.getDescription(-999999)).show();
            return;
        }

        payment.cid = m_category.CategoryID;
        if (parseInt(payment.pid) <= 0) {
            $("#payment_step1").find(".alert-danger").html('<i class="fa fa-warning"></i>' + "Không lấy được thông tin sản phẩm").show();
        }
        payment.actionTracking = 'Topup-Mobile-' + payment.pcode + '-' + parseInt(AmountValue) + '-' + 'Pay365Wallet';

        if (isAuthenticate) {
            $("#btnPaymentCheckInput").addClass("disabled");
            var paramValid = {
                TelcoCode: payment.pcode,
                TopupType: payment.topupType,
                Amount: parseInt(AmountValue),
                Mobile: mobileValue,
                sid: payment.cid,
                ProductId: payment.pid,
                Culture: utils.getCurrentLanguage()
            };

            var urlPaymentApi = utils.trasactionApi() + "Payment/TopupTelco";
            utils.loading();
            utils.postData(urlPaymentApi, paramValid, function (data) {
                utils.unLoading();

                if (data.c >= 0) {
                    payment.secureType = data.c;
                    var transType = payment.topupType == 1 ? $.t('payment.topupTelcoBefore') : $.t('payment.topupTelcoAfter');
                    $("#TransType").text(transType);
                    $("#Product").text(telco.Name);
                    $("#PhoneTopup").text(mobile.val());
                    $("#AmountTopup").html(utils.formatMoney(topupAmount.val()) + "<sup>VNĐ</sup>");
                    $("#DiscountRate").text(payment.discount + "%");
                    $("#TotalPayment").html($("#totalAmount").html());
                    $("#PaymentType").text($.t('payment.walletPay365'));
                    var noteSecure = $.t('payment.noteSecureNot');

                    if (data.c > 0) {
                        if (data.c == 1) {
                            noteSecure = utils.formatString($.t('payment.noteSecureSMS'), header.AccountInfo.Username);
                            $("#btnResendOTP").show();
                        }
                        else if (data.c == 2) {
                            noteSecure = utils.formatString($.t('payment.noteSecureEmail'), header.AccountInfo.Email);
                            $("#btnResendOTP").show();
                        }
                        else if (data.c == 3) {
                            noteSecure = $.t('payment.noteSecureApp');
                            $("#btnResendOTP").hide();
                        }
                        else {
                            noteSecure = $.t('payment.noteSecureVoice');
                            $("#btnResendOTP").hide();
                        }
                        $("#isCheckSecure").show();
                        $(".txtNoteSecure").html(noteSecure);
                    }
                    else {
                        $("#isCheckSecure").hide();
                        $(".txtNoteSecure").html(noteSecure);
                    }

                    payment.actionView("ts-parent", "next", "View_PaymentConfirm");
                    setTimeout(function () {
                        $("#txtVerifyCode").focus();
                    }, 200);
                }
                $("#btnPaymentCheckInput").removeClass("disabled");
            }, function (dataErr) {
                utils.unLoading();
                var btnClose = $.t('payment.btnClose');
                var Msg = common.getDescription(-999999);
                if (typeof JSON.parse(dataErr) === "object") {
                    var objReturn = JSON.parse(dataErr);
                    Msg = common.getDescription(objReturn.c);
                    utils.translateLang('transaction.payment');
                    switch (objReturn.c) {
                        case -10047://mobile
                        case -10155://ko hỗ trợ nhà mạng 
                            payment.SwapErrorResult(mobile, Msg);
                            break;
                        case -10115: case -10142://CardAmount 
                            payment.SwapErrorResult(topupAmount, Msg);
                            break;
                        case -10141://Min Amount
                        case -10156://Max Amount
                            Msg = utils.formatString(Msg, objReturn.p);
                            payment.SwapErrorResult(topupAmount, Msg);
                            break;
                        default:
                            $("#payment_step1").find(".alert-danger").html('<i class="fa fa-warning"></i>' + objReturn.m).show();
                            break;
                    }
                }
                else {
                    utils.translateLang('transaction.payment');
                    ModalNotificationInit(Msg, "", "error", "", btnClose);
                }
                $("#btnPaymentCheckInput").removeClass("disabled");

                if (typeof ga != 'undefined')
                    ga('send', 'event', 'Transaction_Payment', payment.actionTracking + "_StepCheck", 'Fail', parseInt(AmountValue));
                return;
            });
        }
        else {
            window.location = utils.rootUrl() + "dang-nhap";//payment.actionView("next", "topupMobile_unLogin_step2");
        }
    };
    this.TopupMobileMain_CheckInput = function () {
        utils.translateLang('transaction.payment');

        $("#payment_step1").find(".alert-danger").html('').hide();
        $("#payment_step1").trigger('heightChange');
        if ($("#btnPaymentCheckInput").hasClass('disabled'))
            return;

        var currChk = $("#payment_step1").find("input[type=radio]:checked");
        var typeChk = currChk.attr("id");
        var mobile = $("#txtPhoneNumber");
        var mobileValue = mobile.val().replace(/[-]/g, '');
        if (mobileValue === '') {
            mobile.focus();
            mobile.siblings('.error-text').html(i18n.t('error.inputPhone'));
            mobile.siblings('.error-text').show();
            mobile.addClass('error');
            $("#payment_step1").trigger('heightChange');
            return;
        }

        if (!mobileValue.match('^0')) {
            mobile.focus();
            mobile.siblings('.error-text').html($.t('error.phoneInvalid'));
            mobile.siblings('.error-text').show();
            mobile.addClass('error');
            $("#payment_step1").trigger('heightChange');
            return;
        }

        if (mobileValue.length < 9 || mobileValue.length > 11) {
            mobile.focus();
            mobile.siblings('.error-text').html($.t('error.phoneInvalid'));
            mobile.siblings('.error-text').show();
            mobile.addClass('error');
            $("#payment_step1").trigger('heightChange');
            return;
        }

        var telco = payment.getTelco(mobileValue);
        if (telco == null) {
            mobile.focus();
            mobile.siblings('.error-text').html($.t('error.phoneInvalid'));
            mobile.siblings('.error-text').show();
            mobile.addClass('error');
            $("#payment_step1").trigger('heightChange');
            return;
        }
        var topupAmount = $("#txtAmount");
        var telco_Code = telco.Code;
        var drw_mobile = mobile.parent().find('.input-dropdown-content .dropdown-button');
        var AmountValue = "";
        if (typeChk == "tra-truoc") {
            topupAmount = $("#ddr-select-amount option:selected");
            AmountValue = topupAmount.val().replace(/[,.]/g, '');
            var ddr_select = $("#ddr-select-amount");
            if (AmountValue == '') {
                ddr_select.parent().siblings('.error-text').html($.t("error.amountSelect"));
                ddr_select.parent().siblings('.error-text').show();
                ddr_select.parent().siblings('label').addClass('error');
                ddr_select.siblings("input.select-dropdown").addClass('error');
                if (drw_mobile.hasClass('active'))
                    drw_mobile.dropdown('close');
                return;
            }
            telco_Code += "@BEFORE";

            payment.pcode = $("#ddr-select-amount option:selected").attr('data-pcode');
            payment.topupType = 1;
        }
        else {
            AmountValue = topupAmount.val().replace(/[,.]/g, '');
            if (AmountValue == '') {
                topupAmount.siblings('.error-text').html($.t("error.amountInput"));
                topupAmount.siblings('.error-text').show();
                topupAmount.addClass('error');
                if (drw_mobile.hasClass('active'))
                    drw_mobile.dropdown('close');
                setTimeout(function () { topupAmount.focus(); }, 300);
                return;
            }
            if (parseInt(AmountValue) < 6000) {
                topupAmount.siblings('.error-text').html($.t("error.amountMin"));
                topupAmount.siblings('.error-text').show();
                topupAmount.addClass('error');
                if (drw_mobile.hasClass('active'))
                    drw_mobile.dropdown('close');
                setTimeout(function () { topupAmount.focus(); }, 300);
                return;
            }
            if (telco_Code === "GPC" && parseInt(AmountValue) > 1000000) {
                AmountValue = 1000000;
                topupAmount.value = utils.formatMoney(AmountValue);
                topupAmount.siblings('.error-text').html($.t("error.amountMax"));
                topupAmount.siblings('.error-text').show();
                topupAmount.addClass('error');
                if (drw_mobile.hasClass('active'))
                    drw_mobile.dropdown('close');
                setTimeout(function () { topupAmount.focus(); }, 300);
                return;
            }
            telco_Code += "@AFTER";
            payment.pcode = telco_Code;
            payment.topupType = 2;
        }

        if (!utils.validateNumberOnly(AmountValue)) {
            topupAmount.siblings('.error-text').html($.t("error.amountInvalid"));
            topupAmount.siblings('.error-text').show();
            topupAmount.addClass('error');
            if (drw_mobile.hasClass('active'))
                drw_mobile.dropdown('close');
            setTimeout(function () { topupAmount.focus(); }, 300);
            $("#payment_step1").trigger('heightChange');
            return;
        }
        var m_category = payment.listCateProduct.find(function (x) {
            return x.ParentCategoryID === payment.ConfigCateId.topupMobile && x.CategoryCode == telco_Code;
        });
        if (m_category == null || m_category == undefined) {
            $("#payment_step1").find(".alert-danger").html('<i class="fa fa-warning"></i>' + common.getDescription(-999999)).show();
            $("#payment_step1").trigger('heightChange');
            return;
        }
        var data_pid = $("#ddr-select-amount option:selected").attr('data-pid');
        payment.cid = m_category.CategoryID;
        payment.pid = parseInt(data_pid);
        if (parseInt(payment.pid) <= 0) {
            $("#payment_step1").find(".alert-danger").html('<i class="fa fa-warning"></i>' + "Không lấy được thông tin sản phẩm").show();
        }
        payment.actionTracking = 'Topup-Mobile-' + payment.pcode + '-' + parseInt(AmountValue) + '-' + 'Pay365Wallet';
        if (isAuthenticate) {
            var paramValid = {
                TelcoCode: payment.pcode,
                TopupType: payment.topupType,
                Amount: parseInt(AmountValue),
                Mobile: mobileValue,
                sid: payment.cid,
                ProductId: payment.pid,
                Culture: utils.getCurrentLanguage()
            };

            var urlPaymentApi = utils.trasactionApi() + "Payment/TopupTelco";
            $("#btnPaymentCheckInput").addClass("disabled");
            utils.loading();
            utils.postData(urlPaymentApi, paramValid, function (data) {
                utils.unLoading();

                if (data.c >= 0) {
                    var transType = payment.topupType == 1 ? $.t('payment.topupTelcoBefore') : $.t('payment.topupTelcoAfter');
                    $("#TransType").text(transType);
                    $("#Product").text(telco.Name);
                    $("#PhoneTopup").text(mobile.val());
                    $("#AmountTopup").html(utils.formatMoney(topupAmount.val()) + "<sup>VNĐ</sup>");
                    $("#DiscountRate").text(payment.discount + "%");
                    $("#TotalPayment").html($("#totalAmount").html());
                    $("#PaymentType").text($.t('payment.walletPay365'));
                    var noteSecure = $.t('payment.noteSecureNot');

                    if (data.c > 0) {
                        payment.secureType = data.c;
                        if (data.c == 1) {
                            noteSecure = utils.formatString($.t('payment.noteSecureSMS'), header.AccountInfo.Username);
                            $("#btnResendOTP").show();
                        }
                        else if (data.c == 2) {
                            noteSecure = utils.formatString($.t('payment.noteSecureEmail'), header.AccountInfo.Email);
                            $("#btnResendOTP").show();
                        }
                        else if (data.c == 3) {
                            noteSecure = $.t('payment.noteSecureApp');
                            $("#btnResendOTP").hide();
                        }
                        else {
                            noteSecure = $.t('payment.noteSecureVoice');
                            $("#btnResendOTP").hide();
                        }
                        $("#isCheckSecure").show();
                        $(".txtNoteSecure").html(noteSecure);
                    }
                    else {
                        $("#isCheckSecure").hide();
                        $(".txtNoteSecure").html(noteSecure);
                    }
                    $("#btnPaymentConfirm").attr("onclick", "payment.TopupMobile_Confirm();");
                    $("#View_PaymentConfirm").modal("open");
                    setTimeout(function () {
                        $("#txtVerifyCode").focus();
                    }, 200);
                }
                $("#btnPaymentCheckInput").removeClass("disabled");
            }, function (dataErr) {
                utils.unLoading();
                var btnClose = $.t('payment.btnClose');
                var Msg = common.getDescription(-999999);
                if (typeof JSON.parse(dataErr) === "object") {
                    var objReturn = JSON.parse(dataErr);
                    Msg = common.getDescription(objReturn.c);
                    utils.translateLang('transaction.payment');
                    switch (objReturn.c) {
                        case -10047://mobile
                        case -10155://ko hỗ trợ nhà mạng 
                            payment.SwapErrorResult(mobile, Msg);
                            break;
                        case -10115: case -10142://CardAmount 
                            payment.SwapErrorResult(topupAmount, Msg);
                            break;
                        case -10141://Min Amount
                        case -10156://Max Amount
                            Msg = utils.formatString(Msg, objReturn.p);
                            payment.SwapErrorResult(topupAmount, Msg);
                            break;
                        default:
                            $("#payment_step1").find(".alert-danger").html('<i class="fa fa-warning"></i>' + Msg).show();
                            break;
                    }
                    $("#payment_step1").trigger('heightChange');
                }
                else {
                    utils.translateLang('transaction.payment');
                    ModalNotificationInit(Msg, "", "error", "", btnClose);
                }
                $("#btnPaymentCheckInput").removeClass("disabled");

                if (typeof ga != 'undefined')
                    ga('send', 'event', 'Transaction_Payment', payment.actionTracking + "_StepCheck", 'Fail', parseInt(AmountValue));
                return;
            });
        }
        else {
            window.location = utils.rootUrl() + "dang-nhap";//payment.actionView("next", "topupMobile_unLogin_step2");
        }
    };
    this.TopupMobile_Confirm = function () {
        utils.translateLang('transaction.payment');
        if ($("#btnPaymentConfirm").hasClass('disabled'))
            return;
        var Otp = "";
        $("#View_PaymentConfirm").find(".alert-danger").html('').hide();
        var confirmCode = $('#txtVerifyCode');
        if ($("#isCheckSecure").is(":visible")) {
            if (confirmCode.val().trim() === '') {
                confirmCode.focus();
                confirmCode.siblings('.error-text').html($.t('error.inputConfirmCode'));
                confirmCode.siblings('.error-text').show();
                confirmCode.addClass('error');
                return;
            }

            if (confirmCode.val().trim().length !== 6) {
                confirmCode.siblings('.error-text').html($.t('error.confirmCodeInvalid'));
                confirmCode.siblings('.error-text').show();
                confirmCode.addClass('error');
                confirmCode.focus();
                return;
            }
            Otp = confirmCode.val().trim();
        }
        var topupAmount = 0;
        var isChkElem = $("#ddr-select-amount").is(":visible");
        if (isChkElem && parseInt($("#ddr-select-amount").val()) > 0)
            topupAmount = $("#ddr-select-amount").val().replace(/[,.]/g, '');
        else
            topupAmount = $("#txtAmount").val().replace(/[,.]/g, '');

        var callbackClose = function () {
            location.href = utils.rootUrl() + "thong-tin";
        };
        var callBackContinue = function () {
            location.href = utils.rootUrl() + 'lich-su-giao-dich';
        };
        var urlPaymentApi = utils.trasactionApi() + "Payment/TopupTelcoConfirm";
        $("#btnPaymentConfirm").addClass('disabled');
        utils.loading();
        utils.postData(urlPaymentApi, { Otp: Otp }, function (data) {
            utils.unLoading();
            if (data.c >= 0) {
                var contentMsg = utils.formatString($.t('payment.topupMobileSuccess'), $("#AmountTopup").html() + "," + $("#PhoneTopup").text());
                confirmCode.value = '';

                if ($("#View_PaymentConfirm").hasClass('modal'))
                    $("#View_PaymentConfirm").modal("close");

                if (data.p && typeof data.p == "object" && data.p.length > 0 && parseInt(data.p[data.p.length - 1]) >= 0) {
                    var balance = parseInt(header.AccountInfo.Balance) - parseInt(data.p[data.p.length - 1]);
                    $("#balance_t .balance").find("span").text(utils.formatMoney(balance));
                }
                ModalNotificationResultInit('success', $.t('payment.tit_topupTelcoSuccess'), contentMsg, $.t('payment.btnGoHome'), $.t('payment.btnViewHistory'), callbackClose, callBackContinue);

                if (typeof ga != 'undefined')
                    ga('send', 'event', 'Transaction_Payment', payment.actionTracking + "_StepConfirm", 'Success', topupAmount);
            }
            $("#btnPaymentConfirm").removeClass('disabled');
        }, function (dataErr) {
            utils.unLoading();
            var btnClose = $.t('payment.btnClose');
            var Msg = common.getDescription(-999999);
            if (typeof JSON.parse(dataErr) === "object") {
                var objReturn = JSON.parse(dataErr);
                Msg = common.getDescription(objReturn.c);
                utils.translateLang('transaction.payment');
                switch (objReturn.c) {
                    case -6: case -7: case -49: case -111: case -10015: case -10105: case -10021://OTP Fail
                        payment.SwapErrorResult(confirmCode, Msg);
                        break;
                    case -19://giao dịch đang được xử lý
                        var contentMsg = utils.formatString($.t('payment.topupMobilePending'), $("#AmountTopup").html() + "," + $("#PhoneTopup").text());
                        if ($("#View_PaymentConfirm").hasClass('modal'))
                            $("#View_PaymentConfirm").modal("close");
                        ModalNotificationResultInit('warning', '', contentMsg, $.t('payment.btnGoHome'), $.t('payment.btnViewHistory'), callbackClose, callBackContinue);
                        break;
                    case -102: case -103: case -10056: case -10134:
                        var contentMsg = utils.formatString($.t('payment.topupMobileFail'), $("#AmountTopup").html() + "," + $("#PhoneTopup").text());
                        if ($("#View_PaymentConfirm").hasClass('modal'))
                            $("#View_PaymentConfirm").modal("close");
                        ModalNotificationResultInit('danger', '', contentMsg, $.t('payment.btnGoHome'), $.t('payment.btnViewHistory'), callbackClose, callBackContinue);
                        break;
                    default:
                        $("#View_PaymentConfirm").find(".alert-danger").html('<i class="fa fa-warning"></i>' + Msg).show();
                        break;
                }
            }
            else {
                utils.translateLang('transaction.payment');
                if ($("#View_PaymentConfirm").hasClass('modal'))
                    $("#View_PaymentConfirm").modal("close");
                ModalNotificationInit(Msg, "", "error", "", btnClose);
            }
            $("#btnPaymentConfirm").removeClass('disabled');
            ga('send', 'event', 'Transaction_Payment', payment.actionTracking + "_StepConfirm", 'Fail', topupAmount);
            return;
        });
    }

    this.CheckNicknameExist = function () {
        utils.translateLang('transaction.payment');
        $("#payment_topupGame").find(".alert-danger").html('').hide();
        
        $("#payment_topupGame").trigger('heightChange');
        var ddr_selectGame = $("#ddr-select-game");
        if ((!payment.cid || payment.cid <= 0) && ddr_selectGame.length > 0)
        {
            var gameid = ddr_selectGame.find("option:selected").val();
            if (gameid == '') {
                ddr_selectGame.parent().siblings('.error-text').html($.t("error.gameSelect"));
                ddr_selectGame.parent().siblings('.error-text').show();
                ddr_selectGame.siblings("input.select-dropdown").addClass('error');
                $("#payment_topupGame").trigger('heightChange');
                return;
            }
        }
        var nickname = $("#txtNickname");
        var nicknameValue = nickname.val();
        nickname.siblings('.success-text').hide();
        nickname.siblings('.error-text').hide();
        if (nicknameValue === '') {
            nickname.focus();
            nickname.siblings('.error-text').html(i18n.t('error.inputNickname'));
            nickname.siblings('.error-text').show();
            nickname.addClass('error');
            $("#payment_topupGame").trigger('heightChange');
            return;
        }

        if (!utils.validateLetter(nicknameValue) || nicknameValue.length < 4 || nicknameValue.length > 13) {
            nickname.focus();
            nickname.siblings('.error-text').html($.t('error.nickNameInvalid'));
            nickname.siblings('.error-text').show();
            nickname.addClass('error');
            $("#payment_topupGame").trigger('heightChange');
            return;
        }
        if (payment.listCateGame == null || payment.listCateGame.length <= 0)
            payment.listCateGame = payment.listCateProduct;
        var m_cate = payment.listCateGame.find(function (c) { return c.CategoryID === payment.cid; });
        
        var paramValid = {
            PartnerCode: m_cate.CategoryCode,
            ProductCode: payment.pcode,
            AccountName: nicknameValue
        };
        $("#selectServerGame").hide();
        var urlPaymentApi = utils.trasactionApi() + "Payment/CheckSocialGamesAccount";
        if (ddr_selectGame.length > 0 && !$("#btnPaymentCheckInput").hasClass("disabled"))
            $("#btnPaymentGameCheckInput").addClass('disabled');
        else if (ddr_selectGame.length == 0 && !$("#btnPaymentCheckInput").hasClass("disabled"))
            $("#btnPaymentCheckInput").addClass('disabled');
        utils.loading();
        utils.postData(urlPaymentApi, paramValid, function (data) {
            utils.unLoading();
            if (data.c >= 0 && data.d.responseCode > 0) {
                nickname.siblings('.error-text').html('');
                nickname.siblings('.error-text').hide();
                nickname.removeClass('error');
                nickname.siblings('.success-text').html('<i class="fa fa-check"></i>Tài khoản hợp lệ').show();
                if (data.d.description != '' && data.d.description.length > 0) {
                    var listServer = data.d.description.split(',');
                    if (listServer.length > 0) {
                        $("#ddr-select-server").html('');
                        $("#ddr-select-server").material_select();
                        $.each(listServer, function (k, v) {
                            var item = '<option value="' + v + '">' + v + '</option>';
                            $("#ddr-select-server").append(item);
                        });
                        $("#ddr-select-server").material_select();
                        $("#selectServerGame").show();
                    }
                }
                if (ddr_selectGame.length > 0)
                    $("#btnPaymentGameCheckInput").removeClass('disabled');
                else if (ddr_selectGame.length == 0)
                    $("#btnPaymentCheckInput").removeClass('disabled');
                
            }
            else {
                nickname.focus();
                nickname.siblings('.error-text').html($.t('error.nickNameNotExist'));
                nickname.siblings('.error-text').show();
                nickname.addClass('error');
                if (ddr_selectGame.length > 0 && !$("#btnPaymentCheckInput").hasClass("disabled"))
                    $("#btnPaymentGameCheckInput").addClass('disabled');
                else if (ddr_selectGame.length == 0 && !$("#btnPaymentCheckInput").hasClass("disabled"))
                    $("#btnPaymentCheckInput").addClass('disabled');
            }
            $("#payment_topupGame").trigger('heightChange');
        }, function (dataErr) {
            utils.unLoading();
            nickname.focus();
            nickname.siblings('.error-text').html($.t('error.nickNameNotExist'));
            nickname.siblings('.error-text').show();
            nickname.addClass('error');
            if (ddr_selectGame.length > 0 && !$("#btnPaymentCheckInput").hasClass("disabled"))
                $("#btnPaymentGameCheckInput").addClass('disabled');
            else if (ddr_selectGame.length == 0 && !$("#btnPaymentCheckInput").hasClass("disabled"))
                $("#btnPaymentCheckInput").addClass('disabled');
            $("#payment_topupGame").trigger('heightChange');
            return;
        });
    }
    this.TopupGame_checkInput = function () {
        utils.translateLang('transaction.payment');
        $("#payment_step1").find(".alert-danger").html('').hide();
        var nickname = $("#txtNickname");
        var nicknameValue = nickname.val();
        if (nicknameValue === '') {
            nickname.focus();
            nickname.siblings('.error-text').html(i18n.t('error.inputNickname'));
            nickname.siblings('.error-text').show();
            nickname.addClass('error');
            return;
        }

        if (!utils.validateLetter(nicknameValue)) {
            nickname.focus();
            nickname.siblings('.error-text').html($.t('error.nickNameInvalid'));
            nickname.siblings('.error-text').show();
            nickname.addClass('error');
            return;
        }
        if ($("#btnPaymentCheckInput").hasClass('disabled'))
        {
            payment.CheckNicknameExist();
            return;
        }
        var ddr_selectAmount = $("#ddr-select-gameAmount");
        var AmountValue = ddr_selectAmount.find("option:selected").val().replace(/[,.]/g, '');
        if (AmountValue == '') {
            ddr_selectAmount.parent().siblings('.error-text').html($.t("error.amountSelect"));
            ddr_selectAmount.parent().siblings('.error-text').show();
            ddr_selectAmount.parent().siblings('label').addClass('error');
            ddr_selectAmount.siblings("input.select-dropdown").addClass('error');
            return;
        }

        if (!utils.validateNumberOnly(AmountValue) || parseInt(AmountValue) <= 0) {
            ddr_selectAmount.siblings('.error-text').html($.t("error.amountInvalid"));
            ddr_selectAmount.siblings('.error-text').show();
            ddr_selectAmount.addClass('error');
            return;
        }
        if (parseInt(AmountValue) % 1000 != 0) {
            ddr_selectAmount.siblings('.error-text').html($.t("error.amountInvalid"));
            ddr_selectAmount.siblings('.error-text').show();
            ddr_selectAmount.addClass('error');
            return;
        }
        var ServerGame = "";
        if ($("#selectServerGame").is(":visible") && $("#selectServerGame option").length > 0 && $("#ddr-select-server").val() != "") {
            ServerGame = $("#ddr-select-server").val();
        }
        payment.actionTracking = 'Topup-Game-' + payment.pcode + '-' + AmountValue + '-' + 'Pay365Wallet';
        var m_cate = payment.listCateProduct.find(function (c) { return c.CategoryID === payment.cid; });
        if (isAuthenticate) {
            var paramValid = {
                CategoryID: payment.cid,
                ProductID: payment.pid,
                PartnerCode: m_cate.CategoryCode,
                ProductCode: payment.pcode,
                Amount: AmountValue,
                ServerGame: ServerGame,
                Culture: utils.getCurrentLanguage(),
                AccountName: nicknameValue
            };

            var urlPaymentApi = utils.trasactionApi() + "Payment/TopupSocialGames";
            $("#btnPaymentCheckInput").addClass('disabled');
            utils.loading();
            utils.postData(urlPaymentApi, paramValid, function (data) {
                utils.unLoading();

                if (data.c >= 0) {
                    var m_cate = payment.listCateProduct.find(function (c) {
                        return c.CategoryID === parseInt(payment.cid);
                    });
                    var productname = "";
                    if (m_cate != undefined && m_cate != null) {
                        productname = m_cate.Description;
                    }
                    var transType = $.t('payment.topupGame');
                    $("#TransType").text(transType);
                    $("#Product").text(productname);
                    $("#PhoneTopup").text(nicknameValue);
                    $("#AmountTopup").html(utils.formatMoney(ddr_selectAmount.find("option:selected").val()) + "<sup>VNĐ</sup>");
                    $("#DiscountRate").text(payment.discountGame + "%");
                    $("#TotalPayment").html($("#totalAmount").html());
                    $("#PaymentType").text($.t('payment.walletPay365'));
                    var noteSecure = $.t('payment.noteSecureNot');

                    if (data.c > 0) {
                        payment.secureType = data.c;
                        if (data.c == 1) {
                            noteSecure = utils.formatString($.t('payment.noteSecureSMS'), header.AccountInfo.Username);
                            $("#btnResendOTP").show();
                        }
                        else if (data.c == 2) {
                            noteSecure = utils.formatString($.t('payment.noteSecureEmail'), header.AccountInfo.Email);
                            $("#btnResendOTP").show();
                        }
                        else if (data.c == 3) {
                            noteSecure = $.t('payment.noteSecureApp');
                            $("#btnResendOTP").hide();
                        }
                        else {
                            noteSecure = $.t('payment.noteSecureVoice');
                            $("#btnResendOTP").hide();
                        }
                        $("#isCheckSecure").show();
                        $(".txtNoteSecure").html(noteSecure);
                    }
                    else {
                        $("#isCheckSecure").hide();
                        $(".txtNoteSecure").html(noteSecure);
                    }

                    payment.actionView("ts-parent", "next", "View_PaymentConfirm");
                    setTimeout(function () {
                        $("#txtVerifyCode").focus();
                    }, 200);
                }
                $("#btnPaymentCheckInput").removeClass('disabled');
            }, function (dataErr) {
                utils.unLoading();

                var btnClose = $.t('payment.btnClose');
                var Msg = common.getDescription(-999999);
                if (typeof JSON.parse(dataErr) === "object") {
                    var objReturn = JSON.parse(dataErr);
                    Msg = common.getDescription(objReturn.c);
                    utils.translateLang('transaction.payment');
                    switch (objReturn.c) {
                        case -10033: case -10039: case -200: //nickname
                            payment.SwapErrorResult(nickname, Msg);
                            break;
                        case -10115: case -10142://CardAmount
                            payment.SwapErrorResult(topupAmount, Msg);
                            break;
                        case -10141://Min Amount
                        case -10156://Max Amount
                            Msg = utils.formatString(Msg, objReturn.p);
                            payment.SwapErrorResult(topupAmount, Msg);
                            break;
                        default:
                            $("#payment_step1").find(".alert-danger").html('<i class="fa fa-warning"></i>' + Msg).show();
                            break;
                    }
                }
                else {
                    utils.translateLang('transaction.payment');
                    ModalNotificationInit(Msg, "", "error", "", btnClose);
                }
                $("#btnPaymentCheckInput").removeClass('disabled');

                if (typeof ga != 'undefined')
                    ga('send', 'event', 'Transaction_Payment', payment.actionTracking + '_StepCheck', 'Fail', AmountValue);
                return;
            });
        }
        else {
            window.location = utils.rootUrl() + "dang-nhap";//payment.actionPayment("next", "topupMobile_unLogin_step2");
        }
    };
    this.TopupGameMain_CheckInput = function () {
        utils.translateLang('transaction.payment');

        $("#payment_topupGame").find(".alert-danger").html('').hide();
        $("#payment_topupGame").trigger('heightChange');
        var ddr_selectGame = $("#ddr-select-game");
        var gameid = ddr_selectGame.find("option:selected").val();

        if (gameid == '') {
            ddr_selectGame.parent().siblings('.error-text').html($.t("error.gameSelect"));
            ddr_selectGame.parent().siblings('.error-text').show();
            ddr_selectGame.siblings("input.select-dropdown").addClass('error');
            $("#payment_topupGame").trigger('heightChange');
            return;
        }
        if (parseInt(gameid) <= 0) {
            ddr_selectGame.parent().siblings('.error-text').html($.t("error.gameInvalid"));
            ddr_selectGame.parent().siblings('.error-text').show();
            ddr_selectGame.siblings("input.select-dropdown").addClass('error');
            $("#payment_topupGame").trigger('heightChange');
            return;
        }
        var m_cate = payment.listCateGame.find(function (c) { return c.CategoryID === parseInt(gameid); });
        if (m_cate == undefined || m_cate == null) {
            ddr_selectGame.parent().siblings('.error-text').html($.t("error.gameInvalid"));
            ddr_selectGame.parent().siblings('.error-text').show();
            ddr_selectGame.siblings("input.select-dropdown").addClass('error');
            $("#payment_topupGame").trigger('heightChange');
            return;
        }
        payment.pcode = payment.listProductGame[0].ProductCode;
        payment.pid = payment.listProductGame[0].ProductID;
        payment.cid = m_cate.CategoryID;
        var nickname = $("#txtNickname");
        var nicknameValue = nickname.val();
        if (nicknameValue === '') {
            nickname.focus();
            nickname.siblings('.error-text').html(i18n.t('error.inputNickname'));
            nickname.siblings('.error-text').show();
            nickname.addClass('error');
            $("#payment_topupGame").trigger('heightChange');
            return;
        }

        if (!utils.validateLetter(nicknameValue) || nicknameValue.length < 4 || nicknameValue.length > 13) {
            nickname.focus();
            nickname.siblings('.error-text').html($.t('error.nickNameInvalid'));
            nickname.siblings('.error-text').show();
            nickname.addClass('error');
            $("#payment_topupGame").trigger('heightChange');
            return;
        }
        if ($("#btnPaymentGameCheckInput").hasClass('disabled')) {
            payment.CheckNicknameExist();
            return;
        }
        var ddr_selectAmount = $("#ddr-select-gameAmount");
        var AmountValue = ddr_selectAmount.find("option:selected").val().replace(/[,.]/g, '');
        if (AmountValue == '') {
            ddr_selectAmount.parent().siblings('.error-text').html($.t("error.amountSelect"));
            ddr_selectAmount.parent().siblings('.error-text').show();
            ddr_selectAmount.parent().siblings('label').addClass('error');
            ddr_selectAmount.siblings("input.select-dropdown").addClass('error');
            $("#payment_topupGame").trigger('heightChange');
            return;
        }

        if (!utils.validateNumberOnly(AmountValue) || parseInt(AmountValue) <= 0) {
            ddr_selectAmount.siblings('.error-text').html($.t("error.amountInvalid"));
            ddr_selectAmount.siblings('.error-text').show();
            ddr_selectAmount.addClass('error');
            $("#payment_topupGame").trigger('heightChange');
            return;
        }
        if (parseInt(AmountValue) % 1000 != 0) {
            ddr_selectAmount.siblings('.error-text').html($.t("error.amountInvalid"));
            ddr_selectAmount.siblings('.error-text').show();
            ddr_selectAmount.addClass('error');
            $("#payment_topupGame").trigger('heightChange');
            return;
        }
        var ServerGame = "";
        if ($("#selectServerGame").is(":visible") && $("#selectServerGame option").length > 0 && $("#ddr-select-server").val() != "") {
            ServerGame = $("#ddr-select-server").val();
        }
        payment.actionTracking = 'Topup-Game-' + payment.pcode + '-' + AmountValue + '-' + 'Pay365Wallet';
        if (isAuthenticate) {
            var paramValid = {
                CategoryID: payment.cid,
                ProductID: payment.pid,
                PartnerCode: m_cate.CategoryCode,
                ProductCode: payment.pcode,
                Amount: AmountValue,
                ServerGame: ServerGame,
                Culture: utils.getCurrentLanguage(),
                AccountName: nicknameValue
            };

            var urlPaymentApi = utils.trasactionApi() + "Payment/TopupSocialGames";
            $("#btnPaymentGameCheckInput").addClass('disabled');
            utils.loading();
            utils.postData(urlPaymentApi, paramValid, function (data) {
                utils.unLoading();
                if (data.c >= 0) {
                    var productname = m_cate.Description;

                    var transType = $.t('payment.topupGame');
                    $("#TransType").text(transType);
                    $("#Product").text(productname);
                    $("#PhoneTopup").text(nicknameValue);
                    $("#AmountTopup").html(utils.formatMoney(ddr_selectAmount.find("option:selected").val()) + "<sup>VNĐ</sup>");
                    $("#DiscountRate").text(payment.discountGame + "%");
                    $("#TotalPayment").html($("#totalAmountGame").html());
                    $("#PaymentType").text($.t('payment.walletPay365'));
                    var noteSecure = $.t('payment.noteSecureNot');

                    if (data.c > 0) {
                        payment.secureType = data.c;
                        if (data.c == 1) {
                            noteSecure = utils.formatString($.t('payment.noteSecureSMS'), header.AccountInfo.Username);
                            $("#btnResendOTP").show();
                        }
                        else if (data.c == 2) {
                            noteSecure = utils.formatString($.t('payment.noteSecureEmail'), header.AccountInfo.Email);
                            $("#btnResendOTP").show();
                        }
                        else if (data.c == 3) {
                            noteSecure = $.t('payment.noteSecureApp');
                            $("#btnResendOTP").hide();
                        }
                        else {
                            noteSecure = $.t('payment.noteSecureVoice');
                            $("#btnResendOTP").hide();
                        }
                        $("#isCheckSecure").show();
                        $(".txtNoteSecure").html(noteSecure);
                    }
                    else {
                        $("#isCheckSecure").hide();
                        $(".txtNoteSecure").html(noteSecure);
                    }
                    $("#btnPaymentConfirm").attr("onclick", "payment.TopupGame_Confirm();");
                    $("#View_PaymentConfirm").modal("open");
                    setTimeout(function () {
                        $("#txtVerifyCode").focus();
                    }, 200);
                }
                $("#btnPaymentGameCheckInput").addClass('disabled');
            }, function (dataErr) {
                utils.unLoading();
                var btnClose = $.t('payment.btnClose');
                var Msg = common.getDescription(-999999);
                if (typeof JSON.parse(dataErr) === "object") {
                    var objReturn = JSON.parse(dataErr);
                    Msg = common.getDescription(objReturn.c);
                    utils.translateLang('transaction.payment');
                    switch (objReturn.c) {
                        case -10033: case -10039: case -200: //nickname
                            payment.SwapErrorResult(nickname, Msg);
                            break;
                        case -10115: case -10142: //CardAmount
                            payment.SwapErrorResult(topupAmount, Msg);
                            break;
                        case -10141://Min Amount
                        case -10156://Max Amount
                            Msg = utils.formatString(Msg, objReturn.p);
                            payment.SwapErrorResult(topupAmount, Msg);
                            break;
                        default:
                            $("#payment_topupGame").find(".alert-danger").html('<i class="fa fa-warning"></i>' + Msg).show();
                            break;
                    }
                    $("#payment_topupGame").trigger('heightChange');
                }
                else {
                    utils.translateLang('transaction.payment');
                    ModalNotificationInit(Msg, "", "error", "", btnClose);
                }
                $("#btnPaymentGameCheckInput").addClass('disabled');


                if (typeof ga != 'undefined')
                    ga('send', 'event', 'Transaction_Payment', payment.actionTracking + '_StepCheck', 'Fail', AmountValue);
                return;
            });
        }
        else {
            window.location = utils.rootUrl() + "dang-nhap";//payment.actionPayment("next", "topupMobile_unLogin_step2");
        }
    };
    this.TopupGame_Confirm = function () {
        utils.translateLang('transaction.payment');
        if ($("#btnPaymentConfirm").hasClass('disabled'))
            return;
        var Otp = "";
        $("#View_PaymentConfirm").find(".alert-danger").html('').hide();
        var confirmCode = $('#txtVerifyCode');
        if ($("#isCheckSecure").is(":visible")) {
            if (confirmCode.val().trim() === '') {
                confirmCode.focus();
                confirmCode.siblings('.error-text').html($.t('error.inputConfirmCode'));
                confirmCode.siblings('.error-text').show();
                confirmCode.addClass('error');
                return;
            }

            if (confirmCode.val().trim().length !== 6) {
                confirmCode.siblings('.error-text').html($.t('error.confirmCodeInvalid'));
                confirmCode.siblings('.error-text').show();
                confirmCode.addClass('error');
                confirmCode.focus();
                return;
            }
            Otp = confirmCode.val().trim();
        }
        var topupAmount = $("#ddr-select-gameAmount").find("option:selected").val().replace(/[,.]/g, '');
        var urlPaymentApi = utils.trasactionApi() + "Payment/TopupSocialGamesConfirm";
        $("#btnPaymentConfirm").addClass('disabled');

        var callbackClose = function () {
            location.href = utils.rootUrl() + 'thong-tin';
        };
        var callBackContinue = function () {
            location.href = utils.rootUrl() + 'lich-su-giao-dich';
        };
        var AmountValue = $("#AmountTopup").html();
        var Nickname = $("#PhoneTopup").text();
        var Product = $("#Product").text();
        utils.loading();
        utils.postData(urlPaymentApi, { Otp: Otp }, function (data) {
            utils.unLoading();
            if (data.c >= 0) {
                
                var contentMsg = utils.formatString($.t('payment.topupGameSuccess'), AmountValue + "," + Product + "," + Nickname);
                confirmCode.value = '';
                if ($("#View_PaymentConfirm").hasClass('modal'))
                    $("#View_PaymentConfirm").modal("close");

                if (data.d && typeof data.d == "object" && data.d.endBalance && parseInt(data.d.endBalance) >= 0) {
                    $("#balance_t .balance").find("span").text(utils.formatMoney(data.d.endBalance));
                }
                ModalNotificationResultInit('success', $.t('payment.tit_topupGameSuccess'), contentMsg, $.t('payment.btnGoHome'), $.t('payment.btnViewHistory'), callbackClose, callBackContinue);
                if (typeof ga != 'undefined')
                    ga('send', 'event', 'Transaction_Payment', payment.actionTracking + '_StepConfirm', 'Success', topupAmount);
            }
            $("#btnPaymentConfirm").removeClass('disabled');
        }, function (dataErr) {
            utils.unLoading();
            var btnClose = $.t('payment.btnClose');
            var Msg = common.getDescription(-999999);
            if (typeof JSON.parse(dataErr) === "object") {
                var objReturn = JSON.parse(dataErr);
                Msg = common.getDescription(objReturn.c);
                utils.translateLang('transaction.payment');
                switch (objReturn.c) {
                    case -6: case -7: case -49: case -111: case -10015: case -10105: case -10021://OTP Fail
                        payment.SwapErrorResult(confirmCode, Msg);
                        break;
                    case -19://giao dịch đang được xử lý
                        var contentMsg = utils.formatString($.t('payment.topupGamePending'), AmountValue + "," + Product + "," + Nickname);
                        if ($("#View_PaymentConfirm").hasClass('modal'))
                            $("#View_PaymentConfirm").modal("close");
                        ModalNotificationResultInit('warning', '', contentMsg, $.t('payment.btnGoHome'), $.t('payment.btnViewHistory'), callbackClose, callBackContinue);
                        break;
                    case -102: case -103: case -10056: case -10134:
                        var contentMsg = utils.formatString($.t('payment.topupGameFail'), AmountValue + "," + Product + "," + Nickname);
                        if ($("#View_PaymentConfirm").hasClass('modal'))
                            $("#View_PaymentConfirm").modal("close");
                        ModalNotificationResultInit('danger', '', contentMsg, $.t('payment.btnGoHome'), $.t('payment.btnViewHistory'), callbackClose, callBackContinue);
                        break;
                    default:
                        $("#View_PaymentConfirm").find(".alert-danger").html('<i class="fa fa-warning"></i>' + Msg).show();
                        break;
                }
            }
            else {
                utils.translateLang('transaction.payment');
                if ($("#View_PaymentConfirm").hasClass('modal'))
                    $("#View_PaymentConfirm").modal("close");
                ModalNotificationInit(Msg, "", "error", "", btnClose);
            }
            $("#btnPaymentConfirm").removeClass('disabled');
            if (typeof ga != 'undefined')
                ga('send', 'event', 'Transaction_Payment', payment.actionTracking + '_StepConfirm', 'Fail', topupAmount);
            return;
        });
    }

    //view mua thẻ
    this.Vw_BuyCard = function (target) {
        payment.cid = parseInt($(target).attr("data-cid"));
        var m_cate = payment.listCateProduct.find(function (c) { return c.CategoryID === payment.cid; });
        if (m_cate != null && m_cate != undefined) {
            if (m_cate.ParentCategoryID === payment.ConfigCateId.topupGame)
                $("#btnPaymentCheckInput").addClass('disabled');
            else
                $("#btnPaymentCheckInput").removeClass('disabled');
            $("#payment_step1 .bank-icon").find("img").attr("src", (m_cate.Logo == "" || m_cate.Logo == null ? utils.rootUrl() + "/Content/assets/images/logo.jpg" : m_cate.Logo));
            $("#payment_step1 .bank-icon").show();
            $("#payment_step1 .title").text(m_cate.Description);
            payment.discount = parseFloat(m_cate.DiscountRate);
            payment.getListAccountTopup(payment.cid);
        }

        //Lấy ds mệnh giá theo cId
        payment.GetListProducts(payment.cid, 0, header.AccountInfo.Username, function (data) {
            if (data != null && data.length > 0) {
                if (m_cate.ParentCategoryID === payment.ConfigCateId.topupGame) {
                    
                    payment.discountGame = parseFloat(data[0].DiscountRate);
                    payment.pcode = data[0].ProductCode;
                    payment.pid = data[0].ProductID;
                    $("#ddr-select-gameAmount").html('');
                    $("#ddr-select-gameAmount").material_select();
                    $.each(payment.topupGameAmount, function (k, v) {
                        var p_discount = payment.discountGame;
                        var p_amount = v - (v * p_discount / 100);

                        var item = '<option value="' + v + '" data-content="' + utils.formatMoney(v) + ' <sup>VNĐ</sup><strong class=\'label secondary\' style=\'float:right;font-weight:400;margin-top:3px\'>' + utils.formatMoney(p_amount) + '<sup>VNĐ</sup></strong>">' + utils.formatMoney(v) + '</option>';
                        $("#ddr-select-gameAmount").append(item);
                    });
                    $("#ddr-select-gameAmount").material_select();
                    payment.changeSelectGameAmount(1);
                    payment.actionView("ts-parent", "next", "View_Payment");

                    setTimeout(function () {
                        $("#txtNickname").focus();
                    }, 300);
                    return;
                }
                $("#ddr-select-amount").html('');
                $("#ddr-select-amount").material_select();
                $.each(data, function (k, v) {
                    var p_discount = parseFloat(v.DiscountRate);
                    var p_amount = parseInt(v.PartnerValue) - (parseInt(v.PartnerValue) * p_discount / 100);
                    var item = '<option data-pid="' + v.ProductID + '" data-pcode="' + v.ProductCode + '" value="' + v.PartnerValue + '" data-content="' + utils.formatMoney(v.PartnerValue) + ' <sup>VNĐ</sup><strong class=\'label secondary\' style=\'float:right;font-weight:400;margin-top:3px\'>' + utils.formatMoney(p_amount) + '<sup>VNĐ</sup></strong>">' + utils.formatMoney(v.PartnerValue) + '</option>';
                    $("#ddr-select-amount").append(item);
                });
                $("#ddr-select-amount").material_select();
                if (parseInt($("#ddr-select-amount").val()) > 0)
                    payment.changeSelectAmount();

                payment.actionView("ts-parent", "next", "View_Payment");
            }
        }, function (dataErr) {
            return;
        });

    }
    //check thông tin step 1
    this.BuyCard_checkInput = function () {
        utils.translateLang('transaction.payment');
        $("#payment_step1").find(".alert-danger").html('');
        if ($("#btnPaymentCheckInput").hasClass('disabled'))
            return;

        var topupAmount = $("#ddr-select-amount option:selected");
        var AmountValue = topupAmount.val().replace(/[,.]/g, '');
        var ddr_select = $("#ddr-select-amount");
        if (AmountValue == '') {
            ddr_select.parent().siblings('.error-text').html($.t("error.amountSelect"));
            ddr_select.parent().siblings('.error-text').show();
            ddr_select.parent().siblings('label').addClass('error');
            ddr_select.siblings("input.select-dropdown").addClass('error');
            return;
        }

        var quantity = $("#txtQuantity");
        var quantityNumber = quantity.val().trim();
        if (quantityNumber == "" || quantityNumber == null) {
            quantity.siblings('.error-text').html('Vui lòng nhập số lượng');
            quantity.siblings('.error-text').show();
            quantity.addClass('error');
            quantity.focus();
            return;
        }
        if (!utils.validateNumberOnly(quantityNumber) || parseInt(quantityNumber) <= 0 || parseInt(quantityNumber) > 99 || quantityNumber.length > 2) {
            quantity.siblings('.error-text').html('Số lượng nhập vào không hợp lệ');
            quantity.siblings('.error-text').show();
            quantity.addClass('error');
            quantity.focus();
            return;
        }
        var m_cate = payment.listCateProduct.find(function (c) { return c.CategoryID === parseInt(payment.cid); });
        if (m_cate == null || m_cate == undefined)
            return;
        payment.serviceId = 6;
        if (m_cate.ParentCategoryID == payment.ConfigCateId.buyCardGame)
            payment.serviceId = 4;
        payment.actionTracking = 'Buy-Card-' + payment.pcode + '-' + AmountValue + '-' + 'SL' + parseInt(quantityNumber) + '-' + 'Pay365Wallet';

        if (isAuthenticate) {
            var paramValid = {
                productID: parseInt(payment.pid),
                Quantity: parseInt(quantityNumber),
                Culture: utils.getCurrentLanguage(),
                CategoryID: parseInt(payment.cid),
                ServiceID: payment.serviceId
            };

            var urlPaymentApi = utils.trasactionApi() + "Payment/BuyCard";
            $("#btnPaymentCheckInput").addClass('disabled');
            utils.loading();
            utils.postData(urlPaymentApi, paramValid, function (data) {
                utils.unLoading();
                if (data.c >= 0) {
                    var productname = "";
                    var cardAmount = utils.formatMoney(topupAmount.val()) + "<sup>VNĐ</sup>";
                    var totalPayment = $("#totalAmount").html();
                    if (m_cate != undefined && m_cate != null) {
                        productname = $.t('payment.card') + " " + m_cate.CategoryName;
                    }
                    if (data.p && typeof data.p === "object" && data.p.length > 1) {
                        if (data.p[1] && data.p[1].length > 0)
                            productname = $.t('payment.card') + " " + data.p[1];
                        if (data.p[2] && parseInt(data.p[2]) > 0)
                            quantityNumber = parseInt(data.p[2]);
                        if (data.p[3] && parseInt(data.p[3]) > 0)
                            totalPayment = utils.formatMoney(parseInt(data.p[3]) * quantityNumber) + "<sup>VNĐ</sup>";
                        if (data.p[4] && parseInt(data.p[4]) > 0)
                            cardAmount = utils.formatMoney(parseInt(data.p[4])) + "<sup>VNĐ</sup>";
                    }
                    var transType = payment.serviceId == 4 ? $.t('payment.buyCardGame') : $.t('payment.buyCardTelco');
                    $("#TransType").text(transType);
                    $("#Product").text(productname);
                    $("#info_account").hide();
                    $("#Quantity").text(quantityNumber);
                    $("#info_quantity").show();
                    $("#AmountTopup").html(cardAmount);
                    $("#DiscountRate").text(payment.discount + "%");
                    $("#TotalPayment").html(totalPayment);
                    $("#PaymentType").text($.t('payment.walletPay365'));
                    var noteSecure = $.t('payment.noteSecureNot');

                    if (data.c > 0) {
                        payment.secureType = data.c;
                        if (data.c == 1) {
                            noteSecure = utils.formatString($.t('payment.noteSecureSMS'), header.AccountInfo.Username);
                            $("#btnResendOTP").show();
                        }
                        else if (data.c == 2) {
                            noteSecure = utils.formatString($.t('payment.noteSecureEmail'), header.AccountInfo.Email);
                            $("#btnResendOTP").show();
                        }
                        else if (data.c == 3) {
                            noteSecure = $.t('payment.noteSecureApp');
                            $("#btnResendOTP").hide();
                        }
                        else {
                            noteSecure = $.t('payment.noteSecureVoice');
                            $("#btnResendOTP").hide();
                        }
                        $("#isCheckSecure").show();
                        $(".txtNoteSecure").html(noteSecure);
                    }
                    else {
                        $("#isCheckSecure").hide();
                        $(".txtNoteSecure").html(noteSecure);
                    }

                    payment.actionView("ts-parent", "next", "View_PaymentConfirm");
                    setTimeout(function () {
                        $("#txtVerifyCode").focus();
                    }, 200);
                }
                $("#btnPaymentCheckInput").removeClass('disabled');
            }, function (dataErr) {
                utils.unLoading();
                var btnClose = $.t('payment.btnClose');
                var Msg = common.getDescription(-999999);
                if (typeof JSON.parse(dataErr) === "object") {
                    var objReturn = JSON.parse(dataErr);
                    Msg = common.getDescription(objReturn.c);
                    utils.translateLang('transaction.payment');
                    switch (objReturn.c) {
                        case -10108://quantity
                        case -13: //số lượng thẻ ko đủ
                            payment.SwapErrorResult(quantity, Msg);
                            break;
                        case -10115: case -10142://CardAmount
                        case -10141://Min Amount
                            payment.SwapErrorResult(topupAmount, Msg);
                            break;
                        default:
                            $("#payment_step1").find(".alert-danger").html('<i class="fa fa-warning"></i>' + Msg).show();
                            break;
                    }
                }
                else {
                    utils.translateLang('transaction.payment');
                    ModalNotificationInit(Msg, "", "error", "", btnClose);
                }
                $("#btnPaymentCheckInput").removeClass('disabled');
                if (typeof ga != 'undefined')
                    ga('send', 'event', 'Transaction_Payment', payment.actionTracking + "_StepCheck", 'Fail', AmountValue);
                return;
            });
        }
        else {
            window.location = utils.rootUrl() + "dang-nhap";//payment.actionPayment("next", "topupMobile_unLogin_step2");
        }
    };
    //confirm mua thẻ
    this.BuyCard_Confirm = function () {
        utils.translateLang('transaction.payment');
        if ($("#btnPaymentConfirm").hasClass('disabled'))
            return;
        var Otp = "";
        $("#View_PaymentConfirm").find(".alert-danger").html('').hide();
        var confirmCode = $('#txtVerifyCode');
        if ($("#isCheckSecure").is(":visible")) {
            if (confirmCode.val().trim() === '') {
                confirmCode.focus();
                confirmCode.siblings('.error-text').html($.t('error.inputConfirmCode'));
                confirmCode.siblings('.error-text').show();
                confirmCode.addClass('error');
                return;
            }

            if (confirmCode.val().trim().length !== 6) {
                confirmCode.siblings('.error-text').html($.t('error.confirmCodeInvalid'));
                confirmCode.siblings('.error-text').show();
                confirmCode.addClass('error');
                confirmCode.focus();
                return;
            }
            Otp = confirmCode.val().trim();
        }
        var AmountValue = $("#AmountTopup").html();
        var quantity = $("#Quantity").text();
        var Product = $("#Product").text();
        var topupAmount = $("#ddr-select-amount option:selected").val().replace(/[,.]/g, '');
        var urlPaymentApi = utils.trasactionApi() + "Payment/BuyCardConfirm";
        var callbackClose = function () {
            location.href = utils.rootUrl() + 'thong-tin';
        };
        var callBackContinue = function () {
            location.href = utils.rootUrl() + 'lich-su-giao-dich';
        };

        payment.actionTracking = 'Buy-Card-' + payment.pcode + '-' + topupAmount + '-' + 'SL' + quantity + '-' + "Pay365Wallet" + "_StepConfirm";
        $("#btnPaymentConfirm").addClass('disabled');
        utils.loading();
        utils.postData(urlPaymentApi, { Otp: Otp }, function (data) {
            utils.unLoading();
            if (data.c >= 0) {
                var contentMsg = utils.formatString($.t('payment.buyCardSuccess'), quantity + "," + Product + "," + AmountValue);
                payment.listCard = data.d;

                if (data.p && typeof data.p == "object" && data.p.length > 0 && parseInt(data.p[data.p.length - 1]) >= 0) {
                    $("#balance_t .balance").find("span").text(utils.formatMoney(data.p[data.p.length - 1]));
                }
                $("#tit_msg").html(contentMsg);
                payment.BindCardPager(1);
                if (payment.listCard.length <= 10)
                    $("#viewCardSelect").hide();
                payment.actionView("ts-parent", "next", "View_ListCardInfo");

                $("#take_all").on('click', function () {
                    $('input.checkbox_i').prop('checked', this.checked);
                    var isChk = $(this).prop("checked");
                    if (isChk) {
                        payment.listCardSelected = payment.listCard.slice(0);
                    }
                    else {
                        payment.listCardSelected = [];
                    }
                });
                if (typeof ga != 'undefined')
                    ga('send', 'event', 'Transaction_Payment', payment.actionTracking, 'Success', topupAmount);
            }
            $("#btnPaymentConfirm").removeClass('disabled');
        }, function (dataErr) {
            utils.unLoading();
            var btnClose = $.t('payment.btnClose');
            var Msg = common.getDescription(-999999);
            if (typeof JSON.parse(dataErr) === "object") {
                var objReturn = JSON.parse(dataErr);
                Msg = common.getDescription(objReturn.c);
                utils.translateLang('transaction.payment');
                switch (objReturn.c) {
                    case -6: case -7: case -49: case -111: case -10015: case -10105: case -10021://OTP Fail
                        payment.SwapErrorResult(confirmCode, Msg);
                        break;
                    case -19://giao dịch đang được xử lý
                        var contentMsg = utils.formatString($.t('payment.buyCardPending'), quantity + "," + Product + "," + AmountValue);
                        ModalNotificationResultInit('warning', '', contentMsg, $.t('payment.btnGoHome'), $.t('payment.btnViewHistory'), callbackClose, callBackContinue);
                        break;
                    case -102: case -103: case -10056: case -10134:
                        var contentMsg = utils.formatString($.t('payment.buyCardFail'), quantity + "," + Product + "," + AmountValue);
                        ModalNotificationResultInit('danger', '', contentMsg, $.t('payment.btnGoHome'), $.t('payment.btnViewHistory'), callbackClose, callBackContinue);
                        break;
                    default:
                        $("#View_PaymentConfirm").find(".alert-danger").html('<i class="fa fa-warning"></i>' + Msg).show();
                        break;
                }
            }
            else {
                utils.translateLang('transaction.payment');
                ModalNotificationInit(Msg, "", "error", "", btnClose);
            }
            $("#btnPaymentConfirm").removeClass('disabled');
            if (typeof ga != 'undefined')
                ga('send', 'event', 'Transaction_Payment', payment.actionTracking, 'Fail', topupAmount);
            return;
        });
    }

    this.Resend_OTP = function () {
        utils.translateLang('transaction.payment');
        var btnClose = $.t('payment.btnClose');

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
            cacheJS.set({ email: header.AccountInfo.Email, type: 'payment' }, 'resend', 60, null);

            var content = utils.formatString($.t('payment.resendOTPEmail'), header.AccountInfo.Email);
            if (header.AccountInfo.SecurityType > 0 && header.AccountInfo.SecurityType == 1)
                content = utils.formatString($.t('payment.resendOTPSMS'), header.AccountInfo.Username);
            ModalNotificationInit(content, null, "success", $.t('payment.titleResendOTP'), btnClose);
            $("#modal-alert").css("z-index", "1020");
        }, function (dataErr) {
            utils.unLoading();
            console.log(dataErr);
            var Msg = common.getDescription(-999999);
            if (typeof JSON.parse(dataErr) === "object") {
                var objReturn = JSON.parse(dataErr);
                Msg = common.getDescription(objReturn.c);
                utils.translateLang('transaction.payment');
                ModalNotificationInit(Msg, "", "error", "", btnClose);
            }
            else {
                utils.translateLang('transaction.payment');
                ModalNotificationInit(Msg, "", "error", "", btnClose);
            }
            $("#modal-alert").css("z-index", "1020");
            return;
        });
    }

    this.SwapErrorResult = function (Target, Msg) {
        $(Target).siblings('.error-text').html(Msg);
        $(Target).siblings('.error-text').show();
        $(Target).addClass('error');
        $(Target).focus();
    }
    
    //Load dữ liệu thẻ - phân trang
    this.BindCardPager = function (currpage, lstData) {
        var listData = lstData ? lstData : payment.listCard;
        currpage = !currpage ? 1 : currpage;
        var total = listData.length;
        var start = (currpage - 1) * 10;
        var end = start + 10 > total ? total : (start + 10);
        var pageData = listData.slice(start, end);
        if (currpage <= 0)
            pageData = listData;
        utils.loading('listCardData');
        $.each(pageData, function (k, v) {
            var findItm = payment.listCardSelected.find(function (c) { return c.Number == v.Number; });
            if (findItm != null && findItm != undefined)
                pageData[k].isCheck = true;
            else
                pageData[k].isCheck = false;
        });
        setTimeout(function () {
            utils.unLoading();
            $("#listCardTemp").html($("#listCardTemp_tmpl").tmpl({ listCardData: pageData }));
            if (currpage <= 0) {
                $("#pager").html('');
                $("#table-card-transaction input[type=checkbox]").parent().hide();
            }
            else {
                $("#table-card-transaction input[type=checkbox]").parent().show();
                $("#pager").pager({
                    pagenumber: currpage,
                    pagecount: Math.ceil(total / 10), buttonClickCallback: function (page) {
                        payment.BindCardPager(page, listData);
                    }
                });
            }

            $("input.checkbox_i").click(function () {
                var idNumber = parseInt($(this).val());
                var isChk = $(this).prop("checked");
                if (isChk) {
                    if (payment.listCardSelected.length === payment.listCard.length)
                        $("#take_all").prop('checked', true);

                    var itm = payment.listCardSelected.find(function (c) { return c.Number == idNumber; });
                    if (itm != null && itm != undefined)
                        return;
                    var detail = payment.listCard.find(function (object) {
                        return object.Number == idNumber; // Filter out the appropriate one
                    });
                    payment.listCardSelected.push(detail);
                }
                else {
                    $("#take_all").prop('checked', false);
                    var idx = -1;
                    var itm = payment.listCardSelected.find(function (c) { return c.Number == idNumber; });
                    if (itm == null || itm == undefined)
                        return;
                    payment.listCardSelected.find(function (object, key) {
                        idx = key;
                        return object.Number == idNumber; // Filter out the appropriate one
                    });

                    payment.listCardSelected.splice(idx, 1);
                }
            });
        }, 300);

    }
    this.ShowCardSelected = function (t) {

        var $table = $('#table-card-transaction');
        var isViewAll = $("#viewCardSelect").attr("data-viewall");

        //Xem the da chon
        if (isViewAll == undefined || isViewAll == null || isViewAll == "0") {
            if (payment.listCardSelected.length <= 0)
                return;

            payment.BindCardPager(1, payment.listCardSelected);
            $(t).text(header.AccountInfo.CurrentLang === 'en' ? 'View all' : 'Xem tất cả');
            $(t).attr("data-viewall", "1");
        } else {
            //Xem tat ca
            payment.BindCardPager(1);
            $(t).text(header.AccountInfo.CurrentLang === 'en' ? 'View card selected' : 'Xem thẻ đã chọn');
            $(t).removeAttr("data-viewall");
        }

    };
    this.ExportCardExcel = function () {
        var length = payment.listCard.length;
        if (length === 0) return;
        var listExport = [];
        //Lấy các trường cần export
        for (var i = 0; i < length; i++) {
            var item = {
                ProductName: payment.listCard[i].ProductName,
                Value: payment.listCard[i].Value,
                Code: payment.listCard[i].Code,
                Serial: payment.listCard[i].Serial,
                ExpriredDate: payment.listCard[i].ExpriredDate
            };
            listExport.push(item);
        }
        for (var i = 0; i < listExport.length; i++) {
            listExport[i]['Loại thẻ'] = listExport[i]['ProductName'];
            delete listExport[i].ProductName;
            listExport[i].Value = utils.formatMoney(listExport[i].Value);
            listExport[i]['Mệnh giá thẻ'] = listExport[i]['Value'];
            delete listExport[i].Value;
            listExport[i]['Mã code'] = listExport[i]['Code'];
            delete listExport[i].Code;
            listExport[i]['Serial thẻ'] = listExport[i]['Serial'];
            delete listExport[i].Serial;
            listExport[i].ExpriredDate = utils.formDateTime(listExport[i].ExpriredDate);
            listExport[i]['Hạn sử dụng'] = listExport[i]['ExpriredDate'];
            delete listExport[i].ExpriredDate;
        }
        jsExportExcel.download(listExport, 'card_detail_' + new Date().getTime() + '.xls', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'export_card_excel');
    };

    this.printCard = function (printType) {
        ldata = payment.listCard;

        var html = "";
        var d = new Date();
        var currDate = d.getDate();
        var currMonth = d.getMonth() + 1;
        var currYear = d.getFullYear();
        var exportDate = currDate + "-" + currMonth + "-" + currYear + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        $.each(ldata, function (i, item) {

            var partnerCurrency = "VNĐ"; //item.PartnerCurency == null ? "VND" : item.PartnerCurency;

            html += "<div class=\"gd_mathe\">";
            html += " <div class=\"mathe_bor\">";
            html += "<div class=\"mathe\">";
            html += "<span class=\"logo-365\">";
            html += "<p><img src=\"http://alpha.pay365.vn/Content/assets/images/logo-purple.svg\" alt=\"\" style=\"width: 100px;\"></p>";
            html += "</span>";
            html += "<p id=\"accountName\">***************</p>";
            html += "<p>";
            html += "<strong id=\"cateName\">";
            html += "" + item.ProductName + "";
            html += "</strong>";
            html += "</p>";
            html += "<p>";
            html += "<strong>";
            html += "<span class=\"red\" id=\"Span1\">" + utils.formatMoney(item.Value) + "" + partnerCurrency + "</span>";
            html += "</strong>";
            html += "</p>";
            html += "<div class=\"macode\" id=\"Div1\">";
            //html += "" + item.Code + "";
            html += "</div>";
            html += "<span class=\"thongtin\">";
            html += "Số seri: <strong id=\"Strong2\">" + item.Serial + "</strong><br>";
            html += "Hạn sử dụng: <b id=\"B1\">" + utils.formDateTime(item.ExpriredDate) + "</b><br>";
            html += "Ngày xuất: <b id=\"B1\">" + exportDate + "</b><br>";
            html += "<label id=\"Label1\">Chăm sóc KH: 093-4626-505</label><br>";

            //if (hiddenAccount != null && hiddenAccount != "") {
            //    html += "Đại lý: <b id=\"B3\">" + hiddenAccount + "</b>";
            //}

            html += "</span>";
            html += "</div>";
            html += "<div class=\"clear\"></div>";
            html += "</div>";
            html += "</div>";
        });

        if (printType == 1)
            payment.printNormal(html);
        else
            payment.printTemp(html);
    };

    this.printTemp = function (html) {
        var winprint = payment.openNewWindow("", "", 350, 600, false, true);
        winprint.document.open();
        winprint.document.write('<html><head><link href="' + utils.rootUrl() + 'Content/css/printcardstyle.css?v=' + new Date().getTime() + '" rel="stylesheet"><\/head><body style="background-color:#FFFFFF;height: 180px;">');
        winprint.document.write(html);
        winprint.document.write('<\/body><\/html>');
        winprint.document.close();
        winprint.focus();
        window.setTimeout(function () { winprint.print(); }, 1000);
    };

    this.printNormal = function (html) {
        var winprint = payment.openNewWindow("", "", 790, 747, true, true);
        winprint.document.open();
        winprint.document.write('<html><head><link href="' + utils.rootUrl() + 'Content/css/365.css" rel="stylesheet"><\/head><body style="background-color:#FFFFFF;">');
        winprint.document.write(html);
        winprint.document.write('<\/body><\/html>');
        winprint.document.close();
        winprint.focus();
        window.setTimeout(function () { winprint.print(); }, 1000);
    };
    this.openNewWindow = function (url, sName, iWidth, iHeight, bResizable, bScrollbars) {
        var iTop = (screen.height - iHeight);
        var iLeft = (screen.width - iWidth);
        var sOptions = "toolbar=no";
        sOptions += ",menubar=yes";
        sOptions += ",width=" + iWidth;
        sOptions += ",height=" + iHeight;
        sOptions += ",resizable=" + (bResizable ? "yes" : "no");
        sOptions += ",scrollbars=" + (bScrollbars ? "yes" : "no");
        sOptions += ",left=" + iLeft;
        sOptions += ",top=" + iTop;
        sOptions += ",close=no";
        var oWindow = window.open(url, sName, sOptions);
        oWindow.focus();
        return oWindow;
    };

}
function findFullText(items, text) {
    var result = [];
    $.each(items, function (key, item) {
        $.each(text, function (idx, t) {
            if (item.indexOf(t) > -1) {
                result.push(t);
            }
        });
    });
    return result;
}
function maxLengthCheck(object) {
    if (object.value > 99)
        object.value = 99;
    else if (object.value <= 0)
        object.value = 1;
    if (object.value.length > object.maxLength - 1) {
        object.value = object.value.slice(0, object.maxLength);
    }
}
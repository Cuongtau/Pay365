news = new function () {
    var cul = utils.getCurrentLanguage();

    this.ListNew = {
        Page: 0,
        PageSize: 0,
        TotalRows: 0
    };

    this.NewDetail = {
        NewsID: 0,
        CategoryID: 0,
        LanguageID: 0,
        IsHot: false,
        Title: "",
        Alias: "",
        Description: "",
        ImageUrl: "",
        Tags: "",
        Status: 0,
        CreatedUser: "",
        UpdatedUser: "",
        CreatedDate: null,
        UpdateTime: null,
        PublishTime: null,
        Content: "",
        ListCategory: "",
        SystemID: 0,
        DateFormat: null
    }

    this.ListSlide = {
        ID: 0,
        SystemID: 0,
        BannerName: "",
        ImageUrl: "",
        TargetUrl: "",
        Description: ""
    };

    this.curPage = 2;

    this.LoadPage_About = function () {
        var param = {
            culture: cul,
            id: 21,
            cateId: 12
        };
        utils.getData(utils.linkNewApi() + "Article/GetNews", param, function (data) {
            $("#about_t").html($("#about_tmpl").tmpl(data.d));  // About
        }, function (err) {
            utils.unLoading();
            console.log(err);
        }, "", false);
    };

    this.LoadPage_NewIndex = function () {
        utils.loading();

        news.Load_Slide();
        news.GetList_Hot();
        news.GetList_New();

        utils.unLoading();
    };

    // Get slide
    this.Load_Slide = function () {
        //var isMobile = {
        //    Android: function () {
        //        return navigator.userAgent.match(/Android/i);
        //    },
        //    BlackBerry: function () {
        //        return navigator.userAgent.match(/BlackBerry/i);
        //    },
        //    iOS: function () {
        //        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        //    },
        //    Opera: function () {
        //        return navigator.userAgent.match(/Opera Mini/i);
        //    },
        //    Windows: function () {
        //        return navigator.userAgent.match(/IEMobile/i);
        //    },
        //    any: function () {
        //        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        //    }
        //};

        utils.getData(utils.linkNewApi() + "Article/GetListBanner", {}, function (data) {
            var list = {
                Slide: data.p
            };
            $("#list_slide_t").html($("#list_slide_tmpl").tmpl(list));
            setTimeout(function () {
                if (data.p.length > 1)
                    var init_news_carousel = new Pay365Carousel({
                        target: '.news-carousel',
                        sliderOptions: {
                            fullWidth: true,
                            autoplay: true,
                            navPrev: '.carousel-prev',
                            navNext: '.carousel-next',
                            interval: 5000
                        }
                    });
                else
                    var init_news_carousel = new Pay365Carousel({
                        target: '.news-carousel',
                        sliderOptions: {
                            fullWidth: true,
                            autoplay: false,
                            interval: 5000
                        }
                    });
                init_news_carousel.start();
            }, 500);
        }, function (err) {
            utils.unLoading();
            console.log(err);
        }, "", false);
    };

    // Get tin nổi bật
    this.GetList_Hot = function () {
        var param = {
            culture: cul,
            cateId: common.NewsConfig.ALL_CATE,
            isHot: 1,
            page: 1,
            pageSize: 3
        };
        utils.paragraphLoading('listnew_hot_t', 300);
        utils.getData(utils.linkNewApi() + "Article/GetListNews", param, function (data) {
            var list = {
                ListNews: data.d
            };
            $("#listnew_hot_t").html($("#listnew_hot_tmpl").tmpl(list));
        }, function (err) {
            utils.unLoading();
            console.log(err);
        }, "");
    };

    // Get Tin Mới nhất
    this.GetList_New = function () {
        var param = {
            culture: cul,
            cateId: common.NewsConfig.ALL_CATE,
            isHot: 0,
            page: 1,
            pageSize: 5
        };
        utils.paragraphLoading('listnews_new_t');
        utils.getData(utils.linkNewApi() + "Article/GetListNews", param, function (data) {
            if (data != null && data.d.length > 0) {
                var listnews = data.d.slice(1);
                var list = {
                    News: data.d[0],
                    ListNews: listnews
                };
                $("#listnews_new_t").html($("#listnews_new_tmpl").tmpl(list));
            } else {
                $("#listnews_new_t").html("");
                $('#btn_More').remove();
            }
        }, function (err) {
            utils.unLoading();
            console.log(err);
        }, "");
    };

    // Get Xem Them Tin Mới Nhất
    this.GetMoreNews = function () {
        var page = news.curPage;
        var param = {
            culture: cul,
            cateId: common.NewsConfig.ALL_CATE,
            isHot: 0,
            page: page,
            pageSize: 4
        };
        $("#listnew_more_t").append("<div id='page_loading'>");
        utils.paragraphLoading('page_loading', 500);
        utils.getData(utils.linkNewApi() + "Article/GetListNews", param, function (data) {
            var list = {
                ListNews: data.d
            };
            $("#listnew_more_t").append($("#listnew_more_tmpl").tmpl(list));
            $("#page_loading").remove();

            $('html,body').animate({
                scrollTop:
                ($("#listnew_more_t").offset().top - 65)
            }, 'slow');

            if (data.d == "" || data.d.length < 4) {
                $("#btn_More").remove();
            }
            news.curPage = news.curPage + 1;
        }, function (err) {
            utils.unLoading();
            console.log(err);
        }, "");
    };

    // Button Search
    this.Btn_SearchNews = function () {
        var key = $("#txt_keyword_search").val();
        if (key === null || key === "" || key === undefined) {
            return;
        }
        window.location = utils.rootUrl() + "search?keyword=" + key;
    };

    // Search Bài. Tìm Kiếm
    this.Search_news = function (key) {
        var param = {
            culture: cul,
            cateId: common.NewsConfig.ALL_CATE,
            keywords: encodeURIComponent(key),
            page: 1,
            pageSize: 12
        };
        utils.paragraphLoading('listnew_search_t', 300);
        utils.getData(utils.linkNewApi() + "Article/GetListNews", param, function (data) {
            var list = {
                ListNews: data.d
            };
            if (data.d == null || data.d.length <= 0) {
                $("#listnew_search_t").html("<p align='center'>" + utils.getCurrentLanguage() === 'en' ? 'No Data' : 'Không có dữ liệu' + "</p>");
                $("#btn_More").remove();
                return;
            }
            if (data.d.length < 12) {
                $("#btn_More").remove();
            }
            $("#listnew_search_t").html($("#listnew_search_tmpl").tmpl(list));
        }, function (err) {
            utils.unLoading();
            console.log(err);
        }, "");
    };

    // <a> các bài theo tag
    this.Btn_Tags = function (tags) {
        if (tags === null || tags === "" || tags === undefined) {
            return;
        }
        window.location = utils.rootUrl() + "tag?tag=" + tags;
    };
    // Lấy tin theo Tag
    this.Search_tags = function (tags) {
        var param = {
            culture: cul,
            cateId: common.NewsConfig.ALL_CATE,
            tags: encodeURIComponent(tags),
            page: 1,
            pageSize: 6
        };
        utils.paragraphLoading('listnew_tags_t', 300);
        utils.getData(utils.linkNewApi() + "Article/GetListNews", param, function (data) {
            var list = {
                ListNews: data.d
            };
            if (data.d == null || data.d.length <= 0) {
                $("#listnew_tags_t").html("<p align='center'>" + utils.getCurrentLanguage() === 'en' ? 'No Data' : 'Không có dữ liệu' + "</p>");
                $("#btn_More").remove();
                return;
            }
            if (data.d.length < 12) {
                $("#btn_More").remove();
            }
            $("#listnew_tags_t").html($("#listnew_tags_tmpl").tmpl(list));
        }, function (err) {
            utils.unLoading();
            console.log(err);
        }, "");
    }

    // Nút xem thêm ở trang tìm kiếm
    this.btn_More_news = function () {
        var param = {
            culture: cul,
            cateId: common.NewsConfig.ALL_CATE,
            isHot: 0,
            keywords: "",
            page: news.curPage,
            pageSize: 6
        };

        $("#listnew_search_t").append("<div id='page_loading'>");
        utils.paragraphLoading('page_loading', 300);
        utils.getData(utils.linkNewApi() + "Article/GetListNews", param, function (data) {
            var list = {
                ListNews: data.d
            };
            $("#listnew_search_t").append($("#listnew_search_tmpl").tmpl(list));
            $("#page_loading").remove();

            $('html, body').animate({ scrollTop: $('#bot_page').offset().top - 65 }, 'slow');

            if (data.d == "" || data.d.length < 4) {
                $("#btn_More").remove();
            }
            news.curPage = news.curPage + 1;
        }, function (err) {
            utils.unLoading();
            console.log(err);
        }, "");
    };

    // Lấy chi tiết bài viết
    this.Load_NewDetail = function (id, cateId) {
        var param = {
            culture: cul,
            id: id,
            cateId: cateId
        };
        utils.paragraphLoading('newDetail_t', 800);
        utils.getData(utils.linkNewApi() + "Article/GetNews", param, function (data) {
            if (data == "" || data.d == '' || data.d == undefined) {
                $("#newDetail_t").html("<p align='center'>" + utils.getCurrentLanguage() === 'en' ? 'No Data' : 'Không có dữ liệu' + "</p>");
                return;
            }
            var obj = { News: data.d };
            if (data.d.Tags != null && data.d.Tags.length > 0)
                news.Load_Tag(data.d.Tags);

            news.Load_ListNews_SameTag(data.d.Tags, data.d.CategoryID);
            $("#New_Title").text(obj.News.Title);
            $("#newDetail_t").html($("#newDetail_tmpl").tmpl(obj));
        }, function (err) {
            var nodata_text = cul === 'en' ? "No Data" : "Không có dữ liệu";
            $("#New_Title").text(cul === 'en' ? 'Title' : 'Tiêu đề bài viết');
            $("#newDetail_t").html("<p align='center'>" + nodata_text + "</p>");
            utils.unLoading();
            console.log(err);
        }, "");
    };

    // Lấy Tag
    this.Load_Tag = function (tag) {
        if (tag === "" || tag === null || tag === undefined) {
            return;
        }
        var object = {
            Tag: tag.split(',')
        };
        $("#tag_t").html($("#tag_tmpl").tmpl(object));
    };

    // Lấy slide chi tiết bài viết
    this.Load_Slide_Detail = function () {
        utils.paragraphLoading('slide_newDetail_t');
        utils.getData(utils.linkNewApi() + "Article/GetListBanner", {}, function (data) {
            var list = {
                Slide: data.p
            };
            $("#slide_newDetail_t").html($("#slide_newDetail_tmpl").tmpl(list));
            var news_widget_carousel = new Pay365Carousel({
                target: '.news-widget-carousel',
                sliderOptions: {
                    fullWidth: true,
                    interval: 5000,
                    autoplay: true,
                    indicators: true
                }
            }).start();
        }, function (err) {
            utils.unLoading();
            console.log(err);
        }, "");
    };

    // Lấy tin bài theo nhóm ( cateID )
    this.Load_ListNews_ByCateID = function (cate) {
        var param = {
            culture: cul,
            cateId: cate,
            page: 1,
            pageSize: 6
        };
        utils.paragraphLoading('listnews_sameCate_t');
        utils.getData(utils.linkNewApi() + "Article/GetListNews", param, function (data) {
            var list = {
                ListNews: data.d
            };
            $("#listnews_sameCate_t").html($("#listnews_sameCate_tmpl").tmpl(list));
        }, function (err) {
            utils.unLoading();
            console.log(err);
        }, "");
    };

    // Lấy tin bài cùng Tag
    this.Load_ListNews_SameTag = function (strTagId, cateId) {
        if (strTagId == "" || strTagId === null || strTagId === undefined) {
            strTagId = "-1";
        }
        var param = {
            culture: cul,
            cateId: cateId,
            tags: strTagId,
            page: 1,
            pageSize: 6
        };
        utils.paragraphLoading('listnews_sameTag_t');
        utils.getData(utils.linkNewApi() + "Article/GetListNews", param, function (data) {
            if (typeof data.d !== 'object' && data.d.count > 0) {
                $("#listnews_sameTag_t").html("");
            }
            var list = {
                ListNews: data.d
            };
            $("#listnews_sameTag_t").html($("#listnews_sameTag_tmpl").tmpl(list));
        }, function (err) {
            utils.unLoading();
            console.log(err);
        }, "");
    };

    // Lấy 4 bài mới nhất trang Information
    this.Load_ListNews_HomePage = function () {
        var param = {
            culture: cul,
            cateId: common.NewsConfig.ALL_CATE,
            page: 1,
            pageSize: 4
        };
        utils.paragraphLoading('home_listNews_t');
        utils.getData(utils.linkNewApi() + "Article/GetListNews", param, function (data) {
            var list = {
                ListNews: data.d
            };
            $("#home_listNews_t").html($("#home_listNews_tmpl").tmpl(list));
        }, function (err) {
            console.log(err);
        }, "");
    };

    // Đk nhận tin khuyến mại
    this.RegisterSubscripber = function () {
        $('.error-text').text('');
        utils.translateLang('profile.account');
        var email = $("#txtEmailSubcrible").val();
        if (email === '' || email == null) {
            $('#txterror_emailSubcrible').text(i18n.t('changeAccountProfile.emailEmpty'));
            $('#txtEmailSubcrible').focus();
            return;
        }

        if (!utils.validateEmail(email)) {
            $('#txterror_emailSubcrible').text(i18n.t('changeAccountProfile.emailIlegal'));
            $('#txtEmailSubcrible').focus();
            return;
        }
        var params = {
            Email: email
        };
        utils.loading();
        utils.postData(utils.linkNewApi() + "Article/RegisterSubscripber", params, function (data) {
            utils.unLoading();
            var responseCode = data.c;
            if (responseCode >= 0) {
                $('#modal-success #modal_content').text(common.getDescription(responseCode));
                $('#modal-success').modal('open');
                setTimeout(function () {
                    $('#modal-success').modal('close');
                }, 5000);
            }
        }, function (err) {
            console.log(err);
            utils.unLoading();
            $('#txterror_emailSubcrible').text(common.getDescription(JSON.parse(err).c));
            $('#txtEmailSubcrible').focus();
        });
    };


    this.SendContact = function () {
        $('.error-text').text('');
        utils.translateLang('common.news');
        var fullname = $('#txt_fullname').val();
        if (fullname === '' || fullname === null) {
            $('#txterror_fullname').text(i18n.t('Contact.fullnameEmpty'));
            $('#txt_fullname').focus();
            return;
        }

        var title = $('#txt_title').val();
        if (title === "" || title === null) {
            $('#txterror_title').text(i18n.t('Contact.titleEmpty'));
            $('#txt_title').focus();
            return;
        }

        var email = $("#txt_email").val();
        if (email === '' || email == null) {
            $('#txterror_email').text(i18n.t('Contact.emailEmpty'));
            $('#txt_email').focus();
            return;
        }

        if (!utils.validateEmail(email)) {
            $('#txterror_email').text(i18n.t('Contact.emailIlegal'));
            $('#txt_email').focus();
            return;
        }

        var phone = $("#txt_phone").val();
        if (phone === "" || phone === null) {
            $('#txterror_phone').text(i18n.t('Contact.phoneEmpty'));
            $('#txt_phone').focus();
            return;
        }

        var content = $("#txt_content").val();
        if (content === "" || content === null) {
            $('#txterror_content').text(i18n.t('Contact.contentEmpty'));
            $('#txt_content').focus();
            return;
        }

        var params = {
            Email: email,
            Title: title,
            Content: content,
            FullName: fullname,
            PhoneNumber: phone
        };
        utils.loading();
        utils.postData(utils.linkNewApi() + "Article/SendContact", params, function (data) {
            utils.unLoading();
            var responseCode = data.c;
            if (responseCode >= 0) {
                $('#modal-success #modal_content').text(common.getDescription(responseCode));
                $('#modal-success').modal('open');

                setTimeout(function () {
                    $("#div_contact").find("input").val("");
                    $("#div_contact").find("textarea").val("");
                }, 1500);
            }
        }, function (err) {
            console.log(err);
            utils.unLoading();
            $('#modal-alert #modal_content').text(common.getDescription(JSON.parse(err).c));
            $('#modal-alert').modal('open');
        });
    };

    this.Contact = function () {
        var cul = utils.getCurrentLanguage();
        var param = {
            culture: cul
        };
        utils.getData(utils.linkNewApi() + "Article/Contact", param, function (data) {
        }, function (err) {
            utils.unLoading();
            console.log(err);
        }, "", false);
    };
};

guide = new function () {
    this.GetListGuideDetail = function (category, alias) {
        var cul = utils.getCurrentLanguage();
        let cateid = common.guideConfig.FAQ;
        let keyword, title = 'FAQ';
        if (category === 'account') {
            cateid = common.guideConfig.ACCOUNT;
            title = cul === 'en' ? 'Account' : 'Tài khoản';
        }

        else if (category === 'wallet') {
            cateid = common.guideConfig.WALLET;
            title = cul === 'en' ? 'e-Wallet' : 'Ví điện tử';
        }

        else if (category === 'shopping') {
            cateid = common.guideConfig.SHOPPING;
            title = cul === 'en' ? 'Shopping' : 'Mua sắm';
        }

        else if (category === 'search') {
            keyword = $('#guide_keyword').val();
            cateid = common.guideConfig.SEARCHGUIDE;
            title = cul === 'en' ? 'Search' : 'Tìm kiếm';
        }

        var param = {
            culture: cul,
            cateId: cateid,
            page: 1,
            keywords: keyword,
            pageSize: 100
        };

        utils.paragraphLoading('guide_detail_t', 450);
        utils.paragraphLoading('related_question_t');

        utils.getData(utils.linkNewApi() + "Article/GetListNews", param, function (data) {
            var param = { title: title, guides: data.d, RandomQuestion: data.d.length > 5 ? utils.getRandomValues(data.d, 5) : data.d, IsSearch: false };
            $("#guide_detail_t").html($("#guide_detail_tmpl").tmpl(param));
            if (category !== 'search')
                $("#related_question_t").html($("#related_question_tmpl").tmpl(param));
            else
                guide.GetRelatedGuide('faq', 5, true);
            $('.collapsible').collapsible({
                accordion: true,
                onOpen: function (el) {
                    var collapsible = $('.collapsible:not([data-collapse-number=' + el.parent().data('collapse-number') + '])');
                    collapsible.find('li').removeClass('active');
                    collapsible.find('.collapsible-header').removeClass('active');
                    collapsible.find('.collapsible-body').css('display', 'none');
                    if (history.pushState) {
                        var newUrl = utils.rootUrl() + 'huong-dan/chi-tiet?category=' + category + '&detail=' + el.data('alias');
                        window.history.pushState({ path: newUrl }, '', newUrl);
                    }
                }
            });
            if (alias) {
                $('.collapsible').find('li').removeClass('active').find('.collapsible-header').removeClass('active');
                $('.collapsible').find('.collapsible-body').hide();

                var $thisElement = $(".collapsible").find("li[data-alias='" + alias + "']");
                $thisElement.addClass('active');
                $thisElement.find('.collapsible-header').addClass('active');
                $thisElement.find('.collapsible-body').show();
                $('html,body').animate({ scrollTop: ($thisElement.offset().top - 70) }, 'slow');
            }
        }, function (err) {
            utils.unLoading();
            console.log(err);
        });
    };

    this.GuideFocusDetail = function (t) {
        var alias = $(t).data('alias');
        $('.collapsible').find('li').removeClass('active').find('.collapsible-header').removeClass('active');
        $('.collapsible').find('.collapsible-body').hide();
        var $thisElement = $(".collapsible").find("li[data-alias='" + alias + "']");
        $thisElement.addClass('active');
        $thisElement.find('.collapsible-header').addClass('active');
        $thisElement.find('.collapsible-body').show();
        $('html,body').animate({ scrollTop: ($thisElement.offset().top - 70) }, 'slow');
        if (history.pushState) {
            var newUrl = utils.rootUrl() + 'huong-dan/chi-tiet?category=' + utils.getParameterByName('category') + '&detail=' + alias;
            window.history.pushState({ path: newUrl }, '', newUrl);
        }
    };

    this.GetRelatedGuide = function (category, top, isSearch) {
        var cul = utils.getCurrentLanguage();
        let cateid = common.guideConfig.FAQ, title = 'FAQ';
        if (category === 'account') {
            cateid = common.guideConfig.ACCOUNT;
        }

        else if (category === 'wallet') {
            cateid = common.guideConfig.WALLET;
        }

        else if (category === 'shopping') {
            cateid = common.guideConfig.SHOPPING;
        }

        else if (category === 'search') {
            cateid = common.guideConfig.SEARCHGUIDE;
        }
        var param = {
            culture: cul,
            cateId: cateid,
            page: 1,
            pageSize: top
        };

        utils.paragraphLoading('related_question_t');
        utils.getData(utils.linkNewApi() + "Article/GetListNews", param, function (data) {
            var param = { category: category, RandomQuestion: data.d, IsSearch: !isSearch ? 0 : 1 };
            $("#related_question_t").html($("#related_question_tmpl").tmpl(param));
        }, function (err) {
            utils.unLoading();
            console.log(err);
        });
    }
};
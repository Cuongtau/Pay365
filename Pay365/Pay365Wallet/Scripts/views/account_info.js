
account_info = new function() {

    // Thay đổi thông tin tk -->
    this.Vw_ChangeAccountInfo = function() {
        utils.loading();
        $("select").material_select();
        //$("#dob").datetimepicker({
        //});
        $("#dob").pickadate({
            selectMonths: true,
            selectYears: 180,
            today: "Hôm nay",
            clear: "Xóa",
            close: "Đồng ý",
            closeOnSelect: false,
            format: "dd/mm/yyyy",
            monthsFull: [
                "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9",
                "Tháng 10", "Tháng 11", "Tháng 12"
            ],
            monthsShort: [
                "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9",
                "Tháng 10", "Tháng 11", "Tháng 12"
            ],
            weekdaysFull: ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
            weekdaysShort: ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"]
        });

        // Get Nation
        setTimeout(function() {
                var nation = header.AccountInfo.NationalID;
                account_info.get_National(0);
                console.log(nation);
                if (header.AccountInfo.National.length > 0) {
                    $.each(header.AccountInfo.National,
                        function(key, val) {
                            var script;
                            if (nation == 0) {
                                if (val.NationalID == 84) {
                                    script = "<option selected='selected' value='" +
                                        val.NationalID +
                                        "'>" +
                                        val.NationalName +
                                        "</option>";
                                } else
                                    script = "<option value='" + val.NationalID + "'>" + val.NationalName + "</option>";
                            } else {
                                if (val.NationalID == header.AccountInfo.NationalID) {
                                    script = "<option selected='selected' value='" +
                                        val.NationalID +
                                        "'>" +
                                        val.NationalName +
                                        "</option>";
                                } else
                                    script = "<option value='" + val.NationalID + "'>" + val.NationalName + "</option>";
                            }
                            $("#ddlnation").append(script);
                        });
                    $("select").material_select();
                }

                var nationID = $("#ddlnation option:selected").val();
                account_info.get_Location(nationID, 0);
                if (header.AccountInfo.Location.length > 0) {
                    $.each(header.AccountInfo.Location,
                        function(key, val) {
                            var script;
                            if (val.LocationID == header.AccountInfo.LocationID)
                                script = "<option selected='selected' value='" +
                                    val.LocationID +
                                    "'>" +
                                    val.LocationName +
                                    "</option>";
                            else
                                script = "<option value='" + val.LocationID + "'>" + val.LocationName + "</option>";
                            $("#ddllocation").append(script);
                        });
                    $("select").material_select();
                }

                var location = $("#ddllocation option:selected").val();
                account_info.get_District(location, 0);
                if (header.AccountInfo.District.length > 0) {
                    $.each(header.AccountInfo.District,
                        function(key, val) {
                            var script;
                            if (val.DistrictID == header.AccountInfo.DistrictID)
                                script = "<option selected='selected' value='" +
                                    val.DistrictID +
                                    "'>" +
                                    val.DistrictName +
                                    "</option>";
                            else
                                script = "<option value='" + val.DistrictID + "'>" + val.DistrictName + "</option>";
                            $("#ddldistrict").append(script);
                        });
                    $("select").material_select();
                }
            },
            200);

        setTimeout(function() {
                utils.unLoading();
            },
            800);

        setTimeout(function() {
                SlideToogle("ts-2", "next");
            },
            1000);
    };

    // quay lại thông tin tk <---
    this.backStep_ChangeAccountInfo = function() {
        var currentDiv = $("#ts-2").find(".div_slide.div_active");
        var backDiv = currentDiv.prev();

        SlideToogle("ts-2", "prev");
    };

    this.get_National = function(nation) {
        var params = {
            NationalID: nation
        };
        utils.postData(utils.profileApi() + "profile/GetNational",
            params,
            function(data) {
                header.AccountInfo.National = data;
            },
            function(err) {
                console.log(err);
            },
            "",
            false);
    };

    this.get_Location = function(nation, location) {
        var params = {
            NationalID: nation,
            LocationID: location
        };
        utils.postData(utils.profileApi() + "profile/GetLocation",
            params,
            function(data) {
                header.AccountInfo.Location = data;
            },
            function(err) {
                console.log(err);
            },
            "",
            false);
    };

    this.get_District = function(location, district) {
        var params = {
            LocationID: location,
            DistrictID: district
        };
        utils.postData(utils.profileApi() + "profile/GetDistrict",
            params,
            function(data) {
                header.AccountInfo.District = data;
            },
            function(err) {
                console.log(err);
            },
            "",
            false);
    };

    // Get Location By NationId
    this.onchange_Nation = function(t) {
        $("#ddllocation").html("");
        var nationId = t.value;
        var params = {
            NationalID: nationId,
            LocationID: 0
        };
        utils.postData(utils.profileApi() + "profile/GetLocation",
            params,
            function(data) {
                if (data.length > 0) {
                    var script;
                    $.each(data,
                        function(key, val) {
                            script += "<option value='" + val.LocationID + "'>" + val.LocationName + "</option>";
                        });
                    $("#ddllocation").append(script);
                    $("select").material_select();
                } else {
                    $("#ddllocation").append("<option value='0'>" + utils.getCurrentLanguage() === "en"
                        ? "No Data"
                        : "Không có dữ liệu" + "</option>");
                    $("select").material_select();
                }
            },
            function(err) {
                console.log(err);
            },
            "",
            false);

        var location = $("#ddllocation option:selected").val();
        $("#ddldistrict").html("");
        utils.postData(utils.profileApi() + "profile/GetDistrict",
            {
                LocationID: location,
                DistrictID: 0
            },
            function(data) {
                if (data.length > 0) {
                    var script;
                    $.each(data,
                        function(key, val) {
                            script += "<option value='" + val.DistrictID + "'>" + val.DistrictName + "</option>";
                        });
                    $("#ddldistrict").append(script);
                    $("select").material_select();
                } else {
                    $("#ddldistrict").html("");
                    $("#ddldistrict").append("<option value='0'>" + utils.getCurrentLanguage() === "en"
                        ? "No Data"
                        : "Không có dữ liệu" + "</option>");
                    $("select").material_select();
                }
            },
            function(err) {
                console.log(err);
            },
            "",
            false);
    };

    // Get District By LocationID
    this.onChange_Location = function(t) {
        $("#ddldistrict").html("");
        var location = t.value;
        var params = {
            LocationID: location,
            DistrictID: 0
        };
        utils.postData(utils.profileApi() + "profile/GetDistrict",
            params,
            function(data) {
                if (data.length > 0) {
                    var script;
                    $.each(data,
                        function(key, val) {
                            script += "<option value='" + val.DistrictID + "'>" + val.DistrictName + "</option>";
                        });
                    $("#ddldistrict").append(script);
                    $("select").material_select();
                } else {
                    $("#ddldistrict").append("<option value='0'>" + utils.getCurrentLanguage() === "en"
                        ? "No Data"
                        : "Không có dữ liệu" + "</option>");
                    $("select").material_select();
                }
            },
            function(err) {
                console.log(err);
            },
            "",
            false);
    };

    // thực hiện thay đổi tt tài khoản
    this.changeAccountInfo = function() {
        $(".error-text").text("");
        utils.translateLang("profile.account");

        var fullname = $("#full_name").val();
        if (fullname == null || fullname === "") {
            $("#txterror_Fullname").text(i18n.t("changeAccountProfile.fullnameEmpty"));
            $("#full_name").focus();
            return;
        }

        var gender = $("#ddlGender option:selected").val();

        var birthday = $("#dob").val();
        if (birthday == null || birthday == "") {
            $("#txterror_Birthday").text(i18n.t("changeAccountProfile.birthdayEmpty"));
            $("#dob").focus();
            return;
        }

        var nation = $("#ddlnation option:selected").val();
        if (nation == "" || nation == null || nation == 0) {
            $("#txterror_nation").text(i18n.t("changeAccountProfile.nationEmpty"));
            $("#ddlnation").focus();
            return;
        }

        var location = $("#ddllocation option:selected").val();
        if (location == "" || location == null) {
            $("#txterror_location").text(i18n.t("changeAccountProfile.locationEmpty"));
            $("#ddllocation").focus();
        }

        var district = $("#ddldistrict option:selected").val();
        if (district == "" || district == null) {
            $("#txterror_district").text(i18n.t("changeAccountProfile.districtEmpty"));
            $("#ddldistrict").focus();
        }

        var passport = $("#passport").val();
        if (passport == null || passport === "") {
            $("#txterror_Passport").text(i18n.t("changeAccountProfile.passportEmpty"));
            $("#passport").focus();
            return;
        }

        if (passport.length < 5 || passport.length > 12) {
            $("#txterror_Passport").text(i18n.t("changeAccountProfile.passportSize"));
            $("#passport").focus();
            return;
        }

        var address = $("#address").val();
        if (address == null || address === "") {
            $("#txterror_PermanentAddress").text(i18n.t("changeAccountProfile.addressEmpty"));
            $("#address").focus();
            return;
        }

        var job = $("#job").val();
        if (job == null || job === "") {
            $("#txterror_Job").text(i18n.t("changeAccountProfile.jobEmpty"));
            $("#job").focus();
            return;
        }

        var position = $("#pos").val();
        if (position == null || position === "") {
            $("#txterror_Position").text(i18n.t("changeAccountProfile.positionEmpty"));
            $("#pos").focus();
            return;
        }

        var param = {
            Fullname: fullname,
            Birthday: birthday,
            Passport: passport,
            Position: position,
            NationalID: nation,
            LocationID: location,
            DistrictID: district,
            Job: job,
            Gender: gender,
            PermanentAddress: address,
            ResidentialAddress: address,
            Email: ""
        };

        var callback = function(data) {
            utils.unLoading();
            if (data.c >= 0) {
                // thành công
                var responseCode = data.c;
                $("#modal-success #modal_content").text(i18n.t("changeAccountProfile.done"));
                $("#modal-success").modal("open");

                $("#acc_info_update_t #lbl_fullname").text(fullname);
                $("#acc_info_update_t #lbl_gender").text(gender == 1 ? "Nam" : "Nữ");
                $("#acc_info_update_t #lbl_birthday").text(birthday);
                $("#acc_info_update_t #lbl_passport").text(passport);
                $("#acc_info_update_t #lbl_address").text(address);
                $("#acc_info_update_t #lbl_job").text(job);
                $("#acc_info_update_t #lbl_pos").text(position);

                setTimeout(function() {
                        account_info.backStep_ChangeAccountInfo();
                    },
                    2000);
                setTimeout(function() {
                        $("#modal-success").modal("close");
                    },
                    3000);

                ga("send", "event", "Account_Information", "Change AccountInfo", "Success");
                return;
            }
        };

        var callbackFail = function(data) {
            utils.unLoading();
            var responseCode = data.c;
            $("#modal-alert #modal_content").text(common.getDescription(responseCode));
            $("#modal-alert").modal("open");
            ga("send", "event", "Account_Information", "Change AccountInfo", "Fail");
        };
        utils.loading();
        utils.postData(utils.linkIdApi() + "Account/UpdateInfoPersonal", param, callback, callbackFail);
    };

    this.CertificateAccountView = function() {
        $("html,body").animate({ scrollTop: $("#ts-1").offset().top - $(".header").height() }, "fast");
        var action = $("#formCertificateAccount").index() - $("#ts-1").find(".div_slide.div_active").index();
        if (action === 0) return;
        SlideToogle("ts-1", action > 0 ? "next" : "prev", "formCertificateAccount");
        ga("send", "pageview", "certificate-account");
    };

    this.ConfirmCertificate = function() {
        if ($("#formCertificateAccount #bt_ConfirmCertificate").hasClass("disabled")) {
            return;
        }
        var params = {};
        $("#formCertificateAccount div.selected:visible").each(function(index) {
            var src = $(this).find("img").attr("src");
            if (src) {
                params["base64String" + (index + 1)] = src.split(",")[1];
            }
        });

        if (!$.isEmptyObject(params)) {
            var callback = function(data) {
                $("#formCertificateAccount #bt_ConfirmCertificate").removeClass("disabled");
                utils.unLoading();
                if (data.c >= 0) {
                    if (header.AccountInfo.CurrentLang === "en")
                        ModalNotificationInit("Send certificate account request successfully",
                            function() { window.location.href = utils.rootUrl() + "thong-tin-tai-khoan" },
                            "success",
                            null,
                            "Close",
                            true);
                    else
                        ModalNotificationInit("Gửi yêu cầu chứng thực thành công",
                            function() { window.location.href = utils.rootUrl() + "thong-tin-tai-khoan" },
                            "success",
                            null,
                            "Đóng",
                            true);

                    ga("send", "event", "Account_Information", "Certificate Account", "Success");
                } else {
                    ModalNotificationInit(common.getDescription(-999999),
                        null,
                        "danger",
                        null,
                        header.AccountInfo.CurrentLang === "en" ? "Close" : "Đóng",
                        true);
                    common.saveLog(data);
                    ga("send", "event", "Account_Information", "Certificate_Account_StepConfirm", "Fail");
                }
            };

            var callbackFail = function(data) {
                common.saveLog(data);
                $("#formCertificateAccount #bt_ConfirmCertificate").removeClass("disabled");
                utils.unLoading();
                if (utils.checkResponseIsValid(data)) {
                    var responseCode = JSON.parse(data).c;
                    ModalNotificationInit(common.getDescription(responseCode),
                        null,
                        "danger",
                        null,
                        header.AccountInfo.CurrentLang === "en" ? "Close" : "Đóng",
                        true);
                } else {
                    ModalNotificationInit(common.getDescription(-999999),
                        null,
                        "danger",
                        null,
                        header.AccountInfo.CurrentLang === "en" ? "Close" : "Đóng",
                        true);
                }
                ga("send", "event", "Account_Information", "Certificate_Account_StepConfirm", "Fail");
            };
            $("#formCertificateAccount #bt_ConfirmCertificate").addClass("disabled");
            utils.loading();
            utils.postData(utils.linkIdApi() + "Account/VerifyAccount", params, callback, callbackFail);
        } else {
            ModalNotificationInit(utils.getCurrentLanguage() === "en"
                ? "Please select a certification photo"
                : "Vui lòng chọn ảnh chứng thực");
        }
    };

    this.VerifyEmailView = function(isResend) {
        $("html,body").animate({ scrollTop: $("#ts-1").offset().top - $(".header").height() }, "fast");

        if (isResend && $("#resend_verify_code").data("resend_verify_code")) {
            $("#modal-alert #modal_content").text(utils.getCurrentLanguage() === "en"
                ? "Time between 2 re-send secure code is minimum 60s"
                : "Khoảng cách giữa 2 lần gửi lại mã xác thực tối thiểu là 30s");
            $("#modal-alert").modal("open");
            return;
        }
        var action = $("#formVerifyEmail").index() - $("#ts-1").find(".div_slide.div_active").index();
        if (!isResend && action === 0) return;
        var email = $("#HiddenEmailVerify").val();
        if (!email) {
            $("#modal-alert #modal_content").text(common.getDescription(-999999));
            $("#modal-alert").modal("open");
            return;
        }

        var callback = function(data) {
            utils.unLoading();
            if (data.c >= 0) {
                if (!isResend) {
                    SlideToogle("ts-1", action > 0 ? "next" : "prev", "formVerifyEmail");
                    setTimeout(function() {
                            $("#formVerifyEmail #otp_verify_email").focus();
                        },
                        500);
                    // bổ sung mã xác thực 
                    $("#txt_OTPsended").text(header.AccountInfo.Email);
                    ga("send", "pageview", "verify-email");
                } else {
                    $("#modal-alert #modal_content").text(utils.getCurrentLanguage() === "en"
                        ? "Resend verify email code successfully"
                        : "Nhận lại mã xác thực thành công");
                    $("#modal-alert").modal("open");
                    $("#resend_verify_code").data("resend_verify_code", "1");
                    setTimeout(function() {
                            $("#resend_verify_code").removeData("resend_verify_code");
                        },
                        30000);
                    ga("send", "event", "Account_Information", "Verify_Email_ResendVerifyCode", "Success");
                }
                return;
            }
            common.saveLog(data);
        };

        var callbackFail = function(data) {
            common.saveLog(data);
            utils.unLoading();
            $("#txt_OTPsended").text("");
            if (typeof data === "object") {
                var responseCode = JSON.parse(data).c;
                $("#modal-alert #modal_content").text(common.getDescription(responseCode));
                $("#modal-alert").modal("open");
            } else if (utils.checkResponseIsValid(data)) {
                var responseCode = JSON.parse(data).c;
                $("#modal-alert #modal_content").text(common.getDescription(responseCode));
                $("#modal-alert").modal("open");
            } else {
                $("#modal-alert #modal_content").text(common.getDescription(-999999));
                $("#modal-alert").modal("open");
            }
            ga("send", "event", "Account_Information", "Verify_Email_StepCheck", "Fail");
        };
        utils.loading();
        utils.postData(utils.profileApi() + "Profile/SendMailVerifyEmail", {}, callback, callbackFail);
    };

    this.ConfirmVerifyEmail = function() {
        utils.translateLang("common.register");
        $(".error-text, .success-text").text("");
        $("input").removeClass("error success");
        $(".p-error-text").remove();
        var otp = $("#formVerifyEmail #otp_verify_email").val().trim();
        if (!otp) {
            $("#formVerifyEmail #otp_verify_email").addClass("error");
            $("#formVerifyEmail #otp_verify_email").parent().find(".error-text").text(i18n.t("message.otpEmpty"));
            $("#ts-1").height($("#formVerifyEmail").height());
            $("#formVerifyEmail #otp_verify_email").focus();
            return;
        }

        var email = $("#HiddenEmailVerify").val().trim();
        if (!email) {
            $("#modal-alert #modal_content").text(i18n.t("message.emailIllegal"));
            $("#modal-alert").modal("open");
            return;
        }

        var callback = function(data) {
            utils.unLoading();
            if (data.c >= 0) {
                $("#modal-success").modal({
                    dismissible: true, // Modal can be dismissed by clicking outside of the modal
                    //ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                    //},
                    complete: function() {
                        window.location.href = utils.rootUrl() + "thong-tin-tai-khoan";
                    } // Callback for Modal close
                });
                $("#modal-success #modal_content").text(utils.getCurrentLanguage() === "en"
                    ? "Verify email successfully"
                    : "Xác thực email thành công");
                $("#modal-success").modal("open");
                ga("send", "event", "Account_Information", "Verify_Email_StepConfirm", "Success");
                return;
            }
            common.saveLog(data);
            common.getFormDescription(data.c, "formVerifyEmail");
        };

        var callbackFail = function(data) {
            common.saveLog(data);
            utils.unLoading();
            if (utils.checkResponseIsValid(data)) {
                var responseCode = JSON.parse(data).c;
                common.getFormDescription(responseCode, "formVerifyEmail");
            } else {
                common.getFormDescription(-999999, "formVerifyEmail");
            }
            ga("send", "event", "Account_Information", "Verify_Email_StepConfirm", "Fail");
        };
        utils.loading();
        utils.postData(utils.profileApi() + "Profile/VerifyEmail", { Otp: otp, email: email }, callback, callbackFail);
    };

    this.ChangeEmailView = function() {
        $("#formChangeEmail p").remove();
        var action = $("#formChangeEmail").index() - $("#ts-1").find(".div_slide.div_active").index();
        if (action === 0) return;
        var callback = function(data) {
            utils.unLoading();
            if (data.c >= 0) {
                if (data.c === 1) {
                    if (header.AccountInfo.CurrentLang === "en") {
                        if (header.AccountInfo.SecurityType === common.accountSecureConfig.EMAIL) {
                            $('<p>An OTP has been sent to email <span class="secondary">' +
                                    header.AccountInfo.Email +
                                    '</span>.</br> Do not receive OTP, please click <span class="secondary">Resend OTP</span></p>')
                                .insertAfter($("#formChangeEmail #div_otp_change_email .form-group"));
                            $("#formChangeEmail #change_email_resend_otp").show();
                        } else if (header.AccountInfo.SecurityType === common.accountSecureConfig.SMS ||
                            header.AccountInfo.SecurityType === 0) {
                            $('<p>An OTP has been sent to phone number <span class="secondary">' +
                                header.AccountInfo.Username +
                                "</span>.</p>").insertAfter($("#formChangeEmail #div_otp_change_email .form-group"));
                            $(
                                    '<p>Do not receive OTP ?. Please send <span class="secondary">P365 BM </span> to <span class="secondary">8100</span></p>')
                                .insertAfter($("#formChangeEmail #div_otp_change_email .form-group"));
                            $("#formChangeEmail #change_email_resend_otp").hide();
                        }
                    } else {
                        if (header.AccountInfo.SecurityType === common.accountSecureConfig.EMAIL) {
                            $('<p>Mã xác thực OTP đã được gửi đến email <span class="secondary">' +
                                    header.AccountInfo.Email +
                                    '</span>.</br> Không nhận được mã, vui lòng click <span class="secondary">Nhận lại OTP</span></p>')
                                .insertAfter($("#formChangeEmail #div_otp_change_email .form-group"));
                            $("#formChangeEmail #change_email_resend_otp").show();
                        } else if (header.AccountInfo.SecurityType === common.accountSecureConfig.SMS ||
                            header.AccountInfo.SecurityType === 0) {
                            $('<p>Mã xác thực OTP đã được gửi đến số điện thoại <span class="secondary">' +
                                    header.AccountInfo.Username +
                                    "</span>.</p>")
                                .insertAfter($("#formChangeEmail #div_otp_change_email .form-group"));
                            $(
                                    '<p>Bạn không nhận được mã xác thực? Vui lòng soạn tin: <span class="secondary">P365 BM</span> gửi <span class="secondary">8100</span> để nhận mã xác thực</p>')
                                .insertAfter($("#formChangeEmail #div_otp_change_email .form-group"));
                            $("#formChangeEmail #change_email_resend_otp").hide();
                        }
                    }
                    $("#formChangeEmail #div_otp_change_email").show();
                } else {
                    common.saveLog(data);
                    $("#formChangeEmail #div_otp_change_email").hide();
                }
                SlideToogle("ts-1", action > 0 ? "next" : "prev", "formChangeEmail");
                setTimeout(function() {
                        $("#formChangeEmail #new_email").focus();
                    },
                    500);
                ga("send", "pageview", "change-email");
                return;
            }

            ga("send", "event", "Account_Information", "Change_Email_StepCheck", "Fail");
            $("#modal-alert #modal_content").text(common.getDescription(-999999));
            $("#modal-alert").modal("open");
        };

        var callbackFail = function(data) {
            common.saveLog(data);
            utils.unLoading();
            if (utils.checkResponseIsValid(data)) {
                var responseCode = JSON.parse(data).c;
                $("#modal-alert #modal_content").text(common.getDescription(responseCode));
                $("#modal-alert").modal("open");
            } else {
                $("#modal-alert #modal_content").text(common.getDescription(-999999));
                $("#modal-alert").modal("open");
            }
            ga("send", "event", "Account_Information", "Change_Email_StepCheck", "Fail");
        };

        utils.loading();
        utils.postData(utils.linkIdApi() + "Account/CheckEmailChange", {}, callback, callbackFail);
    };

    this.ConfirmChangeEmail = function() {
        utils.translateLang("common.register");
        $(".error-text, .success-text").text("");
        $("input").removeClass("error success");

        var $form = $("#formChangeEmail");
        var newEmail = $form.find("#new_email").val().trim();
        if (!newEmail) {
            var $newEmail = $form.find("#new_email");
            $newEmail.addClass("error");
            $newEmail.parent().find(".error-text").text(i18n.t("message.emailEmpty"));
            $("#ts-1").height($form.height() +
                parseInt($form.css("margin-bottom")) +
                parseInt($form.css("margin-top")));
            $newEmail.focus();
            return;
        }

        if (!utils.validateEmail(newEmail)) {
            var $newEmail = $form.find("#new_email");
            $newEmail.addClass("error");
            $newEmail.parent().find(".error-text").text(i18n.t("message.emailIllegal"));
            $("#ts-1").height($form.height() +
                parseInt($form.css("margin-bottom")) +
                parseInt($form.css("margin-top")));
            $newEmail.focus();
            return;
        }

        var otp = $form.find("#otp_change_email").val().trim();
        if ($("#formChangeEmail #div_otp_change_email").is(":visible") && !otp) {
            var $otpChangeEmail = $("#formChangeEmail").find("#otp_change_email");
            $otpChangeEmail.addClass("error");
            $otpChangeEmail.parent().find(".error-text").text(i18n.t("message.otpEmpty"));
            $("#ts-1").height($form.height() +
                parseInt($form.css("margin-bottom")) +
                parseInt($form.css("margin-top")));
            $otpChangeEmail.focus();
            return;
        }

        var callback = function(data) {
            utils.unLoading();
            if (data.c >= 0) {
                $("#HiddenEmailVerify").val(newEmail);
                $("#HiddenEmailVerify").parent("li").find(".data")
                    .html(newEmail + '<i class="material-icons danger">clear</i>');
                $("#mission_t div:first-child").html(
                    '<i class="material-icons danger">clear</i><p class="label">Xác thực <strong>Email</strong></p><p class="text"><a href="javascript:;" onclick="account_info.VerifyEmailView();" class="btn btn-sm btn-primary waves-effect waves-light">Xác thực email</a></p>');
                var closeCallBack = function() {
                    if ($("#formChangeEmail #div_otp_change_email").is(":visible")) {
                        header.AccountInfo.Email = newEmail;
                        account_info.VerifyEmailView();
                        return;
                    }
                    window.location.href = utils.rootUrl() + "thong-tin-tai-khoan";
                };
                ModalNotificationInit(utils.getCurrentLanguage() === "en"
                    ? "Change email successfully"
                    : "Thay đổi email thành công",
                    closeCallBack);
                ga("send", "event", "Account_Information", "Change_Email_StepConfirm", "Success");
                return;
            }
            common.saveLog(data);
            common.getFormDescription(data.c, "formChangeEmail");
        };

        var callbackFail = function(data) {
            common.saveLog(data);
            utils.unLoading();
            if (utils.checkResponseIsValid(data)) {
                var responseCode = JSON.parse(data).c;
                common.getFormDescription(responseCode, "formChangeEmail");
            } else {
                common.getFormDescription(-9999999, "formChangeEmail");
            }
            ga("send", "event", "Account_Information", "Change_Email_StepConfirm", "Fail");
        };

        utils.loading();
        utils.postData(utils.linkIdApi() + "Account/VerifyEmailChange",
            { EmailNew: newEmail, Otp: otp },
            callback,
            callbackFail);
    };

    this.BackToAccountInfo = function(prev) {
        SlideToogle("ts-1", "prev", prev);
    };

};

transaction_history = new function() {

    this.listHistory = {
        listAll: [],
        listSuccess: [],
        listPending: [],
        itemPerPage: 8,
        totalPage: undefined,
        paginationShow: 5
    };

    var des = "Chọn dịch vụ";
    if (header.AccountInfo.CurrentLang == "en") {
        des = "Choose service";
    }

    this.GetServices = function() {
        utils.getData(utils.trasactionApi() + "Payment/GetServices",
            { ServiceType: 0 },
            function(data) {
                if (data == null || data.p.length <= 0) {
                    $("#ddlService").append("<option value='0' disabled selected>" + des + "</option>");
                    return;
                }
                $("#ddlService").append("<option value='0' disabled selected>" + des + "</option>");
                $.each(data.p,
                    function(key, val) {
                        var script;
                        script = "<option value='" + val.ServiceID + "'>" + val.ServiceName + "</option>";
                        $("#ddlService").append(script);
                    });
                $("#ddlService").material_select();
            },
            function(err) {
                utils.unLoading();
                console.log(err);
            },
            "");
    };

    this.GetListHistory = function() {
        utils.translateLang("transaction.payment");
        var fromDate = $("#fromDate").val();
        if (!fromDate) {
            $("#modal-alert #modal_content").text(i18n.t("history.error1"));
            $("#modal-alert").modal("open");
            return;
        }

        var toDate = $("#toDate").val();
        if (!toDate) {
            $("#modal-alert #modal_content").text(i18n.t("history.error2"));
            $("#modal-alert").modal("open");
            return;
        }
        if (moment(fromDate, "DD/MM/YYYY", true)._d > moment(toDate, "DD/MM/YYYY", true)._d) {
            $("#modal-alert #modal_content").text(i18n.t("history.error3"));
            $("#modal-alert").modal("open");
            return;
        }
        var service = $("#ddlService").val();
        var serviceId = service.length > 0 ? service.join(",") : "";

        transaction_history.listHistory.listSuccess = [];
        transaction_history.listHistory.listPending = [];

        var params = {
            BeginDate: fromDate,
            EndDate: toDate,
            ServiceID: !serviceId ? "" : serviceId,
            TransID: 0
        };
        utils.paragraphLoading("list_history_success_t");
        utils.paragraphLoading("list_history_pending_t");
        utils.postData(utils.trasactionApi() + "Payment/GetHistory",
            params,
            function(data) {
                if (data.p != null && data.p.length > 0) {
                    console.log(data.p);
                    transaction_history.listHistory.listAll = data.p;
                    $("#content_data, #export_excel").show();
                    $("#content_empty").hide();
                    $.each(data.p,
                        function(key, val) {
                            if ((val.ServiceID === common.serviceConfig.CASHOUT_OFF ||
                                    val.ServiceID === common.serviceConfig.CASHOUT_ONL) &&
                                val.Description) {
                                var bankCashout = transaction_history.GetBankInfoFromDesc(val.Description, 2);
                                var desc = transaction_history.GetBankInfoFromDesc(val.Description, 1);
                                val.BankCashout = bankCashout;
                                val.Description = desc;
                            }
                            if (val.Status > 0) {
                                transaction_history.listHistory.listSuccess.push(val);
                            } else {
                                transaction_history.listHistory.listPending.push(val);
                            }
                        });
                } else {
                    common.saveLog(data);
                    $("#content_data, #export_excel").hide();
                    $("#content_empty").show();
                    $("#divpager").html("");
                    return;
                }
                var totalPage =
                    transaction_history.listHistory.listSuccess.length >
                        transaction_history.listHistory.listPending.length
                        ? Math.ceil(transaction_history.listHistory.listSuccess.length /
                            transaction_history.listHistory.itemPerPage)
                        : Math.ceil(transaction_history.listHistory.listPending /
                            transaction_history.listHistory.itemPerPage);
                transaction_history.listHistory.totalPage = totalPage;
                //Intit Pager
                var $pageID = $("#divpager");
                $pageID.html("");
                //append left icon
                $pageID.append(
                    '<a href="javascript:;" id="previous" class="btn btn-page waves-effect waves-primary"><i class="material-icons">chevron_left</i></a>');
                //append page-item

                for (var i = 0; i < totalPage; i++) {
                    if (i === 0) //Page 1 actived
                        $pageID.append(
                            '<a href="javascript:;" class="btn btn-page waves-effect waves-primary active page-item">' +
                            (i + 1) +
                            "</a>");
                    else
                        $pageID.append(
                            '<a href="javascript:;" class="btn btn-page waves-effect waves-primary page-item">' +
                            (i + 1) +
                            "</a>");
                }
                //append right icon
                $pageID.append(
                    '<a href="javascript:;" id="next" class="btn btn-page waves-effect waves-primary"><i class="material-icons">chevron_right</i></a>');

                $pageID.find(".page-item:gt(" + transaction_history.listHistory.paginationShow + ")").hide();

                //Load page 1
                var listSuccessInitPage =
                    transaction_history.listHistory.listSuccess.slice(0, transaction_history.listHistory.itemPerPage);
                var listPendingInitPage =
                    transaction_history.listHistory.listPending.slice(0, transaction_history.listHistory.itemPerPage);
                if (listSuccessInitPage.length > 0) {
                    $("#list_history_success_t").html($("#list_history_success_tmpl")
                        .tmpl({ listSuccessInitPage: listSuccessInitPage }));
                    $(".collapsible").collapsible({
                        accordion: true
                    });
                    $("#list_history_success_t").parent(".transaction-column").show();
                    if ($("#list_history_pending_t").parent(".transaction-column").width() > 760)
                        $("#list_history_pending_t").parent(".transaction-column").css("float", "left");
                } else {
                    $("#list_history_success_t").parent(".transaction-column").hide();
                    if ($("#list_history_pending_t").parent(".transaction-column").width() > 760)
                        $("#list_history_pending_t").parent(".transaction-column").css("float", "initial");
                }


                if (listPendingInitPage.length > 0) {
                    $("#list_history_pending_t").html($("#list_history_pending_tmpl")
                        .tmpl({ listPendingInitPage: listPendingInitPage }));
                    $(".collapsible").collapsible({
                        accordion: true
                    });
                    $("#list_history_pending_t").parent(".transaction-column").show();
                    if ($("#list_history_success_t").parent(".transaction-column").width() > 760)
                        $("#list_history_success_t").parent(".transaction-column").css("float", "left");
                } else {
                    $("#list_history_pending_t").parent(".transaction-column").hide();
                    if ($("#list_history_success_t").parent(".transaction-column").width() > 760)
                        $("#list_history_success_t").parent(".transaction-column").css("float", "initial");
                }


            },
            function(err) {
                common.saveLog(err);
                utils.unLoading();
                console.log(err);
            },
            null);
    };

    this.LoadPage = function(page) {
        var listSuccess = transaction_history.listHistory.listSuccess.slice(
            (page - 1) * transaction_history.listHistory.itemPerPage,
            page * transaction_history.listHistory.itemPerPage);
        var listPending = transaction_history.listHistory.listPending.slice(
            (page - 1) * transaction_history.listHistory.itemPerPage,
            page * transaction_history.listHistory.itemPerPage);

        if (listSuccess.length > 0) {
            $("#list_history_success_t")
                .html($("#list_history_success_tmpl").tmpl({ listSuccessInitPage: listSuccess }));
            $(".collapsible").collapsible({
                accordion: true
            });
            $("#list_history_success_t").parent(".transaction-column").show();
            if ($("#list_history_pending_t").parent(".transaction-column").width() > 760)
                $("#list_history_pending_t").parent(".transaction-column").css("float", "left");
        } else {
            $("#list_history_success_t").parent(".transaction-column").hide();
            if ($("#list_history_pending_t").parent(".transaction-column").width() > 760)
                $("#list_history_pending_t").parent(".transaction-column").css("float", "initial");
        }

        if (listPending.length > 0) {
            $("#list_history_pending_t")
                .html($("#list_history_pending_tmpl").tmpl({ listPendingInitPage: listPending }));
            $(".collapsible").collapsible({
                accordion: true
            });
            $("#list_history_pending_t").parent(".transaction-column").show();
            if ($("#list_history_success_t").parent(".transaction-column").width() > 760)
                $("#list_history_success_t").parent(".transaction-column").css("float", "left");
        } else {
            $("#list_history_pending_t").parent(".transaction-column").hide();
            if ($("#list_history_success_t").parent(".transaction-column").width() > 760)
                $("#list_history_success_t").parent(".transaction-column").css("float", "initial");
        }

        //Last show      
        var $pageID = $("#divpager");
        var lastPageVisible = parseInt($pageID.find(".page-item:visible:last").text());
        var firstPageVisible = parseInt($pageID.find(".page-item:visible:first").text());

        if (page === lastPageVisible) {
            if (page === transaction_history.listHistory.totalPage) return;
            $pageID.find(".page-item:gt(" + (lastPageVisible - 2) + ")").show();
            $pageID.find(
                ".page-item:gt(" + (lastPageVisible + transaction_history.listHistory.paginationShow - 2) + ")").hide();
            $pageID.find(".page-item:lt(" + (lastPageVisible - 2) + ")").hide();
        } else if (page === firstPageVisible) {
            if (page === 1) return;
            $pageID.find(".page-item:lt(" + (firstPageVisible + 1) + ")").show();
            $pageID.find(".page-item:lt(" + (firstPageVisible - transaction_history.listHistory.paginationShow) + ")")
                .hide();
            $pageID.find(".page-item:gt(" + (firstPageVisible) + ")").hide();
        }

    };

    this.listCard = {
        data: [],
        dataSelected: [],
        paginationShow: 10
    };

    this.ShowCardInfo = function(step, t) {
        //send otp
        if (step === 1) {
            var param = {
                TransID: $(t).data("transid"),
                OrderID: $(t).data("orderid"),
                culture: header.AccountInfo.CurrentLang
            };
            utils.loading();
            utils.postData(utils.trasactionApi() + "Payment/CheckGetCardValue",
                param,
                function(data) {
                    utils.unLoading();
                    if (data.c >= 0) {
                        var detail = transaction_history.listHistory.listAll.filter(function(object) {
                            return object.TransID == $(t).data("transid"); // Filter out the appropriate one
                        })[0];
                        var $formDetail = $("#view_card_detail");
                        $formDetail.find(".card-title t").text("PG-" + detail.TransID);
                        $("#main_history").hide();
                        $formDetail.show();
                        $formDetail.find("#table_card").show();
                        $formDetail.find("#show_step2").hide();
                        if (data.d && data.d.length > 0) {
                            var $tbody = $formDetail.find("#table-card-transaction tbody");
                            $tbody.html("");
                            $.each(data.d,
                                function(key, val) {
                                    $tbody.append('<tr><td align="center"><input type="checkbox" value="' +
                                        val.ProductItemID +
                                        '" class="filled-in checkbox_i" id="i_' +
                                        val.ProductItemID +
                                        '"><label for="i_' +
                                        val.ProductItemID +
                                        '"></label></td><td align="center">' +
                                        val.Number +
                                        '</td><td align="center">' +
                                        val.ProductName +
                                        '</td><td align="center">' +
                                        utils.formatMoney(val.Value) +
                                        '<sup>VNĐ</sup></td><td align="center">' +
                                        val.Code +
                                        '</td><td align="center">' +
                                        val.Serial +
                                        '</td><td align="center">' +
                                        utils.formDateTime(val.ExpriredDate) +
                                        "</td></tr>");
                                });

                            transaction_history.listCard.data = data.d;
                            var total = data.d.length;
                            var pageInit = function(currpage) {
                                var start = (currpage - 1) * transaction_history.listCard.paginationShow;
                                var end = start + transaction_history.listCard.paginationShow > total
                                    ? total
                                    : (start + transaction_history.listCard.paginationShow);
                                $("#table_card").find("tbody tr").hide().slice(start, end).show();
                                $("#divpager_2").pager({
                                    pagenumber: currpage,
                                    pagecount: Math.ceil(total / transaction_history.listCard.paginationShow),
                                    buttonClickCallback: function(page) {
                                        pageInit(page);
                                    }
                                });
                            };
                            pageInit(1);
                        }
                    } else
                        common.saveLog(data);
                },
                function(err) {
                    common.saveLog(err);
                    console.log(err);
                    if (utils.checkResponseIsValid(err)) {
                        var dataErr = JSON.parse(err);
                        //Quá hạn mức, gọi send otp
                        if (dataErr.c === -10153) {
                            var detail = transaction_history.listHistory.listAll.filter(function(object) {
                                return object.TransID == $(t).data("transid"); // Filter out the appropriate one
                            })[0];
                            var $formDetail = $("#view_card_detail");
                            $formDetail.find(".card-title t").text("PG-" + detail.TransID);
                            //Tk su dung bao mat otp email
                            if (header.AccountInfo.SecurityType === common.accountSecureConfig.EMAIL) {
                                if (header.AccountInfo.CurrentLang === "en")
                                    $formDetail.find("#show_step2 p.view-card-2").html(
                                        'The system has sent an email secure code to email: <br/><i style: color:"#42c34b">' +
                                        header.AccountInfo.Email +
                                        "</i>, please enter the code to confirm the request");
                                else
                                    $formDetail.find("#show_step2 p.view-card-2").html(
                                        'Hệ thống vừa gửi mã xác thực vào email: <br/><i style: color:"#42c34b">' +
                                        header.AccountInfo.Email +
                                        "</i>, vui lòng nhập mã để xác nhận yêu cầu");

                                $formDetail.find("#show_step2 p.view-card-sms-2").show();
                                $formDetail.find("#resend_secure_code").show();

                            } else if (header.AccountInfo.SecurityType === common.accountSecureConfig.SMS) {
                                if (header.AccountInfo.CurrentLang === "en")
                                    $formDetail.find("#show_step2 p.view-card-2").html(
                                        'The system has sent an email secure code to phone number: <br/><i style: color:"#42c34b">' +
                                        header.AccountInfo.Username +
                                        "</i>, please enter the code to confirm the request");
                                else
                                    $formDetail.find("#show_step2 p.view-card-2").html(
                                        'Hệ thống vừa gửi mã xác thực vào số điện thoại: <br/><span class="secondary">' +
                                        header.AccountInfo.Username +
                                        "</span>, vui lòng nhập mã để xác nhận yêu cầu");

                                $formDetail.find("#resend_secure_code").show();
                                $formDetail.find("#show_step2 p.view-card-sms-2").show();
                            }
                            $formDetail.find("#show_step2 #bt_Confirm").data("orderid", $(t).data("orderid"));
                            $formDetail.find("#show_step2 p.view-card-2").show();
                            $("#main_history").hide();
                            $formDetail.show();
                            $formDetail.find("#show_step2").show();
                        } else
                            ModalNotificationInit(common.getDescription(dataErr.c));
                    } else
                        ModalNotificationInit(common.getDescription(-999999));
                    utils.unLoading();
                },
                null);
            return;
        }

        // get cardinfo
        var $formDetail = $("#view_card_detail");
        var otp = $formDetail.find("#show_step2 #input_otp").val();
        if (!otp) {
            var $inputOTP = $formDetail.find("#show_step2 #input_otp");
            $inputOTP.addClass("error");
            $inputOTP.parent().find(".error-text").text(header.AccountInfo.CurrentLang === "en"
                ? "Please enter secure code"
                : "Vui lòng nhập mã bảo mật");
            $inputOTP.focus();
            return;
        }
        var orderID = $(t).data("orderid");
        utils.postData(utils.trasactionApi() + "Payment/GetCardValue",
            { OrderID: orderID, Otp: otp },
            function(data) {
                if (data.c >= 0) {
                    $formDetail.find("#table_card").show();
                    $formDetail.find("#show_step2").hide();
                    if (data.d && data.d.length > 0) {
                        var $tbody = $formDetail.find("#table-card-transaction tbody");
                        $tbody.html("");
                        $.each(data.d,
                            function(key, val) {
                                $tbody.append('<tr><td align="center"><input type="checkbox" value="' +
                                    val.ProductItemID +
                                    '" class="filled-in checkbox_i" id="i_' +
                                    val.ProductItemID +
                                    '"><label for="i_' +
                                    val.ProductItemID +
                                    '"></label></td><td align="center">' +
                                    val.Number +
                                    '</td><td align="center">' +
                                    val.ProductName +
                                    '</td><td align="center">' +
                                    utils.formatMoney(val.Value) +
                                    '<sup>VNĐ</sup></td><td align="center">' +
                                    val.Code +
                                    '</td><td align="center">' +
                                    val.Serial +
                                    '</td><td align="center">' +
                                    utils.formDateTime(val.ExpriredDate) +
                                    "</td></tr>");
                            });

                        transaction_history.listCard.data = data.d;
                        var total = data.d.length;
                        (total > 10) ? $("#btShowCardSelected").show() : $("#btShowCardSelected").hide();
                        var pageInit = function(currpage) {
                            var start = (currpage - 1) * transaction_history.listCard.paginationShow;
                            var end = start + transaction_history.listCard.paginationShow > total
                                ? total
                                : (start + transaction_history.listCard.paginationShow);
                            $("#table_card").find("tbody tr").hide().slice(start, end).show();
                            $("#divpager_2").pager({
                                pagenumber: currpage,
                                pagecount: Math.ceil(total / transaction_history.listCard.paginationShow),
                                buttonClickCallback: function(page) {
                                    pageInit(page);
                                }
                            });
                        };
                        pageInit(1);
                    }
                } else
                    common.saveLog(data);

            },
            function(err) {
                common.saveLog(err);
                utils.unLoading();
                console.log(err);
                if (utils.checkResponseIsValid(err)) {
                    var dataErr = JSON.parse(err);
                    common.getFormDescription(dataErr.c, "#view_card_detail #show_step2");
                    return;
                }
                common.getFormDescription(-99999999, "#view_card_detail #show_step2");
            },
            null);
        return;
    };

    this.ShowCardSelected = function(t) {
        var $table = $("#table-card-transaction");
        //Xem the da chon
        if ($(t).data("action") === "view_selected") {
            if ($table.find(".checkbox_i:checked").length === 0) return;
            $($table.find(".checkbox_i:checked")).each(function() {
                var $that = this;
                var detail = transaction_history.listCard.data.filter(function(object) {
                    return object.ProductItemID == $that.value; // Filter out the appropriate one
                })[0];
                transaction_history.listCard.dataSelected.push(detail);
            });
            if (transaction_history.listCard.dataSelected.length > 0) {
                var $formDetail = $("#view_card_detail");
                var $tbody = $formDetail.find("#table-card-transaction tbody");
                $tbody.html("");
                $.each(transaction_history.listCard.dataSelected,
                    function(key, val) {
                        $tbody.append('<tr><td align="center"><input type="checkbox" checked value="' +
                            val.ProductItemID +
                            '" class="filled-in checkbox_i" id="i' +
                            val.ProductItemID +
                            '"><label for="i' +
                            val.ProductItemID +
                            '"></label></td><td align="center">' +
                            val.Number +
                            '</td><td align="center">' +
                            val.ProductName +
                            '</td><td align="center">' +
                            utils.formatMoney(val.Value) +
                            '<sup>VNĐ</sup></td><td align="center">' +
                            val.Code +
                            '</td><td align="center">' +
                            val.Serial +
                            '</td><td align="center">' +
                            utils.formDateTime(val.ExpriredDate) +
                            "</td></tr>");
                    });

                var total = transaction_history.listCard.dataSelected.length;
                var pageInit = function(currpage) {
                    var start = (currpage - 1) * transaction_history.listCard.paginationShow;
                    var end = start + transaction_history.listCard.paginationShow > total
                        ? total
                        : (start + transaction_history.listCard.paginationShow);
                    $("#table_card").find("tbody tr").hide().slice(start, end).show();
                    $("#divpager_2").pager({
                        pagenumber: currpage,
                        pagecount: Math.ceil(total / transaction_history.listCard.paginationShow),
                        buttonClickCallback: function(page) {
                            pageInit(page);
                        }
                    });
                };
                pageInit(1);
                $(t).data("action", "view_all");
                $(t).text(header.AccountInfo.CurrentLang === "en" ? "View all" : "Xem tất cả");
            }
        } else {
            //Xem tat ca
            var $formDetail = $("#view_card_detail");
            var $tbody = $formDetail.find("#table-card-transaction tbody");

            var checkedItems = [];
            $tbody.find(".checkbox_i:checked").each(function() {
                checkedItems.push($(this).val());
            });

            $tbody.html("");
            $.each(transaction_history.listCard.data,
                function(key, val) {
                    if ($.inArray(val.ProductItemID.toString(), checkedItems) !== -1)
                        $tbody.append('<tr><td align="center"><input type="checkbox" checked value="' +
                            val.ProductItemID +
                            '" class="filled-in checkbox_i" id="i' +
                            val.ProductItemID +
                            '"><label for="i' +
                            val.ProductItemID +
                            '"></label></td><td align="center">' +
                            val.Number +
                            '</td><td align="center">' +
                            val.ProductName +
                            '</td><td align="center">' +
                            utils.formatMoney(val.Value) +
                            '<sup>VNĐ</sup></td><td align="center">' +
                            val.Code +
                            '</td><td align="center">' +
                            val.Serial +
                            '</td><td align="center">' +
                            utils.formDateTime(val.ExpriredDate) +
                            "</td></tr>");
                    else
                        $tbody.append('<tr><td align="center"><input type="checkbox" value="' +
                            val.ProductItemID +
                            '" class="filled-in checkbox_i" id="i' +
                            val.ProductItemID +
                            '"><label for="i' +
                            val.ProductItemID +
                            '"></label></td><td align="center">' +
                            val.Number +
                            '</td><td align="center">' +
                            val.ProductName +
                            '</td><td align="center">' +
                            utils.formatMoney(val.Value) +
                            '<sup>VNĐ</sup></td><td align="center">' +
                            val.Code +
                            '</td><td align="center">' +
                            val.Serial +
                            '</td><td align="center">' +
                            utils.formDateTime(val.ExpriredDate) +
                            "</td></tr>");
                });

            var total = transaction_history.listCard.data.length;
            var pageInit = function(currpage) {
                var start = (currpage - 1) * transaction_history.listCard.paginationShow;
                var end = start + transaction_history.listCard.paginationShow > total
                    ? total
                    : (start + transaction_history.listCard.paginationShow);
                $("#table_card").find("tbody tr").hide().slice(start, end).show();
                $("#divpager_2").pager({
                    pagenumber: currpage,
                    pagecount: Math.ceil(total / transaction_history.listCard.paginationShow),
                    buttonClickCallback: function(page) {
                        pageInit(page);
                    }
                });
            };
            pageInit(1);
            transaction_history.listCard.dataSelected = [];
            $(t).data("action", "view_selected");
            $(t).text(header.AccountInfo.CurrentLang === "en" ? "View card selected" : "Xem thẻ đã chọn");
        }

    };

    this.ShowCardBetween = function(t) {
        var from = $("#table_card #view_from").val();
        var to = $("#table_card #view_to").val();
        if (from && to) {
            to = parseInt(to);
            from = parseInt(from);
            if (from > to) {
                transaction_history.listCard.dataSelected = [];
                return;
            }
            to = to > transaction_history.listCard.data.length ? transaction_history.listCard.data.length : to;
            from = from < 1 ? 1 : from;
            transaction_history.listCard.dataSelected = transaction_history.listCard.data.slice((from - 1), to);
            if (transaction_history.listCard.dataSelected.length > 0) {
                var $formDetail = $("#view_card_detail");
                var $tbody = $formDetail.find("#table-card-transaction tbody");
                $tbody.html("");
                $("#table-card-transaction th:first-child").hide();
                $.each(transaction_history.listCard.dataSelected,
                    function(key, val) {
                        $tbody.append('<tr><td align="center">' +
                            val.Number +
                            '</td><td align="center">' +
                            val.ProductName +
                            '</td><td align="center">' +
                            utils.formatMoney(val.Value) +
                            '<sup>VNĐ</sup></td><td align="center">' +
                            val.Code +
                            '</td><td align="center">' +
                            val.Serial +
                            '</td><td align="center">' +
                            utils.formDateTime(val.ExpriredDate) +
                            "</td></tr>");
                    });

                var total = transaction_history.listCard.dataSelected.length;
                var pageInit = function(currpage) {
                    var start = (currpage - 1) * transaction_history.listCard.paginationShow;
                    var end = start + transaction_history.listCard.paginationShow > total
                        ? total
                        : (start + transaction_history.listCard.paginationShow);
                    $("#table_card").find("tbody tr").hide().slice(start, end).show();
                    $("#divpager_2").pager({
                        pagenumber: currpage,
                        pagecount: Math.ceil(total / transaction_history.listCard.paginationShow),
                        buttonClickCallback: function(page) {
                            pageInit(page);
                        }
                    });
                };
                pageInit(1);
            }
        }

        transaction_history.listCard.dataSelected = [];
    };

    this.ExportExcel = function() {
        var length = this.listHistory.listAll.length;
        if (length === 0) return;
        var data = this.listHistory.listAll;
        var listExport = [];
        //Lấy các trường cần export
        for (var i = 0; i < length; i++) {
            var item = {
                TransID: data[i].TransID,
                Username: data[i].Username,
                ProductName: data[i].ProductName,
                Amount: data[i].Amount,
                CreatedTime: data[i].CreatedTime,
                Description: data[i].Description,
                Status: data[i].Status
            };
            listExport.push(item);
        }

        for (var i = 0; i < listExport.length; i++) {
            listExport[i]["Mã giao dịch"] = listExport[i]["TransID"];
            delete listExport[i].TransID;
            listExport[i]["Tài khoản"] = listExport[i]["Username"];
            delete listExport[i].Username;
            listExport[i]["Sản phẩm"] = listExport[i]["ProductName"];
            delete listExport[i].ProductName;
            listExport[i].Amount = utils.formatMoney(listExport[i].Amount);
            listExport[i]["Số tiền"] = listExport[i]["Amount"];
            delete listExport[i].Amount;
            listExport[i].CreatedTime = utils.formDateTime(listExport[i].CreatedTime);
            listExport[i]["Thời gian"] = listExport[i]["CreatedTime"];
            delete listExport[i].CreatedTime;
            listExport[i]["Mô tả"] = listExport[i]["Description"];
            delete listExport[i].Description;
            listExport[i].Status = listExport[i].Status > 0 ? "Thành công" : "Chờ xử lý";
            listExport[i]["Trạng thái"] = listExport[i]["Status"];
            delete listExport[i].Status;

        }
        jsExportExcel.download(listExport,
            "lsgd_" + new Date().getTime() + ".xls",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "export_excel");
    };

    this.ExportCardExcel = function() {
        var length = this.listCard.data.length;
        if (length === 0) return;
        var data = this.listCard.data;
        var listExport = [];
        //Lấy các trường cần export
        for (var i = 0; i < length; i++) {
            var item = {
                ProductName: data[i].ProductName,
                Value: data[i].Value,
                Code: data[i].Code,
                Serial: data[i].Serial,
                ExpriredDate: data[i].ExpriredDate
            };
            listExport.push(item);
        }
        for (var i = 0; i < listExport.length; i++) {
            listExport[i]["Loại thẻ"] = listExport[i]["ProductName"];
            delete listExport[i].ProductName;
            listExport[i].Value = utils.formatMoney(listExport[i].Value);
            listExport[i]["Mệnh giá thẻ"] = listExport[i]["Value"];
            delete listExport[i].Value;
            listExport[i]["Mã code"] = listExport[i]["Code"];
            delete listExport[i].Code;
            listExport[i]["Serial thẻ"] = listExport[i]["Serial"];
            delete listExport[i].Serial;
            listExport[i].ExpriredDate = utils.formDateTime(listExport[i].ExpriredDate);
            listExport[i]["Hạn sử dụng"] = listExport[i]["ExpriredDate"];
            delete listExport[i].ExpriredDate;
        }
        jsExportExcel.download(listExport,
            "card_detail_" + new Date().getTime() + ".xls",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "export_card_excel");
    };

    this.HideInfo = function() {
        var $formDetail = $("#view_card_detail");
        $formDetail.find("#show_step2 p.view-card-sms-2").hide();
        $formDetail.find("#show_step2 p.view-card-2").hide();
        $formDetail.find("#show_step2").hide();
        $formDetail.find("#table-card-transaction tbody").html("");
        $formDetail.hide();

        $("#main_history").show();
    };

    this.ResendOTPEmail = function(t) {
        if ($(t).data("resend_verify_code")) {
            ModalNotificationInit(header.AccountInfo.CurrentLang === "en"
                ? "Time between 2 re-send secure code is minimum 30s"
                : "Khoảng cách giữa 2 lần gửi lại mã xác thực tối thiểu là 30s");
            return;
        }
        utils.postData(utils.trasactionApi() + "Payment/ResendOTP",
            { culture: header.AccountInfo.CurrentLang },
            function(data) {
                utils.unLoading();
                if (data.c >= 0) {
                    ModalNotificationInit(utils.getCurrentLanguage() === "en"
                        ? "Resend secure code successfully"
                        : "Nhận lại mã bảo mật thành công");
                    $(t).data("resend_verify_code", "1");
                    setTimeout(function() {
                            $(t).removeData("resend_verify_code");
                        },
                        30000);
                } else
                    common.saveLog(data);
            },
            function(err) {
                common.saveLog(err);
                utils.unLoading();
                console.log(err);
                if (utils.checkResponseIsValid(err)) {
                    var dataErr = JSON.parse(err);
                    ModalNotificationInit(common.getDescription(dataErr.c));
                } else
                    ModalNotificationInit(common.getDescription(-999999));
            },
            null);
    };

    this.Resend_OTP = function() {
        utils.translateLang("transaction.payment");
        var btnClose = $.t("payment.btnClose");

        if (cacheJS.get({ email: header.AccountInfo.Email, type: "payment" })) {
            var msgErr = utils.getCurrentLanguage() === "en"
                ? "Time between 2 re-send activation code is minimum 60s"
                : "Khoảng cách giữa 2 lần gửi lại mã kích hoạt tối thiểu là 60s";
            ModalNotificationInit(msgErr, "", "error", "", btnClose);
            return;
        }

        var urlPaymentApi = utils.trasactionApi() + "Payment/ResendOTP";
        utils.loading();
        utils.postData(urlPaymentApi,
            {},
            function() {
                utils.unLoading();
                cacheJS.set({ email: header.AccountInfo.Email, type: "payment" }, "resend", 60, null);

                var content = utils.formatString($.t("payment.resendOTPEmail"), header.AccountInfo.Email);
                if (header.AccountInfo.SecurityType > 0 && header.AccountInfo.SecurityType == 1)
                    content = utils.formatString($.t("payment.resendOTPSMS"), header.AccountInfo.Username);
                ModalNotificationInit(content, null, "success", $.t("payment.titleResendOTP"), btnClose);
            },
            function(dataErr) {
                common.saveLog(dataErr);
                utils.unLoading();
                var Msg = common.getDescription(-999999);
                if (typeof JSON.parse(dataErr) === "object") {
                    var objReturn = JSON.parse(dataErr);
                    Msg = common.getDescription(objReturn.c);
                    ModalNotificationInit(Msg, "", "error", "", btnClose);
                } else {
                    ModalNotificationInit(Msg, "", "error", "", btnClose);
                }
                return;
            });
    };

    // Lấy giao dịch trang chủ
    this.get_History_Home = function() {
        var listHistory = {
            ListSuccess: [],
            ListPending: []
        };
        utils.paragraphLoading("history_success_t");
        utils.paragraphLoading("history_pending_t");
        utils.postData(utils.trasactionApi() + "Payment/GetHistory",
            { Status: 1, Top: 2 },
            function(data) {
                if (data.p.length > 0) {
                    console.log(data.p);
                    listHistory.ListSuccess = data.p;
                    $("#history_success_t").html($("#history_success_tmpl").tmpl(listHistory));
                } else
                    $("#history_success_t").html("");
            });

        utils.postData(utils.trasactionApi() + "Payment/GetHistory",
            { Status: 0, Top: 2 },
            function(data) {
                if (data.p.length > 0) {
                    console.log(data.p);
                    listHistory.ListPending = data.p;
                    $("#history_pending_t").html($("#history_pending_tmpl").tmpl(listHistory));
                } else
                    $("#history_pending_t").html("");
            });
    };

    //CategoryID:4
    //Code:"GTEL010k-C1004046"
    //ExportDate:"2017-08-11T16:28:55.953"
    //ExpriredDate:"2018-12-31T00:00:00"
    //Number:1
    //ProductID:25
    //ProductItemID:53220
    //ProductName:"Gmobile 10"
    //Serial:"GTEL010k-S1004046"
    //Value:10000

    this.ButtonPrint = function(type) {
        var listcard = JSON.stringify(transaction_history.listCard.data);
        console.log();
        transaction_history.print(listcard, type);
    };

    this.print = function(ldata, printType) {
        ldata = JSON.parse(ldata);

        var html = "";
        var d = new Date();
        var currDate = d.getDate();
        var currMonth = d.getMonth() + 1;
        var currYear = d.getFullYear();
        var exportDate = currDate +
            "-" +
            currMonth +
            "-" +
            currYear +
            " " +
            d.getHours() +
            ":" +
            d.getMinutes() +
            ":" +
            d.getSeconds();
        $.each(ldata,
            function(i, item) {

                var partnerCurrency = "VNĐ"; //item.PartnerCurency == null ? "VND" : item.PartnerCurency;

                html += "<div class=\"gd_mathe\">";
                html += " <div class=\"mathe_bor\">";
                html += "<div class=\"mathe\">";
                html += "<span class=\"logo-365\">";
                html +=
                    "<p><img src=\"//pay365.vn/Content/assets/images/logo-purple.svg\" alt=\"\" style=\"width: 155px;\"></p>";
                html += "</span>";
                html += "<p id=\"accountName\">***************</p>";
                html += "<p>";
                html += "<strong id=\"cateName\">";
                html += "" + item.ProductName + "";
                html += "</strong>";
                html += "</p>";
                html += "<p>";
                html += "<strong>";
                html += "<span class=\"red\" id=\"Span1\">" +
                    utils.formatMoney(item.Value) +
                    "" +
                    partnerCurrency +
                    "</span>";
                html += "</strong>";
                html += "</p>";
                //html += "<div class=\"macode\" id=\"Div1\">";
                //html += "" + item.Code + "";
                //html += "</div>";
                html += "<span class=\"thongtin\">";
                html += "Số seri: <strong id=\"Strong2\">" + item.Serial + "</strong><br>";
                html += "Hạn sử dụng: <b id=\"B1\">" + utils.formDateTime(item.ExpriredDate) + "</b><br>";
                html += "Ngày xuất: <b id=\"B1\">" + exportDate + "</b><br>";
                html += "<label id=\"Label1\">Chăm sóc KH: <b>093-4676-505</b></label><br>";

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
            transaction_history.printNormal(html);
        else
            transaction_history.printTemp(html);
    };

    this.printTemp = function(html) {
        var winprint = transaction_history.openNewWindow("", "", 350, 600, false, true);
        winprint.document.open();
        winprint.document.write('<html><head><link href="' +
            utils.rootUrl() +
            "Content/css/printcardstyle.css?v=" +
            new Date().getTime() +
            '" rel="stylesheet"><\/head><body style="background-color:#FFFFFF;height: 180px;">');
        winprint.document.write(html);
        winprint.document.write("<\/body><\/html>");
        winprint.document.close();
        winprint.focus();
        window.setTimeout(function() { winprint.print(); }, 1000);
    };

    this.printNormal = function(html) {
        var winprint = transaction_history.openNewWindow("", "", 790, 747, true, true);
        winprint.document.open();
        winprint.document.write('<html><head><link href="' +
            utils.rootUrl() +
            'Content/css/365.css" rel="stylesheet"><\/head><body style="background-color:#FFFFFF;">');
        winprint.document.write(html);
        winprint.document.write("<\/body><\/html>");
        winprint.document.close();
        winprint.focus();
        window.setTimeout(function() { winprint.print(); }, 1000);
    };

    this.openNewWindow = function(url, sName, iWidth, iHeight, bResizable, bScrollbars) {
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

    this.GetBankInfoFromDesc = function(desc, type) {
        //type: 1- Lay thong tin desc, type: 2: bankinfo
        if (!desc) return null;
        desc = desc.split("_");
        if (type === 1) {
            if (desc.length === 1) return desc[0];
            desc.pop();
            return desc.join("_");
        }
        if (desc.length === 1) return null;
        var poped = desc.pop();
        return poped;
    };

    //gắn kết thẻ


};

linkcard = new function() {
    this.BankInfo = {
    };

    this.GetListBank = function(bankType) {
        //0: all
        //1: nội địa
        //2: quốc tế
        utils.paragraphLoading("topup_bank_t");
        utils.paragraphLoading("topup_bank_recent_t");
        utils.getData(utils.trasactionApi() + "Cashin/GetListBank",
            { BankID: 0, Status: 1 },
            function(data) {
                if (data.c >= 0 && data.p && data.p.length > 0) {
                    data.p.forEach(function(item) {
                        switch (item.BankCode) {
                        case "STB":
                            item.piority = 7;
                            break;
                        case "VCB":
                            item.piority = 6;
                            break;
                        case "CTG":
                            item.piority = 5;
                            break;
                        case "BIDV":
                            item.piority = 4;
                            break;
                        case "VARB":
                            item.piority = 3;
                            break;
                        case "TCB":
                            item.piority = 2;
                            break;
                        case "MSB":
                            item.piority = 1;
                            break;
                        default:
                            item.piority = 0;
                        }
                    });

                    data.p.sort(function(a, b) {
                        return b.piority - a.piority;
                    });

                    $("#topup_bank_t").html($("#topup_bank_tmpl").tmpl({ listBank: data.p }));
                    topup.GetListTopupRecent(null, null, "topup_bank_recent_t");
                }
            },
            function(err) {
                console.log(err);
                $("#topup_bank_t").html("");
                $("#topup_bank_recent_t").html("");
            });
    };

    // lấy thông tin thẻ liên kết
    this.CheckInfo_LinkCard = function() {
        $("#getlinkCard_info").hide();
        $("#linkCard_btnAdd").hide();
        utils.getData(utils.trasactionApi() + "AccountAssociate/GetAccountAssociateInfo",
            { AssociateSystem: 19 },
            function(data) {
                if (data.d != null) {
                    var LinkCard = data.d;
                    $("#getlinkCard_info").html($("#getlinkCard_info_tmpl").tmpl(LinkCard));
                    $("#getlinkCard_info").show();
                    $("#linkCard_btnAdd").hide();
                    setTimeout(function() {
                            $("[data-tooltip]").tooltip();
                        },
                        500);
                }
                console.log(data);
            },
            function (err) {
                $("#linkCard_btnAdd").show();
                console.log(err);
            });
    };

    this.createLinkCard = function(t) {
        SlideToogle("ts-parent", "next");
    };

    this.createLinkCard_Step1 = function() {
        SlideToogle("ts-parent", "next");
    };

    this.createLinkCard_Step2 = function() {
        utils.translateLang("profile.account");
        $("#error_linkcard").text("");
        var bankCard = $("#topup_bankcode").val();

        var cardNumber = $("#card_number").val().replace(/[ ]/g, "");
        if (!cardNumber) {
            $("#error_linkcard").text(i18n.t("linkcard.emptyCardNumber"));
            $("#card_number").focus();
            return;
        }
        var accountHolder = $("#account_holder").val();
        if (!accountHolder) {
            $("#error_linkcard").text(i18n.t("linkcard.emptyAccountHolder"));
            $("#account_holder").focus();
            return;
        }
        var date = $("#month_year").val();
        var param = {
            BankCode: bankCard,
            FullName: accountHolder,
            CardNumber: cardNumber
        };
        utils.loading();
        utils.postData(utils.trasactionApi() + "AccountAssociate/SubscriptionCreation",
            param,
            function(data) {
                console.log(data);
                if (data.c >= 0) {
                    $("#lbl_cardnumber").text(cardNumber);
                    $("#lbl_accountHolder").text(accountHolder.toUpperCase());
                    SlideToogle("ts-parent", "next", "link_card_step3");
                }
                utils.unLoading();
            },
            function(err) {
                var objReturn = JSON.parse(err);
                var msg = common.getDescription(objReturn.c);
                $("#error_linkcard").text(msg);
                console.log(err);
                utils.unLoading();
            });
    };

    this.createLinkCard_Step3 = function() {
        utils.translateLang("transaction.transfermoney");
        var otp = $("#txt_secureCode").val();
        if (!otp) {
            $("#txt_secureCode").addClass("error");
            $("#txt_secureCode").parent().find(".error-text").text(i18n.t("error.OtpEmpty"));
            $("#txt_secureCode").focus();
            return;
        }
        var param = {
            Otp: otp
        };
        var btnClose = "Đóng";
        utils.loading();
        utils.postData(utils.trasactionApi() + "AccountAssociate/SubscriptionConfirm",
            param,
            function(data) {
                utils.unLoading();
                console.log(data);
                var msg = "Liên kết ngân hàng thành công";
                if (header.AccountInfo.CurrentLang == "en") {
                    msg = "Link card success";
                }
                ModalNotificationInit(msg, "", "success", "", btnClose);
                setTimeout(function() {
                        window.location.href = utils.rootUrl() + "link-card";
                    },
                    3000);
            },
            function(err) {
                utils.unLoading();
                console.log(err);
                var objReturn = JSON.parse(err);
                var msg = common.getDescription(objReturn.c);
                ModalNotificationInit(msg, "", "error", "", btnClose);
            });
    };

    // Huy gan ket
    this.DeleteLinkCard = function(associateAccountID) {
        var param = {
            BankCode: "STB",
            SubscriptionID: associateAccountID
        };
        var content = "Bạn có chắc muốn hủy gắn kết thẻ này này không ?";
        var btnClose = "Đóng";
        var btnContinue = "Xác nhận";
        var headerTitle = "Thông báo";
        if (header.AccountInfo.CurrentLang == "en") {
            content = "Do you want to disconnect this card from your account ?";
            btnClose = "Close";
            btnContinue = "Confirm";
            headerTitle = "Notification";
        }
        ModalNotificationResultInit("warning",
            headerTitle,
            content,
            btnClose,
            btnContinue,
            function() {
                return;
            },
            function() {
                utils.loading();
                utils.postData(utils.trasactionApi() + "AccountAssociate/ClientSubscriptionDelete",
                    param,
                    function(data) {
                        console.log(data);
                        var msg = "Hủy gắn kết thẻ thành công";
                        if (header.AccountInfo.CurrentLang == "en") {
                            msg = "Cancel link card success";
                        }
                        ModalNotificationInit(msg, "", "success", "", btnClose);
                        $("#getlinkCard_info").remove();
                        $("#linkCard_btnAdd").show();
                        utils.unLoading();
                    },
                    function(err) {
                        console.log(err);
                        var objReturn = JSON.parse(err);
                        var msg = common.getDescription(objReturn.c);
                        ModalNotificationInit(msg, "", "error", "", btnClose);
                        utils.unLoading();
                    });
            });
    };

    this.back = function() {
        var currentDiv = $("#ts-parent").find(".div_slide.div_active");
        var backDiv = currentDiv.prev();
        SlideToogle("ts-parent", "prev");
    };
};
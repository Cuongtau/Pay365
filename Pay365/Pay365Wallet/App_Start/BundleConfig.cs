using System.Web;
using System.Web.Optimization;

namespace Pay365Wallet
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862

        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-3.2.1.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Content/assets/js/bootstrap.min.js",
                      "~/Scripts/libs/bootbox.min.js",
                       "~/Scripts/libs/validation/bootstrapValidator.js"));

            bundles.Add(new ScriptBundle("~/bundles/pay365libjs").Include(
                            "~/Scripts/libs/i18next-1.6.3.min.js",
                            "~/Content/assets/js/parallax.min.js",
                            "~/Content/assets/js/appear.min.js",
                            "~/Content/assets/js/odometer.min.js",
                            "~/Content/assets/js/kkcountdown.min.js",
                            "~/Scripts/libs/md5.min.js",
                            "~/Scripts/libs/date-time/moment.min.js",
                             "~/Scripts/libs/cacheJS/cacheJS.min.js"
                            ));

            bundles.Add(new ScriptBundle("~/bundles/pay365commonjs").Include(
                            "~/Scripts/utils.js",
                            "~/Scripts/libs/paging/jquery.pager.js",
                            "~/Scripts/libs/jquery.tmpl.js",
                            "~/Scripts/views/common.js"
                            ));

            bundles.Add(new ScriptBundle("~/bundles/pay365mainViewjs").Include(
                            "~/Scripts/views/header.js",
                            "~/Scripts/views/account_info.js",
                            "~/Scripts/views/account_secure.js",
                            "~/Scripts/views/news.js",
                            "~/Scripts/views/trans_topup.js",
                            "~/Scripts/views/trans_transfer.js",
                            "~/Scripts/views/trans_cashout.js",
                            "~/Scripts/views/trans_payment.js",
                            "~/Content/assets/js/materializeSelectOverride.js",
                            "~/Scripts/libs/cropper/cropper.js"
                            ));
            bundles.Add(new ScriptBundle("~/bundles/pay365LogoutViewjs").Include(
                            "~/Scripts/views/news.js",
                            "~/Scripts/views/trans_payment.js",
                            "~/Content/assets/js/materializeSelectOverride.js",
                            "~/Scripts/libs/cropper/cropper.js"
                            ));
            bundles.Add(new ScriptBundle("~/bundles/pay365viewjs").Include(
                            "~/Scripts/views/account_update.js",
                            "~/Scripts/views/login.js",
                            "~/Scripts/views/register.js"
                            ));

            bundles.Add(new ScriptBundle("~/bundles/js_main").Include(
                            "~/Content/assets/js/jquery.mCustomScrollbar.concat.min.js",
                            "~/Content/assets/js/materialize.min.js",
                            "~/Content/assets/js/material.js"
                            ));

            bundles.Add(new StyleBundle("~/ContentStyle/css")
                      .Include("~/Content/assets/css/bootstrap.min.css", new CssRewriteUrlTransform())
                      .Include("~/Content/assets/css/font-awesome.min.css", new CssRewriteUrlTransform())
                      .Include("~/Content/assets/css/odometer-theme-default.css", new CssRewriteUrlTransform())
                      .Include("~/Content/assets/css/homepage.css", new CssRewriteUrlTransform())
                      .Include("~/Content/Validation/bootstrapValidator.css", new CssRewriteUrlTransform())
                      .Include("~/Content/libs/animate.min.css", new CssRewriteUrlTransform())
                      .Include("~/Content/Site.css", new CssRewriteUrlTransform()
                      ));

            bundles.Add(new StyleBundle("~/Content/login_css")
                      .Include("~/Content/assets/css/bootstrap.min.css", new CssRewriteUrlTransform())
                      .Include("~/Content/assets/css/font-awesome.min.css", new CssRewriteUrlTransform())
                      .Include("~/Content/assets/css/odometer-theme-default.css", new CssRewriteUrlTransform())
                      .Include("~/Content/assets/css/materialize.min.css", new CssRewriteUrlTransform())
                      .Include("~/Content/assets/css/homepage.css", new CssRewriteUrlTransform())
                      .Include("~/Content/Validation/bootstrapValidator.css", new CssRewriteUrlTransform())
                      .Include("~/Content/Site.css", new CssRewriteUrlTransform()
                      ));

            bundles.Add(new StyleBundle("~/Content_main/css")
                .Include("~/Content/assets/css/bootstrap.min.css", new CssRewriteUrlTransform())
                      .Include("~/Content/assets/css/font-awesome.min.css", new CssRewriteUrlTransform())
                      .Include("~/Content/assets/css/flag-icon.min.css", new CssRewriteUrlTransform())
                      .Include("~/Content/assets/css/materialize.min.css", new CssRewriteUrlTransform())
                      .Include("~/Content/assets/css/jquery.mCustomScrollbar.css", new CssRewriteUrlTransform())
                      .Include("~/Content/assets/css/style.css", new CssRewriteUrlTransform())
                      .Include("~/Content/Validation/bootstrapValidator.css", new CssRewriteUrlTransform())
                      .Include("~/Content/libs/cropper.css", new CssRewriteUrlTransform())
                      .Include("~/Content/libs/animate.min.css", new CssRewriteUrlTransform())
                      .Include("~/Content/Site.css", new CssRewriteUrlTransform()
                      ));
        }
    }
}

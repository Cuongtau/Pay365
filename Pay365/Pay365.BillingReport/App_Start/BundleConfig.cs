using System.Web;
using System.Web.Optimization;

namespace Pay365.BillingReport
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));
            bundles.Add(new StyleBundle("~/pluginStyle/css").Include(
                  "~/Content/plugins/datetimepicker/bootstrap-datetimepicker.css",
                  "~/Content/plugins/bootstrap-multiselect.css",
                //TreeView
                  "~/Content/plugins/treeview/bootstrap-treeview.css",
                  "~/Content/plugins/treeview/jquery.treegrid.css",

                  //DataTable
                  "~/Content/plugins/dataTables/dataTables.bootstrap.min.css",
                  "~/Content/plugins/dataTables/buttons.dataTables.min.css"
               ));

            bundles.Add(new StyleBundle("~/bundles/css").Include(
                    "~/Content/plugins/Validation/bootstrapValidator.css",
                    "~/Content/font-awesome/css/font-awesome.min.css",
                    "~/Content/bootstrap.min.css",
                    "~/Content/global/plugins/simple-line-icons/simple-line-icons.min.css",
                    "~/Content/global/plugins/uniform/css/uniform.default.css",
                    "~/Content/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css",
                //"~/Content/plugins/dropdown-hover/animate.min.css",
                //"~/Content/plugins/dropdown-hover/bootstrap-dropdownhover.min.css",
                    "~/Content/global/plugins/bootstrap-toastr/toastr.min.css",
                    "~/Content/Site.css"
                ));

            bundles.Add(new ScriptBundle("~/bundles/tableExport").Include(
                 "~/Scripts/plugins/dataTables/jquery.dataTables.js",
                 "~/Scripts/plugins/dataTables/dataTables.bootstrap.js",
                  "~/Scripts/plugins/dataTables/jszip.min.js"
                  //"~/Scripts/plugins/dataTables/pdfmake.min.js",
                  //"~/Scripts/plugins/dataTables/vfs_fonts.js"
            ));

            bundles.Add(new ScriptBundle("~/bundles/html5pdf").Include(
                    "~/Scripts/plugins/dataTables/html5-button/dataTables.buttons.min.js",
                    "~/Scripts/plugins/dataTables/html5-button/buttons.html5.min.js",
                    "~/Scripts/plugins/dataTables/html5-button/buttons.colVis.min.js",
                    "~/Scripts/plugins/dataTables/html5-button/buttons.print.min.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/hightchart").Include(
                       "~/Scripts/plugins/Hightchart/highcharts.js",
                       "~/Scripts/plugins/Hightchart/exporting.js",
                       "~/Scripts/plugins/Hightchart/highcharts-3d.js"
               ));
            bundles.Add(new ScriptBundle("~/bundles/JqueryJs").Include(
                  "~/Content/global/plugins/bootstrap/bootstrap.min.js",
                  "~/Scripts/plugins/datetimepicker/moment.js",
                  "~/Scripts/plugins/datetimepicker/bootstrap-datetimepicker.js",
                  "~/Scripts/plugins/bootstrap-multiselect.js",
                  "~/Scripts/plugins/bootbox/bootbox.min.js",
                //TrueViewJS
                  "~/Scripts/plugins/treeview/bootstrap-treeview.js",
                  "~/Scripts/plugins/treeview/jquery.nestable.js",
                  "~/Scripts/plugins/treeview/jquery.treegrid.js",

                  "~/Content/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js",
                  "~/Content/global/plugins/jquery.blockui.min.js",
                  "~/Content/global/plugins/jquery.cokie.min.js",
                  "~/Content/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js",
                  "~/Scripts/plugins/validation/bootstrapValidator.js",

                  "~/Content/global/plugins/jquery-easypiechart/jquery.easypiechart.min.js",
                  "~/Content/global/plugins/jquery.sparkline.min.js",
                //Maxlength
                  "~/Scripts/plugins/bootstrap-maxlength/bootstrap-maxlength.min.js",
                  "~/Content/global/plugins/bootstrap-toastr/toastr.min.js",
                // Loading Page pace jquery
                  //"~/Content/plugins/pace/pace.min.js",
                "~/Scripts/utils.js"

                ));
            bundles.Add(new ScriptBundle("~/bundles/common").Include(
               "~/Scripts/common.js",
               "~/Scripts/js.cookie.js"
              ));

            //BundleTable.EnableOptimizations = true;
        }
    }
}
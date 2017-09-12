using DataAccess.ReportAPI.DTO;
using DataAccess.ReportAPI.Factory;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using Pay365.BillingReport.Controllers.Common;
using Pay365.BillingReport.Models;
using Pay365.Utils;

namespace Pay365.BillingReport.Controllers
{
    public class ReportSystemController : Controller
    {
        private UserFunction Permission { get { return ((UserFunction)Session[SessionsManager.SESSION_PERMISSION]); } }
        UserValidation userValidate = new UserValidation();
        // GET: /ReportSystem/
        #region Báo cáo tổng hợp Hệ thống
        //Tổng hợp báo cáo vận hành hệ thống
        public ActionResult ReportGeneralSystem()
        {
            var userValidate = new UserValidation();
            var m_report = new GeneralReportSystem();
            try
            {
                if (!userValidate.IsSigned())
                {
                    return RedirectToAction("FormLogin", "Account");
                }
                var checkPermission = userValidate.CheckPermissionUser("ReportGeneralSystem", userValidate.UserId, userValidate.IsAdministrator);
                if (!checkPermission || Permission == null)
                    return RedirectToAction("errorpermission", "common");
                m_report = AbstractDAOFactory.Instance().CreateReportDBDAO()
                    .AccountGeneralSystemReport();
                if (m_report != null)
                {
                    //Ghi log
                    AbstractDAOFactory.Instance().CreateUsersLogDAO()
                        .InsertUsersLog(new UsersLog
                        {
                            FunctionID = Permission.FunctionID,
                            FunctionName = Permission.FunctionName,
                            Description = "Tài khoản : " + userValidate.UserName + " xem " + Permission.FunctionName,
                            UserID = userValidate.UserId,
                            ClientIP = userValidate.ClientIP
                        });
                }
                return View(m_report);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return View(m_report);
            }
        }

        //Báo cáo tổng hợp số dư trên toàn hệ thống
        public ActionResult GeneralBalanceReport()
        {
            if (!userValidate.IsSigned())
            {

                return RedirectToAction("FormLogin", "Account");
            }
            var checkPermission = userValidate.CheckPermissionUser("GeneralBalanceReport", userValidate.UserId, userValidate.IsAdministrator);
            if (!checkPermission || Permission == null)
                return RedirectToAction("errorpermission", "common");
            var DateNow = DateTime.Now;
            var monthofnow = DateNow.Month;
            var yearofnow = DateNow.Year;
            var fromDate = new DateTime(yearofnow, monthofnow, 1, 0, 0, 0);  //Đầu tháng
            var toDate = DateNow;
            ViewBag.fromDate = fromDate;
            ViewBag.toDate = toDate;
            return View();
        }
        public ActionResult GetReportBalanceGetPage(int AccountTypeID, string FromDate, string ToDate)
        {
            int FunctionID = (int)Enums.FunctionId.ReportGeneralSystem;
            if (!userValidate.IsSigned())
            {

                return RedirectToAction("FormLogin", "Account");
            }
            if (Permission == null || Permission.FunctionID != FunctionID)
            {
                var checkPermission = userValidate.CheckPermissionUser("GeneralBalanceReport", userValidate.UserId, userValidate.IsAdministrator);
                if (!checkPermission || Permission == null)
                {
                    return RedirectToAction("errorpermission", "common");
                }
            }
            DateTime fromdate = new DateTime();
            DateTime todate = new DateTime();
            List<GeneralBalanceSystem> l_report = new List<GeneralBalanceSystem>();
            var ListChartLine = new List<LineChartSerie>();
            var ListChartPie = new List<PieChart>();
            if (!string.IsNullOrEmpty(FromDate) && !string.IsNullOrEmpty(ToDate))
            {
                fromdate = DateTime.ParseExact(FromDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                todate = DateTime.ParseExact(ToDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                FromDate = fromdate.ToString("yyyy-MM-dd");
                ToDate = todate.ToString("yyyy-MM-dd");
            }
            long InputMoney = 0;
            long RefundMoney = 0;
            long TotalInput = 0;
            long OutputMoney = 0;
            long TotalBalance = 0;
            try
            {
                l_report = DataAccess.ReportAPI.Factory.AbstractDAOFactory.Instance().CreateReportDBDAO()
                 .AccountBalanceSystemReport(AccountTypeID, FromDate, ToDate);
                if (l_report != null && l_report.Count > 0)
                {
                    InputMoney = l_report.Sum(c => c.InputMoney);
                    RefundMoney = l_report.Sum(c => c.RefundMoney);
                    TotalInput = InputMoney - RefundMoney;
                    OutputMoney = l_report.Sum(c => c.OutputMoney);
                    TotalBalance = l_report.Sum(c => c.TotalBalance);
                    var chartPiePersonal = new PieChart
                    {
                        name = "Tk cá nhân",
                        y = 0
                    };
                    var chartPieEnterprise = new PieChart
                    {
                        name = "TK doanh nghiệp"
                    };

                    var chartPieBusiness = new PieChart
                    {
                        name = "TK nghiệp vụ"
                    };

                    ListChartPie.Add(chartPiePersonal);
                    ListChartPie.Add(chartPieEnterprise);
                    ListChartPie.Add(chartPieBusiness);
                    //Ghi log
                    AbstractDAOFactory.Instance().CreateUsersLogDAO()
                        .InsertUsersLog(new UsersLog
                        {
                            FunctionID = Permission.FunctionID,
                            FunctionName = Permission.FunctionName,
                            Description = "Tài khoản : " + userValidate.UserName + " xem " + Permission.FunctionName,
                            UserID = userValidate.UserId,
                            ClientIP = userValidate.ClientIP
                        });
                }

            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
            }
            var listjson = Regex.Replace(JsonConvert.SerializeObject(l_report), @"\\r\\n|\\n|\\r|\\t", "");

            var JsonLineChart = JsonConvert.SerializeObject(ListChartLine).Trim();
            var JsonPieChart = JsonConvert.SerializeObject(ListChartPie).Trim();
            ViewBag.JsonChartLine = JsonLineChart;
            ViewBag.JsonChartPie = JsonPieChart;
            ViewBag.ReportTitle = "Báo cáo tổng hợp số dư trên toàn hệ thống";
            ViewBag.listjson = listjson;
            ViewBag.InputMoney = InputMoney;
            ViewBag.RefundMoney = RefundMoney;
            ViewBag.TotalInput = TotalInput;
            ViewBag.OutputMoney = OutputMoney;
            ViewBag.TotalBalance = TotalBalance;
            return PartialView(l_report);
        }

        public ActionResult RiskManagementReport()
        {
            if (!userValidate.IsSigned())
            {
                return RedirectToAction("FormLogin", "Account");
            }
            var checkPermission = userValidate.CheckPermissionUser("RiskManagementReport", userValidate.UserId, userValidate.IsAdministrator);
            if (!checkPermission || Permission == null)
            {
                return RedirectToAction("errorpermission", "common");
            }
            var DateNow = DateTime.Now;
            var monthofnow = DateNow.Month;
            var yearofnow = DateNow.Year;
            var fromDate = new DateTime(yearofnow, monthofnow, DateNow.Day, 0, 0, 0);  //Đầu tháng
            var toDate = DateNow;
            ViewBag.fromDate = fromDate;
            ViewBag.toDate = toDate;
            return View();
        }

        public ActionResult RiskManagementReportPartial(string FromDate, string ToDate, int warning, string accountName)
        {
            int Role = 1;
            var l_Report = new List<RiskManagementReport>();
            string newFromDate = string.Empty;
            string newToDate = string.Empty;
            if (!userValidate.IsSigned())
            {
                Role = -1;
                ViewBag.Role = Role;
                return PartialView(l_Report);
            }
            if (Permission == null || Permission.ActionName != "RiskManagementReport")
            {
                var checkPermission = userValidate.CheckPermissionUser("RiskManagementReport", userValidate.UserId, userValidate.IsAdministrator);
                if (!checkPermission || Permission == null)
                {
                    Role = -2;
                    ViewBag.Role = Role;
                    return PartialView(l_Report);
                }
            }
            var toDate = new DateTime();
            var fromDate = new DateTime();
            if (!string.IsNullOrEmpty(FromDate) && !string.IsNullOrEmpty(ToDate))
            {
                fromDate = DateTime.ParseExact(FromDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                toDate = DateTime.ParseExact(ToDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            }
            try
            {
                var result = AbstractDAOFactory.Instance().CreateReportDBDAO()
                    .GeneralReportRiskManager(warning, accountName, 0, 0, fromDate, toDate);

                if (result != null && result.Count > 0)
                {
                    l_Report = result;

                    //Ghi log
                    DataAccess.ReportAPI.Factory.AbstractDAOFactory.Instance().CreateUsersLogDAO()
                        .InsertUsersLog(new UsersLog
                        {
                            FunctionID = Permission.FunctionID,
                            FunctionName = Permission.FunctionName,
                            Description = "Tài khoản : " + userValidate.UserName + " xem " + Permission.FunctionName,
                            UserID = userValidate.UserId,
                            ClientIP = userValidate.ClientIP
                        });

                }
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return null;
            }
            var listjson = Regex.Replace(JsonConvert.SerializeObject(l_Report), @"\\r\\n|\\n|\\r|\\t", "");
            ViewBag.listjson = listjson;
            return PartialView(l_Report);
        }
        #endregion


        #region Biểu đồ

        [HttpGet]
        public JsonResult BalanceReportPieChart(string FromDate, string ToDate, int DataType)
        {
            var ChartData = new List<PieChart>();

            var toDate = DateTime.Now;
            var monthofnow = toDate.Month;
            var yearofnow = toDate.Year;
            var fromDate = new DateTime(yearofnow, monthofnow, 1, 0, 0, 0);
            if (!string.IsNullOrEmpty(FromDate) && !string.IsNullOrEmpty(ToDate))
            {
                fromDate = DateTime.ParseExact(FromDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                toDate = DateTime.ParseExact(ToDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            }
            try
            {
                var ListData = DataAccess.ReportAPI.Factory.AbstractDAOFactory.Instance().CreateReportDBDAO().BalanceReportPieChart(fromDate, toDate, DataType);
                if (ListData != null && ListData.Count > 0)
                {
                    foreach (var pie in ListData)
                    {
                        PieChart charPie = new PieChart();
                        switch (pie.AccountTypeID)
                        {
                            case 1: charPie.name = "Tài khoản cá nhân"; break;
                            case 2: charPie.name = "Tài khoản doanh nghiệp"; break;
                            case 3: charPie.name = "Tài khoản nghiệp vụ"; break;
                            default: charPie.name = "Tài khoản nghiệp vụ hứng phí"; break;
                        }
                        charPie.y = pie.TotalValue;
                        ChartData.Add(charPie);
                    }
                }

                return Json(ChartData, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return Json(ChartData, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult BalanceReportLineChart(string FromDate, string ToDate, int DataType)
        {
            string Name = "";
            switch (DataType)
            {
                case 1: Name = "Số lượng tài khoản"; break;
                case 2: Name = "Số dư tài khoản"; break;
                case 3: Name = "Nạp tiền"; break;
                default: Name = "Tiêu thụ"; break;
            }
            var ChartData = new LineChartSerie { name = Name, data = new List<long[]>() };

            var toDate = DateTime.Now;
            var monthofnow = toDate.Month;
            var yearofnow = toDate.Year;
            var fromDate = new DateTime(yearofnow, monthofnow, 1, 0, 0, 0);
            if (!string.IsNullOrEmpty(FromDate) && !string.IsNullOrEmpty(ToDate))
            {
                fromDate = DateTime.ParseExact(FromDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                toDate = DateTime.ParseExact(ToDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            }
            try
            {
                var ListData = DataAccess.ReportAPI.Factory.AbstractDAOFactory.Instance().CreateReportDBDAO().BalanceReportLineChart(fromDate, toDate, DataType);
                if (ListData != null && ListData.Count > 0)
                {
                    for (var i = 0; i < ListData.Count; i++)
                    {
                        long[] dataLine = new long[2];

                        //long unixTime = Convert.ToInt64(CommonLib.DateTimeToUnixTimestamp(ListData[i].ReportDate));
                        dataLine[0] = ListData[i].ReportDate * 1000;
                        dataLine[1] = ListData[i].TotalValue;
                        ChartData.data.Add(dataLine);
                    }
                }

                return Json(ChartData, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return Json(ChartData, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion
    }
}

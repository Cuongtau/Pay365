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
    public class ReportAccountController : Controller
    {
        private UserValidation userValidate = new UserValidation();
        private UserFunction Permission { get { return ((UserFunction)Session[SessionsManager.SESSION_PERMISSION]); } }

        public ActionResult GeneralAccount()
        {
            if (!userValidate.IsSigned())
            {
               return RedirectToAction("FormLogin", "Account");
            }
            var checkPermission = userValidate.CheckPermissionUser("GeneralAccount", userValidate.UserId, userValidate.IsAdministrator);
            if (!checkPermission || Permission == null)
            {
                return RedirectToAction("errorpermission", "common");
            }
            var DateNow = DateTime.Now;
            var monthofnow = DateNow.Month;
            var yearofnow = DateNow.Year;
            var fromDate = new DateTime(yearofnow, monthofnow, 1, 0, 0, 0);  //Đầu tháng
            var toDate = DateNow;
            ViewBag.fromDate = fromDate;
            ViewBag.toDate = toDate;
            return View();
        }
        public ActionResult GeneralAccountPartial(string FromDate, string ToDate)
        {
            int Role = 1;
            string newFromDate = string.Empty;
            string newToDate = string.Empty;
            var l_Report = new List<AccountReport>();
            var ListChartLine = new List<LineChartSerie>();
            var ListChartPie = new List<PieChart>();
            if (!userValidate.IsSigned())
            {
                Role = -1;
                ViewBag.Role = Role;
                return PartialView(l_Report);
            }
            if (Permission == null || Permission.FunctionID != (int)Enums.FunctionId.ReportAccMonitor)
            {
                var checkPermission = userValidate.CheckPermissionUser("GeneralAccount", userValidate.UserId, userValidate.IsAdministrator);
                if (!checkPermission || Permission == null)
                {
                    Role = -2;
                    ViewBag.Role = Role;
                    return PartialView(l_Report);
                }
            }
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
                var result = AbstractDAOFactory.Instance().CreateReportDBDAO().GeneralAccountReport(fromDate, toDate);

                if (result != null && result.Count > 0)
                {
                    l_Report = result;
                    
                    long[,] TotalRegister = new long[result.Count, 2];
                    long[,] TotalActive = new long[result.Count, 2];
                    long[,] TotalVerifyEmail = new long[result.Count, 2];
                    long[,] TotalAuthenTK = new long[result.Count, 2];
                    long[,] TotalSecure = new long[result.Count, 2];
                    LineChartSerie LineRegister = new LineChartSerie { name = "Đăng ký" };
                    LineChartSerie LineActive = new LineChartSerie { name = "Kích hoạt" };
                    LineChartSerie LineVerifyEmail = new LineChartSerie { name = "Xác thực Email" };
                    LineChartSerie LineAuthenTK = new LineChartSerie { name = "Chứng thực TK" };
                    LineChartSerie LineSecure = new LineChartSerie { name = "Bảo mật" };

                    //PieChart PieRegister = new PieChart { name = "Khóa" };
                    //PieChart PieActive = new PieChart { name = "Đăng nhập" };
                    //PieChart PieWebRegister = new PieChart { name = "Xác thực Email" };
                    //PieChart PieAppRegister = new PieChart { name = "Xác thực SĐT" };
                    //PieChart PieWebActive = new PieChart { name = "Xác thực CMND" };
                    //PieChart PieAppActive = new PieChart { name = "Cài đặt bảo mật" };
                    //PieChart PieVerifyEmail = new PieChart { name = "Đăng ký" };
                    //PieChart PieAuthenTK = new PieChart { name = "Đăng ký" };
                    //PieChart PieSecure = new PieChart { name = "Bảo mật" };
                    for (var i = 0; i < result.Count; i++)
                    {
                        TotalRegister[i, 0] = TotalActive[i, 0] = TotalVerifyEmail[i, 0] = TotalAuthenTK[i, 0]
                            = TotalSecure[i, 0] = (long)CommonLib.DateTimeToUnixTimestamp(result[i].ReportDate);
                        TotalRegister[i, 1] = result[i].AccountRegisterPersonal + result[i].AccountRegisterEnterprise;
                        TotalActive[i, 1] = result[i].AccountActivePersonal + result[i].AccountActiveEnterprise;
                        TotalVerifyEmail[i, 1] = result[i].AccountEmailVerified;
                        TotalAuthenTK[i, 1] = result[i].AccountVerified;
                        TotalSecure[i, 1] = result[i].TotalSecure;
                    }
                    //LineRegister.data = TotalRegister;
                    //LineActive.data = TotalActive;
                    //LineVerifyEmail.data = TotalVerifyEmail;
                    //LineAuthenTK.data = TotalAuthenTK;
                    //LineSecure.data = TotalSecure;
                    ListChartLine.Add(LineRegister);
                    ListChartLine.Add(LineActive);
                    ListChartLine.Add(LineVerifyEmail);
                    ListChartLine.Add(LineAuthenTK);
                    ListChartLine.Add(LineSecure);

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
            var JsonLineChart = JsonConvert.SerializeObject(ListChartLine).Trim();
            ViewBag.JsonChartLine = Regex.Replace(JsonLineChart, @"\\r\\n|\\n|\\r|\\t", "");
            ViewBag.listjson = listjson;
            ViewBag.Role = Role;
            return PartialView(l_Report);
        }

        [HttpGet]
        public JsonResult AccountReportLineChart(string FromDate, string ToDate, int DataType)
        {
            string Name = "";
            switch (DataType)
            {
                case 1: Name = "Tổng đăng ký"; break;
                case 2: Name = "Tổng kích hoạt"; break;
                case 3: Name = "Bảo mật"; break;
                case 4: Name = "Xác thực email"; break;
                default: Name = "Xác thực tài khoản"; break;
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
                var ListData = DataAccess.ReportAPI.Factory.AbstractDAOFactory.Instance().CreateReportDBDAO().AccountReportLineChart(fromDate, toDate, DataType);
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
    }
}

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
    public class ReportMerchantController : Controller
    {
        private UserValidation userValidate = new UserValidation();
        private UserFunction Permission { get { return ((UserFunction)Session[SessionsManager.SESSION_PERMISSION]); } }
        public ActionResult GeneralMerchantReport()
        {
            if (!userValidate.IsSigned())
            {
                return RedirectToAction("FormLogin", "Account");
            }
            var checkPermission = userValidate.CheckPermissionUser("GeneralMerchantReport", userValidate.UserId, userValidate.IsAdministrator);
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

        public ActionResult GeneralMerchantReportPartial(int merchantType, string merchantName, string merchantAccount, int bankType, string FromDate, string ToDate)
        {
            int Role = 1;
            var l_Report = new List<MerchantReport>();
            string newFromDate = string.Empty;
            string newToDate = string.Empty;
            if (!userValidate.IsSigned())
            {
                Role = -1;
                ViewBag.Role = Role;
                return PartialView(l_Report);
            }
            if (Permission == null || Permission.ActionName != "GeneralMerchantReport")
            {
                var checkPermission = userValidate.CheckPermissionUser("GeneralMerchantReport", userValidate.UserId, userValidate.IsAdministrator);
                if (!checkPermission || Permission == null)
                {
                    Role = -2;
                    ViewBag.Role = Role;
                    return PartialView(l_Report);
                }
            }
            int TotalTrans = 0;
            long TotalAmount = 0;
            int TotalFee = 0;
            int TotalFeeMerchant = 0;
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
                var result = AbstractDAOFactory.Instance().CreateReportDBDAO()
                    .GeneralReportMerchant(merchantType, merchantName, merchantAccount, bankType, fromDate, toDate);

                if (result != null && result.Count > 0)
                {
                    l_Report = result;
                    TotalTrans = l_Report.Sum(c => c.TotalTrans);
                    TotalAmount = l_Report.Sum(c => c.Amount);
                    TotalFee = l_Report.Sum(c=>c.Fee);
                    TotalFeeMerchant = l_Report.Sum(c => c.MerchantFee);
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
            ViewBag.TotalTransaction = TotalTrans;
            ViewBag.TotalAmount = TotalAmount;
            ViewBag.TotalFee = TotalFee;
            ViewBag.TotalFeeMerchant = TotalFeeMerchant;
            return PartialView();
        }

        public ActionResult ReportMerchantDetail()
        {
            int UserID = userValidate.UserId;
            if (!userValidate.IsSigned())
            {
                return RedirectToAction("FormLogin", "Account");
            }
            var checkPermission = userValidate.CheckPermissionUser("ReportMerchantDetail", UserID, userValidate.IsAdministrator);
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

            var ListBank = new Pay365.BillingReport.ReportService.ReportServiceClient().BankInfo_GetByCondition(0, string.Empty, string.Empty, 99, 99).ToList();
            return View(ListBank);
        }

        public ActionResult ReportMerchantDetailPartial(string FromDate, string ToDate, int merchantType, string merchantName, string merchantAccount, string accountName, string bankId)
        {
            int Role = 1;
            var l_Report = new List<MerchantReportDetail>();
            string newFromDate = string.Empty;
            string newToDate = string.Empty;
            if (!userValidate.IsSigned())
            {
                Role = -1;
                ViewBag.Role = Role;
                return PartialView(l_Report);
            }
            if (Permission == null || Permission.ActionName != "ReportMerchantDetail")
            {
                var checkPermission = userValidate.CheckPermissionUser("ReportMerchantDetail", userValidate.UserId, userValidate.IsAdministrator);
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
            long TotalAmount = 0;
            int TotalRow = 0;
            int TotalFee = 0;
            int TotalMerchantFee = 0;
            long TotalCusAmount = 0;
            long TotalMerAmount = 0;
            if (!string.IsNullOrEmpty(FromDate) && !string.IsNullOrEmpty(ToDate))
            {
                fromDate = DateTime.ParseExact(FromDate, "dd/MM/yyyy HH:mm", CultureInfo.InvariantCulture);
                toDate = DateTime.ParseExact(ToDate, "dd/MM/yyyy HH:mm", CultureInfo.InvariantCulture);
            }
            try
            {

                var result = AbstractDAOFactory.Instance().CreateReportDBDAO().MerchantReportDetail(merchantType, merchantName, merchantAccount, accountName, bankId, fromDate, toDate);

                if (result != null && result.Count > 0)
                {
                    TotalRow = result.Count;
                    TotalAmount = result.Sum(r => r.Amount);
                    TotalFee = result.Sum(r => r.Fee);
                    TotalMerchantFee = result.Sum(r => r.MerchantFee);
                    TotalCusAmount = result.Sum(r => r.TotalAmount);
                    TotalMerAmount = result.Sum(r => r.TotalMerchantAmount);
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
            ViewBag.TotalRow = TotalRow;
            ViewBag.TotalAmount = TotalAmount;
            ViewBag.TotalFee = TotalFee;
            ViewBag.TotalMerchantFee = TotalMerchantFee;
            ViewBag.TotalCusAmount = TotalCusAmount;
            ViewBag.TotalMerAmount = TotalMerAmount;
            return PartialView(l_Report);
        }


        #region Biểu đồ
        [HttpGet]
        public JsonResult MerchantReportLineChart(string FromDate, string ToDate, int merchantType, int bankType, int chartType)
        {
            string Name = "";
            switch (chartType)
            {
                case 1: Name = "Tổng giá trị"; break;
                case 2: Name = "Tổng giao dịch"; break;
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
                var ListData = DataAccess.ReportAPI.Factory.AbstractDAOFactory.Instance().CreateReportDBDAO()
                    .MerchantReportLineChart(fromDate, toDate, merchantType, bankType, chartType);
                if (ListData != null && ListData.Count > 0)
                {
                    for (var i = 0; i < ListData.Count; i++)
                    {
                        long[] dataLine = new long[2];
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

        [HttpGet]
        public JsonResult MerchantReportPieChart(string FromDate, string ToDate, int chartType)
        {
            var ListPieChartData = new List<PieChart>();

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
                var ListData = DataAccess.ReportAPI.Factory.AbstractDAOFactory.Instance().CreateReportDBDAO()
                    .MerchantReportPieChart(fromDate, toDate, chartType);
                if (ListData != null && ListData.Count > 0)
                {
                    foreach (var pie in ListData)
                    {
                        PieChart charPie = new PieChart();
                        string name = string.Empty;
                        if(chartType == 1) //Loại merchant
                        {
                            switch(pie.Type)
                            {
                                case 1: name = "Tích hợp Website"; break;
                                case 2: name = "Tích hợp Nút"; break;
                                case 3: name = "Tích hợp App"; break;
                                case 4: name = "Tích hợp QRCode"; break;
                                default: break;
                            }
                        }
                        else //Cổng thanh toán
                        {
                            switch (pie.Type)
                            {
                                case 0: name = "Ví điện tử"; break;
                                case 1: name = "Cổng nội địa"; break;
                                case 2: name = "Cổng quốc tế"; break;
                                default: break;
                            }
                        }
                        charPie.name = name;
                        charPie.y = pie.TotalValue;
                        ListPieChartData.Add(charPie);
                    }

                }

                return Json(ListPieChartData, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return Json(ListPieChartData, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion
    }
}

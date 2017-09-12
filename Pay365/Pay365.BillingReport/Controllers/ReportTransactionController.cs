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
    public class ReportTransactionController : Controller
    {
        //
        // GET: /ReportTransaction/
        private UserValidation userValidate = new UserValidation();
        private UserFunction Permission { get { return ((UserFunction)Session[SessionsManager.SESSION_PERMISSION]); } }
        #region Báo cáo rút tiền
        public ActionResult ReportCastout()
        {
            if (!userValidate.IsSigned())
            {
                return RedirectToAction("FormLogin", "Account");
            }
            var checkPermission = userValidate.CheckPermissionUser("ReportCastout", userValidate.UserId, userValidate.IsAdministrator);
            if (!checkPermission || Permission == null)
            {
                return RedirectToAction("errorpermission", "common");
            }

            var DateNow = DateTime.Now;
            var monthofnow = DateNow.Month;
            var yearofnow = DateNow.Year;
            var fromDate = new DateTime(DateNow.Year, DateNow.Month, DateNow.Day, 0, 0, 0);
            var toDate = DateNow;
            ViewBag.fromDate = fromDate;
            ViewBag.toDate = toDate;

            var ListBank = new Pay365.BillingReport.ReportService.ReportServiceClient().GetListBankForCashOut(0).ToList();
            return View(ListBank);
        }

        public ActionResult ReportCastoutPartial(int bankId, string accountPay, string accountBank, string bankRefTransID, int payType, string FromDate, string ToDate)
        {
            int Role = 1;
            var l_Report = new List<CashoutReport>();
            if (!userValidate.IsSigned())
            {
                Role = -1;
                ViewBag.Role = Role;
                return PartialView(l_Report);
            }
            if (Permission == null || Permission.ActionName != "ReportCastout")
            {
                var checkPermission = userValidate.CheckPermissionUser("ReportCastout", userValidate.UserId, userValidate.IsAdministrator);
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
            long totalMoney = 0;
            long TotalMoneyFee = 0;
            int totalRow = 0;
            var ListLineChartData = new List<LineChartSerie>();
            var ListPieChartData = new List<PieChart>();
            var LineChart = new LineChartSerie
            {
                name = "Rút tiền"
            };
            if (!string.IsNullOrEmpty(FromDate) && !string.IsNullOrEmpty(ToDate))
            {
                fromDate = DateTime.ParseExact(FromDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                toDate = DateTime.ParseExact(ToDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            }
            try
            {
                var result = AbstractDAOFactory.Instance().CreateReportDBDAO()
                    .CashoutReportGetList(fromDate, toDate, bankId, bankRefTransID, accountPay, accountBank, payType);

                if (result != null && result.Count > 0)
                {
                    l_Report = result;
                    totalMoney = l_Report.Sum(c => c.Amount);
                    totalRow = l_Report.Count;
                    TotalMoneyFee = l_Report.Sum(c => c.Fee);

                    var LineChartData = DataAccess.ReportAPI.Factory.AbstractDAOFactory.Instance().CreateReportDBDAO().CashoutReportLineChart(fromDate, toDate);
                    var PieChartData = DataAccess.ReportAPI.Factory.AbstractDAOFactory.Instance().CreateReportDBDAO().CashoutReportPieChart(fromDate, toDate);
                    if (LineChartData != null && LineChartData.Count > 0)
                    {
                        var dataPush = new List<long[]>();

                        for (var i = 0; i < LineChartData.Count; i++)
                        {
                            long[] dataCashout = new long[2];

                            dataCashout[0] = LineChartData[i].ReportDate * 1000;
                            dataCashout[1] = LineChartData[i].TotalValue;
                            dataPush.Add(dataCashout);
                        }
                        LineChart.data = dataPush;
                    }
                    ListLineChartData.Add(LineChart);

                    if (PieChartData != null && PieChartData.Count > 0)
                    {
                        foreach (var pie in PieChartData)
                        {
                            PieChart charPie = new PieChart();
                            charPie.name = pie.PayType == (int)Enums.PayType.Cashout ? "trực tiếp" : "gián tiếp";
                            charPie.y = pie.TotalValue;
                            ListPieChartData.Add(charPie);
                        }
                    }


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
            string LineChartLineJSON = JsonConvert.SerializeObject(ListLineChartData);
            string LineChartPieJSON = JsonConvert.SerializeObject(ListPieChartData);
            LineChartLineJSON = Regex.Replace(LineChartLineJSON, @"\\r\\n|\\n|\\r|\\t", "");
            LineChartPieJSON = Regex.Replace(LineChartPieJSON, @"\\r\\n|\\n|\\r|\\t", "");
            var listjson = Regex.Replace(JsonConvert.SerializeObject(l_Report), @"\\r\\n|\\n|\\r|\\t", "");
            ViewBag.listjson = listjson;
            ViewBag.TotalRow = totalRow;
            ViewBag.TotalMoney = totalMoney;
            ViewBag.TotalMoneyFee = TotalMoneyFee;
            ViewBag.LineChart = LineChartLineJSON;
            ViewBag.PieChart = LineChartPieJSON;
            return PartialView();
        }
        #endregion

        #region Báo cáo chuyển tiền
        public ActionResult ReportTransfer()
        {
            if (!userValidate.IsSigned())
            {
                return RedirectToAction("FormLogin", "Account");
            }
            var checkPermission = userValidate.CheckPermissionUser("ReportTransfer", userValidate.UserId, userValidate.IsAdministrator);
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
        public ActionResult ReportTransferPartial(string accountTransfer, string accountReceive, string FromDate, string ToDate)
        {
            int Role = 1;
            var l_Report = new List<TransferReport>();
            string newFromDate = string.Empty;
            string newToDate = string.Empty;
            if (!userValidate.IsSigned())
            {
                Role = -1;
                ViewBag.Role = Role;
                return PartialView(l_Report);
            }
            if (Permission == null || Permission.ActionName != "ReportTransfer")
            {
                var checkPermission = userValidate.CheckPermissionUser("ReportTransfer", userValidate.UserId, userValidate.IsAdministrator);
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
            long totalMoneyTransfer = 0;
            long TotalMoneyFee = 0;
            int totalRow = 0;
            if (!string.IsNullOrEmpty(FromDate) && !string.IsNullOrEmpty(ToDate))
            {
                fromDate = DateTime.ParseExact(FromDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                toDate = DateTime.ParseExact(ToDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            }
            try
            {
                var result = AbstractDAOFactory.Instance().CreateReportDBDAO().TransferReportGetList(fromDate, toDate, accountTransfer, accountReceive);

                if (result != null && result.Count > 0)
                {
                    l_Report = result;
                    totalMoneyTransfer = l_Report.Sum(c => c.Amount);
                    totalRow = l_Report.Count;
                    TotalMoneyFee = l_Report.Sum(c => c.Fee);
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
            ViewBag.TotalRow = totalRow;
            ViewBag.TotalMoneyTransfer = totalMoneyTransfer;
            ViewBag.TotalMoneyFee = TotalMoneyFee;
            return PartialView();
        }
        #endregion

        #region Báo cáo hoàn tiền
        public ActionResult ReportRefund()
        {
            if (!userValidate.IsSigned())
            {
                return RedirectToAction("FormLogin", "Account");
            }
            var checkPermission = userValidate.CheckPermissionUser("ReportRefund", userValidate.UserId, userValidate.IsAdministrator);
            if (!checkPermission || Permission == null)
            {
                return RedirectToAction("errorpermission", "common");
            }
            var DateNow = DateTime.Now;
            var monthofnow = DateNow.Month;
            var yearofnow = DateNow.Year;
            var fromDate = new DateTime(yearofnow, monthofnow, 1, 0, 0, 0);  //Đầu tháng
            var toDate = DateNow;
            var ListBank = new List<ReportService.BankInfo>();
            var ListWebsite = new List<ReportService.WebsitePayment>();
            //Lấy tất cả ngân hàng
            var lstBank = new Pay365.BillingReport.ReportService.ReportServiceClient().BankInfo_GetByCondition(0, string.Empty, string.Empty, 99, 99).ToList();
            //Lấy tất cả website
            var lstWebsite = new Pay365.BillingReport.ReportService.ReportServiceClient().WebsitePayment_GetList(0, 0).ToList();
            if (lstBank != null && lstBank.Count > 0)
                ListBank = lstBank.ToList();
            if (lstWebsite != null && lstWebsite.Count > 0)
                ListWebsite = lstWebsite.ToList();
            ViewBag.ListBank = ListBank;
            ViewBag.ListWebsite = ListWebsite;
            ViewBag.fromDate = fromDate;
            ViewBag.toDate = toDate;
            return View();
        }
        public ActionResult ReportRefundPartial(string lstWebsite, string lstBank, byte transType, string accountName, string FromDate, string ToDate)
        {
            int Role = 1;
            var ListPieChartData = new List<PieChart>();
            var l_Report = new List<RefundReport>();
            string newFromDate = string.Empty;
            string newToDate = string.Empty;
            if (!userValidate.IsSigned())
            {
                Role = -1;
                ViewBag.Role = Role;
                return PartialView(l_Report);
            }
            if (Permission == null || Permission.ActionName != "ReportRefund")
            {
                var checkPermission = userValidate.CheckPermissionUser("ReportRefund", userValidate.UserId, userValidate.IsAdministrator);
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
            long totalMoneyRefund = 0;
            int totalRow = 0;
            if (!string.IsNullOrEmpty(FromDate) && !string.IsNullOrEmpty(ToDate))
            {
                fromDate = DateTime.ParseExact(FromDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                toDate = DateTime.ParseExact(ToDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            }
            try
            {
                var result = AbstractDAOFactory.Instance().CreateReportDBDAO()
                    .RefundReportGetList(lstWebsite, accountName, lstBank, transType, fromDate, toDate);
                if (result != null && result.Count > 0)
                {
                    NLogLogger.LogInfo("List ReportRefundPartial: " + result.Count);

                    l_Report = result;
                    ListPieChartData =
                        (
                          from row in result
                          group row by new { row.TransType } into g
                          select new PieChart()
                          {
                              name = g.Key.TransType == 1 ? "Thanh toán" : "Rút tiền",
                              y = g.Sum(x => x.Amount)
                          }
                        ).ToList();
                    totalMoneyRefund = l_Report.Sum(c => c.Amount);
                    totalRow = l_Report.Count;
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
            string LineChartPieJSON = JsonConvert.SerializeObject(ListPieChartData);
            LineChartPieJSON = Regex.Replace(LineChartPieJSON, @"\\r\\n|\\n|\\r|\\t", "");
            var listjson = Regex.Replace(JsonConvert.SerializeObject(l_Report), @"\\r\\n|\\n|\\r|\\t", "");
            ViewBag.listjson = listjson;
            ViewBag.TotalRow = totalRow;
            ViewBag.PieChart = LineChartPieJSON;
            ViewBag.TotalMoneyRefund = totalMoneyRefund;
            return PartialView();
        }
        #endregion

        #region Báo cáo tổng hợp nạp
        public ActionResult GeneralTransactionInput()
        {
            if (!userValidate.IsSigned())
            {
                return RedirectToAction("FormLogin", "Account");
            }
            var checkPermission = userValidate.CheckPermissionUser("GeneralTransactionInput", userValidate.UserId, userValidate.IsAdministrator);
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

        public ActionResult GeneralTransactionInputPartial(string FromDate, string ToDate, byte payType, string bankId)
        {
            int Role = 1;
            var l_Report = new List<TransactionInputGeneralReport>();
            string newFromDate = string.Empty;
            string newToDate = string.Empty;
            if (!userValidate.IsSigned())
            {
                Role = -1;
                ViewBag.Role = Role;
                return PartialView(l_Report);
            }
            if (Permission == null || Permission.ActionName != "GeneralTransactionInput")
            {
                var checkPermission = userValidate.CheckPermissionUser("GeneralTransactionInput", userValidate.UserId, userValidate.IsAdministrator);
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
                string ListBank = string.Empty;

                var result = AbstractDAOFactory.Instance().CreateReportDBDAO().GeneralReportTransactionInput(fromDate, toDate, payType, bankId);

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
            ViewBag.PayType = payType < 0 ? 0 : payType;
            return PartialView(l_Report);
        }

        public ActionResult ReportTransactionInputDetail()
        {
            int UserID = userValidate.UserId;
            if (!userValidate.IsSigned())
            {
                return RedirectToAction("FormLogin", "Account");
            }
            var checkPermission = userValidate.CheckPermissionUser("ReportTransactionInputDetail", UserID, userValidate.IsAdministrator);
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

            var ListBank = new Pay365.BillingReport.ReportService.ReportServiceClient().BankInfo_GetByCondition(0, string.Empty, string.Empty, 99, 99).ToList();
            return View(ListBank);
        }

        public ActionResult TransactionInputDetailPartial(string FromDate, string ToDate, byte payType, string bankId, byte AccountType, string AccountName, string CreatedUser)
        {
            int Role = 1;
            var l_Report = new List<TransactionInputReportDetail>();
            string newFromDate = string.Empty;
            string newToDate = string.Empty;
            if (!userValidate.IsSigned())
            {
                Role = -1;
                ViewBag.Role = Role;
                return PartialView(l_Report);
            }
            if (Permission == null || Permission.ActionName != "ReportTransactionInputDetail")
            {
                var checkPermission = userValidate.CheckPermissionUser("ReportTransactionInputDetail", userValidate.UserId, userValidate.IsAdministrator);
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
            if (!string.IsNullOrEmpty(FromDate) && !string.IsNullOrEmpty(ToDate))
            {
                fromDate = DateTime.ParseExact(FromDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                toDate = DateTime.ParseExact(ToDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            }
            try
            {

                var result = AbstractDAOFactory.Instance().CreateReportDBDAO().TransactionInputReportDetail(fromDate, toDate, AccountName, CreatedUser, AccountType, payType, bankId);

                if (result != null && result.Count > 0)
                {
                    TotalRow = result.Count;
                    TotalAmount = result.Sum(r => r.Amount);
                    TotalFee = result.Sum(r => r.Fee);
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
            ViewBag.PayType = payType < 0 ? 0 : payType;
            ViewBag.TotalRow = TotalRow;
            ViewBag.TotalAmount = TotalAmount;
            ViewBag.TotalFee = TotalFee;
            return PartialView(l_Report);
        }
        #endregion

        #region Biểu đồ
        [HttpGet]
        public JsonResult CashoutLineChart(string FromDate, string ToDate)
        {
            var resultData = new List<LineChartSerie>();
            var LineChart = new LineChartSerie
            {
                name = "Rút tiền"
            };
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
                var ListData = DataAccess.ReportAPI.Factory.AbstractDAOFactory.Instance().CreateReportDBDAO().CashoutReportLineChart(fromDate, toDate);
                if (ListData != null && ListData.Count > 0)
                {
                    var dataPush = new List<long[]>();

                    for (var i = 0; i < ListData.Count; i++)
                    {
                        long[] dataCashout = new long[2];

                        //long unixTime = Convert.ToInt64(CommonLib.DateTimeToUnixTimestamp(ListData[i].ReportDate));
                        dataCashout[0] = ListData[i].ReportDate * 1000;
                        dataCashout[1] = ListData[i].TotalValue;
                        dataPush.Add(dataCashout);
                    }
                    LineChart.data = dataPush;
                }
                resultData.Add(LineChart);

                return Json(resultData, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return Json(resultData, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpGet]
        public JsonResult TransInputReportLineChart(string FromDate, string ToDate, int DataType, int PayType)
        {
            string Name = "";
            switch (DataType)
            {
                case 1: Name = "Số tài khoản"; break;
                case 2: Name = "Số giao dịch"; break;
                case 3: Name = "Tổng nạp"; break;
                case 4: Name = "Tổng phí"; break;
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
                var ListData = DataAccess.ReportAPI.Factory.AbstractDAOFactory.Instance().CreateReportDBDAO().TransInputReportLineChart(fromDate, toDate, DataType, PayType);
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
        [HttpGet]
        public JsonResult TransferReportLineChart(string FromDate, string ToDate, int DataType)
        {
            string Name = "";
            switch (DataType)
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
                var ListData = DataAccess.ReportAPI.Factory.AbstractDAOFactory.Instance().CreateReportDBDAO().TransferReportLineChart(DataType, fromDate, toDate);
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

        [HttpGet]
        public JsonResult TransferReportPieChart(string FromDate, string ToDate, int DataType)
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
                var ListData = DataAccess.ReportAPI.Factory.AbstractDAOFactory.Instance().CreateReportDBDAO().TransferReportPieChart(DataType, fromDate, toDate);
                if (ListData != null && ListData.Count > 0)
                {
                    foreach (var pie in ListData)
                    {
                        PieChart charPie = new PieChart();
                        charPie.name = pie.AccountType == (int)Enums.AccountTypeID.Personal ? "Cá nhân" : pie.AccountType == (int)Enums.AccountTypeID.Coporate ? "Doanh nghiệp" : pie.AccountType == 3 ? "Nghiệp vụ" : "Nghiệp vụ hứng phí";
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

        [HttpGet]
        public JsonResult RefundReportLineChart(string FromDate, string ToDate, int transType)
        {
            string Name = "Số tiền hoàn";
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
                var ListData = DataAccess.ReportAPI.Factory.AbstractDAOFactory.Instance().CreateReportDBDAO().RefundReportLineChart(fromDate, toDate, transType);
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

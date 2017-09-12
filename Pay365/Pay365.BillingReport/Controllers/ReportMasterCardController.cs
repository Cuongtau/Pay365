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
    public class ReportMasterCardController : Controller
    {
        private UserValidation userValidate = new UserValidation();
        private UserFunction Permission { get { return ((UserFunction)Session[SessionsManager.SESSION_PERMISSION]); } }
        //Báo cáo tổng hợp thẻ MasterCard
        public ActionResult MasterCardGeneral()
        {
            if (!userValidate.IsSigned())
            {
                return RedirectToAction("FormLogin", "Account");
            }
            var checkPermission = userValidate.CheckPermissionUser("MasterCardGeneral", userValidate.UserId, userValidate.IsAdministrator);
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

        public ActionResult MasterCardGeneralPartial(string FromDate, string ToDate)
        {
            int Role = 1;
            var l_Report = new List<MatchMoveReportGeneral>();
            string newFromDate = string.Empty;
            string newToDate = string.Empty;
            if (!userValidate.IsSigned())
            {
                Role = -1;
                ViewBag.Role = Role;
                return PartialView(l_Report);
            }
            if (Permission == null || Permission.ActionName != "MasterCardGeneral")
            {
                var checkPermission = userValidate.CheckPermissionUser("MasterCardGeneral", userValidate.UserId, userValidate.IsAdministrator);
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
            int totalRow = 0;
            long totalCardBefore = 0;
            long totalCardAfter = 0;
            long totalCardReg = 0;
            long totalFeeReg = 0;
            long totalCertCard = 0;
            long feeCardNew = 0;
            long feeCardOld = 0;
            long totalAmountWalletToCard = 0;
            long totalAmountCardToCard = 0;

            if (!string.IsNullOrEmpty(FromDate) && !string.IsNullOrEmpty(ToDate))
            {
                fromDate = DateTime.ParseExact(FromDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                toDate = DateTime.ParseExact(ToDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            }
            try
            {
                string ListBank = string.Empty;

                var result = AbstractDAOFactory.Instance().CreateReportDBDAO().GeneralReportVTCMasterCard(fromDate, toDate);

                if (result != null && result.Count > 0)
                {
                    l_Report = result;
                    totalRow = result.Count;
                    totalCardBefore = result.Sum(c => c.TotalRegisterBefore);
                    totalCardAfter = result.Sum(c => c.TotalRegisterAfter);
                    totalCardReg = result.Sum(c => c.TotalRegister);
                    totalFeeReg = result.Sum(c => c.CardFee);
                    totalCertCard = result.Sum(c => c.TotalCertCard);
                    feeCardNew = result.Sum(c => c.MaintainFee);
                    feeCardOld = result.Sum(c => c.MaintanFeeOld);
                    totalAmountWalletToCard = result.Sum(c => c.TotalAmount);
                    totalAmountCardToCard = result.Sum(c => c.CardtoAmount);
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

            ViewBag.TotalRow = totalRow;
            ViewBag.TotalCardBefore = totalCardBefore;
            ViewBag.TotalCardAfter = totalCardAfter;
            ViewBag.TotalCardReg = totalCardReg;
            ViewBag.TotalFeeReg = totalFeeReg;
            ViewBag.TotalCertCard = totalCertCard;
            ViewBag.FeeCardNew = feeCardNew;
            ViewBag.FeeCardOld = feeCardOld;
            ViewBag.TotalAmountWalletToCard = totalAmountWalletToCard;
            ViewBag.TotalAmountCardToCard = totalAmountCardToCard;
            ViewBag.listjson = listjson;
            return PartialView(l_Report);
        }

        //Báo cáo tổng hợp Nạp
        public ActionResult MasterCardTopup()
        {
            if (!userValidate.IsSigned())
            {
                return RedirectToAction("FormLogin", "Account");
            }
            var checkPermission = userValidate.CheckPermissionUser("MasterCardTopup", userValidate.UserId, userValidate.IsAdministrator);
            if (!checkPermission || Permission == null)
            {
                return RedirectToAction("errorpermission", "common");
            }
            var DateNow = DateTime.Now;
            var fromDate = new DateTime(DateNow.Year, DateNow.Month, DateNow.Day, 0, 0, 0);  //Đầu tháng
            var toDate = DateNow;
            ViewBag.fromDate = fromDate;
            ViewBag.toDate = toDate;

            return View();
        }

        public ActionResult MasterCardTopupPartial(string AccountName, string FromDate, string ToDate)
        {
            int Role = 1;
            var l_Report = new List<MatchMoveReportTopup>();
            string newFromDate = string.Empty;
            string newToDate = string.Empty;
            if (!userValidate.IsSigned())
            {
                Role = -1;
                ViewBag.Role = Role;
                return PartialView(l_Report);
            }
            if (Permission == null || Permission.ActionName != "MasterCardTopup")
            {
                var checkPermission = userValidate.CheckPermissionUser("MasterCardTopup", userValidate.UserId, userValidate.IsAdministrator);
                if (!checkPermission || Permission == null)
                {
                    Role = -2;
                    ViewBag.Role = Role;
                    return PartialView(l_Report);
                }
            }
            var toDate = DateTime.Now;
            var fromDate = new DateTime(toDate.Year, toDate.Month, toDate.Day, 0, 0, 0);
            int totalRow = 0;
            long totalAmount = 0;

            if (!string.IsNullOrEmpty(FromDate) && !string.IsNullOrEmpty(ToDate))
            {
                fromDate = DateTime.ParseExact(FromDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                toDate = DateTime.ParseExact(ToDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            }
            try
            {
                string ListBank = string.Empty;

                var result = AbstractDAOFactory.Instance().CreateReportDBDAO().ReportTopupVTCMasterCard(AccountName, fromDate, toDate);

                if (result != null && result.Count > 0)
                {
                    l_Report = result;
                    totalRow = result.Count;
                    totalAmount = result.Sum(c => c.Amount);
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
            
            ViewBag.TotalRow = totalRow;
            ViewBag.TotalAmount = totalAmount;
            ViewBag.listjson = listjson;
            return PartialView(l_Report);
        }


    }
}

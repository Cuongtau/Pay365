using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataAccess.ReportAPI.DTO;
using Pay365.BillingReport.Controllers.Common;
using Pay365.BillingReport.VTCProService;
using Pay365.Utils;

namespace Pay365.BillingReport.Controllers
{
    public class ReportVTCProController : Controller
    {
        //
        // GET: /ReportVTCPro/

        private UserValidation userValidate = new UserValidation();
        private UserFunction Permission { get { return ((UserFunction)Session[SessionsManager.SESSION_PERMISSION]); } }

        public ActionResult Index()
        {
            return View();
        }

        #region Báo cáo tổng quan

        public ActionResult VTCPro_ReportGeneral()
        {
            if (!userValidate.IsSigned())
            {
                return RedirectToAction("FormLogin", "Account");
            }
            var checkPermission = userValidate.CheckPermissionUser("VTCPro_ReportGeneral", userValidate.UserId, userValidate.IsAdministrator);
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

        public ActionResult VTCPro_ReportGeneral_Partial(string FromDate, string ToDate)
        {
            var l_Report = new List<ReportGeneral>();
            int Role = 1;
            if (!userValidate.IsSigned())
            {
                Role = -1;
                ViewBag.Role = Role;
                return PartialView(l_Report);
            }
            if (Permission == null || Permission.ActionName != "VTCPro_ReportGeneral")
            {
                var checkPermission = userValidate.CheckPermissionUser("VTCPro_ReportGeneral", userValidate.UserId, userValidate.IsAdministrator);
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
            l_Report = new VTCProService.VTCProServiceClient().VTCPro_ReportGeneral(fromDate, toDate).ToList();
            return PartialView(l_Report);
        }

        #endregion


        #region Báo cáo tạo Mã VTC PRO

        public ActionResult VTCPro_ReportCreateCard()
        {
            if (!userValidate.IsSigned())
            {
                return RedirectToAction("FormLogin", "Account");
            }
            var checkPermission = userValidate.CheckPermissionUser("VTCPro_ReportCreateCard", userValidate.UserId, userValidate.IsAdministrator);
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

        public ActionResult VTCPro_ReportCreateCard_Partial(string FromDate, string ToDate)
        {
            var l_Report = new List<ReportCreate>();
            int Role = 1;
            if (!userValidate.IsSigned())
            {
                Role = -1;
                ViewBag.Role = Role;
                return PartialView(l_Report);
            }
            if (Permission == null || Permission.ActionName != "VTCPro_ReportCreateCard")
            {
                var checkPermission = userValidate.CheckPermissionUser("VTCPro_ReportCreateCard", userValidate.UserId, userValidate.IsAdministrator);
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
            l_Report = new VTCProService.VTCProServiceClient().VTCPro_ReportCreate(fromDate, toDate).ToList();
            return PartialView(l_Report);
        }


        #endregion

        #region Lịch sử Thanh Toán bằng mã VTC PRO

        public ActionResult VTCPro_MerchantPayment()
        {
            if (!userValidate.IsSigned())
            {
                return RedirectToAction("FormLogin", "Account");
            }
            var checkPermission = userValidate.CheckPermissionUser("VTCPro_MerchantPayment", userValidate.UserId, userValidate.IsAdministrator);
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

            var listMerchant = new VTCProService.VTCProServiceClient().Merchant_Getlist().ToList();
            ViewBag.listMerchant = listMerchant;

            return View();
        }


        public ActionResult VTCPro_MerchantPayment_Partial(string merchantCode, long cardSerial, string cardCode, long cardAmount, int status, long transactionID ,string FromDate, string ToDate)
        {
            var l_Report = new List<VTCProCard_UseCard_MerchantPayment>();
            int Role = 1;
            if (!userValidate.IsSigned())
            {
                Role = -1;
                ViewBag.Role = Role;
                return PartialView(l_Report);
            }
            if (Permission == null || Permission.ActionName != "VTCPro_MerchantPayment")
            {
                var checkPermission = userValidate.CheckPermissionUser("VTCPro_MerchantPayment", userValidate.UserId, userValidate.IsAdministrator);
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

            l_Report = new VTCProService.VTCProServiceClient().VTCPro_UseCard_MerchantPayment_GetList(merchantCode, cardSerial,cardCode,cardAmount,status,transactionID,fromDate,toDate).ToList();
            return PartialView(l_Report);
        }


        #endregion


    }
}

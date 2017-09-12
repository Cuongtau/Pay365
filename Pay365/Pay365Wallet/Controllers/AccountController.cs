using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Pay365Wallet.Controllers
{
    public class AccountController : BaseController
    {
        [Route("~/quen-mat-khau")]
        public ActionResult ForgetPassword()
        {
            return View("~/Views/Home/Login.cshtml");
        }

        public ActionResult Vw_ResetPassViaSms()
        {
            return PartialView();
        }

        public ActionResult Vw_ResetPassViaEmail()
        {
            return PartialView();
        }

        [Route("~/account-info")]
        [Route("~/thong-tin-tai-khoan")]
        public ActionResult AccountInfo()
        {
            //var accountID = Pay365.Utils.Config.AccountId;

            return View();
        }

        public ActionResult AccountCertification()
        {
            return PartialView("_AccountCertification");
        }

        public ActionResult VerifyEmail()
        {
            return PartialView("_VerifyEmail");
        }

        [Route("~/information")]
        [Route("~/thong-tin")]
        public ActionResult Index()
        {
            return View();
        }

        [Route("~/link-card")]
        public ActionResult Link_Card()
        {

            return View();
        }


    }
}
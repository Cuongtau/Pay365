using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Pay365Wallet.Controllers
{
    public class RegisterController : BaseController
    {
        // GET: Register
        [Route("~/register")]
        [Route("~/dang-ky")]
        public ActionResult Register()
        {
            return View("~/Views/Home/Login.cshtml");
        }

        public ActionResult ActiveAccount(string accountName, string email)
        {
            ViewBag.AccountName = accountName;
            ViewBag.Email = email;
            return PartialView("_ActiveAccount");
        }

        [Route("~/active-account")]
        [Route("~/kich-hoat")]
        public ActionResult ActiveAccountDirect(string accountName, string email)
        {
            ViewBag.AccountName = accountName;
            ViewBag.Email = email;
            return View("~/Views/Home/Login.cshtml");
        }
    }
}
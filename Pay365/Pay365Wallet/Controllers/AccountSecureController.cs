using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Pay365Wallet.Controllers
{
    public class AccountSecureController : BaseController
    {
        // GET: AccountSecure
        [Route("~/cai-dat-bao-mat")]
        [Route("~/doi-han-muc-bao-mat")]
        public ActionResult Index()
        {
            var path = Request.Url.AbsolutePath;
            var TypeView = 0;
            if (path.ToLower().IndexOf("doi-han-muc-bao-mat") >= 0)
                TypeView = 1;
            ViewBag.TypeView = TypeView;
            return View();
        }
    }
}
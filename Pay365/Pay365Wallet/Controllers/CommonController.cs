using System.Web.Mvc;
using Pay365.Utils;

namespace Pay365Wallet.Controllers
{
    public class CommonController : BaseController
    {
        // GET: Common
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult SaveClientLog(string log)
        {
            NLogLogger.LogInfo(log);
            return Json("", JsonRequestBehavior.AllowGet);
        }
    }
}
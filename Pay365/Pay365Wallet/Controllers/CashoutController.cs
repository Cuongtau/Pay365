using System.Web.Mvc;

namespace Pay365Wallet.Controllers
{
    public class CashoutController : BaseController
    {
        // GET: Cashout
        [Route("~/cashout")]
        [Route("~/rut-tien")]
        public ActionResult Cashout()
        {
            return View();
        }

        public ActionResult CashoutBankDetail()
        {
            return PartialView("_CashoutBankDetail");
        }

        public ActionResult CashoutBankOnlineDetail()
        {
            return PartialView("_CashoutBankOnlineDetail");
        }
    }
}
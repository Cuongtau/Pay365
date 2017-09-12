using System.Web.Mvc;

namespace Pay365Wallet.Controllers
{
    public class TopupController : BaseController
    {
        // nạp tiền qua ngân hàng
        [Route("~/topup-bank")]
        [Route("~/nap-tien")]
        public ActionResult TopupBank()
        {
            return View();
        }

        public ActionResult TopupBankDetail()
        {
            return PartialView("_TopupBankDetail");
        }
    }
}
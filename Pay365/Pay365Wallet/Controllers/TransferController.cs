using System.Web.Mvc;

namespace Pay365Wallet.Controllers
{
    public class TransferController : BaseController
    {
        // GET: Transfer
        [Route("~/transfer-money")]
        [Route("~/chuyen-tien")]
        public ActionResult TransferMoney()
        {
            return View();
        }
    }

}
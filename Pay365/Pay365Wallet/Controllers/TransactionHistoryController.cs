using System.Web.Mvc;

namespace Pay365Wallet.Controllers
{
    public class TransactionHistoryController : BaseController
    {
        // lịch sử giao dịch
        [Route("~/history")]
        [Route("~/lich-su-giao-dich")]
        public ActionResult History()
        {
            return View();
        }
    }
}
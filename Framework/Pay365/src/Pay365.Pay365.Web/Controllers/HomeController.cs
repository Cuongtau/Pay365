using System.Web.Mvc;

namespace Pay365.Pay365.Web.Controllers
{
    public class HomeController : Pay365ControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
	}
}
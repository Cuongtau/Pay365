using System.Web.Mvc;
using Abp.Auditing;

namespace Pay365.Pay365.Web.Controllers
{
    public class ErrorController : Pay365ControllerBase
    {
        [DisableAuditing]
        public ActionResult E404()
        {
            return View();
        }
    }
}
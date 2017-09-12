using Pay365.Utils;
using System.Configuration;
using System.Web.Mvc;

using Pay365.Utils.Security;

namespace Pay365Wallet.Controllers
{
    public class NewsController : BaseController
    {
        [Route("~/news")]
        [Route("~/tin-tuc")]
        public ActionResult Index(int? page)
        {
            return View();
        }

        public ActionResult News_Detail(int id, int cateId)
        {
            ViewBag.id = id;
            ViewBag.cateId = cateId;
            return View();
        }

        [Route("~/search")]
        [Route("~/tim-kiem")]
        public ActionResult News_Search(string keyword)
        {
            ViewBag.keyword = "";
            keyword = AntiXssValidator.SanitizeUrl(keyword);
            ViewBag.keyword = keyword;
            return View();
        }

        [Route("~/tag")]
        public ActionResult News_Tags(string tag)
        {
            ViewBag.tag = "";
            tag = AntiXssValidator.SanitizeUrl(tag);
            ViewBag.tag = tag;
            return View();
        }

    }
}
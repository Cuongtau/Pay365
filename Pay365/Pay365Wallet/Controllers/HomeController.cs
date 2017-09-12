using Pay365Wallet.Helpers;
using System.Web.Mvc;

namespace Pay365Wallet.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ChangeLanguage(string lang, string refUrl)
        {
            new LanguageHelper().SetLanguage(lang);
            return Redirect(Request.UrlReferrer.ToString());
        }

        [Route("~/login")]
        [Route("~/dang-nhap")]
        public ActionResult Login()
        {
            ViewBag.Action = "Login";
            return View();
        }

        public ActionResult LoginOTP(string accountName)
        {
            ViewBag.AccountName = accountName;
            return PartialView("_LoginOTP");
        }

        [Route("~/about")]
        [Route("~/ve-chung-toi")]
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }
       
        [Route("~/contact")]
        [Route("~/lien-he")]
        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";
            return View();
        }

        [Route("~/privacy")]
        [Route("~/chinh-sach")]
        public ActionResult Privacy()
        {
            return View();
        }

        [Route("~/partner")]
        [Route("~/doi-tac")]
        public ActionResult Partner()
        {

            return View();
        }


        [Route("page-not-found")]
        public ActionResult NotFound()
        {
            return View();
        }

        [Route("~/guide")]
        [Route("~/huong-dan")]
        public ActionResult Guide()
        {
            return View();
        }

        [Route("~/guide-detail")]
        [Route("~/huong-dan/chi-tiet")]
        public ActionResult GuideDetail()
        {
            return View();
        }

    }
}
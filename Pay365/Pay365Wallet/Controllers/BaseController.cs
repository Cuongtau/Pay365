using Pay365Wallet.Helpers;
using System;
using System.Web;
using System.Web.Mvc;

namespace Pay365Wallet.Controllers
{
    public class BaseController : Controller
    {
        protected override IAsyncResult BeginExecuteCore(AsyncCallback callback, object state)
        {
            string lang = null;
            HttpCookie langCookie = Request.Cookies["culture"];
            if (langCookie != null)
            {
                lang = langCookie.Value;
            }
            else
            {
                lang = LanguageHelper.GetDefaultLanguage();
            }
            new LanguageHelper().SetLanguage(lang);
            ViewBag.CurrentLang = lang;
            return base.BeginExecuteCore(callback, state);
        }
    }
}
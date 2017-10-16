using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Pay365.Utils;

namespace Pay365Wallet
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            System.Web.Optimization.BundleTable.EnableOptimizations = false;
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            Exception exception = Server.GetLastError();
            NLogLogger.LogInfo(exception.Message);
            Response.Clear();
            HttpException httpException = exception as HttpException;
            string action = string.Empty;
            if (httpException != null)
            {
                switch (httpException.GetHttpCode())
                {
                    case 404:
                        // page not found 
                        action = "page-not-found";
                        break;
                    case 500:
                        action = "ErrorInternalServer";
                        break;
                    default:
                        action = "page-not-found";
                        break;
                }

                Server.ClearError();
                var notfound_page = string.Format("{0}{1}", Config.Domain, action);
                Response.Redirect(notfound_page, true);
            }
            else
            {
                //TODO: Define action for other exception types
                Server.TransferRequest("~/Home/ErrorInternalServer");
            }
        }
    }
}

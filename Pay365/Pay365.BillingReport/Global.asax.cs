using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Pay365.BillingReport
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            var uri = HttpContext.Current.Request.Url.AbsoluteUri;
            //if (HttpContext.Current.Request.Url.AbsoluteUri.StartsWith("http://sandbox.vtcpay.vn/pay2.0"))
            //{
            //    NLogLogger.LogInfo("AbsoluteUri : " + uri);
            //    string param = string.Empty;
            //    var urlRedirect = "http://sandbox2.vtcpay.vn/cmsbillingreport";
            //    NLogLogger.LogInfo("urlRedirect : " + urlRedirect);
            //    HttpContext.Current.Response.Redirect(urlRedirect);
            //    return;
            //}

            string Origin = Request.Headers["Origin"];
            if (!string.IsNullOrEmpty(Origin))
            {
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", Origin);
                Response.Headers.Add("Access-Control-Allow-Credentials", "true");

            }


            if (HttpContext.Current.Request.HttpMethod == "OPTIONS")
            {
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,DELETE");
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
                HttpContext.Current.Response.End();
            }

        }
    }
}
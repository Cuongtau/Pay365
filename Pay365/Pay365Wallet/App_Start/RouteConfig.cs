using System.Web.Mvc;
using System.Web.Routing;

namespace Pay365Wallet
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapMvcAttributeRoutes();


            routes.MapRoute(
                name: "Tin-tuc",
                url: "tin-tuc/{cateId}/{name}-{id}",
                defaults: new { controller = "News", action = "News_Detail", name = UrlParameter.Optional, id = UrlParameter.Optional, cateId = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "NewsDetail",
                url: "news/{cateId}/{name}-{id}",
                defaults: new { controller = "News", action = "News_Detail", name = UrlParameter.Optional, id = UrlParameter.Optional, cateId = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

        }
    }
}

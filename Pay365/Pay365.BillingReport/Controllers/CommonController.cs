using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataAccess.ReportAPI.DTO;
using DataAccess.ReportAPI.Factory;
using Pay365.Utils;
using Pay365.BillingReport.Controllers.Common;

namespace Pay365.BillingReport.Controllers
{
    public class CommonController : Controller
    {
        // Header
        public ActionResult Header()
        {
            var userValidate = new UserValidation();
            var m_User = new Users();
            var urlLogin = Config.UrlRoot + "Account/FormLogin";
            try
            {
                string sUrl = Server.UrlEncode(HttpContext.Request.Url.ToString());
                Session["Redirect_Uri"] = sUrl;
                //Kiểm tra Authen
                if (!userValidate.IsSigned())
                {
                    Response.Redirect(urlLogin, false);
                }
                else
                {
                    Session[SessionsManager.SESSION_USERID] = userValidate.UserId;
                    Session[SessionsManager.SESSION_USERNAME] = userValidate.UserName;
                    m_User = AbstractDAOFactory.Instance().CreateUsersDAO().GetByUsername(userValidate.UserName);
                    var IsAdministrator = userValidate.IsAdministrator;
                    var functions = new List<Functions>();
                    if (IsAdministrator)
                        functions = AbstractDAOFactory.Instance().CreateFunctionDAO().SelectAllFunctionID(-1, string.Empty, 1, 1);
                    else
                        functions = AbstractDAOFactory.Instance().CreateFunctionDAO().GetListFunctionByUserID(userValidate.UserId, -1);

                    Session[SessionsManager.SESSION_FUNCTIONS] = functions;
                    ViewBag.UserName = userValidate.UserName;
                }
                NLogLogger.LogInfo("SESSION_USERID:" + Session[SessionsManager.SESSION_USERID].ToString());
                ViewBag.UserName = m_User.FullName;
                ViewBag.UrlLogin = urlLogin;
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
            }
            return PartialView(m_User);
        }

        // Menu Side Bar
        public ActionResult Menu()
        {
            var functions = new List<Functions>();
            functions = (List<Functions>)Session[SessionsManager.SESSION_FUNCTIONS];
            return PartialView(functions);
        }
        public ActionResult PageSideBar()
        {
            var functions = new List<Functions>();
            functions = (List<Functions>)Session[SessionsManager.SESSION_FUNCTIONS];
            return PartialView(functions);
        }
        public ActionResult ErrorPermission()
        {
            var urlLogin = Config.UrlRoot + "Account/Login";
            ViewBag.UrlLogin = urlLogin;
            return PartialView();
        }

        public ActionResult ErrorNotPage()
        {
            return PartialView();
        }

        public ActionResult ErrorInternalServer()
        {
            return PartialView();
        }

        public static string GetChildMenu(Functions func, List<Functions> listChild)
        {
            var ListChild = listChild.FindAll(f => f.ParentID == func.FunctionID && f.IsActive == true && f.IsDisplay == true);
            ListChild.Sort((f1, f2) => f1.Order.CompareTo(f2.Order));
            var script = "";
            if (ListChild.Count > 0)
            {
                script += "<li id=\"" + func.ParentID + "\"  data-action=\"" + func.ActionName + "\" class=\"dropdown-submenu parent\" >" +
                        "<a href=\"javascript:void(0);\">" +
                        "<i class=\"" + func.CssIcon + "\">" +
                        "</i> " +
                        "<span class=\"title\">" + func.FunctionName + "</span>" + "<span class=\"arrow\"></span>" +
                        "</a>";
                script += "<ul class=\"dropdown-menu sub-menu\">";
                foreach (var obj in ListChild)
                {
                    script += GetChildMenu(obj, listChild);
                }
                script += "</ul></li>";
            }
            else
            {
                script += "<li data-action=\"" + func.ActionName + "\"><a href=\"" + Config.UrlRoot + func.Url + "\"><i class=\"" + func.CssIcon + "\"></i>" + "<span class=\"title\">" + func.FunctionName + "</span>" + "</a></li>";
            }
            return script;
        }

        public static string GetChildMenuSideBar(Functions func, List<Functions> listChild)
        {
            var ListChild = listChild.FindAll(f => f.ParentID == func.FunctionID && f.IsActive == true && f.IsDisplay == true);
            ListChild.Sort((f1, f2) => f1.Order.CompareTo(f2.Order));
            var script = "";
            if (ListChild.Count > 0)
            {
                script += "<li id=\"menu_sm_" + func.ParentID + "\"  data-action=\"" + func.ActionName + "\" class=\"parent\" >" +
                        "<a href=\"javascript:void(0);\" >" +
                        "<i class=\"" + func.CssIcon + "\">" +
                        "</i> " +
                        "<span class=\"title\">" + func.FunctionName + "</span>" + "<span class=\"arrow\"></span>" +
                        "</a>";
                script += "<ul class=\"sub-menu\">";
                foreach (var obj in ListChild)
                {
                    script += GetChildMenu(obj, listChild);
                }
                script += "</ul></li>";
            }
            else
            {
                script += "<li class=\"parent\" data-action=\"" + func.ActionName + "\"><a  href=\"" + Config.UrlRoot + func.Url + "\"><i class=\"" + func.CssIcon + "\"></i>" + "<span class=\"title\">" + func.FunctionName + "</span>" + "</a></li>";
            }
            return script;
        }

        public void LogOut()
        {
            UserValidation m_UserValidation = new UserValidation();
            m_UserValidation.SignOut();
            Session.Abandon();
            Session.RemoveAll();
            Response.Redirect("~/Account/FormLogin");
        }
    }
}

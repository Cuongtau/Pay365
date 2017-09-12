using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataAccess.ReportAPI.DTO;
using DataAccess.ReportAPI.Factory;
using Pay365.Utils;
using Pay365.Utils.Security;
using Pay365.BillingReport.Controllers.Common;
using Pay365.BillingReport.Models;

namespace Pay365.BillingReport.Controllers
{
    public class AccountController : Controller
    {
        //
        // GET: /Account/
        private UserValidation m_UserValidation = new UserValidation();
        public ActionResult FormLogin()
        {
            UserValidation m_UserValidation = new UserValidation();

            //if (!string.IsNullOrEmpty(act) && act == "out")
            //{
            //    m_UserValidation.SignOut();
            //    Session.Abandon();
            //    Session.RemoveAll();
            //    Response.Redirect("~/", true);
            //}
            //m_UserValidation.SignOut();
            //Session.Abandon();
            //Session.RemoveAll();
            //Response.Redirect(SSOMAIL.SsoHelper.URLLoginMail);
            return View();
        }

        public ActionResult LockedUserView()
        {
            if (!m_UserValidation.IsSigned())
            {
                return RedirectToAction("FormLogin", "Account");
            }
            var LockUser = AbstractDAOFactory.Instance().CreateUsersDAO().UpdateUserLock(m_UserValidation.UserId, true);
            var m_user = AbstractDAOFactory.Instance().CreateUsersDAO().GetByUsername(m_UserValidation.UserName);
            return View(m_user);
        }

        [HttpPost]
        public JsonResult Login(string Username, string Password)
        {
            try
            {
                if (string.IsNullOrEmpty(Username) || string.IsNullOrEmpty(Password))
                    return Json(new { success = false, statusCode = -1, msg = "Dữ liệu không được bỏ trống" });
                var password = Encrypt.MD5(Password.Trim());
                int checkLogin = AbstractDAOFactory.Instance().CreateUsersDAO().Authentication(Username.Trim(), password);
                if (checkLogin > 0)
                {
                    var m_Users = AbstractDAOFactory.Instance().CreateUsersDAO().GetByUsername(Username);
                    if (m_Users != null && m_Users.UserID > 0)
                    {
                        if(m_Users.IsLock)
                        {
                            //Mở khóa User Locked
                            var m_unlock = AbstractDAOFactory.Instance().CreateUsersDAO().UpdateUserLock(m_Users.UserID, false);
                            NLogLogger.LogInfo("Unlock Tài khoản :" + m_unlock);
                        }
                        var Log = new UsersLog();
                        Log.ClientIP = Config.GetIP();
                        Log.FunctionID = 9999;
                        Log.UserID = m_Users.UserID;
                        Log.LogType = 1;
                        Log.FunctionName = "Đăng Nhập Hệ Thống";
                        Log.Description = "Tài khoản " + m_Users.Username + " Đăng nhập hệ thống";
                        var insertLog = AbstractDAOFactory.Instance().CreateUsersLogDAO().InsertUsersLog(Log);

                        if (m_Users.Status)
                        {
                            Session["LoginType"] = 1;
                            string SessionID = Session.SessionID;
                            m_UserValidation.SignIn(m_Users.UserID, m_Users.Username, m_Users.IsAdministrator, SessionID);
                            var UrlRedirect = Session["Redirect_Uri"] == null ? Config.UrlRoot : Server.UrlDecode(Session["Redirect_Uri"].ToString());
                            return Json(new { success = true, statusCode = 1, msg = "Đăng Nhập Thành Công", url = UrlRedirect });
                        }
                        return Json(new { success = false, statusCode = -102, msg = "Tài khoản của bạn đã bị block" });
                    }
                }
                return Json(new { success = false, statusCode = -1, msg = "mật khẩu không chính xác" });
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return Json(new { success = false, statusCode = -99, msg = "Hệ thống bận vui lòng quay lại sau" });
            }
        }

    }
}

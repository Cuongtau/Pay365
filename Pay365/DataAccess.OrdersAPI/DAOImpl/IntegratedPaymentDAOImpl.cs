using DataAccess.OrdersAPI.DAO;
using DataAccess.OrdersAPI.DTO;
using DBHelpers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pay365.Utils;

namespace DataAccess.OrdersAPI.DAOImpl
{
    public class IntegratedPaymentDAOImpl : IIntegratedPaymentDAO
    {
        public WebsitePayment WebsitePayment_GetByWebsiteID(int AccountID, int WebsiteId)
        {
            try
            {
                var pars = new SqlParameter[2];
                pars[0] = new SqlParameter("@_AccountID", AccountID <= 0 ? DBNull.Value : (object)AccountID);  //ID ngân hàng
                pars[1] = new SqlParameter("@_PaymentWebsiteID", WebsiteId);  //ID ngân hàng
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetInstanceSP<WebsitePayment>("SP_PaymentWebsites_GetList", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new WebsitePayment();
            }
        }

        public List<WebsitePayment> WebsitePayment_GetList(int AccountID, int WebsiteId)
        {
            try
            {
                var pars = new SqlParameter[2];
                pars[0] = new SqlParameter("@_AccountID", AccountID <= 0 ? DBNull.Value : (object)AccountID);  //ID ngân hàng
                pars[1] = new SqlParameter("@_PaymentWebsiteID", WebsiteId);  //ID ngân hàng
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetListSP<WebsitePayment>("SP_PaymentWebsites_GetList", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new List<WebsitePayment>();
            }
        }

        public int WebsitePayment_Insert(WebsitePayment websitePayment)
        {
            try
            {
                var pars = new SqlParameter[11];
                pars[0] = new SqlParameter("@_AccountID", websitePayment.AccountID);
                pars[1] = new SqlParameter("@_UrlReturn", string.IsNullOrEmpty(websitePayment.UrlReturn) ? DBNull.Value : (object)websitePayment.UrlReturn);
                pars[2] = new SqlParameter("@_Description", string.IsNullOrEmpty(websitePayment.Description) ? DBNull.Value : (object)websitePayment.Description);
                pars[3] = new SqlParameter("@_PublicKey", string.IsNullOrEmpty(websitePayment.PublicKey) ? DBNull.Value : (object)websitePayment.PublicKey);
                pars[4] = new SqlParameter("@_PrivateKey", string.IsNullOrEmpty(websitePayment.PrivateKey) ? DBNull.Value : (object)websitePayment.PrivateKey);
                pars[5] = new SqlParameter("@_UrlNoitification", string.IsNullOrEmpty(websitePayment.UrlNoitification) ? DBNull.Value : (object)websitePayment.UrlNoitification);
                pars[6] = new SqlParameter("@_Logo", string.IsNullOrEmpty(websitePayment.Logo) ? DBNull.Value : (object)websitePayment.Logo);
                pars[7] = new SqlParameter("@_Status", websitePayment.Status);
                pars[8] = new SqlParameter("@_WebLabel", string.IsNullOrEmpty(websitePayment.WebLabel) ? DBNull.Value : (object)websitePayment.WebLabel);
                pars[9] = new SqlParameter("@_ChargePackageID", websitePayment.ChargePackageID);
                pars[10] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_PaymentWebsites_Insert", pars);
                return Convert.ToInt32(pars[10].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        public int WebsitePayment_Update(WebsitePayment websitePayment)
        {
            try
            {
                var pars = new SqlParameter[8];
                pars[0] = new SqlParameter("@_PaymentWebsiteID", websitePayment.ID);
                pars[1] = new SqlParameter("@_UrlReturn", string.IsNullOrEmpty(websitePayment.UrlReturn) ? DBNull.Value : (object)websitePayment.UrlReturn);
                pars[2] = new SqlParameter("@_Description", string.IsNullOrEmpty(websitePayment.Description) ? DBNull.Value : (object)websitePayment.Description);
                pars[3] = new SqlParameter("@_PublicKey", string.IsNullOrEmpty(websitePayment.PublicKey) ? DBNull.Value : (object)websitePayment.PublicKey);
                pars[4] = new SqlParameter("@_Logo", string.IsNullOrEmpty(websitePayment.Logo) ? DBNull.Value : (object)websitePayment.Logo);
                pars[5] = new SqlParameter("@_Status", websitePayment.Status);
                pars[6] = new SqlParameter("@_ChargePackageID", websitePayment.ChargePackageID);
                pars[7] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_PaymentWebsites_Update", pars);
                return Convert.ToInt32(pars[7].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        public AppMobilePayment AppMobilePayment_GetByID(int AccountID, int MobileAppID)
        {
            try
            {
                var pars = new SqlParameter[2];
                pars[0] = new SqlParameter("@_AccountID", AccountID <= 0 ? DBNull.Value : (object)AccountID);
                pars[1] = new SqlParameter("@_MobileAppID", MobileAppID);
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetInstanceSP<AppMobilePayment>("SP_PaymentMobileApps_GetRows", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new AppMobilePayment();
            }
        }

        public List<AppMobilePayment> AppMobilePayment_GetList(int accountID)
        {
            try
            {
                var pars = new SqlParameter[2];
                pars[0] = new SqlParameter("@_AccountID", accountID <= 0 ? DBNull.Value : (object)accountID);
                pars[1] = new SqlParameter("@_MobileAppID", (object)0);
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetListSP<AppMobilePayment>("SP_PaymentMobileApps_GetRows", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new List<AppMobilePayment>();
            }
        }

        public int AppMobilePayment_Insert(AppMobilePayment appMobilePayment)
        {
            try
            {
                var pars = new SqlParameter[8];
                pars[0] = new SqlParameter("@_AccountID", appMobilePayment.AccountID);
                pars[1] = new SqlParameter("@_AppName", string.IsNullOrEmpty(appMobilePayment.AppName) ? DBNull.Value : (object)appMobilePayment.AppName);
                pars[2] = new SqlParameter("@_AppOS", string.IsNullOrEmpty(appMobilePayment.AppOS) ? DBNull.Value : (object)appMobilePayment.AppOS);
                pars[3] = new SqlParameter("@_Language", string.IsNullOrEmpty(appMobilePayment.Language) ? DBNull.Value : (object)appMobilePayment.Language);
                pars[4] = new SqlParameter("@_Description", string.IsNullOrEmpty(appMobilePayment.Description) ? DBNull.Value : (object)appMobilePayment.Description);
                pars[5] = new SqlParameter("@_PrivateKey", string.IsNullOrEmpty(appMobilePayment.PrivateKey) ? DBNull.Value : (object)appMobilePayment.PrivateKey);
                pars[6] = new SqlParameter("@_ChargePackageID", appMobilePayment.ChargePackageID);
                pars[7] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_PaymentMobileApps_Insert", pars);
                return Convert.ToInt32(pars[7].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        public int AppMobilePayment_Update(AppMobilePayment appMobilePayment)
        {
            try
            {
                var pars = new SqlParameter[9];
                pars[0] = new SqlParameter("@_MobileAppID", appMobilePayment.ID);
                pars[1] = new SqlParameter("@_AccountID", appMobilePayment.AccountID);
                pars[2] = new SqlParameter("@_AppName", string.IsNullOrEmpty(appMobilePayment.AppName) ? DBNull.Value : (object)appMobilePayment.AppName);
                pars[3] = new SqlParameter("@_AppOS", string.IsNullOrEmpty(appMobilePayment.AppOS) ? DBNull.Value : (object)appMobilePayment.AppOS);
                pars[4] = new SqlParameter("@_Language", string.IsNullOrEmpty(appMobilePayment.Language) ? DBNull.Value : (object)appMobilePayment.Language);
                pars[5] = new SqlParameter("@_Description", string.IsNullOrEmpty(appMobilePayment.Description) ? DBNull.Value : (object)appMobilePayment.Description);
                pars[6] = new SqlParameter("@_PrivateKey", string.IsNullOrEmpty(appMobilePayment.PrivateKey) ? DBNull.Value : (object)appMobilePayment.PrivateKey);
                pars[7] = new SqlParameter("@_ChargePackageID", appMobilePayment.ChargePackageID);
                pars[8] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_PaymentMobileApps_Update", pars);
                return Convert.ToInt32(pars[8].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        public List<PaymentButtons> PaymentButton_GetList(PaymentButtons paymentBtn)
        {
            try
            {
                var pars = new SqlParameter[4];
                pars[0] = new SqlParameter("@_AccountID", paymentBtn.AccountID <= 0 ? DBNull.Value : (object)paymentBtn.AccountID);  //ID ngân hàng
                pars[1] = new SqlParameter("@_PaymentButtonID", paymentBtn.PaymentButtonID <= 0 ? DBNull.Value : (object)paymentBtn.PaymentButtonID);  //ID ngân hàng
                pars[2] = new SqlParameter("@_ButtonCode", string.IsNullOrEmpty(paymentBtn.ButtonCode) ? DBNull.Value : (object)paymentBtn.ButtonCode);
                pars[3] = new SqlParameter("@_PaymentCode", string.IsNullOrEmpty(paymentBtn.PaymentCode) ? DBNull.Value : (object)paymentBtn.PaymentCode);
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetListSP<PaymentButtons>("SP_PaymentButtons_GetList", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new List<PaymentButtons>();
            }
        }

        /// <summary>
        /// Tích hợp nút bao gồm: Tích hợp ủng hộ trực tuyến và tích hợp blog forum
        /// ButtonType: 1 -tích hợp blog forum
        /// </summary>
        /// <param name="paymentButton"></param>
        /// <param name="buttonCode"></param>
        /// <returns></returns>
        public int CreatePaymentButton(PaymentButtons paymentButton, ref string buttonCode, ref string paymentCode)
        {
            try
            {
                var parameters = new SqlParameter[18];
                parameters[0] = new SqlParameter("@_AccountID ", paymentButton.AccountID);
                parameters[1] = new SqlParameter("@_ButtonStyle", paymentButton.ButtonStyle);
                parameters[2] = new SqlParameter("@_ProductName", paymentButton.ProductName);
                parameters[3] = new SqlParameter("@_Quantity", paymentButton.Quantity);
                parameters[4] = new SqlParameter("@_Price", paymentButton.Price);
                parameters[5] = new SqlParameter("@_UrlSuccess", string.IsNullOrEmpty(paymentButton.UrlSuccess) ? DBNull.Value : (object)paymentButton.UrlSuccess);
                parameters[6] = new SqlParameter("@_UrlCancel", string.IsNullOrEmpty(paymentButton.UrlCancel) ? DBNull.Value : (object)paymentButton.UrlCancel);
                parameters[7] = new SqlParameter("@_Description", paymentButton.Description);
                parameters[8] = new SqlParameter("@_PayType", paymentButton.PayType);
                parameters[9] = new SqlParameter("@_ButtonCode", SqlDbType.VarChar, 50) { Direction = ParameterDirection.Output };
                parameters[10] = new SqlParameter("@_ChargePackageID", paymentButton.ChargePackageID);
                parameters[11] = new SqlParameter("@_ButtonType", paymentButton.ButtonType);
                parameters[12] = new SqlParameter("@_ButtonName", paymentButton.ButtonName);
                parameters[13] = new SqlParameter("@_PaymentCode", SqlDbType.VarChar, 50) { Direction = ParameterDirection.Output };
                parameters[14] = new SqlParameter("@_PaymentLogo", paymentButton.PaymentLogo);
                parameters[15] = new SqlParameter("@_PaymentLanguage", paymentButton.PaymentLanguage);
                parameters[16] = new SqlParameter("@_PaymentCurrency", paymentButton.PaymentCurrency);
                parameters[17] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_PaymentButtons_Insert", parameters);
                buttonCode = parameters[9].Value.ToString();
                paymentCode = parameters[13].Value.ToString();
                return int.Parse(parameters[17].Value.ToString());
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="paymentButton"></param>
        /// <param name="buttonCode"></param>
        /// <returns></returns>
        public int UpdatePaymentButton(PaymentButtons paymentButton)
        {
            try
            {
                var parameters = new SqlParameter[15];
                parameters[0] = new SqlParameter("@_PaymentButtonID ", paymentButton.PaymentButtonID);
                parameters[1] = new SqlParameter("@_ButtonStyle", paymentButton.ButtonStyle);
                parameters[2] = new SqlParameter("@_ButtonName", paymentButton.ButtonName);
                parameters[3] = new SqlParameter("@_ProductName", paymentButton.ProductName);
                parameters[4] = new SqlParameter("@_Quantity", paymentButton.Quantity);
                parameters[5] = new SqlParameter("@_Price", paymentButton.Price);
                parameters[6] = new SqlParameter("@_UrlSuccess", string.IsNullOrEmpty(paymentButton.UrlSuccess) ? DBNull.Value : (object)paymentButton.UrlSuccess);
                parameters[7] = new SqlParameter("@_UrlCancel", string.IsNullOrEmpty(paymentButton.UrlCancel) ? DBNull.Value : (object)paymentButton.UrlCancel);
                parameters[8] = new SqlParameter("@_Description", paymentButton.Description);
                parameters[9] = new SqlParameter("@_PayType", paymentButton.PayType);
                parameters[10] = new SqlParameter("@_ChargePackageID", paymentButton.ChargePackageID);
                parameters[11] = new SqlParameter("@_PaymentLogo", paymentButton.PaymentLogo);
                parameters[12] = new SqlParameter("@_PaymentLanguage", paymentButton.PaymentLanguage);
                parameters[13] = new SqlParameter("@_PaymentCurrency", paymentButton.PaymentCurrency);
                parameters[14] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_PaymentButtons_Update", parameters);
                return int.Parse(parameters[14].Value.ToString());
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        public int DeletePaymentButton(int PaymentButtonID)
        {
            try
            {
                var parameters = new SqlParameter[2];
                parameters[0] = new SqlParameter("@_PaymentButtonID ", PaymentButtonID);
                parameters[1] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_PaymentButtons_Delete", parameters);
                return int.Parse(parameters[1].Value.ToString());
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        public bool CheckAccountIntegrated(int accountID)
        {
            try
            {
                var parameters = new SqlParameter[2];
                parameters[0] = new SqlParameter("@_AccountID", accountID);
                parameters[1] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_PaymentWebsites_CheckExists", parameters);
                return int.Parse(parameters[1].Value.ToString()) > 0 ? true: false;
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return false;
            }
        }

        public int PaymentButtonUpdateQuantity(int paymentButtonID, int quantity)
        {
            try
            {
                var parameters = new SqlParameter[3];
                parameters[0] = new SqlParameter("@_PaymentButtonID ", paymentButtonID);
                parameters[1] = new SqlParameter("@_Quantity ", quantity);
                parameters[2] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_PaymentButtons_Update_Quantity", parameters);
                return int.Parse(parameters[2].Value.ToString());
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }
    }
}

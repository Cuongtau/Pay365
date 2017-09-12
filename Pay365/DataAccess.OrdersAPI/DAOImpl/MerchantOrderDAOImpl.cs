using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.OrdersAPI.DAO;
using DBHelpers;
using Pay365.Utils;
using DataAccess.OrdersAPI.DTO;

namespace DataAccess.OrdersAPI.DAOImpl
{
    public class MerchantOrderDAOImpl : IMerchantOrderDAO
    {

        // Order Merchant Insert 
        public long OrderMerchant_Insert(int orderID, int merchantID, int websiteID, int accountID, string accountName,
            decimal totalMerchantAmount, decimal merchantAmount, decimal MerchantFee, string merchantRefTransID, byte currentcyType)
        {
            try
            {
                var pars = new SqlParameter[11];
                pars[0] = new SqlParameter("@_OrderID", orderID);
                pars[1] = new SqlParameter("@_MerchantID", merchantID);             // ID merchant
                pars[2] = new SqlParameter("@_WebsiteID", websiteID);               //ID website tích hợp thanh toán
                pars[3] = new SqlParameter("@AccountID", accountID);
                pars[4] = new SqlParameter("@_AccountName", accountName);
                pars[5] = new SqlParameter("@_TotalMerchantAmount", totalMerchantAmount);       //
                pars[6] = new SqlParameter("@_MerchantAmount", merchantAmount);     // 
                pars[7] = new SqlParameter("@_MerchantFee", MerchantFee);         // fee merchant
                pars[8] = new SqlParameter("@_MerchantRefTransID", merchantRefTransID);
                pars[9] = new SqlParameter("@_CurrentcyType", currentcyType);     // 1 vnd , 2 usd , 3 eur          
                pars[10] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output }; // > 0 thành công < 0 lỗi , -99 exception
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_OrderMerchant_Insert", pars);
                return Convert.ToInt64(pars[10].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        //Kiểm tra tồn tại order của merchant ? > 0 đã tồn tại < 0 ko tồn tại , -99 exception
        public int CheckExistOrderMerchant(int websiteID, string merchantRefTransID, ref long orderID)
        {
            try
            {
                var pars = new SqlParameter[4];
                pars[0] = new SqlParameter("@_WebsiteID", websiteID); //Mã website tích hợp
                pars[1] = new SqlParameter("@_MerchantRefTransID", merchantRefTransID); // mã order bên merchant tạo
                pars[2] = new SqlParameter("@_OrderID", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                pars[3] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).GetInstanceSP<OrderBilling>("SP_OrderMerchant_CheckExists_OrderCode", pars);
                int result = Convert.ToInt32(pars[3].Value);
                if(result > 0)
                    orderID = Convert.ToInt64(pars[2].Value);
                return result;
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }

        }

        #region Hoàn tiền Merchant

        // Gửi Yêu cầu Hoàn tiền Merchant
        public long MerchantRefund_Insert(long orderID, byte payType, int payServiceID, string payServiceCode, Int64 relatedTransactionID, int merchantID,
            int websiteID, int merchantAccountID, string merchantAccountName,
          long refundAmount, Int16 refundStatus, string confirmUser, string description)
        {
            try
            {
                var pars = new SqlParameter[14];
                pars[0] = new SqlParameter("@_OrderID", orderID);
                pars[1] = new SqlParameter("@_PayType", payType);  //
                pars[2] = new SqlParameter("@_PayServiceID", payServiceID);
                pars[3] = new SqlParameter("@_PayServiceCode", string.IsNullOrEmpty(payServiceCode) ? DBNull.Value : (object)payServiceCode);
                pars[4] = new SqlParameter("@_RelatedTransactionID", relatedTransactionID);
                pars[5] = new SqlParameter("@_MerchantID", merchantID);                // ID merchant
                pars[6] = new SqlParameter("@_WebsiteID", websiteID);                 //ID website tích hợp thanh toán
                pars[7] = new SqlParameter("@_MerchantAccountID", merchantAccountID);
                pars[8] = new SqlParameter("@_MerchantAccountName", merchantAccountName);
                pars[9] = new SqlParameter("@_RefundAmount", refundAmount);         //
                pars[10] = new SqlParameter("@_RefundStatus", refundStatus);        // 
                pars[11] = new SqlParameter("@_ConfirmUser", confirmUser);         //
                pars[12] = new SqlParameter("@_Description", description);
                pars[13] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output }; // > 0 thành công < 0 lỗi , -99 exception
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_MerchantRefund_Insert", pars);
                return Convert.ToInt64(pars[13].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        // GetList Yêu cầu hoàn tiền
        public List<MerchantRefund> MerchantRefund_GetList(int merchantID, string merchantAccountName, string merchantRefTransID, long relatedTransactionID, DateTime fromDate, DateTime toDate)
        {
            try
            {
                var pars = new SqlParameter[6];
                pars[0] = new SqlParameter("@_MerchantID", merchantID);
                pars[1] = new SqlParameter("@_MerchantAccountName", string.IsNullOrEmpty(merchantAccountName) ? DBNull.Value : (object)merchantAccountName);
                pars[2] = new SqlParameter("@_MerchantRefTransID", string.IsNullOrEmpty(merchantRefTransID) ? DBNull.Value : (object)merchantRefTransID); // Mã đối ứng
                pars[3] = new SqlParameter("@_RelatedTransactionID", relatedTransactionID);
                pars[4] = new SqlParameter("@_FromDate", fromDate);
                pars[5] = new SqlParameter("@_ToDate", toDate);
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetListSP<MerchantRefund>("SP_MerchantRefund_GetList", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new List<MerchantRefund>();
            }
        }

        // Chi tiết Order Merchant
        public OrderBilling OrderBilling_GetforMerchant_ByOrderID(long orderId)
        {
            try
            {
                var pars = new SqlParameter[1];
                pars[0] = new SqlParameter("@_OrderID", orderId);
                var obj = new DBHelper(Config.BillingOrdersAPIConnectionString).GetInstanceSP<OrderBilling>("SP_OrderBilling_GetforMerchant_byOrderID", pars);
                return obj;
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new OrderBilling();
            }
        }

        /// Cập nhập trạng thái hoàn tiền
        /// <param name="orderID"></param>
        /// <param name="refundStatus"></param>
        /// <param name="confirmUser"></param>
        /// <param name="reason"></param>
        /// <returns></returns>
        public long MerchantRefund_UpdateStatus(long orderID, Int16 refundStatus, string reason, string confirmUser)
        {
            try
            {
                var pars = new SqlParameter[5];
                pars[0] = new SqlParameter("@_OrderID", orderID);
                pars[1] = new SqlParameter("@_RefundStatus", refundStatus);
                pars[2] = new SqlParameter("@_ConfirmReason", reason);
                pars[3] = new SqlParameter("@_ConfirmUser", confirmUser);
                pars[4] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output }; // > 0 thành công < 0 lỗi , -99 exception
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_MerchantRefund_Update", pars);
                return Convert.ToInt64(pars[4].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        #endregion
    }
}

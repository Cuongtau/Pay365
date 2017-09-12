using DataAccess.OrdersAPI.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.OrdersAPI.DAO
{
    public interface IMerchantOrderDAO
    {
        long OrderMerchant_Insert(int orderID, int merchantID, int websiteID, int accountID, string accountName,
            decimal totalMerchantAmount, decimal merchantAmount, decimal MerchantFee, string merchantRefTransID,
            byte currentcyType); //

        int CheckExistOrderMerchant(int websiteID, string merchantRefTransID, ref long orderID);

        #region Hoàn tiền Merchant
        // Gửi thông báo hoàn tiền Merchant 
        long MerchantRefund_Insert(long orderID, byte payType, int payServiceID, string payServiceCode, Int64 relatedTransactionID, int merchantID,
             int websiteID, int merchantAccountID, string merchantAccountName,
           long refundAmount, Int16 refundStatus, string confirmUser, string description);

        List<MerchantRefund> MerchantRefund_GetList(int merchantID, string merchantAccountName, string merchantRefTransID, long relatedTransactionID, DateTime fromDate, DateTime toDate);
        OrderBilling OrderBilling_GetforMerchant_ByOrderID(long orderId);
        long MerchantRefund_UpdateStatus(long orderID, Int16 refundStatus, string reason, string confirmUser);

        #endregion

        
    }
}

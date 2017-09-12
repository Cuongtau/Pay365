using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.OrdersAPI.DTO;

namespace DataAccess.OrdersAPI.DAO
{
    public interface IOrderDAO
    {
        #region OrderBilling
        long OrderBilling_CreateforTopUpByBank(OrderBilling requestData);
        long OrderBilling_CreateForCashOut(OrderBilling requestData);
        int OrderBilling_CashOutCheckLimit(string accountName, ref long sumAmount);
        long OrderBilling_CreateforPayWallet(OrderBilling requestData);
        long OrderBilling_CreateforPaymentByBank(OrderBilling requestData);
        OrderBilling OrderBilling_GetByOrderID(long orderId);
        OrderBilling OrderBilling_GetAllByOrderID(long orderId);
        OrderBillingInfo OrderBillingInfo_GetByID(long orderId);
        long OrderBilling_Update(long orderId, Int16 orderStatus, string confirmUser, long transid);

        /// <summary>
        /// Lay thong tin order theo partnerID va orderCode
        /// </summary>
        /// <param name="partnerID">Bat buoc</param>
        /// <param name="orderID">co the truyen de get theo orderID</param>
        /// <param name="orderCode">Bat buoc</param>
        /// <returns></returns>
        OrderBilling OrderBillingGetForPartner(int partnerID, long orderID, string orderCode);
        #endregion

        #region Lấy thông tin Order
        OrderBank OrderBank_GetbyOrderId(long orderId, ref int responseStatus);

        // Dung de check gd khi biet ma gd tu bank
        OrderBankCheck GetOrderByBankRefTrans(int bankID, string BankRefTransID, ref int responseStatus);

        int OrderBank_Update(long orderId, string bankAccount, string bankAccountName, string bankRefTransId,
            string customerEmail, string customerAddress, string customerPhone, string customerIP, string bankResponseCode, int bankResponseStatus);

        int OrderBank_Update(OrderBank orderBank);

        #endregion

        #region Quy đổi USD <-> VNĐ <-> EU
        /// <summary>
        /// 
        /// </summary>
        /// <param name="amount"></param>
        /// <param name="currencyType">1:VNĐ, 2:USD, 3:EU</param>
        /// <returns></returns> 
        void ExchangeCurrency(int currencyType, ref decimal amountVND, ref decimal amountUSD);
        #endregion

        List<OrderBilling> Order_forCashOutOffline_GetList(int bankID, byte orderStatus, string accountName, string bankAccount, DateTime fromDate, DateTime toDate, byte banktranfType);  // get list rút tiền offline
        List<OrderBilling> Order_forCashOutOnline_GetList(int bankID, byte orderStatus, string accountName, string bankAccount, DateTime fromDate, DateTime toDate, byte banktranfType); // get list rút tiền online
        List<OrderBilling> Order_forCashOut_GetList(int bankID, byte orderStatus, string accountName, string bankAccount,DateTime fromDate, DateTime toDate, byte banktranfType); // log giao dịch rút tiền


        long OrderNotify_Insert(OrderNotify order);
        short OrderNotify_Update(long orderNotifyID, long orderID, string commandCode, string accountName, string description, short orderStatus, string confirmUser = "");
        long OrderBilling_CreateForPartner(OrderBilling requestData);
        List<OrderNotify> OrderNotify_GetList(long orderNotifyID, long orderID, string commandCode, int bankID, string accountName, string bankAccount, short status, DateTime fromDate, DateTime toDate);
        OrderNotify OrderNotify_GetByID(long orderNotifyID, long orderID);
        short CheckOrderStatus(string merchantTransId, int websiteId, ref long orderId);

        List<OrderOnlineBanking> OrderOnlineBankingGetList(int bankID, short orderStatus, string vtcpayAccount, string bankAccount, DateTime fromDate, DateTime toDate, ref int response);


        #region OrderExchange Nạp tiền qua thẻ cào
        long OrderExchange_Create(OrderExchange requestData);
        long OrderExchange_Update(OrderExchangeInfo orderinfo);
        #endregion

        List<OrderBilling> Order_forTopUpOnline_GetList_CMS(long orderID, string merchantRefTransID, int payType, int bankID, byte orderStatus, string accountName, string bankAccount, DateTime fromDate, DateTime toDate); // log giao dich nap tien - thanh toan qua cong
    }
}

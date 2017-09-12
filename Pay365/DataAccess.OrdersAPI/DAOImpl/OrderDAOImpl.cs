using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.OrdersAPI.DAO;
using DataAccess.OrdersAPI.DTO;
using DBHelpers;
using Pay365.Utils;

namespace DataAccess.OrdersAPI.DAOImpl
{
    public class OrderDAOImpl : IOrderDAO
    {
        #region OrderBilling

        /// Tạo Giao dịch nạp tiền qua Bank (SP_OrderBilling_Create_forTopUp_byBank)
        /// <param name="requestData"></param>
        /// <returns></returns>
        public long OrderBilling_CreateforTopUpByBank(OrderBilling requestData)
        {
            try
            {
                var pars = new SqlParameter[27];
                pars[0] = new SqlParameter("@_ServiceID", requestData.ServiceID);  //Servcie cộng tiền Pay
                pars[1] = new SqlParameter("@_BankID", requestData.BankID);         //ID ngân hàng
                pars[2] = new SqlParameter("@_MerchantID", requestData.MerchantID);  //ID đối tác (viết để dùng lại cho cả chức năng thanh toán)
                pars[3] = new SqlParameter("@_WebsiteID", requestData.WebsiteID);       //ID website tích hợp thanh toán
                pars[4] = new SqlParameter("@_PayType", requestData.PayType);           //Loại giao dịch (0 khoi tao, 1 thanh cong , 2 huy , 3 cho duyet cms)
                pars[5] = new SqlParameter("@_Amount", requestData.Amount);                 //Số tiền nạp vào ví Pay
                pars[6] = new SqlParameter("@_Fee", requestData.Fee);                       // phí pay
                pars[7] = new SqlParameter("@_AccountID", requestData.AccountID);           //Tk pay
                pars[8] = new SqlParameter("@_AccountName", requestData.AccountName);       // tên tk pay
                pars[9] = new SqlParameter("@_BankRefTransID", requestData.BankRefTransID);
                pars[10] = new SqlParameter("@_BankTransType", requestData.BankTransType);
                pars[11] = new SqlParameter("@_BankBranch", requestData.BankBranch);        // Chi nhánh ngân hàng của tk khách hàng
                pars[12] = new SqlParameter("@_RedirectURL", string.IsNullOrEmpty(requestData.RedirectURL) ? DBNull.Value : (object)requestData.RedirectURL);   //Link kết nối app Bank
                pars[13] = new SqlParameter("@_NotifyURL", string.IsNullOrEmpty(requestData.NotifyURL) ? DBNull.Value : (object)requestData.NotifyURL);         //Link kết nối app Bank
                pars[14] = new SqlParameter("@_BankAccount", string.IsNullOrEmpty(requestData.BankAccount) ? DBNull.Value : (object)requestData.BankAccount);   // TK Ngân hàng
                pars[15] = new SqlParameter("@_BankAccountName", string.IsNullOrEmpty(requestData.BankAccountName) ? DBNull.Value : (object)requestData.BankAccountName);   // Tên TK ngân hàng
                pars[16] = new SqlParameter("@_BankAmount", requestData.BankAmount);                    // tiền ngân hàng trừ khách hàng (totalAmount+ Bankfee)
                pars[17] = new SqlParameter("@_BankFee", requestData.BankFee);                          // phí ngân hàng
                pars[18] = new SqlParameter("@_CurrencyType", requestData.CurrencyType);          // 1 vnd , 2 usd , 3 eur              
                pars[19] = new SqlParameter("@_BankRedirectURL", string.IsNullOrEmpty(requestData.BankRedirectURL) ? DBNull.Value : (object)requestData.BankRedirectURL);  // Link kết nối ngân hàng
                pars[20] = new SqlParameter("@_BankNotifyURL", string.IsNullOrEmpty(requestData.BankNotifyURL) ? DBNull.Value : (object)requestData.BankNotifyURL);         //Link kết nối ngân hàng
                pars[21] = new SqlParameter("@_BankCreatedTime", requestData.BankCreatedTime);
                pars[22] = new SqlParameter("@_Description", string.IsNullOrEmpty(requestData.Description) ? DBNull.Value : (object)requestData.Description);               // Mô tả giao dịch
                pars[23] = new SqlParameter("@_ClientIP", string.IsNullOrEmpty(requestData.ClientIP) ? DBNull.Value : (object)requestData.ClientIP);
                pars[24] = new SqlParameter("@_ConfirmUser", requestData.ConfirmUser);
                pars[25] = new SqlParameter("@_DeviceType", requestData.DeviceType);
                pars[26] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };                    // >> @_ResponseStatus: >0 thành công = orderid , -99 lỗi
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_OrderBilling_Create_forTopUp_byBank", pars);
                return Convert.ToInt64(pars[26].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        /// <summary>
        /// Tạo giao dịch rút tiền từ ví => bank
        /// </summary>
        /// <param name="requestData"></param>
        /// <returns></returns>
        public long OrderBilling_CreateForCashOut(OrderBilling requestData)
        {
            try
            {
                var pars = new SqlParameter[17];
                pars[0] = new SqlParameter("@_ServiceID", requestData.ServiceID);  //Servcie cộng tiền Pay
                pars[1] = new SqlParameter("@_BankID", requestData.BankID);         //ID ngân hàng
                pars[2] = new SqlParameter("@_PayType", requestData.PayType);           //Loại giao dịch (4: rút tiền online ; 5: rút tiền offline)
                pars[3] = new SqlParameter("@_Amount", requestData.Amount);                 //Số tiền nạp vào ví Pay
                pars[4] = new SqlParameter("@_Fee", requestData.Fee);                       // phí pay
                pars[5] = new SqlParameter("@_AccountID", requestData.AccountID);           //Tk pay
                pars[6] = new SqlParameter("@_AccountName", requestData.AccountName);
                pars[7] = new SqlParameter("@_BankAccount", string.IsNullOrEmpty(requestData.BankAccount) ? DBNull.Value : (object)requestData.BankAccount);   // TK Ngân hàng
                pars[8] = new SqlParameter("@_BankAccountName", string.IsNullOrEmpty(requestData.BankAccountName) ? DBNull.Value : (object)requestData.BankAccountName);   // Tên TK ngân hàng
                pars[9] = new SqlParameter("@_BankBranch", string.IsNullOrEmpty(requestData.BankBranch) ? DBNull.Value : (object)requestData.BankBranch);   // Tên TK ngân hàng
                pars[10] = new SqlParameter("@_BankTransType", requestData.BankTransType); //Byte
                pars[11] = new SqlParameter("@_BankAmount", requestData.BankAmount);                    // tiền ngân hàng trừ khách hàng (totalAmount+ Bankfee)
                pars[12] = new SqlParameter("@_BankFee", requestData.BankFee);                          // phí ngân hàng
                pars[13] = new SqlParameter("@_CurrencyType", requestData.CurrencyType);          // 1 vnd , 2 usd , 3 eur              
                pars[14] = new SqlParameter("@_Description", string.IsNullOrEmpty(requestData.Description) ? DBNull.Value : (object)requestData.Description);               // Mô tả giao dịch
                pars[15] = new SqlParameter("@_ClientIP", string.IsNullOrEmpty(requestData.ClientIP) ? DBNull.Value : (object)requestData.ClientIP);
                pars[16] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };                    // >> @_ResponseStatus: >0 thành công = orderid , -99 lỗi
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_OrderBilling_Create_forCashOut", pars);
                return Convert.ToInt64(pars[16].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        /// <summary>
        /// Check số lần thực hiện giao dịch rút tiền trong ngày
        /// </summary>
        /// <param name="accountName"></param>
        /// <param name="sumAmount">Số tiền đã rút</param>
        /// <returns>_CountOrder: Số lần thực hiện</returns>
        public int OrderBilling_CashOutCheckLimit(string accountName, ref long sumAmount)
        {
            try
            {
                var pars = new SqlParameter[3];
                pars[0] = new SqlParameter("@_AccountName", accountName);
                pars[1] = new SqlParameter("@_CountOrder", SqlDbType.Int) { Direction = ParameterDirection.Output };
                pars[2] = new SqlParameter("@_SumAmount", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_Order_forCashOut_Check", pars);
                sumAmount = Convert.ToInt64(pars[2].Value);
                return Convert.ToInt32(pars[1].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        /// Order Billing Get Order By orderId
        /// <param name="orderId"></param> 
        /// <param name="responseStatus"></param>
        /// <returns></returns>
        public OrderBilling OrderBilling_GetByOrderID(long orderId)
        {
            try
            {
                var pars = new SqlParameter[1];
                pars[0] = new SqlParameter("@_OrderID", orderId);
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetInstanceSP<OrderBilling>("SP_OrderBilling_GetforBank_byOrderID", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new OrderBilling() { OrderID = -696 }; // Phan biet truong hop khong ton tai order va exception
            }
        }

        /// Order Billing Get Order By orderId
        /// <param name="orderId"></param> 
        /// <param name="responseStatus"></param>
        /// <returns></returns>
        public OrderBilling OrderBilling_GetAllByOrderID(long orderId)
        {
            try
            {
                var pars = new SqlParameter[1];
                pars[0] = new SqlParameter("@_OrderID", orderId);
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetInstanceSP<OrderBilling>("SP_OrderBilling_GetAll_byOrderID", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new OrderBilling() { OrderID = -696 }; // Phan biet truong hop khong ton tai order va exception
            }
        }

        public OrderBillingInfo OrderBillingInfo_GetByID(long orderId)
        {
            try
            {
                var pars = new SqlParameter[1];
                pars[0] = new SqlParameter("@_OrderID", orderId);
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetInstanceSP<OrderBillingInfo>("SP_OrderBilling_GetInfoByOrderID", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new OrderBillingInfo();
            }
        }


        /// Cập nhập trạng thái Order (   )
        /// ">>@_ResponseStatus : 1 thành công  , -58 không tồn tại orderid này; -99 lỗi"
        /// <param name="orderId"></param>
        /// <param name="orderStatus"></param>
        /// <param name="confirmUser"></param>
        /// <returns></returns>
        public long OrderBilling_Update(long orderId, Int16 orderStatus, string confirmUser, long transid)
        {
            try
            {
                var pars = new SqlParameter[5];
                pars[0] = new SqlParameter("@_OrderID", orderId);
                pars[1] = new SqlParameter("@_OrderStatus", orderStatus);  // Trạng thái order =0 khởi tạo, = 1 thành công , = 2 hủy, = 3 cho duyệt cms, 4 - đã hoàn tiền
                pars[2] = new SqlParameter("@_ConfirmUser", string.IsNullOrEmpty(confirmUser) ? DBNull.Value : (object)confirmUser);  // Người thực hiện
                pars[3] = new SqlParameter("@_RelatedTransactionID", transid);
                pars[4] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_OrderBilling_Update", pars);
                return Convert.ToInt64(pars[4].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        /// Tạo Giao dịch thanh toán online qua Bank (SP_OrderBilling_Create_forPayment_byBank)
        /// <param name="requestData"></param>
        /// <returns></returns>
        public long OrderBilling_CreateforPaymentByBank(OrderBilling requestData)
        {
            try
            {
                var pars = new SqlParameter[28];
                pars[0] = new SqlParameter("@_ServiceID", requestData.ServiceID);  //Servcie cộng tiền Pay
                pars[1] = new SqlParameter("@_BankID", requestData.BankID);         //ID ngân hàng
                pars[2] = new SqlParameter("@_MerchantID", requestData.MerchantID);  //ID đối tác (viết để dùng lại cho cả chức năng thanh toán)
                pars[3] = new SqlParameter("@_WebsiteID", requestData.WebsiteID);       //ID website tích hợp thanh toán
                pars[4] = new SqlParameter("@_PayType", requestData.PayType);           //Loại giao dịch (0 khoi tao, 1 thanh cong , 2 huy , 3 cho duyet cms)
                pars[5] = new SqlParameter("@_Amount", requestData.Amount);                 //Số tiền nạp vào ví Pay
                pars[6] = new SqlParameter("@_Fee", requestData.Fee);                       // phí pay
                pars[7] = new SqlParameter("@_RedirectURL", string.IsNullOrEmpty(requestData.RedirectURL) ? DBNull.Value : (object)requestData.RedirectURL);   //Link kết nối app Bank
                pars[8] = new SqlParameter("@_NotifyURL", string.IsNullOrEmpty(requestData.NotifyURL) ? DBNull.Value : (object)requestData.NotifyURL);         //Link kết nối app Bank
                pars[9] = new SqlParameter("@_BankAccount", string.IsNullOrEmpty(requestData.BankAccount) ? DBNull.Value : (object)requestData.BankAccount);   // TK Ngân hàng
                pars[10] = new SqlParameter("@_BankAccountName", string.IsNullOrEmpty(requestData.BankAccountName) ? DBNull.Value : (object)requestData.BankAccountName);   // Tên TK ngân hàng
                pars[11] = new SqlParameter("@_BankAmount", requestData.BankAmount);                    // tiền ngân hàng trừ khách hàng (totalAmount+ Bankfee)
                pars[12] = new SqlParameter("@_BankFee", requestData.BankFee);                          // phí ngân hàng
                pars[13] = new SqlParameter("@_CurrencyType", requestData.CurrencyType <= 0 ? DBNull.Value : (object)requestData.CurrencyType);          // 1 vnd , 2 usd , 3 eur              
                pars[14] = new SqlParameter("@_BankRedirectURL", string.IsNullOrEmpty(requestData.BankRedirectURL) ? DBNull.Value : (object)requestData.BankRedirectURL);  // Link kết nối ngân hàng
                pars[15] = new SqlParameter("@_BankNotifyURL", string.IsNullOrEmpty(requestData.BankNotifyURL) ? DBNull.Value : (object)requestData.BankNotifyURL);         //Link kết nối ngân hàng
                pars[16] = new SqlParameter("@_MerchantRefTransID", string.IsNullOrEmpty(requestData.MerchantRefTransID) ? string.Empty : (object)requestData.MerchantRefTransID);  // mã giao dịch của merchant
                pars[17] = new SqlParameter("@_MerchantAccountID", requestData.MerchantAccountID);         //Mã TK merchant
                pars[18] = new SqlParameter("@_MerchantAccountName", string.IsNullOrEmpty(requestData.MerchantAccountName) ? DBNull.Value : (object)requestData.MerchantAccountName);   //Tên TK merchant
                pars[19] = new SqlParameter("@_MerchantAmount", requestData.MerchantAmount);   //Tên TK merchant
                pars[20] = new SqlParameter("@_MerchantFee", requestData.MerchantFee);   //Tên TK merchant
                pars[21] = new SqlParameter("@_Description", string.IsNullOrEmpty(requestData.Description) ? DBNull.Value : (object)requestData.Description);               // Mô tả giao dịch
                pars[22] = new SqlParameter("@_ClientIP", string.IsNullOrEmpty(requestData.ClientIP) ? DBNull.Value : (object)requestData.ClientIP);
                pars[23] = new SqlParameter("@_ConfirmUser", requestData.ConfirmUser);
                pars[24] = new SqlParameter("@_DeviceType", requestData.DeviceType);
                pars[25] = new SqlParameter("@_AccountID", requestData.AccountID);
                pars[26] = new SqlParameter("@_AccountName", string.IsNullOrEmpty(requestData.AccountName) ? DBNull.Value : (object)requestData.AccountName);
                pars[27] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };                    // >> @_ResponseStatus: >0 thành công = orderid , -99 lỗi
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_OrderBilling_Create_forPayment_byBank", pars);
                return Convert.ToInt64(pars[27].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }


        /// <summary>
        /// Tạo giao dịch cho partner
        /// </summary>
        /// <param name="requestData">
        /// ServiceID //Servcie cộng tiền Pay
        /// OrderCode //mã đơn hàng
        /// PartnerID //Mã partner
        /// </param>
        /// <returns></returns>
        public long OrderBilling_CreateForPartner(OrderBilling requestData)
        {
            try
            {
                var pars = new SqlParameter[12];
                pars[0] = new SqlParameter("@_ServiceID", requestData.ServiceID);
                pars[1] = new SqlParameter("@_OrderCode", requestData.OrderCode);         
                pars[2] = new SqlParameter("@_PartnerID", requestData.PartnerID);         
                pars[3] = new SqlParameter("@_PayType", requestData.PayType);           
                pars[4] = new SqlParameter("@_Amount", requestData.Amount);                 
                pars[5] = new SqlParameter("@_Fee", requestData.Fee);                       
                pars[6] = new SqlParameter("@_AccountID", requestData.AccountID);           
                pars[7] = new SqlParameter("@_AccountName", requestData.AccountName);
                pars[8] = new SqlParameter("@_Description", string.IsNullOrEmpty(requestData.Description) ? DBNull.Value : (object)requestData.Description);               // Mô tả giao dịch
                pars[9] = new SqlParameter("@_ClientIP", string.IsNullOrEmpty(requestData.ClientIP) ? DBNull.Value : (object)requestData.ClientIP);
                pars[10] = new SqlParameter("@_DeviceType", requestData.DeviceType <= 0 ? DBNull.Value : (object)requestData.DeviceType);
                pars[11] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };                    // >> @_ResponseStatus: >0 thành công = orderid , -99 lỗi
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_OrderBilling_Create_forPartner", pars);
                return Convert.ToInt64(pars[11].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        public OrderBilling OrderBillingGetForPartner(int partnerID, long orderID, string orderCode)
        {
            try
            {
                var pars = new SqlParameter[3];
                pars[0] = new SqlParameter("@_PartnerID", partnerID <= 0 ? DBNull.Value : (object)partnerID); //Int32
                pars[1] = new SqlParameter("@_OrderID", orderID); //Int64
                pars[2] = new SqlParameter("@_OrderCode", string.IsNullOrEmpty(orderCode) ? DBNull.Value : (object)orderCode); //AnsiString 
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetInstanceSP<OrderBilling>("SP_OrderBilling_GetAll_byOrderID_forPartner", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new OrderBilling();
            }
        }
        #endregion

        #region OrderBank


        /// Get OrderBank By OrderID
        /// <param name="orderId"></param>
        /// <param name="responseStatus"></param>
        /// <returns></returns>
        public OrderBank OrderBank_GetbyOrderId(long orderId, ref int responseStatus)
        {
            var obj = new OrderBank();
            try
            {
                var pars = new SqlParameter[2];
                pars[0] = new SqlParameter("@_OrderID", orderId);
                pars[1] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };  //">>@_ResponseStatus : 1 thành công trả về table , -1 không tồn tại orderid này"
                obj = new DBHelper(Config.BillingOrdersAPIConnectionString).GetInstanceSP<OrderBank>("SP_OrderBank_GetbyOrderID", pars);
                responseStatus = Convert.ToInt32(pars[1].Value);
                return responseStatus > 0 ? obj : new OrderBank();
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                responseStatus = -969;
                return new OrderBank();
            }
        }


        /// Get OrderBank By OrderID
        /// <param name="orderId"></param>
        /// <param name="responseStatus"></param>
        /// <returns></returns>
        public OrderBankCheck GetOrderByBankRefTrans(int bankID, string bankRefTransID, ref int responseStatus)
        {
            var obj = new OrderBankCheck();
            try
            {
                var pars = new SqlParameter[3];
                pars[0] = new SqlParameter("@_BankID", bankID);
                pars[1] = new SqlParameter("@_BankRefTransID", bankRefTransID);
                pars[2] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };  //">>@_ResponseStatus : 1 thành công trả về table , -1 không tồn tại orderid này"
                obj = new DBHelper(Config.BillingOrdersAPIConnectionString).GetInstanceSP<OrderBankCheck>("SP_OrderBank_CheckExists_BankOrderCode", pars);
                responseStatus = Convert.ToInt32(pars[2].Value);
                return responseStatus > 0 ? obj : new OrderBankCheck();
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                responseStatus = -969;
                return new OrderBankCheck();
            }
        }


        /// Cập nhập OrderBank 
        /// ">>@_ResponseStatus : 1 thành công  , -58 không tồn tại orderid này; -99 lỗi"
        /// <param name="orderId"></param>
        /// <param name="bankAccount"></param>
        /// <param name="bankAccountName"></param>
        /// <param name="bankRefTransId"></param>
        /// <param name="customerEmail"></param>
        /// <param name="customerAddress"></param>
        /// <param name="customerPhone"></param>
        /// <param name="customerIP"></param>
        /// <returns></returns>
        public int OrderBank_Update(long orderId, string bankAccount, string bankAccountName, string bankRefTransId,
            string customerEmail, string customerAddress, string customerPhone, string customerIP, string bankResponseCode, int bankResponseStatus)
        {
            try
            {
                int responseStatus = 0;

                var pars = new SqlParameter[11];
                pars[0] = new SqlParameter("@_OrderID", orderId);
                pars[1] = new SqlParameter("@_BankAccount", bankAccount);           // tài khoản ngân hàng
                pars[2] = new SqlParameter("@_BankAccountName", bankAccountName);  // tên tk ngân hàng
                pars[3] = new SqlParameter("@_BankRefTransID", bankRefTransId);   //Referent giao dịch tại ngân hàng
                pars[4] = new SqlParameter("@_CustomerEmail", customerEmail);   //.. thông tin khách hàng
                pars[5] = new SqlParameter("@_CustomerAddress", customerAddress);
                pars[6] = new SqlParameter("@_CustomerPhone", customerPhone);
                pars[7] = new SqlParameter("@_CustomerIP", customerIP);     //IP
                pars[8] = new SqlParameter("@_BankResponseCode", bankResponseCode);
                pars[9] = new SqlParameter("@_BankResponseStatus", bankResponseStatus);
                pars[10] = new SqlParameter("@_ResponseStatus", SqlDbType.SmallInt) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_OrderBank_Update", pars);
                responseStatus = Convert.ToInt32(pars[10].Value);

                return responseStatus;
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        /// Cập nhập OrderBank 
        /// ">>@_ResponseStatus : 1 thành công  , -58 không tồn tại orderid này; -99 lỗi"
        /// <param name="orderId"></param>
        /// <param name="bankAccount"></param>
        /// <param name="bankAccountName"></param>
        /// <param name="bankRefTransId"></param>
        /// <param name="customerEmail"></param>
        /// <param name="customerAddress"></param>
        /// <param name="customerPhone"></param>
        /// <param name="customerIP"></param>
        /// <returns></returns>
        public int OrderBank_Update(OrderBank orderBank)
        {
            try
            {
                var pars = new SqlParameter[12];
                pars[0] = new SqlParameter("@_OrderID", orderBank.OrderID);
                pars[1] = new SqlParameter("@_BankAccount", orderBank.BankAccount ?? string.Empty);           // tài khoản ngân hàng
                pars[2] = new SqlParameter("@_BankAccountName", orderBank.BankAccountName ?? string.Empty);  // tên tk ngân hàng
                pars[3] = new SqlParameter("@_BankRefTransID", orderBank.BankRefTransID ?? string.Empty);   //Referent giao dịch tại ngân hàng
                pars[4] = new SqlParameter("@_CustomerEmail", orderBank.CustomerEmail ?? string.Empty);   //.. thông tin khách hàng
                pars[5] = new SqlParameter("@_CustomerAddress", orderBank.CustomerAddress ?? string.Empty);
                pars[6] = new SqlParameter("@_CustomerPhone", orderBank.CustomerPhone ?? string.Empty);
                pars[7] = new SqlParameter("@_CustomerIP", orderBank.CustomerIP ?? string.Empty);     //IP @_Description		NVARCHAR(150)
                pars[8] = new SqlParameter("@_BankResponseCode", orderBank.BankResponseCode ?? string.Empty);
                pars[9] = new SqlParameter("@_BankResponseStatus", orderBank.BankResponseStatus);
                pars[10] = new SqlParameter("@_Description", orderBank.Description ?? string.Empty);
                pars[11] = new SqlParameter("@_ResponseStatus", SqlDbType.SmallInt) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_OrderBank_Update", pars);

                int responseStatus = Convert.ToInt32(pars[11].Value);

                return responseStatus;
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }


        #endregion

        #region Order Pay

        /// Tạo Giao dịch thanh toán qua ví (SP_OrderBilling_Create_forPayment_byPay)
        /// <param name="requestData"></param>
        /// <returns></returns>
        public long OrderBilling_CreateforPayWallet(OrderBilling requestData)
        {
            try
            {
                var pars = new SqlParameter[17];
                pars[0] = new SqlParameter("@_ServiceID", requestData.ServiceID);  //Servcie cộng tiền Pay
                pars[1] = new SqlParameter("@_MerchantID", requestData.MerchantID);  //ID đối tác (viết để dùng lại cho cả chức năng thanh toán)
                pars[2] = new SqlParameter("@_WebsiteID", requestData.WebsiteID);       //ID website tích hợp thanh toán
                pars[3] = new SqlParameter("@_PayType", requestData.PayType);           //1 nap tien online , 2 nap tien offline, 3 thanh toan online, 4 rut tien online, 5 rut tien offline
                pars[4] = new SqlParameter("@_Amount", requestData.Amount);                 //Số tiền + tài khoản
                pars[5] = new SqlParameter("@_Fee", requestData.Fee);                       // phí khách hàng
                pars[6] = new SqlParameter("@_MerchantFee", requestData.MerchantFee);       // phí merchant
                pars[7] = new SqlParameter("@_AccountID", requestData.AccountID);           //Tk pay
                pars[8] = new SqlParameter("@_AccountName", requestData.AccountName);       // tên tk pay
                pars[9] = new SqlParameter("@_RedirectURL", string.IsNullOrEmpty(requestData.RedirectURL) ? DBNull.Value : (object)requestData.RedirectURL);   //Link kết nối app Bank
                pars[10] = new SqlParameter("@_NotifyURL", string.IsNullOrEmpty(requestData.NotifyURL) ? DBNull.Value : (object)requestData.NotifyURL);         //Link kết nối app Bank
                pars[11] = new SqlParameter("@_MerchantRefTransID", string.IsNullOrEmpty(requestData.MerchantRefTransID) ? string.Empty : (object)requestData.MerchantRefTransID);  // mã giao dịch của merchant
                pars[12] = new SqlParameter("@_MerchantAccountID", requestData.MerchantAccountID);         //Mã TK merchant
                pars[13] = new SqlParameter("@_MerchantAccountName", string.IsNullOrEmpty(requestData.MerchantAccountName) ? DBNull.Value : (object)requestData.MerchantAccountName);   //Tên TK merchant
                pars[14] = new SqlParameter("@_Description", string.IsNullOrEmpty(requestData.Description) ? DBNull.Value : (object)requestData.Description);               // Mô tả giao dịch
                pars[15] = new SqlParameter("@_ClientIP", string.IsNullOrEmpty(requestData.ClientIP) ? DBNull.Value : (object)requestData.ClientIP);
                pars[16] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };                    // >> @_ResponseStatus: >0 thành công = orderid , -99 lỗi
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_OrderBilling_Create_forPayment_byPay", pars);
                return Convert.ToInt64(pars[16].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }
        #endregion

        #region ExchangeCurrency
        /// <summary>
        /// Quy đổi USD <-> VND <-> EU
        /// </summary>
        /// <param name="amount"></param>
        /// <param name="currencyType">1:VNĐ, 2:USD, 3:EU</param>
        /// <returns></returns>
        public void ExchangeCurrency(int currencyType, ref decimal amountVND, ref decimal amountUSD)
        {
            try
            {
                var pars = new SqlParameter[3];
                pars[0] = new SqlParameter("@_VNDAmount", amountVND) { Direction = ParameterDirection.InputOutput, SqlDbType = SqlDbType.Money };
                pars[1] = new SqlParameter("@_CurrencyType", currencyType);
                pars[2] = new SqlParameter("@_USDAmount", amountUSD) { Direction = ParameterDirection.InputOutput, SqlDbType = SqlDbType.Money };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_ExchangeCurrency_byType", pars);

                amountVND = Convert.ToDecimal(pars[0].Value);
                amountUSD = Convert.ToDecimal(pars[2].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
            }
        }
        #endregion


        /// get list Order rút tiền offline
        /// <param name="bankID"></param>
        /// <param name="orderStatus"></param> 
        /// <param name="accountName"></param>
        /// <param name="bankAccount"></param>
        /// <param name="fromDate"></param>
        /// <param name="toDate"></param>
        /// <param name="banktranfType"></param>
        /// <returns></returns>
        public List<OrderBilling> Order_forCashOutOffline_GetList(int bankID, byte orderStatus, string accountName, string bankAccount, DateTime fromDate, DateTime toDate, byte banktranfType)
        {
            try
            {
                var pars = new SqlParameter[7];
                pars[0] = new SqlParameter("@_BankID", bankID <= 0 ? DBNull.Value : (object)bankID);
                pars[1] = new SqlParameter("@_OrderStatus", orderStatus == 99 ? DBNull.Value : (object)orderStatus);                                   // =0 khởi tạo, = 1 thành công , = 2 hủy, = 3 cho duyệt cms
                pars[2] = new SqlParameter("@_AccountName", String.IsNullOrEmpty(accountName) ? DBNull.Value : (object)accountName);//-- tai khoan pay
                pars[3] = new SqlParameter("@_BankAccount", String.IsNullOrEmpty(bankAccount) ? DBNull.Value : (object)bankAccount); //-- so tai khoan ngan hang
                pars[4] = new SqlParameter("@_BankTransType", banktranfType <= 0 ? DBNull.Value : (object)banktranfType);
                pars[5] = new SqlParameter("@_FromDate", fromDate);
                pars[6] = new SqlParameter("@_ToDate", toDate);
                var list = new DBHelper(Config.BillingOrdersAPIConnectionString)
                    .GetListSP<OrderBilling>("SP_Order_forCashOutOffline_GetList", pars);
                if (list == null || list.Count <= 0)
                    return new List<OrderBilling>();
                return list;
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new List<OrderBilling>();
            }
        }

        //SP_Order_forCashOutOffline_GetList
        // Get List Duyệt Online
        public List<OrderBilling> Order_forCashOutOnline_GetList(int bankID, byte orderStatus, string accountName, string bankAccount, DateTime fromDate, DateTime toDate, byte banktranfType)
        {
            try
            {
                var pars = new SqlParameter[7];
                pars[0] = new SqlParameter("@_BankID", bankID <= 0 ? DBNull.Value : (object)bankID);
                pars[1] = new SqlParameter("@_OrderStatus", orderStatus == 99 ? DBNull.Value : (object)orderStatus);                                   // =0 khởi tạo, = 1 thành công , = 2 hủy, = 3 cho duyệt cms
                pars[2] = new SqlParameter("@_AccountName", String.IsNullOrEmpty(accountName) ? DBNull.Value : (object)accountName);//-- tai khoan pay
                pars[3] = new SqlParameter("@_BankAccount", String.IsNullOrEmpty(bankAccount) ? DBNull.Value : (object)bankAccount); //-- so tai khoan ngan hang
                pars[4] = new SqlParameter("@_BankTransType", banktranfType <= 0 ? DBNull.Value : (object)banktranfType);
                pars[5] = new SqlParameter("@_FromDate", fromDate);
                pars[6] = new SqlParameter("@_ToDate", toDate);
                var list = new DBHelper(Config.BillingOrdersAPIConnectionString)
                    .GetListSP<OrderBilling>("SP_Order_forCashOutOnline_GetList", pars);
                if (list == null || list.Count <= 0)
                    return new List<OrderBilling>();
                return list;
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new List<OrderBilling>();
            }
        }


        //SP_Order_forCashOut_GetList
        // Log Giao dịch rút tiền ()
        public List<OrderBilling> Order_forCashOut_GetList(int bankID, byte orderStatus, string accountName, string bankAccount, DateTime fromDate, DateTime toDate, byte banktranfType)
        {
            try 
            {
                var pars = new SqlParameter[7];
                pars[0] = new SqlParameter("@_BankID", bankID <= 0 ? DBNull.Value : (object)bankID);
                pars[1] = new SqlParameter("@_OrderStatus", orderStatus == 99 ? DBNull.Value : (object)orderStatus);                                   // =0 khởi tạo, = 1 thành công , = 2 hủy, = 3 cho duyệt cms
                pars[2] = new SqlParameter("@_AccountName", String.IsNullOrEmpty(accountName) ? DBNull.Value : (object)accountName);//-- tai khoan pay
                pars[3] = new SqlParameter("@_BankAccount", String.IsNullOrEmpty(bankAccount) ? DBNull.Value : (object)bankAccount); //-- so tai khoan ngan hang
                pars[4] = new SqlParameter("@_BankTransType", banktranfType <= 0 ? DBNull.Value : (object)banktranfType);
                pars[5] = new SqlParameter("@_FromDate", fromDate);
                pars[6] = new SqlParameter("@_ToDate", toDate);
                var list = new DBHelper(Config.BillingOrdersAPIConnectionString)
                    .GetListSP<OrderBilling>("SP_Order_forCashOut_GetList", pars);
                if (list == null || list.Count <= 0)
                    return new List<OrderBilling>();
                return list;
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new List<OrderBilling>();
            }
        }

        #region OrderNotify

        public long OrderNotify_Insert(OrderNotify order)
        {
            try
            {
                var pars = new SqlParameter[20];
                pars[0] = new SqlParameter("@_BankID", order.BankID);
                pars[1] = new SqlParameter("@_BankCode", order.BankCode);
                pars[2] = new SqlParameter("@_CommandCode", order.CommandCode);
                pars[3] = new SqlParameter("@_FunctionName", order.FunctionName);
                pars[4] = new SqlParameter("@_AccountName", order.AccountName);
                pars[5] = new SqlParameter("@_Amount", order.Amount);
                pars[6] = new SqlParameter("@_BankAccount", order.BankAccount);
                pars[7] = new SqlParameter("@_BankAccountName", order.BankAccountName);
                pars[8] = new SqlParameter("@_BankRefTransID", order.BankRefTransID);
                pars[9] = new SqlParameter("@_BankBranch", order.BankBranch);
                pars[10] = new SqlParameter("@_BankTransType", order.BankTransType);
                pars[11] = new SqlParameter("@_OrgMessenger", order.OrgMessenger);
                pars[12] = new SqlParameter("@_Description", order.Description);
                pars[13] = new SqlParameter("@_CustomerMobile", order.CustomerMobile);
                pars[14] = new SqlParameter("@_BankCreatedTime", order.BankCreatedTime);
                pars[15] = new SqlParameter("@_ExecuteTime", order.ExecuteTime);
                pars[16] = new SqlParameter("@_EndTime", order.EndTime);
                pars[17] = new SqlParameter("@_ConfirmUser", order.ConfirmUser);
                pars[18] = new SqlParameter("@_NotifyType", order.NotifyType);
                pars[19] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_OrderNotify_Insert", pars);
                return Convert.ToInt64(pars[19].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        public short OrderNotify_Update(long orderNotifyID, long orderID, string commandCode, string accountName, string description, short orderStatus, string confirmUser = "")
        {
            try
            {
                var pars = new SqlParameter[8];
                pars[0] = new SqlParameter("@_OrderNotifyID", orderNotifyID);
                pars[1] = new SqlParameter("@_OrderID", orderID);
                pars[2] = new SqlParameter("@_CommandCode", commandCode);
                pars[3] = new SqlParameter("@_AccountName", accountName);
                pars[4] = new SqlParameter("@_ConfirmUser", confirmUser);
                pars[5] = new SqlParameter("@_Description", description);
                pars[6] = new SqlParameter("@_OrderStatus", orderStatus);
                pars[7] = new SqlParameter("@_ResponseStatus", SqlDbType.SmallInt) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_OrderNotify_Update", pars);
                return Convert.ToInt16(pars[7].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        public List<OrderNotify> OrderNotify_GetList(long orderNotifyID, long orderID, string commandCode, int bankID, string accountName, string bankAccount, short status, DateTime fromDate, DateTime toDate)
        {
            try
            {
                var pars = new SqlParameter[9];
                pars[0] = new SqlParameter("@_OrderNotifyID", orderNotifyID <= 0 ? DBNull.Value : (object)orderNotifyID);
                pars[1] = new SqlParameter("@_OrderID", orderID <= 0 ? DBNull.Value : (object)orderID);
                pars[2] = new SqlParameter("@_CommandCode", string.IsNullOrEmpty(commandCode) ? DBNull.Value : (object)commandCode);
                pars[3] = new SqlParameter("@_BankID", bankID <= 0 ? DBNull.Value : (object)bankID);
                pars[4] = new SqlParameter("@_AccountName", string.IsNullOrEmpty(accountName) ? DBNull.Value : (object)accountName);
                pars[5] = new SqlParameter("@_BankAccount", string.IsNullOrEmpty(bankAccount) ? DBNull.Value : (object)bankAccount);
                pars[6] = new SqlParameter("@_OrderNotifyStatus", status < 0 ? -1 : status);   // -1: lấy tất cả;=0 khởi tạo, = 1 thành công , = 2 hủy, = 3 cho duyệt cms
                pars[7] = new SqlParameter("@_FromDate", fromDate);
                pars[8] = new SqlParameter("@_ToDate", toDate);
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetListSP<OrderNotify>("SP_OrderNotify_GetList_byCondition", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new List<OrderNotify>();
            }
        }

        public OrderNotify OrderNotify_GetByID(long orderNotifyID, long orderID)
        {
            try
            {
                var pars = new SqlParameter[2];
                pars[0] = new SqlParameter("@_OrderNotifyID", orderNotifyID > 0 ? (object)orderNotifyID : DBNull.Value);
                pars[1] = new SqlParameter("@_OrderID", orderID > 0 ? (object)orderID : DBNull.Value);
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetInstanceSP<OrderNotify>("SP_OrderNotify_GetbyOrderID", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new OrderNotify();
            }
        }


        #endregion

        public short CheckOrderStatus(string merchantTransId, int websiteId, ref long orderId)
        {
            try
            {
                var pars = new SqlParameter[5];
                pars[0] = new SqlParameter("@_OrderID", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                pars[1] = new SqlParameter("@_MerchantTransID", merchantTransId);
                pars[2] = new SqlParameter("@_WebsiteID", websiteId);
                pars[3] = new SqlParameter("@_OrderStatus", SqlDbType.SmallInt) { Direction = ParameterDirection.Output };
                pars[4] = new SqlParameter("@_RelatedTransactionID", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_OrderBilling_GetOrderStatus", pars);
                orderId = Convert.ToInt64(pars[0].Value);
                return Convert.ToInt16(pars[3].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }


        public List<OrderOnlineBanking> OrderOnlineBankingGetList(int bankID, short orderStatus, string vtcpayAccount, string bankAccount, DateTime fromDate, DateTime toDate, ref int response)
        {
            try
            {
                var pars = new SqlParameter[6];
                pars[0] = new SqlParameter("@_BankID", bankID );
                pars[1] = new SqlParameter("@_OrderStatus", orderStatus );                                   // =0 khởi tạo, = 1 thành công , = 2 hủy, = 3 cho duyệt cms
                pars[2] = new SqlParameter("@_AccountName", vtcpayAccount);//-- tai khoan pay
                pars[3] = new SqlParameter("@_BankAccount", bankAccount); //-- so tai khoan ngan hang
                pars[4] = new SqlParameter("@_FromDate", fromDate);
                pars[5] = new SqlParameter("@_ToDate", toDate);
                var list = new DBHelper(Config.BillingOrdersAPIConnectionString).GetListSP<OrderOnlineBanking>("SP_Order_forTopUpOnline_GetList", pars);

                response = 1;

                if (list == null || list.Count <= 0)
                    return new List<OrderOnlineBanking>();
                return list;
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo("" + ex);

                response = -99;
                return new List<OrderOnlineBanking>();
            }
        }

        #region OrderExchange Nạp tiền qua thẻ cào

        /// Tạo Giao dịch nạp tiền qua thẻ cào (SP_OrdersExchange_Create)
        /// <param name="requestData"></param>
        /// <returns></returns>
        public long OrderExchange_Create(OrderExchange requestData)
        {
            try
            {
                var pars = new SqlParameter[8];
                pars[0] = new SqlParameter("@_OrderCode", requestData.OrderCode);                                               //Order của hệ thống bên ngoài
                pars[1] = new SqlParameter("@_WebsiteID", requestData.WebsiteID);                                               //ID hệ thống bên ngoài
                pars[2] = new SqlParameter("@_CardSerial", requestData.CardSerial);                                             //Serial thẻ
                pars[3] = new SqlParameter("@_CardCode", requestData.CardCode);                                                 //Mã thẻ
                pars[4] = new SqlParameter("@_CardType", requestData.CardType);                                                 //Loại thẻ (1 VMS, 2 GPC, 3 VTEL, 4 VNM, 5 VCOIN,...)
                pars[5] = new SqlParameter("@_FeeRate", requestData.FeeRate);                                                   //Phí nạp vào ví Pay
                pars[6] = new SqlParameter("@_ReceiveAccount", requestData.ReceiveAccount);                                     //Tài khoản Pay nạp
                pars[7] = new SqlParameter("@_OrderExchangeID", SqlDbType.BigInt) { Direction = ParameterDirection.Output };     //@_OrderExchangeID: >0 thành công = @_OrderExchangeID , -99 lỗi
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_OrdersExchange_Create", pars);
                return Convert.ToInt64(pars[7].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        /// Cập nhập trạng thái Order (   )
        /// ">>@_ResponseStatus : >0 thành công , -99: Loi khong xac dinh"
        /// <param name="orderinfo"></param>
        /// <returns></returns>
        public long OrderExchange_Update(OrderExchangeInfo orderinfo)
        {
            try
            {
                var pars = new SqlParameter[9];
                pars[0] = new SqlParameter("@_OrderExchangeID", orderinfo.OrderExchangeID);                                     //OrderExchangeID update
                pars[1] = new SqlParameter("@_CardAmount", orderinfo.CardAmount);                                               //Mệnh giá thẻ
                pars[2] = new SqlParameter("@_FeeAmount", orderinfo.FeeAmount);                                                 //Phí nạp vào Pay
                pars[3] = new SqlParameter("@_VcoinAmount", orderinfo.VcoinAmount);                                             //Số vcoin tương ứng cộng vào tk CHM
                pars[4] = new SqlParameter("@_TelcoTransactionID", orderinfo.TelcoTransactionID);                               //Serial thẻ đã gạch
                pars[5] = new SqlParameter("@_PayTransactionID", orderinfo.PayTransactionID);                                   //TransactionID cộng tiền trên Pay
                pars[6] = new SqlParameter("@_VTCIdTransactionID", orderinfo.VTCIdTransactionID);                               //TransactionID cộng Vcoin vào tk CHM
                pars[7] = new SqlParameter("@_OrderStatus", orderinfo.OrderStatus);                                             //Trạng thái Order update
                pars[8] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_OrderExchange_Update", pars);
                return Convert.ToInt64(pars[8].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        #endregion

        #region Duyệt nạp thanh toán qua cổng 

        //log giao dich nap tien - thanh toan qua cong
        public List<OrderBilling> Order_forTopUpOnline_GetList_CMS(long orderID, string merchantRefTransID, int payType, int bankID, byte orderStatus, string accountName, string bankAccount, DateTime fromDate, DateTime toDate)
        {
            try
            {
                var pars = new SqlParameter[9];
                pars[0] = new SqlParameter("@_OrderID", orderID);
                pars[1] = new SqlParameter("@_MerchantRefTransID", string.IsNullOrEmpty(merchantRefTransID) ? DBNull.Value : (object)merchantRefTransID);
                pars[2] = new SqlParameter("@_PayType", payType <= 0 ? 0 : (object)payType);
                pars[3] = new SqlParameter("@_BankID", bankID <= 0 ? DBNull.Value : (object)bankID);
                pars[4] = new SqlParameter("@_OrderStatus", orderStatus);  // =0 khởi tạo, = 1 thành công , = 2 hủy, = 3 cho duyệt cms
                pars[5] = new SqlParameter("@_AccountName", String.IsNullOrEmpty(accountName) ? DBNull.Value : (object)accountName);//-- tai khoan pay
                pars[6] = new SqlParameter("@_BankAccount", String.IsNullOrEmpty(bankAccount) ? DBNull.Value : (object)bankAccount); //-- so tai khoan ngan hang
                pars[7] = new SqlParameter("@_FromDate", fromDate);
                pars[8] = new SqlParameter("@_ToDate", toDate);
                var list = new DBHelper(Config.BillingOrdersAPIConnectionString)
                    .GetListSP<OrderBilling>("SP_Order_forTopUpOnline_GetList_CMS", pars);
                if (list == null || list.Count <= 0)
                    return new List<OrderBilling>();
                return list;
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new List<OrderBilling>();
            }
        }

        #endregion

    }
}

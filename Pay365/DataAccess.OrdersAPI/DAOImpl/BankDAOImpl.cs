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
    public class BankDAOImpl : IBankDAO
    {
        /// Get BankService By BankId
        /// <param name="bankId"></param>
        /// <returns></returns>   
        public BankService BankService_GetByBankID(int bankId)
        {
            try
            {
                var pars = new SqlParameter[1];
                pars[0] = new SqlParameter("@_BankID", bankId);  //ID ngân hàng
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetInstanceSP<BankService>("SP_BankService_GetbyBankID", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new BankService();
            }
        }

        /// <summary>
        /// Lấy thông tin ngân hàng 
        /// </summary>
        /// <param name="bankId"></param> 0: tất cả;
        /// <param name="bankType"> 1: bank nội địa; 2: thẻ quốc tế </param>
        /// <returns></returns>
        public List<BankInfo> GetBankInfo(int bankId, byte bankType)
        {
            try
            {
                var pars = new SqlParameter[2];
                pars[0] = new SqlParameter("@_BankID", bankId == 0 ? DBNull.Value : (object)bankId);  //ID ngân hàng (bidv, vcb)
                pars[1] = new SqlParameter("@_BankType", bankType == 0 ? DBNull.Value : (object)bankType);  //cổng nội địa hay quốc tế: 1 noi dia , 2 -- quoc te
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetListSP<BankInfo>("SP_BankInfo_GetbyID", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new List<BankInfo>();
            }
        }

        public BankInfo GetBankInfoByBankCode(string bankCode)
        {
            try
            {
                var pars = new SqlParameter[1];
                pars[0] = new SqlParameter("@_BankCode", bankCode);
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetInstanceSP<BankInfo>("SP_BankInfo_GetbyBankCode", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new BankInfo();
            }
        }

        /// <summary>
        /// Get bankconfig by bankcode va paytype
        /// </summary>
        /// <param name="bankCode"></param>
        /// <param name="payType"></param>
        /// <returns></returns>
        public BankConfig GetBankConfigByBankCodeAndPaytype(string bankCode, byte payType)
        {
            try
            {
                var pars = new SqlParameter[2];
                pars[0] = new SqlParameter("@_BankCode", bankCode);
                pars[1] = new SqlParameter("@_PayType", payType);
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetInstanceSP<BankConfig>("SP_BankConfig_GetByBankCodeAndPaytype", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new BankConfig();
            }
        }

        /// Get BankConfig By ID
        /// <param name="bankId"></param>
        /// <param name="parentBankId"></param>
        /// <param name="isAuto"></param>
        /// <param name="verifyOn"></param>
        /// <returns></returns>
        public BankConfig GetBankConfig_CashOut(string bankCode)
        {
            try
            {
                var pars = new SqlParameter[1];
                pars[0] = new SqlParameter("@_BankCode", bankCode);
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetInstanceSP<BankConfig>("SP_BankConfig_ListCashOut_GetbyBankCode", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new BankConfig();
            }
        }

        public BankConfig GetBankConfig_Topup(string bankCode)
        {
            try
            {
                var pars = new SqlParameter[1];
                pars[0] = new SqlParameter("@_BankCode", bankCode);
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetInstanceSP<BankConfig>("SP_BankConfig_ListTopUp_GetbyBankCode", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new BankConfig();
            }
        }

        public BankConfig GetBankConfig_Topup(int bankID)
        {
            try
            {
                var pars = new SqlParameter[1];
                pars[0] = new SqlParameter("@_BankID", bankID);
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetInstanceSP<BankConfig>("SP_BankConfig_ListTopUp_GetbyBankID", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new BankConfig();
            }
        }


        public BankConfig GetBankConfig_Payment(string bankCode)
        {
            try
            {
                var pars = new SqlParameter[1];
                pars[0] = new SqlParameter("@_BankCode", bankCode);
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetInstanceSP<BankConfig>("SP_BankConfig_ListPayment_GetbyBankCode", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new BankConfig();
            }
        }

        /// <summary>
        /// Lấy thông tin ngân hàng nạp tiền
        /// </summary>
        /// <param name="bankId"></param>
        /// <param name="bankType"></param>
        /// <returns></returns>
        public List<BankInfo> GetBankTopupInfo(int bankId, byte bankType)
        {
            try
            {
                var pars = new SqlParameter[2];
                pars[0] = new SqlParameter("@_BankID", bankId == 0 ? DBNull.Value : (object)bankId);  //ID ngân hàng (bidv, vcb)
                pars[1] = new SqlParameter("@_BankType", bankType == 0 ? DBNull.Value : (object)bankType);  //cổng nội địa hay quốc tế: 1 noi dia , 2 -- quoc te
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetListSP<BankInfo>("SP_BankInfo_TopUp_GetList", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new List<BankInfo>();
            }
        }


        public List<BankInfo> GetBankCashOutInfo(int bankId, byte bankType)
        {
            try
            {
                var pars = new SqlParameter[2];
                pars[0] = new SqlParameter("@_BankID", bankId == 0 ? DBNull.Value : (object)bankId);  //ID ngân hàng (bidv, vcb)
                pars[1] = new SqlParameter("@_BankType", bankType == 0 ? DBNull.Value : (object)bankType);  //cổng nội địa hay quốc tế: 1 noi dia , 2 -- quoc te
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetListSP<BankInfo>("SP_BankInfo_CashOut_GetList", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new List<BankInfo>();
            }
        }

        public List<BankInfo> GetBankPaymentInfo(int bankId, int websiteId, byte bankType)
        {
            try
            {
                var pars = new SqlParameter[3];
                pars[0] = new SqlParameter("@_BankID", bankId == 0 ? DBNull.Value : (object)bankId);  //ID ngân hàng (bidv, vcb)
                pars[1] = new SqlParameter("@_WebsiteID", websiteId == 0 ? DBNull.Value : (object)websiteId);  //ID ngân hàng (bidv, vcb)
                pars[2] = new SqlParameter("@_BankType", bankType == 0 ? DBNull.Value : (object)bankType);  //cổng nội địa hay quốc tế: 1 noi dia , 2 -- quoc te
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetListSP<BankInfo>("SP_BankInfo_Payment_GetList", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new List<BankInfo>();
            }
        }


        #region Quản trị Bank CMS (Quản trị Ngân Hàng)

        /// Insert Bank
        /// <param name="bankCode"></param>
        /// <param name="bankName"></param>
        /// <param name="banktype"></param>
        /// <param name="webSite"></param>
        /// <param name="logo"></param>
        /// <param name="address"></param>
        /// <param name="description"></param>
        /// <param name="status"></param>
        /// <param name="logoMobileGrid"></param>
        /// <param name="logoMobileIcon"></param>
        /// <param name="cardColor"></param>
        /// <returns></returns>
        public int BankInfo_Insert(string bankCode, string bankName, byte banktype, string webSite,
            string logo, string address, string description, byte status, string logoMobileGrid, string logoMobileIcon, string cardColor)
        {
            try
            {
                var pars = new SqlParameter[12];
                pars[0] = new SqlParameter("@_BankCode", bankCode);   //HDBank,Vietcombank
                pars[1] = new SqlParameter("@_BankName", bankName);
                pars[2] = new SqlParameter("@_BankType", banktype);  //1: bank nội địa; 2: thẻ quốc tế
                pars[3] = new SqlParameter("@_WebSite", webSite);       // website
                pars[4] = new SqlParameter("@_Logo", logo);             // ảnh logo
                pars[5] = new SqlParameter("@_Address", address);
                pars[6] = new SqlParameter("@_Description", description);
                pars[7] = new SqlParameter("@_Status", status);         // 0 unactive , 1 active
                pars[8] = new SqlParameter("@_LogoMobileGrid", logoMobileGrid); // 
                pars[9] = new SqlParameter("@_LogoMobileIcon", logoMobileIcon);
                pars[10] = new SqlParameter("@_CardColor", cardColor); // Màu thẻ
                pars[11] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_BankInfo_Insert", pars);
                return Convert.ToInt32(pars[11].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        /// Update Bank
        /// <param name="bankId"></param>
        /// <param name="bankName"></param>
        /// <param name="banktype"></param>
        /// <param name="webSite"></param>
        /// <param name="logo"></param>
        /// <param name="address"></param>
        /// <param name="description"></param>
        /// <param name="logoMobileGrid"></param>
        /// <param name="logoMobileIcon"></param>
        /// <param name="cardColor"></param>
        /// <returns></returns>
        public int BankInfo_Update(int bankId, string bankName, byte banktype, string webSite, string logo,
            string address, string description, string logoMobileGrid, string logoMobileIcon, string cardColor)
        {
            try
            {
                var pars = new SqlParameter[11];
                pars[0] = new SqlParameter("@_BankID", bankId);
                pars[1] = new SqlParameter("@_BankName", bankName);
                pars[2] = new SqlParameter("@_BankType", banktype);      //1: bank nội địa; 2: thẻ quốc tế
                pars[3] = new SqlParameter("@_WebSite", webSite);       // website
                pars[4] = new SqlParameter("@_Logo", logo);            // ảnh logo
                pars[5] = new SqlParameter("@_Address", address);
                pars[6] = new SqlParameter("@_Description", description);
                pars[7] = new SqlParameter("@_LogoMobileGrid", logoMobileGrid); // 
                pars[8] = new SqlParameter("@_LogoMobileIcon", logoMobileIcon);
                pars[9] = new SqlParameter("@_CardColor", cardColor); // Màu thẻ #f00000
                pars[10] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_BankInfo_Update", pars);
                return Convert.ToInt16(pars[10].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        /// Delete Bank
        /// <param name="bankId"></param>
        /// <returns></returns>
        public int BankInfo_Delete(int bankId)
        {
            try
            {
                var pars = new SqlParameter[2];
                pars[0] = new SqlParameter("@_BankID", bankId);
                pars[1] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_BankInfo_Delete", pars);
                return Convert.ToInt32(pars[1].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        /// Update Status Bank
        /// <param name="bankId"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public int BankInfo_UpdateStatus(int bankId, byte status)
        {
            try
            {
                var pars = new SqlParameter[3];
                pars[0] = new SqlParameter("@_BankID", bankId);
                pars[1] = new SqlParameter("@_Status", status);
                pars[2] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_BankInfo_UpdateStatus", pars);
                return Convert.ToInt32(pars[2].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        /// GetBank By condition
        /// <param name="bankId"></param>
        /// <param name="bankCode"></param>
        /// <param name="bankName"></param>
        /// <param name="bankType"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public List<BankInfo> BankInfo_GetByCondition(int bankId, string bankCode, string bankName, byte bankType, byte status)
        {
            try
            {
                var pars = new SqlParameter[5];
                pars[0] = new SqlParameter("@_BankID", bankId == 0 ? DBNull.Value : (object)bankId);  //ID ngân hàng (bidv, vcb)
                pars[1] = new SqlParameter("@_BankCode", String.IsNullOrEmpty(bankCode) ? DBNull.Value : (object)bankCode);
                pars[2] = new SqlParameter("@_BankName", String.IsNullOrEmpty(bankName) ? DBNull.Value : (object)bankName);
                pars[3] = new SqlParameter("@_BankType", bankType == 99 ? DBNull.Value : (object)bankType);  //cổng nội địa hay quốc tế: 1 noi dia , 2 -- quoc te, 99 -- all
                pars[4] = new SqlParameter("@_Status", status == 99 ? DBNull.Value : (object)status); // 99 all
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetListSP<BankInfo>("SP_BankInfo_GetByCondition", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new List<BankInfo>();
            }
        }
        #endregion


        #region Quản Trị Tài khoản ngân hàng

        //Insert 
        /// <summary>
        /// DECLARE @_ERR_BANKACCOUNT_EXISTED int = -146 --Tài khoản ngân hàng đã tồn tại
        /// </summary>
        /// <param name="bankAccount"></param>
        /// <returns></returns>
        public int InsertBankAccounts(BankAccounts bankAccount)
        {
            try
            {
                var pars = new SqlParameter[14];
                pars[0] = new SqlParameter("@_BankID", bankAccount.BankID);                     // ID ngân hàng
                pars[1] = new SqlParameter("@_AccountName", bankAccount.AccountName);           // Tên TK 
                pars[2] = new SqlParameter("@_BankCode", bankAccount.BankCode);                 // Bank Code 
                pars[3] = new SqlParameter("@_BankName", bankAccount.BankName);                 // Tên Bank
                pars[4] = new SqlParameter("@_BankBranch", string.IsNullOrEmpty(bankAccount.BankBranch) ? DBNull.Value : (object)bankAccount.BankBranch);              // Chi nhánh ngân hàng
                pars[5] = new SqlParameter("@_BankAccount", bankAccount.BankAccount);           // TK Ngân Hàng
                pars[6] = new SqlParameter("@_BankAccountName", string.IsNullOrEmpty(bankAccount.BankAccountName) ? DBNull.Value : (object)bankAccount.BankAccountName);       // Tên TK Ngân Hàng
                pars[7] = new SqlParameter("@_BankAccountAddress", string.IsNullOrEmpty(bankAccount.BankAccountAddress) ? DBNull.Value : (object)bankAccount.BankAccountAddress);     // Địa chỉ TK Ngân Hàng
                pars[8] = new SqlParameter("@_BankAccountType", bankAccount.BankAccountType);           // Loại TK Ngân Hàng (1 TK ngân hàng của khách hàng, 0 của Công ty)
                pars[9] = new SqlParameter("@_Description", string.IsNullOrEmpty(bankAccount.Description) ? DBNull.Value : (object)bankAccount.Description);   // Mô tả
                pars[10] = new SqlParameter("@_IsDefault", bankAccount.IsDefault);      // Set TK Mặc định 
                pars[11] = new SqlParameter("@_OpenDate", bankAccount.OpenDate);        // Ngày Mở TK
                pars[12] = new SqlParameter("@_Type", bankAccount.Type);
                pars[13] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_BankAccounts_Insert", pars);
                return Convert.ToInt32(pars[13].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        /// Update
        /// <param name="bankAccount"></param>
        /// <returns></returns>
        public int UpdateBankAccounts(BankAccounts bankAccount)
        {
            try
            {
                var pars = new SqlParameter[8];
                pars[0] = new SqlParameter("@_BankAccountsID", bankAccount.ID);   //ID bảng BankAccount
                pars[1] = new SqlParameter("@_BankBranch", string.IsNullOrEmpty(bankAccount.BankBranch) ? DBNull.Value : (object)bankAccount.BankBranch);     // Chi nhánh ngân hàng
                pars[2] = new SqlParameter("@_BankAccount", bankAccount.BankAccount);     //  TK Ngân Hàng
                pars[3] = new SqlParameter("@_BankAccountName", bankAccount.BankAccountName);   // Tên TK Ngân Hàng
                pars[4] = new SqlParameter("@_BankAccountAddress", string.IsNullOrEmpty(bankAccount.BankAccountAddress) ? DBNull.Value : (object)bankAccount.BankAccountAddress);      // Địa chỉ TK Ngân Hàng
                pars[5] = new SqlParameter("@_IsDefault", bankAccount.IsDefault);   // Set TK Mặc định
                pars[6] = new SqlParameter("@_OpenDate", bankAccount.OpenDate);      // Ngày Mở TK
                pars[7] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_BankAccounts_Update", pars);
                return Convert.ToInt32(pars[7].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        // Xóa TK ngân hàng
        public int DeleteBankAccounts(int bankAccountsID)
        {
            try
            {
                var pars = new SqlParameter[2];
                pars[0] = new SqlParameter("@_BankAccountsID", bankAccountsID);
                pars[1] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_BankAccounts_Delete", pars);
                return Convert.ToInt32(pars[1].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }
        #endregion


        public BankAccounts GetVTCIntecom_BankAccounts(int bankId)
        {
            try
            {
                var pars = new SqlParameter[1];
                pars[0] = new SqlParameter("@_BankID", bankId);
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetInstanceSP<BankAccounts>("SP_BankAccount_GetAccIntecom_byBankID", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new BankAccounts();
            }
        }

        public BankAccounts GetVTCIntecom_BankAccounts(string bankCode)
        {
            try
            {
                var pars = new SqlParameter[1];
                pars[0] = new SqlParameter("@_BankCode", bankCode);
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetInstanceSP<BankAccounts>("SP_BankAccount_GetAccIntecom_byBankCode", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new BankAccounts();
            }
        }

        /// <summary>
        /// Lấy danh sách tài khoản ngân hàng của ví vtcpay
        /// </summary>
        /// <param name="accountName"></param>
        /// <returns></returns>
        public List<BankAccounts> GetBankAccounts(string accountName, byte type, int bankAccountType)
        {
            try
            {
                var pars = new SqlParameter[3];
                pars[0] = new SqlParameter("@_AccountName", accountName);
                pars[1] = new SqlParameter("@_BankAccountType", bankAccountType == -99 ? DBNull.Value : (object)bankAccountType);
                pars[2] = new SqlParameter("@_Type", type);
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetListSP<BankAccounts>("SP_BankAccount_GetbyAccountName", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new List<BankAccounts>();
            }
        }

        public BankAccounts GetBankAccountByID(int id)
        {
            try
            {
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetInstanceSP<BankAccounts>("SP_BankAccount_GetbyID", new SqlParameter("@_ID", id));
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new BankAccounts();
            }
        }

        public List<PostOffice> PostOfficeGetPage(int LocationID, int DistrictID, int CurrPage, int PageSize, ref int TotalRecord)
        {
            TotalRecord = 0;
            try
            {
                var par = new SqlParameter[5];
                par[0] = new SqlParameter("@_LocationID", LocationID);
                par[1] = new SqlParameter("@_DistrictID", DistrictID);
                par[2] = new SqlParameter("@_CurrPage", CurrPage);
                par[3] = new SqlParameter("@_RecordPerPage", PageSize);
                par[4] = new SqlParameter("@_TotalRecord", SqlDbType.Int) { Direction = ParameterDirection.Output };
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetListSP<PostOffice>("SP_VNPostOffice_GetPage", par);
            }
            catch (Exception ex)
            {

                NLogLogger.PublishException(ex);
                return new List<PostOffice>();
            }
        }

        #region  Quản trị thông tin kết nối ngân hàng

        /// Thêm thông tin config kết nối Bank 
        /// <param name="bankconfig"></param>
        /// <returns></returns>
        public int BankConfig_Insert(BankConfig bankconfig)
        {
            try
            {
                var pars = new SqlParameter[24];
                pars[0] = new SqlParameter("@_GatePaymentID", bankconfig.GatePaymentID);  // Cổng thanh toán (1	NAPAS ,2 BANKNET, 3 PAYPAL, 4 THEQUOCTE)
                pars[1] = new SqlParameter("@_BankID", bankconfig.BankID);                  // List Bank
                pars[2] = new SqlParameter("@_BankCode", bankconfig.BankCode);
                pars[3] = new SqlParameter("@_PayType", bankconfig.PayType);               //
                pars[4] = new SqlParameter("@_PayServiceID", bankconfig.PayServiceID);
                pars[5] = new SqlParameter("@_VcoinServiceID", bankconfig.VcoinServiceID);
                pars[6] = new SqlParameter("@_VcoinServiceKey", bankconfig.VcoinServiceKey);
                pars[7] = new SqlParameter("@_VerifyOn", bankconfig.VerifyOn);
                pars[8] = new SqlParameter("@_IsOnline", bankconfig.IsOnline);  // có kết nối trực tiếp với bank
                pars[9] = new SqlParameter("@_IsOffline", bankconfig.IsOffline);  // có kết nối giao dịch với bank
                pars[10] = new SqlParameter("@_WaitingTime", bankconfig.WaitingTime);
                pars[11] = new SqlParameter("@_MaxAmountWaiting", bankconfig.MaxAmountWaiting);
                pars[12] = new SqlParameter("@_CurrencyType", bankconfig.CurrencyType);
                pars[13] = new SqlParameter("@_Currency", bankconfig.Currency);
                pars[14] = new SqlParameter("@_VerifyCard", bankconfig.VerifyCard);   // chuỗi 6 số đầu tiên trong thẻ của bank
                pars[15] = new SqlParameter("@_PublicKey", bankconfig.PublicKey);
                pars[16] = new SqlParameter("@_PrivateKey", bankconfig.PrivateKey);
                pars[17] = new SqlParameter("@_URLRoot", bankconfig.URLRoot);
                pars[18] = new SqlParameter("@_URLRedirect", bankconfig.URLRedirect);
                pars[19] = new SqlParameter("@_URLCancel", bankconfig.URLCancel);
                pars[20] = new SqlParameter("@_URLNotify", bankconfig.URLNotify);
                pars[21] = new SqlParameter("@_URLDone", bankconfig.URLDone);
                pars[22] = new SqlParameter("@_Status", bankconfig.Status);   //  =1 enable hoat dong cua 1 ngan hang, =0 disible hoat dong cua 1 ngan hang
                pars[23] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_BankConfig_Insert", pars);
                return Convert.ToInt32(pars[23].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        /// turn on / off trang thai ket noi ngan hang, cap nhat thong tin ket noi
        /// <param name="bankconfig"></param>
        /// <returns></returns>
        public int BankConfig_Update(BankConfig bankconfig)
        {
            try
            {
                var pars = new SqlParameter[24];
                pars[0] = new SqlParameter("@_BankConfigID", bankconfig.BankConfigID);
                pars[1] = new SqlParameter("@_GatePaymentID", bankconfig.GatePaymentID);  // Cổng thanh toán (1	NAPAS ,2 BANKNET, 3 PAYPAL, 4 THEQUOCTE)
                pars[2] = new SqlParameter("@_BankID", bankconfig.BankID);
                pars[3] = new SqlParameter("@_PayType", bankconfig.PayType);                //
                pars[4] = new SqlParameter("@_PayServiceID", bankconfig.PayServiceID);
                pars[5] = new SqlParameter("@_VcoinServiceID", bankconfig.VcoinServiceID);
                pars[6] = new SqlParameter("@_VcoinServiceKey", bankconfig.VcoinServiceKey);
                pars[7] = new SqlParameter("@_VerifyOn", bankconfig.VerifyOn);
                pars[8] = new SqlParameter("@_IsOnline", bankconfig.IsOnline);  // có kết nối trực tiếp với bank
                pars[9] = new SqlParameter("@_IsOffline", bankconfig.IsOffline);  // có kết nối giao dịch với bank
                pars[10] = new SqlParameter("@_WaitingTime", bankconfig.WaitingTime);
                pars[11] = new SqlParameter("@_MaxAmountWaiting", bankconfig.MaxAmountWaiting);
                pars[12] = new SqlParameter("@_CurrencyType", bankconfig.CurrencyType);         // 
                pars[13] = new SqlParameter("@_Currency", bankconfig.Currency);             // Current : VND, USD
                pars[14] = new SqlParameter("@_VerifyCard", bankconfig.VerifyCard);   // chuỗi 6 số đầu tiên trong thẻ của bank
                pars[15] = new SqlParameter("@_PublicKey", bankconfig.PublicKey);
                pars[16] = new SqlParameter("@_PrivateKey", bankconfig.PrivateKey);
                pars[17] = new SqlParameter("@_URLRoot", bankconfig.URLRoot);
                pars[18] = new SqlParameter("@_URLRedirect", bankconfig.URLRedirect);
                pars[19] = new SqlParameter("@_URLCancel", bankconfig.URLCancel);
                pars[20] = new SqlParameter("@_URLNotify", bankconfig.URLNotify);
                pars[21] = new SqlParameter("@_URLDone", bankconfig.URLDone);
                pars[22] = new SqlParameter("@_Status", bankconfig.Status);   //  =1 enable hoat dong cua 1 ngan hang, =0 disible hoat dong cua 1 ngan hang
                pars[23] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_BankConfig_Update", pars);
                return Convert.ToInt32(pars[23].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        /// Xóa thông tin kết nối Bank
        /// <param name="bankConfigID"></param>
        /// <returns></returns>
        public int BankConfig_Delete(int bankConfigID)
        {
            try
            {
                var pars = new SqlParameter[2];
                pars[0] = new SqlParameter("@_BankConfigID", bankConfigID);
                pars[1] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_BankConfig_Delete", pars);
                return Convert.ToInt32(pars[1].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        /// turn on / off cong ket noi   SP_BankConfig_UpdateStatus_byGateWay
        /// > 0 Thành công
        /// <param name="gatePaymentID"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public int BankConfig_UpdateStatus_byGateWay(int gatePaymentID, byte status)
        {
            try
            {
                var pars = new SqlParameter[3];
                pars[0] = new SqlParameter("@_GatePaymentID", gatePaymentID);
                pars[1] = new SqlParameter("@_Status", status);             // o disable, 1 enable
                pars[2] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_BankConfig_UpdateStatus_byGateWay", pars);
                return Convert.ToInt32(pars[2].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        // List Bank Nạp
        public List<BankConfig> BankConfig_GetList_Topup()
        {
            try
            {
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetListSP<BankConfig>("SP_CMS_BankConfig_GetList_TopUp");
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new List<BankConfig>();
            }
        }

        // Get Bank Nạp by BankCode
        public BankConfig BankConfig_GetbyID_Topup(int id)
        {
            try
            {
                var pars = new SqlParameter[1];
                pars[0] = new SqlParameter("@_BankConfigID", id);
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetInstanceSP<BankConfig>("SP_CMS_BankConfig_GetbyID_TopUp", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new BankConfig();
            }
        }

        // List Bank Rút
        public List<BankConfig> BankConfig_GetList_CashOut()
        {
            try
            {
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetListSP<BankConfig>("SP_CMS_BankConfig_GetList_CashOut");
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new List<BankConfig>();
            }
        }

        // Get Bank Config Rút By BankCode
        public BankConfig BankConfig_GetbyID_CashOut(int id)
        {
            try
            {
                var pars = new SqlParameter[1];
                pars[0] = new SqlParameter("@_BankConfigID", id);
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetInstanceSP<BankConfig>("SP_CMS_BankConfig_GetbyID_CashOut", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new BankConfig();
            }
        }

        #endregion


        #region Gắn kết ngân hàng
        //Lấy sách sách gắn kết ngân hàng trực tiếp (Type = 3)
        public List<BankAccounts> GetBankAccountLinks(string accountName)
        {
            try
            {
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetListSP<BankAccounts>("SP_BankAccount_Link_GetbyAccountName", new SqlParameter("@_AccountName", accountName));
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new List<BankAccounts>();
            }
        }

        //Gắn kết
        public int BankAccountLinks_Insert(string accountName, string bankAccount, string bankCode)
        {
            try
            {
                var pars = new SqlParameter[4];
                pars[0] = new SqlParameter("@_AccountName", accountName);
                pars[1] = new SqlParameter("@_BankAccount", bankAccount);
                pars[2] = new SqlParameter("@_BankCode", bankCode);
                pars[3] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_BankAccounts_Link_Insert", pars);
                return Convert.ToInt32(pars[3].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }
        #endregion


        public PayPalBilling GetPayPalBillingInfo(string paypalEmail, string payerID)
        {
            try
            {
                SqlParameter[] parameters = new SqlParameter[2];
                parameters[0] = new SqlParameter("@_EMAIL", paypalEmail);
                parameters[1] = new SqlParameter("@_PAYERID", payerID);

                var list = new DBHelper(Config.BillingOrdersAPIConnectionString).GetList<PayPalBilling>("SP_GET_PayPal_Billing", parameters);
                if (list != null && list.Count > 0)
                    return list[0];
            }
            catch (Exception ex)
            {
                NLogLogger.Info("Loi goi sp lay thong tin thanh toan PayPal. PayPalEmail: " + paypalEmail + "|payerID: " + payerID
                    + Environment.NewLine + "ex: " + ex);
            }

            return null;
        }


        public bool UpdatePayPalBilling(PayPalBilling paypalBillingInfo)
        {
            try
            {
                SqlParameter[] parameters = new SqlParameter[10];
                parameters[0] = new SqlParameter("@_EMAIL", paypalBillingInfo.EMAIL);
                parameters[1] = new SqlParameter("@_PAYERID", paypalBillingInfo.PAYERID);
                parameters[2] = new SqlParameter("@_BILLING_FIRST_NAME", paypalBillingInfo.BILLING_FIRST_NAME);
                parameters[3] = new SqlParameter("@_BILLING_LAST_NAME", paypalBillingInfo.BILLING_LAST_NAME);
                parameters[4] = new SqlParameter("@_BILLING_STREET", paypalBillingInfo.BILLING_STREET);
                parameters[5] = new SqlParameter("@_BILLING_CITY", paypalBillingInfo.BILLING_CITY);
                parameters[6] = new SqlParameter("@_BILLING_ZIP", paypalBillingInfo.BILLING_ZIP);
                parameters[7] = new SqlParameter("@_BILLING_EMAIL", paypalBillingInfo.BILLING_EMAIL);
                parameters[8] = new SqlParameter("@_BILLING_PHONE", paypalBillingInfo.BILLING_PHONE);
                parameters[9] = new SqlParameter("@_BILLING_COUNTRY", paypalBillingInfo.BILLING_COUNTRY);

                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteScalarSP("[SP_Update_PayPal_Billing]", parameters);
                return true;
            }
            catch (Exception ex)
            {
                NLogLogger.LogDebug("Loi update thong tin tk paypal. Object detail: " + NLogLogger.GetValueOfObject(paypalBillingInfo)
                 + Environment.NewLine + "Exception: " + ex);

                return false;
            }
        }



    }
}

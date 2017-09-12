/*
 * tuanhd
 * 29-09-2016
 */

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using DBHelpers;
using DataAccess.ReportAPI.DAO;
using DataAccess.ReportAPI.DTO;
using Pay365.Utils;
using Pay365.Utils.Security;
using Config = Pay365.Utils.Config;
using Security = Pay365.Utils.Security.Security;


namespace DataAccess.ReportAPI.DAOImpl
{
    public class ReportDBDAOImpl : IReportDBDAO
    {

        #region Báo cáo Tài khoản
        public List<AccountReport> GeneralAccountReport(DateTime fromDate, DateTime toDate)
        {
            try
            {
                var pars = new SqlParameter[2];
                pars[0] = new SqlParameter("@_BeginDate", fromDate);
                pars[1] = new SqlParameter("@_EndDate", toDate);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<AccountReport>("SP_Account_Report", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<AccountReport>();
            }
        }
        #endregion

        #region Báo cáo Tổng hợp hệ thống
        public GeneralReportSystem AccountGeneralSystemReport()
        {
            var result = new GeneralReportSystem();
            try
            {
                SqlParameter[] pars = new SqlParameter[22];
                pars[0] = new SqlParameter("@_RegisterNumber", SqlDbType.Int) { Direction = ParameterDirection.Output };
                pars[1] = new SqlParameter("@_ActiveNumber", SqlDbType.Int) { Direction = ParameterDirection.Output };
                pars[2] = new SqlParameter("@_AccountHasBalance", SqlDbType.Int) { Direction = ParameterDirection.Output };
                pars[3] = new SqlParameter("@_BalancePerson", SqlDbType.Money) { Direction = ParameterDirection.Output };
                pars[4] = new SqlParameter("@_BalanceBussiness", SqlDbType.Money) { Direction = ParameterDirection.Output };
                pars[5] = new SqlParameter("@_BalanceTransaction", SqlDbType.Money) { Direction = ParameterDirection.Output };
                pars[6] = new SqlParameter("@_TotalBalance", SqlDbType.Money) { Direction = ParameterDirection.Output };
                pars[7] = new SqlParameter("@_MerchantAccount", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                pars[8] = new SqlParameter("@_MerchantTransation", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                pars[9] = new SqlParameter("@_MerchantValueAverage", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                pars[10] = new SqlParameter("@_OutputAccount", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                pars[11] = new SqlParameter("@_OutputTransaction", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                pars[12] = new SqlParameter("@_OutputMoney", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                pars[13] = new SqlParameter("@_ArrearsAccount", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                pars[14] = new SqlParameter("@_ArrearsTransaction", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                pars[15] = new SqlParameter("@_ArrearsMoney", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                pars[16] = new SqlParameter("@_InputAccount", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                pars[17] = new SqlParameter("@_InputTransaction", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                pars[18] = new SqlParameter("@_InputMoney", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                pars[19] = new SqlParameter("@_RefundAccount", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                pars[20] = new SqlParameter("@_RefundTransaction", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                pars[21] = new SqlParameter("@_RefundMoney", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                new DBHelper(Config.ReportDBConnectionString).ExecuteNonQuerySP("SP_Account_General_Report", pars);
                result.RegisterNumber = pars[0].Value != DBNull.Value ? Convert.ToInt32(pars[0].Value) : 0;
                result.ActiveNumber = pars[1].Value != DBNull.Value ? Convert.ToInt32(pars[1].Value) : 0;
                result.AccountHasBalance = pars[2].Value != DBNull.Value ? Convert.ToInt32(pars[2].Value) : 0;
                result.BalancePerson = pars[3].Value != DBNull.Value ? Convert.ToInt64(pars[3].Value) : 0;
                result.BalanceBussiness = pars[4].Value != DBNull.Value ? Convert.ToInt64(pars[4].Value) : 0;
                result.BalanceTransaction = pars[5].Value != DBNull.Value ? Convert.ToInt64(pars[5].Value) : 0;
                result.TotalBalance = pars[6].Value != DBNull.Value ? Convert.ToInt64(pars[6].Value) : 0;
                result.MerchantAccount = pars[7].Value != DBNull.Value ? Convert.ToInt32(pars[7].Value) : 0;
                result.MerchantTransation = pars[8].Value != DBNull.Value ? Convert.ToInt32(pars[8].Value) : 0;
                result.MerchantValueAverage = pars[9].Value != DBNull.Value ? Convert.ToInt32(pars[9].Value) : 0;
                result.OutputAccount = pars[10].Value != DBNull.Value ? Convert.ToInt64(pars[10].Value) : 0;
                result.OutputTransaction = pars[11].Value != DBNull.Value ? Convert.ToInt64(pars[11].Value) : 0;
                result.OutputMoney = pars[12].Value != DBNull.Value ? Convert.ToInt64(pars[12].Value) : 0;
                result.ArrearsAccount = pars[13].Value != DBNull.Value ? Convert.ToInt64(pars[13].Value) : 0;
                result.ArrearsTransaction = pars[14].Value != DBNull.Value ? Convert.ToInt64(pars[14].Value) : 0;
                result.ArrearsMoney = pars[15].Value != DBNull.Value ? Convert.ToInt64(pars[15].Value) : 0;
                result.InputAccount = pars[16].Value != DBNull.Value ? Convert.ToInt64(pars[16].Value) : 0;
                result.InputTransaction = pars[17].Value != DBNull.Value ? Convert.ToInt64(pars[17].Value) : 0;
                result.InputMoney = pars[18].Value != DBNull.Value ? Convert.ToInt64(pars[18].Value) : 0;
                result.RefundAccount = pars[19].Value != DBNull.Value ? Convert.ToInt64(pars[19].Value) : 0;
                result.RefundTransaction = pars[20].Value != DBNull.Value ? Convert.ToInt64(pars[20].Value) : 0;
                result.RefundMoney = pars[21].Value != DBNull.Value ? Convert.ToInt64(pars[21].Value) : 0;
                return result;
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new GeneralReportSystem();
            }
        }
        public List<GeneralBalanceSystem> AccountBalanceSystemReport(int accountTypeID, string fromDate, string toDate)
        {
            try
            {
                var pars = new SqlParameter[3];
                pars[0] = new SqlParameter("@_AccountTypeID", accountTypeID <= 0 ? DBNull.Value : (object)accountTypeID);
                pars[1] = new SqlParameter("@_FromDate", string.IsNullOrEmpty(fromDate) ? DBNull.Value : (object)fromDate);
                pars[2] = new SqlParameter("@_Todate", string.IsNullOrEmpty(toDate) ? DBNull.Value : (object)toDate);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<GeneralBalanceSystem>("SP_Account_Balance_Report", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<GeneralBalanceSystem>();
            }
        }

        #endregion

        #region Báo cáo giao dich
        /// <summary>
        /// Bao cáo rút tiền
        /// </summary>
        /// <param name="fromDate"> từ ngày</param>
        /// <param name="toDate">đến ngày</param>
        /// <param name="bankId">mã ngân hàng -> = 0:all</param>
        /// <param name="accountName">tên TK</param>
        /// <param name="bankAccount">TK Ngân Hàng</param>
        /// <param name="payType">loại thanh toán -> =0 :tất cả, =4:trực tiếp, =5:gián tiếp</param>
        /// <returns>bảng báo cáo rút tiền</returns>
        public List<CashoutReport> CashoutReportGetList(DateTime fromDate, DateTime toDate, int bankId, string bankRefTransID, string accountName, string bankAccount, int payType)
        {
            try
            {
                var pars = new SqlParameter[7];
                pars[0] = new SqlParameter("@_BeginDate", fromDate);
                pars[1] = new SqlParameter("@_EndDate", toDate);
                pars[2] = new SqlParameter("@_BankID", bankId < 0 ? 0 : (object)bankId);
                pars[3] = new SqlParameter("@_BankRefTransID", string.IsNullOrEmpty(bankRefTransID) ? DBNull.Value : (object)bankRefTransID);
                pars[4] = new SqlParameter("@_AccountName", string.IsNullOrEmpty(accountName) ? DBNull.Value : (object)accountName);
                pars[5] = new SqlParameter("@_BankAccount", string.IsNullOrEmpty(bankAccount) ? DBNull.Value : (object)bankAccount);
                pars[6] = new SqlParameter("@_PayType", payType < 0 ? 0 : (object)payType);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<CashoutReport>("SP_CashOut_Report", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<CashoutReport>();
            }
        }

        /// <summary>
        /// Báo cáo chuyển tiền
        /// </summary>
        /// <param name="fromDate">từ ngày</param>
        /// <param name="toDate">đến ngày</param>
        /// <param name="accountName">Tra theo tên TK chuyển</param>
        /// <param name="relatedAccount">Tra theo tên TK nhận</param>
        /// <returns></returns>
        public List<TransferReport> TransferReportGetList(DateTime fromDate, DateTime toDate, string accountName, string relatedAccount)
        {
            try
            {
                var pars = new SqlParameter[4];
                pars[0] = new SqlParameter("@_BeginDate", fromDate);
                pars[1] = new SqlParameter("@_EndDate", toDate);
                pars[2] = new SqlParameter("@_AccountName", string.IsNullOrEmpty(accountName) ? DBNull.Value : (object)accountName);
                pars[3] = new SqlParameter("@_RelatedAccount", string.IsNullOrEmpty(relatedAccount) ? DBNull.Value : (object)relatedAccount);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<TransferReport>("SP_TransferMoney_Report", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<TransferReport>();
            }
        }

        /// <summary>
        /// Báo cáo hoàn tiền
        /// </summary>
        /// <param name="listWebsiteID">DS websiteID(phân cách bằng dấu phẩy ',') -> = "": tất cả</param>
        /// <param name="createdAccount">người tạo</param>
        /// <param name="bankId">DS mã ngân hàng(phân cách bằng dấu phẩy ',') -> = "": tất cả đối tác, 0: thanh toán ví pay</param>
        /// <param name="transType">Loại giao dịch -> =0: tất cả(thanh toán + rút), 1:thanh toán, 2:rút tiền</param>
        /// <param name="fromDate"></param>
        /// <param name="toDate"></param>
        /// <returns></returns>
        public List<RefundReport> RefundReportGetList(string listWebsiteID, string createdAccount, string bankId, byte transType, DateTime fromDate, DateTime toDate)
        {
            try
            {
                var pars = new SqlParameter[6];
                pars[0] = new SqlParameter("@_WebsiteID", string.IsNullOrEmpty(listWebsiteID) ? DBNull.Value : (object)listWebsiteID);
                pars[1] = new SqlParameter("@_CreatedAccount", string.IsNullOrEmpty(createdAccount) ? DBNull.Value : (object)createdAccount);
                pars[2] = new SqlParameter("@_BankID", string.IsNullOrEmpty(bankId) ? DBNull.Value : (object)bankId);
                pars[3] = new SqlParameter("@_TransType", transType < 0 ? 0 : (object)transType);
                pars[4] = new SqlParameter("@_BeginDate", fromDate);
                pars[5] = new SqlParameter("@_EndDate", toDate);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<RefundReport>("SP_RefundMoney_Report", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<RefundReport>();
            }
        }

        /// <summary>
        /// Báo cáo tổng hợp giao dịch nạp
        /// </summary>
        /// <param name="fromDate">từ ngày</param>
        /// <param name="toDate">đến ngày</param>
        /// <param name="payType">loại thanh toán -> 0:tất cả phương thức nạp</param>
        /// <param name="bankId">mã NH -> Null || empty : tất cả đối tác</param>
        /// <returns></returns>
        public List<TransactionInputGeneralReport> GeneralReportTransactionInput(DateTime fromDate, DateTime toDate, byte payType, string bankId)
        {
            try
            {
                var pars = new SqlParameter[4];
                pars[0] = new SqlParameter("@_BankID", string.IsNullOrEmpty(bankId) ? DBNull.Value : (object)bankId);
                pars[1] = new SqlParameter("@_PayType", payType < 0 ? 0 : (object)payType);
                pars[2] = new SqlParameter("@_BeginDate", fromDate);
                pars[3] = new SqlParameter("@_EndDate", toDate);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<TransactionInputGeneralReport>("SP_TransactionInput_GeneralReport", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<TransactionInputGeneralReport>();
            }
        }

        /// <summary>
        /// Báo cáo chi tiết giao dịch nạp
        /// </summary>
        /// <param name="fromDate">Tra từ ngày</param>
        /// <param name="toDate">Tra đến ngày</param>
        /// <param name="accountName">tên TK</param>
        /// <param name="accountType">loại TK</param>
        /// <param name="payType">loại thanh toán -> 0: tất cả phương thức nạp</param>
        /// <param name="bankId">mã ngân hàng -> Null || empty : tất cả</param>
        /// <returns></returns>
        public List<TransactionInputReportDetail> TransactionInputReportDetail(DateTime fromDate, DateTime toDate, string accountName, string createdUser ,byte accountType, byte payType, string bankId)
        {
            try
            {
                var pars = new SqlParameter[7];
                pars[0] = new SqlParameter("@_BankID", string.IsNullOrEmpty(bankId) ? DBNull.Value : (object)bankId);
                pars[1] = new SqlParameter("@_PayType", payType < 0 ? 0 : (object)payType);
                pars[2] = new SqlParameter("@_AccountName", string.IsNullOrEmpty(accountName) ? DBNull.Value : (object)accountName);
                pars[3] = new SqlParameter("@_CreatedUser", string.IsNullOrEmpty(createdUser) ? DBNull.Value : (object)createdUser);
                pars[4] = new SqlParameter("@_AccountType", accountType < 0 ? 0 : (object)accountType);
                pars[5] = new SqlParameter("@_BeginDate", fromDate);
                pars[6] = new SqlParameter("@_EndDate", toDate);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<TransactionInputReportDetail>("SP_TransactionInput_DetailReport", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<TransactionInputReportDetail>();
            }
        }


        #endregion

        #region Báo cáo merchant
        /// <summary>
        /// Báo cáo tổng hợp Merchant
        /// </summary>
        /// <param name="merchantType">0: Tất cả/ 1: Tích hợp website/ 2: Tích hợp nút/ 3: Tích hợp Mobile App/ 4: Tích hợp QRCode</param>
        /// <param name="merchantName">Tên merchant</param>
        /// <param name="merchantAccount">Số tài khoản merchant</param>
        /// <param name="bankType">Cổng 0:Tat ca, 1:noi dia, 2 quoc te</param>
        /// <param name="fromDate"></param>
        /// <param name="toDate"></param>
        /// <returns></returns>
        public List<MerchantReport> GeneralReportMerchant(int merchantType, string merchantName, string merchantAccount, int bankType, DateTime fromDate, DateTime toDate)
        {
            try
            {
                var pars = new SqlParameter[6];
                pars[0] = new SqlParameter("@_MerchantType", merchantType < 0 ? DBNull.Value : (object)merchantType);
                pars[1] = new SqlParameter("@_MerchantName", string.IsNullOrEmpty(merchantName) ? DBNull.Value : (object)merchantName);
                pars[2] = new SqlParameter("@_MerchantAccount", string.IsNullOrEmpty(merchantAccount) ? DBNull.Value : (object)merchantAccount);
                pars[3] = new SqlParameter("@_BankType", bankType < 0 ? DBNull.Value : (object)bankType);
                pars[4] = new SqlParameter("@_FromDate", fromDate);
                pars[5] = new SqlParameter("@_Todate", toDate);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<MerchantReport>("SP_Merchant_Report", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<MerchantReport>();
            }
        }

        /// <summary>
        /// Báo cáo chi tiết merchant
        /// </summary>
        /// <param name="merchantType">0: Tất cả/ 1: Tích hợp website/ 2: Tích hợp nút/ 3: Tích hợp Mobile App/ 4: Tích hợp QRCode</param>
        /// <param name="merchantName">Tên merchant</param>
        /// <param name="merchantAccount">Số tài khoản merchant</param>
        /// <param name="accountName"></param>
        /// <param name="bankId"></param>
        /// <param name="fromDate"></param>
        /// <param name="toDate"></param>
        /// <returns></returns>
        public List<MerchantReportDetail> MerchantReportDetail(int merchantType, string merchantName, string merchantAccount, string accountName, string bankId, DateTime fromDate, DateTime toDate)
        {
            try
            {
                var pars = new SqlParameter[7];
                pars[0] = new SqlParameter("@_MerchantType", merchantType <= 0 ? DBNull.Value : (object)merchantType);
                pars[1] = new SqlParameter("@_MerchantName", string.IsNullOrEmpty(merchantName) ? DBNull.Value : (object)merchantName);
                pars[2] = new SqlParameter("@_MerchantAccount", string.IsNullOrEmpty(merchantAccount) ? DBNull.Value : (object)merchantAccount);
                pars[3] = new SqlParameter("@_AccountName", string.IsNullOrEmpty(accountName) ? DBNull.Value : (object)accountName);
                pars[4] = new SqlParameter("@_BankID", string.IsNullOrEmpty(bankId) ? DBNull.Value : (object)bankId);
                pars[5] = new SqlParameter("@_FromDate", fromDate);
                pars[6] = new SqlParameter("@_Todate", toDate);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<MerchantReportDetail>("SP_Merchant_Report_Detail", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<MerchantReportDetail>();
            }
        }
        #endregion

        #region Báo cáo khác
        //Báo cáo quản trị rủi ro
        public List<RiskManagementReport> GeneralReportRiskManager(int warning, string accountName, int time, long amount, DateTime fromDate, DateTime toDate)
        {
            try
            {
                var pars = new SqlParameter[6];
                pars[0] = new SqlParameter("@_Warning", warning);
                pars[1] = new SqlParameter("@_AccountName", string.IsNullOrEmpty(accountName) ? DBNull.Value : (object)accountName);
                pars[2] = new SqlParameter("@_FromDate", fromDate == new DateTime() ? DBNull.Value : (object)fromDate);
                pars[3] = new SqlParameter("@_Todate", toDate == new DateTime() ? DBNull.Value : (object)toDate);
                pars[4] = new SqlParameter("@_Time", time);
                pars[5] = new SqlParameter("@_Amount", amount <= 0 ? DBNull.Value : (object)amount);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<RiskManagementReport>("SP_RiskManagement_Report", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<RiskManagementReport>();
            }
        }
        #endregion

        #region Báo cáo MasterCard
        //Báo cáo tổng hợp
        public List<MatchMoveReportGeneral> GeneralReportVTCMasterCard(DateTime fromDate, DateTime toDate)
        {
            try
            {
                var pars = new SqlParameter[2];
                pars[0] = new SqlParameter("@_FromDate", fromDate);
                pars[1] = new SqlParameter("@_Todate", toDate);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<MatchMoveReportGeneral>("SP_MatchMove_BaoCaoTongHop", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<MatchMoveReportGeneral>();
            }
        }
        
        //Báo cáo nạp
        public List<MatchMoveReportTopup> ReportTopupVTCMasterCard(string accountName, DateTime fromDate, DateTime toDate)
        {
            try
            {
                var pars = new SqlParameter[3];
                pars[0] = new SqlParameter("@_AccountName", string.IsNullOrEmpty(accountName) ? DBNull.Value : (object)accountName);
                pars[1] = new SqlParameter("@_FromDate", fromDate);
                pars[2] = new SqlParameter("@_Todate", toDate);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<MatchMoveReportTopup>("SP_MatchMove_BaoCaoNapTien", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<MatchMoveReportTopup>();
            }
        }
        #endregion

        #region Biểu đồ
        //Biểu đồ Line tổng hợp Tài khoản
        public List<ChartLineReport> AccountReportLineChart(DateTime fromDate, DateTime toDate, int type)
        {
            try
            {
                var pars = new SqlParameter[3];
                pars[0] = new SqlParameter("@_DataType", type);
                pars[1] = new SqlParameter("@_BeginDate", fromDate);
                pars[2] = new SqlParameter("@_EndDate", toDate);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<ChartLineReport>("SP_Account_Report_LineChart", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<ChartLineReport>();
            }
        }

        //Biểu đồ Line tổng hợp số dư hệ thống
        public List<ChartLineReport> BalanceReportLineChart(DateTime fromDate, DateTime toDate, int type)
        {
            try
            {
                var pars = new SqlParameter[3];
                pars[0] = new SqlParameter("@_DataType", type < 0 ? DBNull.Value : (object)type);
                pars[1] = new SqlParameter("@_FromDate", fromDate);
                pars[2] = new SqlParameter("@_Todate", toDate);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<ChartLineReport>("SP_Account_Balance_LineChart", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<ChartLineReport>();
            }
        }

        //Biểu đồ Pie tổng hợp số dư hệ thống
        public List<ChartPieMoneyReport> BalanceReportPieChart(DateTime fromDate, DateTime toDate, int type)
        {
            try
            {
                var pars = new SqlParameter[3];
                pars[0] = new SqlParameter("@_DataType", type < 0 ? DBNull.Value : (object)type);
                pars[1] = new SqlParameter("@_FromDate", fromDate);
                pars[2] = new SqlParameter("@_Todate", toDate);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<ChartPieMoneyReport>("SP_Account_Balance_PieChart", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<ChartPieMoneyReport>();
            }
        }

        //Biểu đồ Line Tổng hợp Nạp
        public List<ChartLineReport> TransInputReportLineChart(DateTime fromDate, DateTime toDate, int type, int payType)
        {
            try
            {
                var pars = new SqlParameter[4];
                pars[0] = new SqlParameter("@_DataType", type < 0 ? DBNull.Value : (object)type);
                pars[1] = new SqlParameter("@_BeginDate", fromDate);
                pars[2] = new SqlParameter("@_EndDate", toDate);
                pars[3] = new SqlParameter("@_PayType", payType < 0 ? 0 : (object)payType);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<ChartLineReport>("SP_TransactionInput_GeneralReport_LineChart", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<ChartLineReport>();
            }
        }
        //Biểu đồ Pie Tổng hợp Nạp
        public List<ChartPieTransReport> TransInputReportPieChart(DateTime fromDate, DateTime toDate, int type)
        {
            try
            {
                var pars = new SqlParameter[3];
                pars[0] = new SqlParameter("@_DataType", type < 0 ? DBNull.Value : (object)type);
                pars[1] = new SqlParameter("@_BeginDate", fromDate);
                pars[2] = new SqlParameter("@_EndDate", toDate);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<ChartPieTransReport>("SP_TransactionInput_GeneralReport_PieChart", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<ChartPieTransReport>();
            }
        }

        //Biểu đồ Line Báo cáo hoàn
        public List<RefundPieChart> RefundReportPieChart(DateTime fromDate, DateTime toDate)
        {
            try
            {
                var pars = new SqlParameter[2];
                pars[0] = new SqlParameter("@_BeginDate", fromDate);
                pars[1] = new SqlParameter("@_EndDate", toDate);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<RefundPieChart>("SP_Refund_Report_PieChart", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<RefundPieChart>();
            }
        }
        //Biểu đồ Pie Báo cáo hoàn
        public List<ChartLine> RefundReportLineChart(DateTime fromDate, DateTime toDate, int transType)
        {
            try
            {
                var pars = new SqlParameter[3];
                pars[0] = new SqlParameter("@_BeginDate", fromDate);
                pars[1] = new SqlParameter("@_EndDate", toDate);
                pars[2] = new SqlParameter("@_TransType", transType < 0 ? 0 : (object)transType);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<ChartLine>("SP_Refund_Report_LineChart", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<ChartLine>();
            }
        }

        //Biểu đồ Line Báo cáo merchant
        public List<ChartLine> MerchantReportLineChart(DateTime fromDate, DateTime toDate, int merchantType, int bankType, int chartType)
        {
            try
            {
                var pars = new SqlParameter[5];
                pars[0] = new SqlParameter("@_MerchantType", merchantType < 0 ? DBNull.Value : (object)merchantType);
                pars[1] = new SqlParameter("@_BankType", bankType < 0 ? DBNull.Value : (object)bankType);
                pars[2] = new SqlParameter("@_FromDate", fromDate);
                pars[3] = new SqlParameter("@_Todate", toDate);
                pars[4] = new SqlParameter("@_ChartType", chartType);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<ChartLine>("SP_Merchant_Report_LineChart", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<ChartLine>();
            }
        }
        //Biểu đồ Pie Báo cáo merchant
        public List<MerchantPieChart> MerchantReportPieChart(DateTime fromDate, DateTime toDate, int chartType)
        {
            try
            {
                var pars = new SqlParameter[3];
                pars[0] = new SqlParameter("@_FromDate", fromDate);
                pars[1] = new SqlParameter("@_Todate", toDate);
                pars[2] = new SqlParameter("@_ChartType", chartType < 0 ? 0 : (object)chartType);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<MerchantPieChart>("SP_Merchant_Report_PieChart", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<MerchantPieChart>();
            }
        }

        //Biểu đồ Pie Báo cáo chuyển tiền
        public List<TransferPieChart> TransferReportPieChart(int dataType, DateTime fromDate, DateTime toDate)
        {
            try
            {
                var pars = new SqlParameter[3];
                pars[0] = new SqlParameter("@_DataType", dataType);
                pars[1] = new SqlParameter("@_BeginDate", fromDate);
                pars[2] = new SqlParameter("@_EndDate", toDate);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<TransferPieChart>("SP_TransferMoney_Report_PieChart", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<TransferPieChart>();
            }
        }
        //Biểu đồ Line Báo cáo chuyển tiền
        public List<ChartLine> TransferReportLineChart(int dataType, DateTime fromDate, DateTime toDate)
        {
            try
            {
                var pars = new SqlParameter[3];
                pars[0] = new SqlParameter("@_DataType", dataType);
                pars[1] = new SqlParameter("@_BeginDate", fromDate);
                pars[2] = new SqlParameter("@_EndDate", toDate);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<ChartLine>("SP_TransferMoney_Report_LineChart", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<ChartLine>();
            }
        }

        //Biểu đồ Pie Báo cáo rút tiền
        public List<CashoutPieChart> CashoutReportPieChart(DateTime fromDate, DateTime toDate)
        {
            try
            {
                var pars = new SqlParameter[2];
                pars[0] = new SqlParameter("@_BeginDate", fromDate);
                pars[1] = new SqlParameter("@_EndDate", toDate);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<CashoutPieChart>("SP_CashOut_Report_PieChart", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<CashoutPieChart>();
            }
        }
        //Biểu đồ Line Báo cáo rút tiền
        public List<ChartLine> CashoutReportLineChart(DateTime fromDate, DateTime toDate)
        {
            try
            {
                var pars = new SqlParameter[2];
                pars[0] = new SqlParameter("@_BeginDate", fromDate);
                pars[1] = new SqlParameter("@_EndDate", toDate);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<ChartLine>("SP_CashOut_Report_LineChart", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<ChartLine>();
            }
        }


        public List<EcomBanking> GetEcomBankingList(DateTime fromTime, DateTime endTime, int gatePaymentID, string bankID)
        {
            try
            {
                var pars = new SqlParameter[4];
                pars[0] = new SqlParameter("@_BeginDate", fromTime);
                pars[1] = new SqlParameter("@_EndDate", endTime);
                pars[2] = new SqlParameter("@_GatePaymentID", gatePaymentID);
                pars[3] = new SqlParameter("@_BankID", string.IsNullOrEmpty(bankID) ? DBNull.Value: (object) bankID);
                return new DBHelper(Config.ReportDBConnectionString).GetListSP<EcomBanking>("SP_TransactionInput_DetailReport_ByGatePaymentID", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo(ex.ToString());
                return new List<EcomBanking>();
            }
        }



        #endregion
    }
}

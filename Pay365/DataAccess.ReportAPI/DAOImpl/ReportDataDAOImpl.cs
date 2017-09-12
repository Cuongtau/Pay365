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
    public class ReportDataDAOImpl : IReportDataDAO
    {


        #region Tài khoản
        /// <summary>
        /// WHEN 1 THEN MAX([RegisterLogID])
        ///WHEN 2 THEN MAX(SecureLogID)
        ///WHEN 3 THEN MAX(StatusLogID)
        ///WHEN 4 THEN MAX([UpdateLogID])
        ///WHEN 5 THEN MAX([VerifyLogID])
        ///WHEN 6 THEN MAX([BlockLogID])
        ///WHEN 7 THEN MAX([FreezeLogID])
        /// </summary>
        /// <param name="tableLogID"></param>
        /// <returns></returns>
        public long AccountLogData_GetLastID(int tableLogID)
        {
            try
            {
                var pars = new SqlParameter[2];
                pars[0] = new SqlParameter("@_TableLogID", tableLogID);
                pars[1] = new SqlParameter("@_MaxLogID", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                new DBHelper(Config.ReportDataConnectionString).ExecuteNonQuerySP("SP_Account_Log_Data_GetLastLogID", pars);
                return Convert.ToInt64(pars[1].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -99;
            }
        }

        public int AccountLogData_Insert(AccountLogData inputData)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[46];
                pars[0] = new SqlParameter("@_TableLogID", inputData.TableLogID);
                pars[1] = new SqlParameter("@_RegisterLogID", inputData.RegisterLogID);
                pars[2] = new SqlParameter("@_AccountID", inputData.AccountID);
                pars[3] = new SqlParameter("@_AccountName", inputData.AccountName);
                pars[4] = new SqlParameter("@_FullName", string.IsNullOrEmpty(inputData.FullName) ? DBNull.Value : (object)inputData.FullName);
                pars[5] = new SqlParameter("@_Email", string.IsNullOrEmpty(inputData.Email) ? DBNull.Value : (object)inputData.Email);
                pars[6] = new SqlParameter("@_Mobile", string.IsNullOrEmpty(inputData.Mobile) ? DBNull.Value : (object)inputData.Mobile);
                pars[7] = new SqlParameter("@_AccountType", inputData.AccountType);
                pars[8] = new SqlParameter("@_RegisterType", inputData.RegisterType);
                pars[9] = new SqlParameter("@_DeviceType", inputData.DeviceType);
                pars[10] = new SqlParameter("@_AccountStatus", inputData.AccountStatus);
                pars[11] = new SqlParameter("@_SecureLogID", inputData.SecureLogID);
                pars[12] = new SqlParameter("@_SecureTypeID", inputData.SecureTypeID);
                pars[13] = new SqlParameter("@_SecureName", string.IsNullOrEmpty(inputData.SecureName) ? DBNull.Value : (object)inputData.SecureName);
                pars[14] = new SqlParameter("@_SecureLogType", inputData.SecureLogType);
                pars[15] = new SqlParameter("@_MinAmount", inputData.MinAmount);
                pars[16] = new SqlParameter("@_StatusLogID", inputData.StatusLogID);
                pars[17] = new SqlParameter("@_OldStatus", inputData.OldStatus);
                pars[18] = new SqlParameter("@_CurrentStatus", inputData.CurrentStatus);
                pars[19] = new SqlParameter("@_UpdateLogID", inputData.UpdateLogID);
                pars[20] = new SqlParameter("@_UpdateLogType", inputData.UpdateLogType);
                pars[21] = new SqlParameter("@_EditedData", string.IsNullOrEmpty(inputData.EditedData) ? DBNull.Value : (object)inputData.EditedData);
                pars[22] = new SqlParameter("@_OldData", string.IsNullOrEmpty(inputData.OldData) ? DBNull.Value : (object)inputData.OldData);
                pars[23] = new SqlParameter("@_VerifyLogID", inputData.VerifyLogID);
                pars[24] = new SqlParameter("@_VerifyType", inputData.VerifyType);
                pars[25] = new SqlParameter("@_VerifyValue", string.IsNullOrEmpty(inputData.VerifyValue) ? DBNull.Value : (object)inputData.VerifyValue);
                pars[26] = new SqlParameter("@_BlockLogID", inputData.BlockLogID);
                pars[27] = new SqlParameter("@_ServiceID", inputData.ServiceID);
                pars[28] = new SqlParameter("@_ServiceName", string.IsNullOrEmpty(inputData.ServiceName) ? DBNull.Value : (object)inputData.ServiceName);
                pars[29] = new SqlParameter("@_CreatedUser", string.IsNullOrEmpty(inputData.CreatedUser) ? DBNull.Value : (object)inputData.CreatedUser);
                pars[30] = new SqlParameter("@_BlockType", inputData.BlockType);
                pars[31] = new SqlParameter("@_Reason", string.IsNullOrEmpty(inputData.Reason) ? DBNull.Value : (object)inputData.Reason);
                pars[32] = new SqlParameter("@_CreatedTime", inputData.CreatedTime);
                pars[33] = new SqlParameter("@_CreatedUnixTime", inputData.CreatedUnixTime);
                pars[34] = new SqlParameter("@_BlockLogType", inputData.BlockLogType);
                pars[35] = new SqlParameter("@_FreezeLogID", inputData.FreezeLogID);
                pars[36] = new SqlParameter("@_Amount", inputData.Amount);
                pars[37] = new SqlParameter("@_CurrencyType", inputData.CurrencyType);
                pars[38] = new SqlParameter("@_FreezeLogType", inputData.FreezeLogType);
                pars[39] = new SqlParameter("@_Description", string.IsNullOrEmpty(inputData.Description) ? DBNull.Value : (object)inputData.Description);
                pars[40] = new SqlParameter("@_ClientIP", string.IsNullOrEmpty(inputData.ClientIP) ? DBNull.Value : (object)inputData.ClientIP);
                pars[41] = new SqlParameter("@_UnFreezeUnixTime", inputData.UnFreezeUnixTime);
                pars[42] = new SqlParameter("@_BalanceBefore", inputData.BalanceBefore);
                pars[43] = new SqlParameter("@_BalanceAfter", inputData.BalanceAfter);
                pars[44] = new SqlParameter("@_RelatedTranID", inputData.RelatedTranID);
                pars[45] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(Config.ReportDataConnectionString).ExecuteNonQuerySP("SP_Account_Log_Data_Insert", pars);
                return Convert.ToInt32(pars[45].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -99;
            }
        }


        #endregion

        #region Tổng hợp hệ thống
        public void AccountSystemData_Insert(long ReportDate, int AccountTypeID, string AccountTypeName, int RegisterNumber, int ActiveNumber, int AccountHasBalance,
            decimal TotalBalance, int TotalAccount)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[8];
                pars[0] = new SqlParameter("@_ReportDate", ReportDate);
                pars[1] = new SqlParameter("@_AccountTypeID", AccountTypeID);
                pars[2] = new SqlParameter("@_AccountTypeName", AccountTypeName);
                pars[3] = new SqlParameter("@_RegisterNumber", RegisterNumber);
                pars[4] = new SqlParameter("@_ActiveNumber", ActiveNumber);
                pars[5] = new SqlParameter("@_AccountHasBalance", AccountHasBalance);
                pars[6] = new SqlParameter("@_TotalBalance", TotalBalance);
                pars[7] = new SqlParameter("@_TotalAccount", TotalAccount);
                new DBHelper(Config.ReportDataConnectionString).ExecuteNonQuerySP("SP_AccountGeneral_Update", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
            }
        }
        #endregion

        #region giao dich
        // Lấy max log data giao dịch nạp
        public long TransactionInput_GetLastID()
        {
            try
            {
                var output = new SqlParameter("@_MaxTransactionID", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                new DBHelper(Config.ReportDataConnectionString).ExecuteNonQuerySP("SP_TransactionInput_GetMaxTransactionID", output);
                var lstTransactionID = Convert.ToInt64(output.Value);
                return Convert.ToInt64(lstTransactionID);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -99;
            }
        }
        // Lấy max log data giao dịch tiêu
        public long TransactionOutput_GetLastID()
        {
            try
            {
                var output = new SqlParameter("@_MaxTransactionID", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                new DBHelper(Config.ReportDataConnectionString).ExecuteNonQuerySP("SP_TransactionOutput_GetMaxTransactionID", output);
                var lstTransactionID = Convert.ToInt64(output.Value);
                return Convert.ToInt64(lstTransactionID);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -99;
            }
        }

        public long TransactionInput_GeneralData(TransactionLogData insertData)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[55];
                pars[0] = new SqlParameter("@_TransactionID", insertData.TransactionID);
                pars[1] = new SqlParameter("@_RelatedTransactionID", insertData.RelatedTransactionID);
                pars[2] = new SqlParameter("@_BillingOrderID", insertData.BillingOrderID);
                pars[3] = new SqlParameter("@_GroupServiceID", insertData.GroupServiceID);
                pars[4] = new SqlParameter("@_GroupServiceName", string.IsNullOrEmpty(insertData.GroupServiceName) ? string.Empty : (object)insertData.GroupServiceName);
                pars[5] = new SqlParameter("@_ServiceID", insertData.ServiceID);
                pars[6] = new SqlParameter("@_ServiceName", string.IsNullOrEmpty(insertData.ServiceName) ? string.Empty : (object)insertData.ServiceName);
                pars[7] = new SqlParameter("@_RelatedServiceID", insertData.RelatedServiceID);
                pars[8] = new SqlParameter("@_RelatedServiceName", string.IsNullOrEmpty(insertData.RelatedServiceName) ? DBNull.Value : (object)insertData.RelatedServiceName);
                pars[9] = new SqlParameter("@_ParentServiceID", insertData.ParentServiceID);
                pars[10] = new SqlParameter("@_ParentServiceName", string.IsNullOrEmpty(insertData.ParentServiceName) ? string.Empty : insertData.ParentServiceName);
                pars[11] = new SqlParameter("@_PayType", insertData.PayType);
                pars[12] = new SqlParameter("@_PayTypeName", string.IsNullOrEmpty(insertData.PayTypeName) ? string.Empty : (object)insertData.PayTypeName);
                pars[13] = new SqlParameter("@_AccountID", insertData.AccountID);
                pars[14] = new SqlParameter("@_AccountName", insertData.AccountName);
                pars[15] = new SqlParameter("@_FullName", string.IsNullOrEmpty(insertData.FullName) ? DBNull.Value : (object)insertData.FullName);
                pars[16] = new SqlParameter("@_AccountType", insertData.AccountType);
                pars[17] = new SqlParameter("@_RelatedAccountID", insertData.RelatedAccountID);
                pars[18] = new SqlParameter("@_RelatedAccount", insertData.RelatedAccount);
                pars[19] = new SqlParameter("@_Description", string.IsNullOrEmpty(insertData.Description) ? DBNull.Value : (object)insertData.Description);
                pars[20] = new SqlParameter("@_Amount", insertData.Amount);
                pars[21] = new SqlParameter("@_Fee", insertData.Fee);
                pars[22] = new SqlParameter("@_RelatedFee", insertData.RelatedFee);
                pars[23] = new SqlParameter("@_BalanceBefore", insertData.BalanceBefore);
                pars[24] = new SqlParameter("@_BalanceAfter", insertData.BalanceAfter);
                pars[25] = new SqlParameter("@_BalanceServiceBefore", insertData.BalanceServiceBefore);
                pars[26] = new SqlParameter("@_BalanceServiceAfter", insertData.BalanceServiceAfter);
                pars[27] = new SqlParameter("@_BankID", insertData.BankID);
                pars[28] = new SqlParameter("@_BankCode", string.IsNullOrEmpty(insertData.BankCode) ? DBNull.Value : (object)insertData.BankCode);
                pars[29] = new SqlParameter("@_BankName", string.IsNullOrEmpty(insertData.BankName) ? DBNull.Value : (object)insertData.BankName);
                pars[30] = new SqlParameter("@_BankType", insertData.BankType);
                pars[31] = new SqlParameter("@_BankBranch", string.IsNullOrEmpty(insertData.BankBranch) ? DBNull.Value : (object)insertData.BankBranch);
                pars[32] = new SqlParameter("@_BankAccount", string.IsNullOrEmpty(insertData.BankAccount) ? DBNull.Value : (object)insertData.BankAccount);
                pars[33] = new SqlParameter("@_BankAccountName", string.IsNullOrEmpty(insertData.BankAccountName) ? DBNull.Value : (object)insertData.BankAccountName);
                pars[34] = new SqlParameter("@_BankAmount", insertData.BankAmount);
                pars[35] = new SqlParameter("@_BankFee", insertData.BankFee);
                pars[36] = new SqlParameter("@_BankRefTransID", string.IsNullOrEmpty(insertData.BankRefTransID) ? DBNull.Value : (object)insertData.BankRefTransID);
                pars[37] = new SqlParameter("@_MerchantID", insertData.MerchantID);
                pars[38] = new SqlParameter("@_MerchantName", string.IsNullOrEmpty(insertData.MerchantName) ? DBNull.Value : (object)insertData.MerchantName);
                pars[39] = new SqlParameter("@_WebsiteID", insertData.WebsiteID);
                pars[40] = new SqlParameter("@_CreatedUser", string.IsNullOrEmpty(insertData.CreatedUser) ? DBNull.Value : (object)insertData.CreatedUser);
                pars[41] = new SqlParameter("@_CreatedTime", insertData.CreatedTime);
                pars[42] = new SqlParameter("@_CreatedUnixTime", insertData.CreatedUnixTime);
                pars[43] = new SqlParameter("@_ClientUnixTime", insertData.CreatedUnixTime);
                pars[44] = new SqlParameter("@_ClientIP", string.IsNullOrEmpty(insertData.ClientIP) ? DBNull.Value : (object)insertData.ClientIP);
                pars[45] = new SqlParameter("@_Partition", insertData.Partition);
                pars[46] = new SqlParameter("@_TopupType", insertData.TopupType);
                pars[47] = new SqlParameter("@_TopupTypeName", string.IsNullOrEmpty(insertData.TopupTypeName) ? DBNull.Value : (object)insertData.TopupTypeName);
                pars[48] = new SqlParameter("@_DeviceTypeID", insertData.DeviceTypeID);
                pars[49] = new SqlParameter("@_DeviceTypeName", string.IsNullOrEmpty(insertData.DeviceTypeName) ? string.Empty : (object)insertData.DeviceTypeName);
                pars[50] = new SqlParameter("@_DeviceTypeGroup", string.IsNullOrEmpty(insertData.DeviceTypeGroup) ? string.Empty : (object)insertData.DeviceTypeGroup);
                pars[51] = new SqlParameter("@_GatePaymentID", insertData.GatePaymentID);
                pars[52] = new SqlParameter("@_GatePaymentCode", string.IsNullOrEmpty(insertData.GatePaymentCode) ? string.Empty : (object)insertData.GatePaymentCode);
                pars[53] = new SqlParameter("@_GatePaymentName", string.IsNullOrEmpty(insertData.GatePaymentName) ? string.Empty : (object)insertData.GatePaymentName);
                pars[54] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                new DBHelper(Config.ReportDataConnectionString).ExecuteNonQuerySP("SP_TransactionInput_Insert", pars);
                var response = Convert.ToInt64(pars[54].Value);
                return response;
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -6996;
            }
        }
        public long TransactionOutput_GeneralData(TransactionLogData insertData)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[53];
                pars[0] = new SqlParameter("@_TransactionID", insertData.TransactionID);
                pars[1] = new SqlParameter("@_RelatedTransactionID", insertData.RelatedTransactionID);
                pars[2] = new SqlParameter("@_BillingOrderID", insertData.BillingOrderID);
                pars[3] = new SqlParameter("@_GroupServiceID", insertData.GroupServiceID);
                pars[4] = new SqlParameter("@_GroupServiceName", string.IsNullOrEmpty(insertData.GroupServiceName) ? string.Empty : (object)insertData.GroupServiceName);
                pars[5] = new SqlParameter("@_ServiceID", insertData.ServiceID);
                pars[6] = new SqlParameter("@_ServiceName", string.IsNullOrEmpty(insertData.ServiceName) ? string.Empty : (object)insertData.ServiceName);
                pars[7] = new SqlParameter("@_RelatedServiceID", insertData.RelatedServiceID);
                pars[8] = new SqlParameter("@_RelatedServiceName", string.IsNullOrEmpty(insertData.RelatedServiceName) ? DBNull.Value : (object)insertData.RelatedServiceName);
                pars[9] = new SqlParameter("@_ParentServiceID", insertData.ParentServiceID);
                pars[10] = new SqlParameter("@_ParentServiceName", string.IsNullOrEmpty(insertData.ParentServiceName) ? string.Empty : insertData.ParentServiceName);
                pars[11] = new SqlParameter("@_PayType", insertData.PayType);
                pars[12] = new SqlParameter("@_PayTypeName", string.IsNullOrEmpty(insertData.PayTypeName) ? string.Empty : (object)insertData.PayTypeName);
                pars[13] = new SqlParameter("@_AccountID", insertData.AccountID);
                pars[14] = new SqlParameter("@_AccountName", insertData.AccountName);
                pars[15] = new SqlParameter("@_FullName", string.IsNullOrEmpty(insertData.FullName) ? DBNull.Value : (object)insertData.FullName);
                pars[16] = new SqlParameter("@_AccountType", insertData.AccountType);
                pars[17] = new SqlParameter("@_RelatedAccountID", insertData.RelatedAccountID);
                pars[18] = new SqlParameter("@_RelatedAccount", insertData.RelatedAccount);
                pars[19] = new SqlParameter("@_Description", string.IsNullOrEmpty(insertData.Description) ? DBNull.Value : (object)insertData.Description);
                pars[20] = new SqlParameter("@_Amount", insertData.Amount);
                pars[21] = new SqlParameter("@_Fee", insertData.Fee);
                pars[22] = new SqlParameter("@_RelatedFee", insertData.RelatedFee);
                pars[23] = new SqlParameter("@_BalanceBefore", insertData.BalanceBefore);
                pars[24] = new SqlParameter("@_BalanceAfter", insertData.BalanceAfter);
                pars[25] = new SqlParameter("@_BalanceServiceBefore", insertData.BalanceServiceBefore);
                pars[26] = new SqlParameter("@_BalanceServiceAfter", insertData.BalanceServiceAfter);
                pars[27] = new SqlParameter("@_BankID", insertData.BankID);
                pars[28] = new SqlParameter("@_BankCode", string.IsNullOrEmpty(insertData.BankCode) ? DBNull.Value : (object)insertData.BankCode);
                pars[29] = new SqlParameter("@_BankName", string.IsNullOrEmpty(insertData.BankName) ? DBNull.Value : (object)insertData.BankName);
                pars[30] = new SqlParameter("@_BankType", insertData.BankType);
                pars[31] = new SqlParameter("@_BankBranch", string.IsNullOrEmpty(insertData.BankBranch) ? DBNull.Value : (object)insertData.BankBranch);
                pars[32] = new SqlParameter("@_BankAccount", string.IsNullOrEmpty(insertData.BankAccount) ? DBNull.Value : (object)insertData.BankAccount);
                pars[33] = new SqlParameter("@_BankAccountName", string.IsNullOrEmpty(insertData.BankAccountName) ? DBNull.Value : (object)insertData.BankAccountName);
                pars[34] = new SqlParameter("@_BankAmount", insertData.BankAmount);
                pars[35] = new SqlParameter("@_BankFee", insertData.BankFee);
                pars[36] = new SqlParameter("@_BankRefTransID", string.IsNullOrEmpty(insertData.BankRefTransID) ? DBNull.Value : (object)insertData.BankRefTransID);
                pars[37] = new SqlParameter("@_MerchantID", insertData.MerchantID);
                pars[38] = new SqlParameter("@_MerchantName", string.IsNullOrEmpty(insertData.MerchantName) ? DBNull.Value : (object)insertData.MerchantName);
                pars[39] = new SqlParameter("@_WebsiteID", insertData.WebsiteID);
                pars[40] = new SqlParameter("@_CreatedUser", string.IsNullOrEmpty(insertData.CreatedUser) ? DBNull.Value : (object)insertData.CreatedUser);
                pars[41] = new SqlParameter("@_CreatedTime", insertData.CreatedTime);
                pars[42] = new SqlParameter("@_CreatedUnixTime", insertData.CreatedUnixTime);
                pars[43] = new SqlParameter("@_ClientUnixTime", insertData.CreatedUnixTime);
                pars[44] = new SqlParameter("@_ClientIP", string.IsNullOrEmpty(insertData.ClientIP) ? DBNull.Value : (object)insertData.ClientIP);
                pars[45] = new SqlParameter("@_Partition", insertData.Partition);
                pars[46] = new SqlParameter("@_DeviceTypeID", insertData.DeviceTypeID);
                pars[47] = new SqlParameter("@_DeviceTypeName", string.IsNullOrEmpty(insertData.DeviceTypeName) ? string.Empty : (object)insertData.DeviceTypeName);
                pars[48] = new SqlParameter("@_DeviceTypeGroup", string.IsNullOrEmpty(insertData.DeviceTypeGroup) ? string.Empty : (object)insertData.DeviceTypeGroup);
                pars[49] = new SqlParameter("@_GatePaymentID", insertData.GatePaymentID);
                pars[50] = new SqlParameter("@_GatePaymentCode", string.IsNullOrEmpty(insertData.GatePaymentCode) ? string.Empty : (object)insertData.GatePaymentCode);
                pars[51] = new SqlParameter("@_GatePaymentName", string.IsNullOrEmpty(insertData.GatePaymentName) ? string.Empty : (object)insertData.GatePaymentName);
                pars[52] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                new DBHelper(Config.ReportDataConnectionString).ExecuteNonQuerySP("SP_TransactionOutput_Insert", pars);
                var response = Convert.ToInt64(pars[52].Value);
                return response;
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -6996;
            }
        }
        #endregion



        #region MatchMove
        // Lấy max log data giao dịch nạp
        public long MatchMove_ReportTopup_GetLastID()
        {
            try
            {
                var output = new SqlParameter("@_MaxTopupID", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                new DBHelper(Config.ReportDataConnectionString).ExecuteNonQuerySP("SP_MatchMove_GetMaxTopupID", output);
                var lstTopupID = Convert.ToInt64(output.Value);
                return Convert.ToInt64(lstTopupID);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -99;
            }
        }

        public void MatchMove_ReportGeneral_Update(MatchMoveReportGeneral insertData)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[14];
                pars[0] = new SqlParameter("@_CreatedDate", insertData.CreatedDate);
                pars[1] = new SqlParameter("@_TotalRegisterBefore", insertData.TotalRegisterBefore);
                pars[2] = new SqlParameter("@_TotalRegisterAfter", insertData.TotalRegisterAfter);
                pars[3] = new SqlParameter("@_TotalRegister", insertData.TotalRegister);
                pars[4] = new SqlParameter("@_CardFee", insertData.CardFee);
                pars[5] = new SqlParameter("@_TotalCertCard", insertData.TotalCertCard);
                pars[6] = new SqlParameter("@_TotalUnCertCard", insertData.TotalUnCertCard);
                pars[7] = new SqlParameter("@_TotalVTCLock", insertData.TotalVTCLock);
                pars[8] = new SqlParameter("@_TotalAmount", insertData.TotalAmount);
                pars[9] = new SqlParameter("@_MaintainFee", insertData.MaintainFee);
                pars[10] = new SqlParameter("@_MaintanFeeOld", insertData.MaintanFeeOld);
                pars[11] = new SqlParameter("@_TotalMaintainFee", insertData.TotalMaintainFee);
                pars[12] = new SqlParameter("@_CardtoAmount", insertData.CardtoAmount);
                pars[13] = new SqlParameter("@_TotalCardLock", insertData.TotalCardLock);
                new DBHelper(Config.ReportDataConnectionString).ExecuteNonQuerySP("SP_MatchMove_BaoCaoTongHop_Update", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
            }
        }

        public void MatchMove_ReportTopup_Update(MatchMoveReportTopup insertData)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[7];
                pars[0] = new SqlParameter("@_TopupID", insertData.TopupID);
                pars[1] = new SqlParameter("@_CreatedDatetime", insertData.CreatedDatetime);
                pars[2] = new SqlParameter("@_AccountID", insertData.AccountID);
                pars[3] = new SqlParameter("@_AccountName", string.IsNullOrEmpty(insertData.AccountName) ? DBNull.Value : (object)insertData.AccountName);
                pars[4] = new SqlParameter("@_Fullname", string.IsNullOrEmpty(insertData.Fullname) ? DBNull.Value : (object)insertData.Fullname);
                pars[5] = new SqlParameter("@_MMCardSerial", string.IsNullOrEmpty(insertData.MMCardSerial) ? DBNull.Value : (object)insertData.MMCardSerial);
                pars[6] = new SqlParameter("@_Amount", insertData.Amount);
                new DBHelper(Config.ReportDataConnectionString).ExecuteNonQuerySP("SP_MatchMove_BaoCaoNapTien_Update", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
            }
        } 
        #endregion




        #region Lịch sử bán hàng Merchant

        // Lịch sử tổng hợp
        public List<MerchantHistory> MerchantHistory(string merchantAccount, DateTime fromDate, DateTime toDate)
        {
            try
            {
                var pars = new SqlParameter[3];
                pars[0] = new SqlParameter("@_MerchantAccount", merchantAccount);
                pars[1] = new SqlParameter("@_FromDate", fromDate);
                pars[2] = new SqlParameter("@_Todate", toDate);
                return new DBHelper(Config.ReportDataConnectionString).GetListSP<MerchantHistory>("SP_Merchant_History", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new List<MerchantHistory>();
            }
        }


        // Chi tiết giao dịch
        public List<MerchantHistoryDetail> MerchantHistoryDetail(string merchantAccount, DateTime fromDate, DateTime toDate)
        {
            try
            {
                var pars = new SqlParameter[3];
                pars[0] = new SqlParameter("@_MerchantAccount", merchantAccount);
                pars[1] = new SqlParameter("@_FromDate", fromDate);
                pars[2] = new SqlParameter("@_Todate", toDate);
                return new DBHelper(Config.ReportDataConnectionString).GetListSP<MerchantHistoryDetail>("SP_Merchant_History_Detail", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new List<MerchantHistoryDetail>();
            }
        }



        // Chi tiết giao dịch theo TK khách hàng
        public List<MerchantHistoryDetailCustomer> MerchantHistoryDetail_CustomerAccount(string merchantAccount, string customerAccount, DateTime fromDate, DateTime toDate)
        {
            try
            {
                var pars = new SqlParameter[4];
                pars[0] = new SqlParameter("@_MerchantAccount", merchantAccount);
                pars[1] = new SqlParameter("@_CustomerAccount", customerAccount);
                pars[2] = new SqlParameter("@_FromDate", fromDate);
                pars[3] = new SqlParameter("@_Todate", toDate);
                return new DBHelper(Config.ReportDataConnectionString).GetListSP<MerchantHistoryDetailCustomer>("SP_Merchant_History_Detail_CustomerAccount", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new List<MerchantHistoryDetailCustomer>();
            }
        }


        #endregion

    }
}

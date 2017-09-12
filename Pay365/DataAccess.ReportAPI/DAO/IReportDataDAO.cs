using System;
using System.Data;
using DataAccess.ReportAPI.DTO;
using System.Collections.Generic;

namespace DataAccess.ReportAPI.DAO
{
    public interface IReportDataDAO
    {
        long AccountLogData_GetLastID(int tableLogID);
        int AccountLogData_Insert(AccountLogData inputData);
        void AccountSystemData_Insert(long ReportDate, int AccountTypeID, string AccountTypeName, int RegisterNumber, int ActiveNumber, int AccountHasBalance,
            decimal TotalBalance, int TotalAccount);

        long TransactionInput_GetLastID();
        long TransactionOutput_GetLastID();
        long TransactionInput_GeneralData(TransactionLogData insertData);
        long TransactionOutput_GeneralData(TransactionLogData insertData);

        #region MatchMove
        long MatchMove_ReportTopup_GetLastID();
        void MatchMove_ReportGeneral_Update(MatchMoveReportGeneral insertData);
        void MatchMove_ReportTopup_Update(MatchMoveReportTopup insertData);
        #endregion

        #region Lịch sử bán hàng Merchant
        List<MerchantHistory> MerchantHistory(string merchantAccount, DateTime fromDate, DateTime toDate);
        List<MerchantHistoryDetail> MerchantHistoryDetail(string merchantAccount, DateTime fromDate, DateTime toDate);
        List<MerchantHistoryDetailCustomer> MerchantHistoryDetail_CustomerAccount(string merchantAccount,
            string customerAccount, DateTime fromDate, DateTime toDate);

        #endregion
    }
}

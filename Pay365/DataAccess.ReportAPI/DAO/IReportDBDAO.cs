using System;
using System.Data;
using DataAccess.ReportAPI.DTO;
using System.Collections.Generic;

namespace DataAccess.ReportAPI.DAO
{
    public interface IReportDBDAO
    {
        #region báo cáo hệ thống
        GeneralReportSystem AccountGeneralSystemReport();
        List<GeneralBalanceSystem> AccountBalanceSystemReport(int accountTypeID, string fromDate, string toDate);
        #endregion

        #region báo cáo Tài khoản
        List<AccountReport> GeneralAccountReport(DateTime fromDate, DateTime toDate);
        #endregion

        #region báo cáo giao dịch
        //Báo cáo rút tiền
        List<CashoutReport> CashoutReportGetList(DateTime fromDate, DateTime toDate, int bankId, string bankRefTransID, string accountName, string bankAccount, int payType);

        //Báo cáo chuyển tiền
        List<TransferReport> TransferReportGetList(DateTime fromDate, DateTime toDate, string accountName, string relatedAccount);

        //Báo cáo hoàn tiền
        List<RefundReport> RefundReportGetList(string listWebsiteID, string createdAccount, string bankId, byte transType, DateTime fromDate, DateTime toDate);
   
        //Báo cáo tổng hợp nạp
        List<TransactionInputGeneralReport> GeneralReportTransactionInput(DateTime fromDate, DateTime toDate, byte payType, string bankId);
        //Báo cáo chi tiết nạp
        List<TransactionInputReportDetail> TransactionInputReportDetail(DateTime fromDate, DateTime toDate, string accountName, string createdUser, byte accountType, byte payType, string bankId);
        #endregion

        #region Báo cáo merchant
        //Báo cáo tổng hợp merchant
        List<MerchantReport> GeneralReportMerchant(int merchantType, string merchantName, string merchantAccount, int bankType, DateTime fromDate, DateTime toDate);
        //Báo cáo chi tiết Merchant
        List<MerchantReportDetail> MerchantReportDetail(int merchantType, string merchantName, string merchantAccount, string accountName, string bankId, DateTime fromDate, DateTime toDate);
        #endregion

        #region Báo cáo khác
        //Báo cáo quản trị rủi ro
        List<RiskManagementReport> GeneralReportRiskManager(int warning, string accountName, int time, long amount, DateTime fromDate, DateTime toDate);
        #endregion

        #region Báo cáo VTCMasterCard
        List<MatchMoveReportGeneral> GeneralReportVTCMasterCard(DateTime fromDate, DateTime toDate);
        List<MatchMoveReportTopup> ReportTopupVTCMasterCard(string accountName, DateTime fromDate, DateTime toDate);
        #endregion




        #region Biểu đồ
        List<ChartLineReport> AccountReportLineChart(DateTime fromDate, DateTime toDate, int type);

        List<ChartLineReport> BalanceReportLineChart(DateTime fromDate, DateTime toDate, int type);
        List<ChartPieMoneyReport> BalanceReportPieChart(DateTime fromDate, DateTime toDate, int type);
        List<ChartLineReport> TransInputReportLineChart(DateTime fromDate, DateTime toDate, int type, int payType);
        List<ChartPieTransReport> TransInputReportPieChart(DateTime fromDate, DateTime toDate, int type);

        List<RefundPieChart> RefundReportPieChart(DateTime fromDate, DateTime toDate);
        List<ChartLine> RefundReportLineChart(DateTime fromDate, DateTime toDate, int transType);

        List<ChartLine> MerchantReportLineChart(DateTime fromDate, DateTime toDate, int merchantType, int bankType, int chartType);
        List<MerchantPieChart> MerchantReportPieChart(DateTime fromDate, DateTime toDate, int chartType);

        List<TransferPieChart> TransferReportPieChart(int dataType, DateTime fromDate, DateTime toDate);
        List<ChartLine> TransferReportLineChart(int dataType, DateTime fromDate, DateTime toDate);

        List<CashoutPieChart> CashoutReportPieChart(DateTime fromDate, DateTime toDate);
        List<ChartLine> CashoutReportLineChart(DateTime fromDate, DateTime toDate);

        List<EcomBanking> GetEcomBankingList(DateTime fromTime, DateTime endTime, int gatePaymentID, string bankID);

        #endregion
    }
}

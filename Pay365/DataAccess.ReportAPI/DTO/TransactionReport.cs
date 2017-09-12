using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.ReportAPI.DTO
{
    public class TransactionReport
    {

    }
    public class CashoutReport
    {
        public string AccountName { get; set; }
        public string FullName { get; set; }
        public long Amount { get; set; }
        public int Fee { get; set; }
        public DateTime CreatedTime { get; set; }
        public string BankCode { get; set; }
        public string BankBranch { get; set; }
        public string BankAccount { get; set; }
        public string BankAccountName { get; set; }
        public byte PayType { get; set; }
        public string BankRefTransID { get; set; }
    }

    public class TransferReport
    {
        public string AccountName { get; set; }
        public string RelatedAccount { get; set; }
        public string FullName { get; set; }
        public long Amount { get; set; }
        public int Fee { get; set; }
        public DateTime CreatedTime { get; set; }
    }
    public class RefundReport
    {
        public DateTime CreatedTime { get; set; }
        public string BankCode { get; set; }
        public string MerchantAccount { get; set; }
        public string MerchantName { get; set; }
        public string CustomerAccount { get; set; }
        public string CustomerName { get; set; }
        public long Amount { get; set; }
        public long OrgTransID { get; set; }
        public int TransType { get; set; }
    }

    public class TransactionInputGeneralReport
    {
        public DateTime ReportDate { get; set; }
        public int TotalAccounts_OnlineBank { get; set; }
        public int TotalTrans_OnlineBank { get; set; }
        public long TotalAmount_OnlineBank { get; set; }
        public int TotalFee_OnlineBank { get; set; }
        public int TotalAccounts_visa { get; set; }
        public int TotalTrans_visa { get; set; }
        public long TotalAmount_visa { get; set; }
        public int TotalFee_visa { get; set; }
        public int TotalAccounts_tranferBank { get; set; }
        public int TotalTrans_tranferBank { get; set; }
        public long TotalAmount_tranferBank { get; set; }
        public int TotalFee_tranferBank { get; set; }
        public int TotalAccounts_Card { get; set; }
        public int TotalTrans_Card { get; set; }
        public long TotalAmount_Card { get; set; }
        public int TotalFee_Card { get; set; }
        public int TotalAccounts_vnpost { get; set; }
        public int TotalTrans_vnpost { get; set; }
        public long TotalAmount_vnpost { get; set; }
        public int TotalFee_vnpost { get; set; }
        public int TotalAccounts_Other { get; set; }
        public int TotalTrans_Other { get; set; }
        public long TotalAmount_Other { get; set; }
        public int TotalFee_Other { get; set; }
        public int TotalAccounts { get; set; }
        public int TotalTrans { get; set; }
        public long TotalAmount { get; set; }
        public int TotalFee { get; set; }
        public int TotalAccounts_LinkBank { get; set; }
        public int TotalTrans_LinkBank { get; set; }
        public long TotalAmount_LinkBank { get; set; }
        public int TotalFee_LinkBank { get; set; }
    }
    public class TransactionInputReportDetail
    {
        public long TransactionID { get; set; }
        public string AccountName { get; set; }
        public string FullName { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime EndTime { get; set; }
        public long Amount { get; set; }
        public int Fee { get; set; }
        public int RelatedFee { get; set; }
        public string BankName { get; set; }
        public string CreatedUser { get; set; }
    }

    public class CashoutPieChart
    {
        public int PayType { get; set; }
        public long TotalValue { get; set; }
    }
    public class RefundPieChart
    {
        public int WebsiteID { get; set; }
        public long TotalValue { get; set; }
    }

    public class TransferPieChart
    {
        public int AccountType { get; set; }
        public long TotalValue { get; set; }
    }
    public class TransactionInputPieChart
    {
        public int PayType { get; set; }
        public long TotalValue { get; set; }
    }

    public class ChartLine
    {
        public long ReportDate { get; set; }
        public long TotalValue { get; set; }
    }
    public class ChartLineMerchant
    {
        public long ReportDate { get; set; }
        public int TotalTrans { get; set; }
        public long TotalAmount { get; set; }
    }
    public class MerchantPieChart
    {
        public int Type { get; set; }
        public long TotalValue { get; set; }
    }
}

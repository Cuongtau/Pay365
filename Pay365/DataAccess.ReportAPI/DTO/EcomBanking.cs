using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.ReportAPI.DTO
{
    public class EcomBanking
    {
        public long TransactionID { get; set; }
        public long RelatedTransactionID { get; set; }
        public long BillingOrderID { get; set; }
        public int GroupServiceID { get; set; }
        public string GroupServiceName { get; set; }
        public int GatePaymentID { get; set; }
        public int ServiceID { get; set; }
        public string ServiceName { get; set; }
        public byte PayType { get; set; }
        public string PayTypeName { get; set; }
        public string TopupTypeName { get; set; }
        public int AccountID { get; set; }
        public string AccountName { get; set; }
        public byte AccountType { get; set; }
        public string FullName { get; set; }
        public string RelatedAccount { get; set; }
        public string Description { get; set; }
        public long Amount { get; set; }
        public long Fee { get; set; }
        public long RelatedFee { get; set; }
        public int BankID { get; set; }
        public string BankCode { get; set; }
        public string BankName { get; set; }
        public byte BankType { get; set; }
        public string BankBranch { get; set; }
        public string BankAccount { get; set; }
        public string BankAccountName { get; set; }
        public decimal BankAmount { get; set; }
        public decimal BankFee { get; set; }
        public string BankRefTransID { get; set; }
        public int MerchantID { get; set; }
        public string MerchantName { get; set; }
        public int WebsiteID { get; set; }
        public string CreatedUser { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime EndTime { get; set; }

    }
}

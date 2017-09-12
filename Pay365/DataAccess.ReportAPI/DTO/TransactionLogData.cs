using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.ReportAPI.DTO
{
    public class TransactionLogData
    {
        public long TransactionID { get; set; }
        public long RelatedTransactionID { get; set; }
        public long BillingOrderID { get; set; }
        public int GroupServiceID { get; set; }
        public string GroupServiceName { get; set; }
        public int ServiceID { get; set; }
        public string ServiceName { get; set; }
        public int RelatedServiceID { get; set; }
        public string RelatedServiceName { get; set; }
        public int ParentServiceID { get; set; }
        public string ParentServiceName { get; set; }
        public byte PayType { get; set; }
        public string PayTypeName { get; set; }
        public int AccountID { get; set; }
        public string AccountName { get; set; }
        public string FullName { get; set; }
        public byte AccountType { get; set; }
        public int RelatedAccountID { get; set; }
        public string RelatedAccount { get; set; }
        public string Description { get; set; }
        public long Amount { get; set; }
        public int Fee { get; set; }
        public int RelatedFee { get; set; }
        public long BalanceBefore { get; set; }
        public long BalanceAfter { get; set; }
        public long BalanceServiceBefore { get; set; }
        public long BalanceServiceAfter { get; set; }
        public int BankID { get; set; }
        public string BankCode { get; set; }
        public string BankName { get; set; }
        public byte BankType { get; set; }
        public string BankBranch { get; set; }
        public string BankAccount { get; set; }
        public string BankAccountName { get; set; }
        public decimal BankAmount { get; set; }
        public decimal BankFee { get; set; }
        public string BankRefTransID { get;set;}
        public int MerchantID { get; set; }
        public string MerchantName { get; set; }
        public int WebsiteID { get; set; }
        public string CreatedUser { get; set; }
        public DateTime CreatedTime { get; set; }
        public int CreatedUnixTime { get; set; }
        public int ClientUnixTime { get; set; }
        public string ClientIP { get; set; }
        public byte Partition { get; set; }
        public byte TopupType { get; set; }
        public string TopupTypeName { get; set; }
        public byte DeviceTypeID { get; set; }
        public string DeviceTypeName { get; set; }
        public string DeviceTypeGroup { get; set; }
        public int GatePaymentID { get; set; }
        public string GatePaymentCode { get; set; }
        public string GatePaymentName { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.OrdersAPI.DTO
{
    public class MerchantOrder
    {
        public long ID { get; set; }
        public long OrderID { get; set; }
        public int MerchantID { get; set; }
        public int WebsiteID { get; set; }
        public int AccountID { get; set; }
        public string AccountName { get; set; }
        public decimal TotalMerchantAmount { get; set; }
        public decimal MerchantAmount { get; set; }
        public decimal MerchantFee { get; set; }
        public decimal MerchantRefTransID { get; set; }
        public byte CurrentcyType { get; set; }
        public DateTime ResponseTime { get; set; }
        public int ResponseStatus { get; set; }
    }


    public class MerchantRefund // Hoàn tiền Merchant
    {
        public int ID { set; get; }
        public long OrderID { get; set; }
        public byte PayType { set; get; }
        public int PayServiceID { set; get; }
        public string PayserviceCode { set; get; }
        public long RelatedTransactionID { set; get; }
        public int MerchantID { get; set; }
        public int WebsiteID { get; set; }
        public string MerchantRefTransID { set; get; }
        public int MerchantAccountID { get; set; }
        public string MerchantAccountName { get; set; }
        public Int64 RefundAmount { set; get; }
        public Int16 RefundStatus { set; get; }
        public string ConfirmUser { set; get; }
        public string ConfirmReason { set; get; }
        public string Description { set; get; }
        public DateTime CreateTime { set; get; }
        public DateTime ConfirmTime { set; get; }
        public DateTime EndTime { set; get; }
    }
}

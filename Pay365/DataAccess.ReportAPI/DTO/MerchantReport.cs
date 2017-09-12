using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.ReportAPI.DTO
{
    public class MerchantReport
    {
        public int ReportDate { get; set; }
        public DateTime ReportDatetime { get; set; }
        public int WebsiteID { get; set; }
        public string MerchantName { get; set; } //Tên merchant
        public string MerchantAccount { get; set; } //số TK merchant
        public int TotalTrans { get; set; } //số gd
        public long Amount { get; set; } //giá trị gd
        public int Fee { get; set; } //phí KH chịu
        public int MerchantFee { get; set; } //phí merchant chịu
        public long TotalAmount { get; set; } //Số tiền KH chịu
        public long TotalMerchantAmount { get; set; } //số tiền merchant nhận
    }

    public class MerchantReportDetail
    {
        public DateTime CreatedTime { get; set; }
        public int WebsiteID { get; set; }
        public string MerchantName { get; set; }
        public string MerchantAccount { get; set; }
        public string CustomerAccount { get; set; }
        public string CustomerName { get; set; }
        public int BankID { get; set; }
        public string BankCode { get; set; }
        public long Amount { get; set; }
        public int Fee { get; set; }
        public int MerchantFee { get; set; }
        public long TotalAmount { get; set; }
        public long TotalMerchantAmount { get; set; }
    }


    public class MerchantHistory // Lịch sử bán hàng Merchant
    {
        public string CustomerAccount { set; get; }  
        public string CustomerName { set; get; }  // 
        public int TotalTrans { set; get; }  // số giao dịch
        public Int64 Amount { set; get; }
    }

    public class MerchantHistoryDetail   // Lịch sử bán hàng chi tiết
    {
        public DateTime CreatedTime { set; get; }
        public int WebsiteID { set; get; }
        public long TransactionID { set; get; }
        public string CustomerAccount { set; get; }
        public string CustomerName { set; get; }
        public string Descriptions { set; get; }
        public string BankCode { set; get; }
        public long Amount { set; get; }
        public int MerchantFee { set; get; }
        public long TotalMerchantAmount { set; get; }
    }

    public class MerchantHistoryDetailCustomer  // Chi tiết lịch sử bán hàng theo TK khách hàng
    {
        public DateTime CreatedTime { set; get; }
        public int WebsiteID { set; get; }
        public long TransactionID { set; get; }
        public string Descriptions { set; get; }
        public long Amount { set; get; }
        public long TotalMerchantAmount { set; get; }
    }


}

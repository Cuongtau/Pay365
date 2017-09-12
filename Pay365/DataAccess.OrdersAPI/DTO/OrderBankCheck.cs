using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.OrdersAPI.DTO
{
    public class OrderBankCheck
    {
        public long OrderID { set; get; }
        public int ServiceID { set; get; }
        public int BankID { set; get; }
        public int MerchantID { set; get; }
        public int WebsiteID { set; get; }
        public byte PayType { set; get; }    //1 nap tien online , 2 nap tien offline, 3 thanh toan online, 4 rut tien online, 5 rut tien offline
        public long TotalAmount { set; get; }  // tổng tiền giao dịch
        public long Amount { set; get; }        // Tiền nạp 
        public int Fee { set; get; }            // Phí
        public int AccountID { set; get; }      // Id tk ví Pay
        public string AccountName { set; get; }     // Tên TK Ví Pay

        public short OrderStatus { set; get; }
        public long RelatedTransactionID { set; get; }
        public string RedirectURL { set; get; }
        public string NotifyURL { set; get; }
        public string Description { set; get; }
        public DateTime CreatedTime { set; get; }
        public DateTime EndTime { set; get; }
        public string ConfirmUser { get; set; }
        public byte DeviceType { get; set; } //1-Web,2-Wap,3-IOS,4-Android,5-WindowPhone;6 Firefox;7 Chome;8 IE;9 Cốc cốc;10 Safari;11 Opera;12 Trình duyệt khác

        public string BankRefTransID { set; get; } // mã giao dịch ngân hàng

        // Thông tin Bank
        public string BankAccount { set; get; } // tài khoản ngân hàng
        public string BankAccountName { set; get; }
        public decimal BankAmount { set; get; }
        public decimal BankFee { set; get; }
        public DateTime BankCreatedTime { set; get; } // thời gian giao dịch ngân hàng
        public string BankResponseCode { set; get; }
        public int BankResponseStatus { set; get; }
    }
}

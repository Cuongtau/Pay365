using System;

namespace DataAccess.OrdersAPI.DTO
{
    public class OrderBilling
    {
        public long OrderID { set; get; }
        public int ServiceID { set; get; }
        public int BankID { set; get; }
        public int MerchantID { set; get; }
        public int WebsiteID { set; get; }
        public byte PayType { set; get; }    //1 nap tien online , 2 nap tien offline, 3 thanh toan online, 4 rut tien online, 5 rut tien offline
        public long TotalAmount { set; get; }  // tổng tiền giao dịch
        public long Amount { set; get; }        // Tiền nạp 
        public int Fee { set; get; }            // Phí khách hàng chịu
        public int MerchantFee { get; set; }    // Phí merchant chịu
        public int AccountID { set; get; }      // Id tk ví Pay
        public string AccountName { set; get; }     // Tên TK Ví Pay
        public string RedirectURL { set; get; }
        public string NotifyURL { set; get; }
        public long RelatedTransactionID { get; set; }
        public string BankCode { set; get; }  // 
         
        // Thông tin Bank
        public string BankAccount { set; get; } // tài khoản ngân hàng
        public string BankAccountName { set; get; }
        public string BankBranch { set; get; }  // Chi Nhánh
        public decimal BankAmount { set; get; }
        public decimal BankFee { set; get; }
        public byte CurrencyType { get; set; } //1 vnd , 2 usd , 3 eur
        public string BankRedirectURL { set; get; }
        public string BankNotifyURL { set; get; }
        public string BankRefTransID { set; get; } // mã giao dịch ngân hàng
        // Hình thức nạp (1:InternetBanking;2:SMSBanking;3:Ủy nhiệm chi;4:Nộp tại quầy;5:Chuyển khoản ATM)
        // Doi voi chuyen tien: 11: rut online = so tk (TPBank), 12: rut online = so the (cac ngan hang qua dau sacom), 13: rut off
        public byte BankTransType { get; set; }
        public DateTime BankCreatedTime { set; get; } // thời gian giao dịch ngân hàng
        public string BankResponseCode { set; get; }
        public int BankResponseStatus { set; get; }


        //Thông tin merchant thanh toán online qua ví
        public string MerchantRefTransID { get; set; }//Mã GD của merchant
        public int MerchantAccountID { get; set; } //Mã TK merchant
        public string MerchantAccountName { get; set; } //Tên TK merchant
        public long MerchantAmount { get; set; }
        public long MerchantResponseStatus { set; get; }
        public string MerchantRedirectURL { get; set; }
        public string MerchantNotifyURL { get; set; }


        public string ConfirmUser { get; set; }
        public string Description { set; get; }
        public DateTime CreatedTime { set; get; }
        public DateTime EndTime { set; get; }
        public string ClientIP { set; get; }
        public byte DeviceType { get; set; } //1-Web,2-Wap,3-IOS,4-Android,5-WindowPhone;6 Firefox;7 Chome;8 IE;9 Cốc cốc;10 Safari;11 Opera;12 Trình duyệt khác
        public short OrderStatus { set; get; }
        public long ResponseStatus { set; get; }


        // Merchant Refund
        public int ID { set; get; }
        public Int64 RefundAmount { set; get; }
        public Int16 RefundStatus { set; get; }
        public DateTime CreateTime { set; get; }
        public DateTime ConfirmTime { set; get; }

        //Order cho Partner (QRcode, VTCPro, MasterCard..)
        public string OrderCode { get; set; }// Mã đơn hàng
        public int PartnerID { get; set; }
    }

    
    public class OrderOnlineBanking
    {
        public long OrderID { set; get; }
        public int BankID { set; get; }
        public int ServiceID { set; get; }
        public byte PayType { set; get; }    //1 nap tien online , 2 nap tien offline, 3 thanh toan online, 4 rut tien online, 5 rut tien offline
        public long Amount { set; get; }        // Tiền nạp 
        public int Fee { set; get; }            // Phí khách hàng chịu        
        public int AccountID { set; get; }      // Id tk ví Pay
        public string AccountName { set; get; }     // Tên TK Ví Pay
        public string Description { set; get; }
        public DateTime CreatedTime { set; get; }
        public DateTime  EndTime { set; get; }
        public short OrderStatus { set; get; } // 0 khoi tao, 1 thanh cong , 2 huy , 3 cho duyet cms
        public long RelatedTransactionID { get; set; }

        // Thông tin Bank
        public string BankRefTransID { set; get; } // mã giao dịch ngân hàng
        public string BankAccount { set; get; } // tài khoản ngân hàng
        public string BankAccountName { set; get; }
        public decimal BankAmount { set; get; }
        public decimal BankFee { set; get; }
        public DateTime BankCreatedTime { set; get; } // thời gian giao dịch ngân hàng
        public string BankResponseCode { set; get; }
        public int BankResponseStatus { set; get; }       
    }


    public class OrderBank
    {
        public long ID { set; get; }
        public long OrderID { set; get; }
        public int BankID { set; get; }
        public string BankAccount { set; get; }
        public string BankAccountName { set; get; }
        public string BankBranch { set; get; }
        public decimal BankAmount { set; get; }
        public decimal BankFee { set; get; }
        public byte CurrencyType { get; set; }
        public string BankRefTransID { set; get; }
        public string Description { get; set; }
 
        public string RedirectURL { set; get; }
        public string NotifyURL { set; get; }
        public string CustomerEmail { set; get; }
        public string CustomerAddress { set; get; }
        public string CustomerPhone { set; get; }
        public string CustomerIP { set; get; }
        public DateTime CreatedTime { set; get; }
        public DateTime ResponseTime { set; get; }
        public string BankResponseCode { set; get; }
        public int BankResponseStatus { set; get; }
    }

    public class OrderNotify
    {
        public long OrderNotifyID { get; set; }
        public int BankID { set; get; }
        public string BankCode { set; get; }
        public string CommandCode { set; get; }
        public string FunctionName { set; get; }
        public string AccountName { set; get; }
        public long Amount { set; get; }
        public string BankAccount { set; get; }
        public string BankAccountName { set; get; }
        public string BankRefTransID { set; get; }
        public string BankBranch { set; get; }
        public byte BankTransType { set; get; }
        public string OrgMessenger { set; get; }
        public string Description { set; get; }
        public string CustomerMobile { set; get; }
        public DateTime BankCreatedTime { set; get; }
        public DateTime CreatedTime { set; get; }
        public DateTime ExecuteTime { set; get; }
        public DateTime EndTime { set; get; }
        public string ConfirmUser { set; get; }
        public byte NotifyType { set; get; }// = 1 nhan thong bao tu bank , 2 khach hang thong bao tu web, 3 kh nhan sms
        public short OrderStatus { set; get; }  //= 0 chờ duyệt, = 1 thành công , = 2 thất bại
    }


    public class OrderBillingInfo
    {
        public long OrderID { set; get; }
        public int BankID { set; get; }
        public string BankCode { set; get; }
        public string BankName { get; set; }
        public byte BankType { set; get; }
        public string BankBranch { get; set; }
        public string BankAccount { get; set; }
        public string BankAccountName { get; set; }
        public decimal BankAmount { get; set; }
        public decimal BankFee { get; set; }
        public string BankRefTransID { get; set; }
        public int MerchantID { get; set; }
        public string MerchantName { get; set; }
        public int WebsiteID { get; set; }
        public int GatePaymentID { get; set; }
        public string GatePaymentCode { get; set; }
        public string GatePaymentName { get; set; }
    }
    public class OrderExchange
    {
        public long OrderCode { get; set; }
        public int WebsiteID { get; set; }
        public string CardSerial { get; set; }
        public string CardCode { get; set; }
        public Int16 CardType { get; set; }
        public string ReceiveAccount { get; set; }
        public decimal FeeRate { get; set; }
    }
    public class OrderExchangeInfo 
    {
        public long OrderExchangeID { get; set; }
        public int CardAmount { get; set; }
        public int FeeAmount { get; set; }
        public int VcoinAmount { get; set; }
        public long TelcoTransactionID { get; set; }
        public long PayTransactionID { get; set; }
        public long VTCIdTransactionID { get; set; }
        public Int16 OrderStatus { get; set; }
    }

}

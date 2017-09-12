using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.OrdersAPI.DTO
{
    public class BankService
    {
        public int BankID { set; get; }
        public int ServiceID { set; get; }
        public string ServiceName { set; get; }
        public byte Status { set; get; }
    }

    public class BankInfo
    {
        public int BankID { set; get; }
        public string BankCode { set; get; }
        public string BankName { set; get; }
        public int PayServiceID { get; set; }
        public byte BankType { get; set; } // 1: bank nội địa; 2: thẻ quốc tế
        public string WebSite { set; get; }
        public string Logo { set; get; }
        public string Address { set; get; }
        public string Description { set; get; }
        public byte Status { set; get; }
        public DateTime CreatedTime { set; get; }
        public string LogoMobileGrid { set; get; }
        public string LogoMobileIcon { set; get; }
        public string CardColor { set; get; } // Màu
        public string LinkLogo { set; get; } ///
        public string LinkLogoMobileGrid { set; get; }
        public string LinkLogoMobileIcon { set; get; }
        public long BankFeeAmount { get; set; }
    }

    public class BankAccounts
    {
        public int ID { set; get; }
        public int BankID { set; get; }
        public string BankCode { set; get; }
        public string BankName { set; get; }
        public string BankBranch { set; get; }
        public string BankAccount { set; get; }
        public string BankAccountName { set; get; }
        public string BankAccountAddress { set; get; }
        public byte Type { set; get; } // 0: bank của intecom; 1 : bank rút của Khách hàng; 2: bank nạp tiền của khách hàng; 3: bank gan ket
        public byte BankType { set; get; } // 1: bank nội địa; 2: thẻ quốc tế
        // phân biệt loại tài khoản theo từng bank quy định: Số thẻ, tài khoản, mã Khách hàng
        // Loại xác thực. Chỉ dùng với BIDV và TPBank Với ngân hàng TienPhongBank:0: Xác thực số thẻ 1: Xác thực tài khoản 
        // Với ngân hàng BIDV: 804: Xác thực thẻ, 805: xac thuc tai khoan, 806: xac thuc ma kh
        public int BankAccountType { set; get; }
        public string AccountName { set; get; }
        public string Description { set; get; }
        public bool IsDefault { set; get; } // là tài khoản mặc định sử dụng
        public DateTime OpenDate { set; get; }
        public string CardColor { set; get; } // Màu
        public string LinkLogo { set; get; } ///
        public string LinkLogoMobileGrid { set; get; }
        public string LinkLogoMobileIcon { set; get; }
    }

    public class BankConfig
    {
        public int ID { set; get; }
        public int BankConfigID { set; get; }           // ID Bank config
        public int GatePaymentID { set; get; }          // Công Thanh Toán (1	NAPAS ,2 BANKNET, 3 PAYPAL, 4 THEQUOCTE)
        public string GatePaymentCode { set; get; }     // Them de chuyen
        public int BankID { set; get; }                 // ID Ngân Hàng
        public string BankCode { set; get; }            // 
        public byte PayType { get; set; }               // 1 nạp , 11 rút
        public short VerifyOn { get; set; }             // verify trên cổng hay ở ngân hàng
        public bool IsOnline { get; set; }              // =1 dc phep thuc hien giao dich online , = 0 ko co gd online
        public bool IsOffline { get; set; }             // có giao dịch gián tiếp với bank
        public int WaitingTime { set; get; }            // thời gian cho confirm giao dịch ( min - phút)
        public long MaxAmountWaiting { set; get; }      //  gioi han gia tri giao dich cho
        public byte CurrencyType { set; get; }          // 1 vnd , 2 usd
        public string Currency { set; get; }            // vnd, usd
        public string VerifyCard { get; set; }          // chuỗi 6 số đầu tiên trong thẻ của bank  (verify so the, so tai khoan ngan hang)
        public string PublicKey { set; get; }
        public string PrivateKey { set; get; }
        public string URLRoot { set; get; }
        public string URLRedirect { set; get; }
        public string URLCancel { set; get; }
        public string URLNotify { set; get; }
        public string URLDone { set; get; }
        public byte Status { set; get; }                 // Trạng thái  =1 enable hoat dong cua 1 ngan hang, =0 disible hoat dong cua 1 ngan hang
        public DateTime CreatedTime { set; get; }
        public DateTime ModifyTime { get; set; }
        public int VcoinServiceID { get; set; }
        public string VcoinServiceKey { get; set; }
        public int PayServiceID { get; set; }
    }

    public class PostOffice
    {
        public int STT { get; set; }
        public string Name { get; set; }
        public string LocationName { get; set; }
        public string DistrictName { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public int LocationID { get; set; }
        public int DistrictID { get; set; }
        public float X { get; set; }
        public float Y { get; set; }
    }

    // Luu thong tin thanh toan PayPal de dung lai cho cac lan thanh toan sau 
    public class PayPalBilling
    {
        public string EMAIL { get; set; }
        public string PAYERID { get; set; }
        public string BILLING_FIRST_NAME { get; set; }
        public string BILLING_LAST_NAME { get; set; }
        public string BILLING_STREET { get; set; }
        public string BILLING_CITY { get; set; }
        public string BILLING_ZIP { get; set; }
        public string BILLING_EMAIL { get; set; }
        public string BILLING_PHONE { get; set; }
        public string BILLING_COUNTRY { get; set; }
        public DateTime CREATE_TIME { get; set; }
        public DateTime UPDATE_TIME { get; set; }
        public short STATUS { get; set; }
    }

}
  
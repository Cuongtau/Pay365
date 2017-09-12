using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.OrdersAPI.DTO
{
    public class WebsitePayment
    {
        public int ID { get; set; }
        public int AccountID { get; set; }
        public string UrlReturn { get; set; }
        public string Description { get; set; }
        public string PublicKey { get; set; }
        public string PrivateKey { get; set; }
        public string UrlNoitification { get; set; }
        public string Logo { get; set; }
        public string LinkLogo { get; set; }
        public bool Status { get; set; }
        public string WebLabel { get; set; }
        public string WebName { get; set; }
        public int ChargePackageID { get; set; }
        public DateTime CreatedDatetime { get; set; }
    }

    public class AppMobilePayment
    {
        public int ID { get; set; }
        public int AccountID { get; set; }
        public string AppName { get; set; }
        public string AppOS { get; set; }
        public string Language { get; set; }
        public string Description { get; set; }
        public string PrivateKey { get; set; }
        public int ChargePackageID { get; set; }
        public DateTime CreatedDate { get; set; }
    }

    public class PaymentButtons
    {
        public int PaymentButtonID { get; set; }
        public int AccountID { get; set; }
        public string AccountName { get; set; }
        public string ButtonStyle { get; set; } //Nội dung text trên nút
        public string ProductName { get; set; } //Lưu tên sản phẩm đổi với tích hợp blog, forum. Lưu Mã hoàn cảnh đối với tích hợp ủng hộ quyên góp
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public byte PayType { get; set; } //Phương thức thanh toán
        public string UrlSuccess { get; set; }
        public string UrlCancel { get; set; }
        public string Description { get; set; }
        public string ButtonCode { get; set; }
        public string ButtonName { get; set; }
        public int ChargePackageID { get; set; }
        public string PackageCode { get; set; }
        public DateTime CreatedDatetime { get; set; }
        public string EmbedLink { get; set; }
        public string EmbedForum { get; set; }
        public byte ButtonType { get; set; }
        public string PaymentCode { get; set; }
        public string PaymentCurrency { get; set; }
        public int PaymentLanguage { get; set; }
        public string PaymentLogo { get; set; }
        public bool NeedUploadLogo { get; set; }//Có cần upload lại logo ko hay chỉ cần gán name (dùng cho tạo nhiều mã code)
        public string LinkLogo { get; set; }
    }
}

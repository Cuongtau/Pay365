using DataAccess.OrdersAPI.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.OrdersAPI.DAO
{
    public interface IIntegratedPaymentDAO
    {
        WebsitePayment WebsitePayment_GetByWebsiteID(int AccountID, int WebsiteId);
        List<WebsitePayment> WebsitePayment_GetList(int AccountID, int WebsiteId);
        int WebsitePayment_Insert(WebsitePayment websitePayment);
        int WebsitePayment_Update(WebsitePayment websitePayment);
        AppMobilePayment AppMobilePayment_GetByID(int AccountID, int MobileAppID);
        List<AppMobilePayment> AppMobilePayment_GetList(int accountID);
        int AppMobilePayment_Insert(AppMobilePayment appMobilePayment);
        int AppMobilePayment_Update(AppMobilePayment appMobilePayment);
        List<PaymentButtons> PaymentButton_GetList(PaymentButtons paymentBtn);
        int CreatePaymentButton(PaymentButtons paymentButton, ref string buttonCode, ref string paymentCode);
        int UpdatePaymentButton(PaymentButtons paymentButton);
        int DeletePaymentButton(int PaymentButtonID);
        bool CheckAccountIntegrated(int accountID);
        int PaymentButtonUpdateQuantity(int paymentButtonID, int quantity);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.OrdersAPI.DTO;

namespace DataAccess.OrdersAPI.DAO
{
    public interface IBankDAO
    {
        BankService BankService_GetByBankID(int bankId);
        List<BankInfo> GetBankInfo(int bankId, byte bankType);
        BankInfo GetBankInfoByBankCode(string bankCode);
        BankConfig GetBankConfigByBankCodeAndPaytype(string bankCode, byte payType);
        BankConfig GetBankConfig_CashOut(string bankCode);
        BankConfig GetBankConfig_Topup(string bankCode);
        BankConfig GetBankConfig_Topup(int bankID);
        BankConfig GetBankConfig_Payment(string bankCode);

        List<BankInfo> GetBankTopupInfo(int bankId, byte bankType);
        List<BankInfo> GetBankCashOutInfo(int bankId, byte bankType);
        List<BankInfo> GetBankPaymentInfo(int bankId, int websiteId, byte bankType);

        int BankInfo_Insert(string bankCode, string bankName, byte banktype, string webSite, string logo, string address, string description, byte status, string logoMobileGrid, string logoMobileIcon, string cardColor);
        int BankInfo_Update(int bankId, string bankName, byte banktype, string webSite, string logo, string address, string description, string logoMobileGrid, string logoMobileIcon, string cardColor);
        int BankInfo_Delete(int bankId);
        int BankInfo_UpdateStatus(int bankId, byte status);
        List<BankInfo> BankInfo_GetByCondition(int bankId, string bankCode, string bankName, byte bankType, byte status);

        BankAccounts GetVTCIntecom_BankAccounts(int bankId);
        BankAccounts GetVTCIntecom_BankAccounts(string bankCode);
        BankAccounts GetBankAccountByID(int id);
        List<BankAccounts> GetBankAccounts(string accountName, byte type, int bankAccountType);
        int InsertBankAccounts(BankAccounts bankAccount);
        int UpdateBankAccounts(BankAccounts bankAccount);
        int DeleteBankAccounts(int bankAccountsID);
        List<PostOffice> PostOfficeGetPage(int LocationID, int DistrictID, int CurrPage, int PageSize, ref int TotalRecord);

        #region Quản trị thông tin kết nối ngân hàng
        int BankConfig_Insert(BankConfig bankconfig);
        int BankConfig_Update(BankConfig bankconfig);
        int BankConfig_Delete(int bankConfigID);
        int BankConfig_UpdateStatus_byGateWay(int gatePaymentID, byte status);
        List<BankConfig> BankConfig_GetList_Topup();
        BankConfig BankConfig_GetbyID_Topup(int id);
        List<BankConfig> BankConfig_GetList_CashOut();
        BankConfig BankConfig_GetbyID_CashOut(int id);
        #endregion

        List<BankAccounts> GetBankAccountLinks(string accountName);

        int BankAccountLinks_Insert(string accountName, string bankAccount, string bankCode);

        PayPalBilling GetPayPalBillingInfo(string paypalEmail, string payerID);

        bool UpdatePayPalBilling(PayPalBilling paypalBillingInfo);


    }
}

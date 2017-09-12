
using System;
namespace DataAccess.ReportAPI.DTO
{

    public class AccountLogData
    {
        public int TableLogID { get; set; }
        public long RegisterLogID { get; set; }
        public int AccountID { get; set; }
        public string AccountName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public byte AccountType { get; set; }
        public int RegisterType { get; set; }
        public int DeviceType { get; set; }
        public int AccountStatus { get; set; }
        public long SecureLogID { get; set; }
        public byte SecureTypeID { get; set; }
        public string SecureName { get; set; }
        public byte SecureLogType { get; set; }
        public long MinAmount { get; set; }
        public long StatusLogID { get; set; }
        public byte OldStatus { get; set; }
        public byte CurrentStatus { get; set; }
        public long UpdateLogID { get; set; }
        public byte UpdateLogType { get; set; }
        public string EditedData { get; set; }
        public string OldData { get; set; }
        public long VerifyLogID { get; set; }
        public byte VerifyType { get; set; }
        public string VerifyValue { get; set; }
        public long BlockLogID { get; set; }
        public int ServiceID { get; set; }
        public string ServiceName { get; set; }
        public string CreatedUser { get; set; }
        public byte BlockType { get; set; }
        public string Reason { get; set; }
        public DateTime CreatedTime { get; set; }
        public int CreatedUnixTime { get; set; }
        public byte BlockLogType { get; set; }
        public long FreezeLogID { get; set; }
        public int Amount { get; set; }
        public int CurrencyType { get; set; }
        public byte FreezeLogType { get; set; }
        public string Description { get; set; }
        public string ClientIP { get; set; }
        public int UnFreezeUnixTime { get; set; }
        public long BalanceBefore { get; set; }
        public long BalanceAfter { get; set; }
        public long RelatedTranID { get; set; }

    }


 


}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.ReportAPI.DTO
{
    public class MatchMoveReportGeneral
    {
        public DateTime CreatedDate { get; set; }
        public long TotalRegisterBefore { get; set; }
        public long TotalRegisterAfter { get; set; }
        public long TotalRegister { get; set; }
        public long CardFee { get; set; }
        public long TotalCertCard { get; set; }
        public long TotalUnCertCard { get; set; }
        public long TotalVTCLock { get; set; }
        public long TotalAmount { get; set; }
        public long MaintainFee { get; set; }
        public long MaintanFeeOld { get; set; }
        public long TotalMaintainFee { get; set; }
        public long CardtoAmount { get; set; }
        public long TotalCardLock { get; set; }
    }
    public class MatchMoveReportTopup
    {
        public long TopupID { get; set; }
        public DateTime CreatedDatetime { get; set; }
        public long AccountID { get; set; }
        public string AccountName { get; set; }
        public string Fullname { get; set; }
        public string MMCardSerial { get; set; }
        public long Amount { get; set; }
    }
}

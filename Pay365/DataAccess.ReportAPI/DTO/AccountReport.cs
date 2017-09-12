using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.ReportAPI.DTO
{
    public class AccountReport
    {
        public DateTime ReportDate { get; set; }
        public int AccountRegisterWeb { get; set; }
        public int AccountRegisterApp { get; set; }
        public int AccountRegisterPersonal { get; set; }
        public int AccountRegisterEnterprise { get; set; }
        public int AccountActiveWeb { get; set; }
        public int AccountActiveApp { get; set; }
        public int AccountActivePersonal { get; set; }
        public int AccountActiveEnterprise { get; set; }
        public int AccountEmailVerified { get; set; }
        public int AccountVerified { get; set; }
        public int AccountODPSMS { get; set; }
        public int AccountODPEmail { get; set; }
        public int AccountOTPApp { get; set; }
        public int AccountOTPMatrix { get; set; }
        public int TotalSecure { get; set; }
    }

    
}

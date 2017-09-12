using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.ReportAPI.DTO
{
    public class SystemReport
    {
    }
    public class GeneralReportSystem
    {
        public int RegisterNumber { get; set; }
        public int ActiveNumber { get; set; }
        public int AccountHasBalance { get; set; }
        public long BalancePerson { get; set; }
        public long BalanceBussiness { get; set; }
        public long BalanceTransaction { get; set; }
        public long TotalBalance { get; set; }
        public int MerchantAccount { get; set; }
        public int MerchantTransation { get; set; }
        public int MerchantValueAverage { get; set; }
        public long OutputAccount { get; set; }
        public long OutputTransaction { get; set; }
        public long OutputMoney { get; set; }
        public long ArrearsAccount { get; set; }

        public long ArrearsTransaction { get; set; }
        public long ArrearsMoney { get; set; }
        public long InputAccount { get; set; }

        public long InputTransaction { get; set; }
        public long InputMoney { get; set; }
        public long RefundAccount { get; set; }
        public long RefundTransaction { get; set; }
        public long RefundMoney { get; set; }
    }

    public class GeneralBalanceSystem
    {
        public DateTime ReportDate { get; set; }
        public int AccountTypeID { get; set; }
        public string AccountTypeName { get; set; }
        public long TotalAccount { get; set; }
        public long TotalBalance { get; set; }
        public long InputMoney { get; set; }
        public long OutputMoney { get; set; }
        public long RefundMoney { get; set; }
        public long TotalInputMoney { get; set; }
        public long ArrearsMoney { get; set; }
        public long TotalOutputMoney { get; set; }
    }

    public class RiskManagementReport
    {
        public int AccountID { get; set; }
        public string AccountName { get; set; }
        public string FullName { get; set; }
        public DateTime Createdtime { get; set; }
    }

    public class ChartLineReport
    {
        public long ReportDate { get; set; }
        public long TotalValue { get; set; }
    }
    public class ChartPieMoneyReport
    {
        public int AccountTypeID { get; set; }
        public long TotalValue { get; set; }
    }
    public class ChartPieTransReport
    {
        public int PayType { get; set; }
        public long TotalValue { get; set; }
    }

}

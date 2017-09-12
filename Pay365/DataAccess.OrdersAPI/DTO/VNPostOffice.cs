using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.OrdersAPI.DTO
{
    public class VNPostOffice
    {
        public int STT { set; get; }
        public int Id { set; get; } 
        public string Name { set; get; }
        public string LocationName { set; get; }
        public string DistrictName { set; get; }
        public string Address { set; get; }
        public string Phone { set; get; }
        public string Fax { set; get; }
        public int LocationID { set; get; }
        public int DistrictID { set; get; }
        public double X { set; get; }
        public double Y { set; get; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.OrdersAPI.DTO;

namespace DataAccess.OrdersAPI.DAO
{
    public interface IVNPostOfficeDAO
    {
        List<VNPostOffice> VNPostOffice_GetPage(int locationID, int districtID, int curPage, int recordPerPage,
            ref int totalRecord);
        int VNPostOffice_Insert(string name, string locationName, string districtName,
            string address, string phone, string fax, int locationID, int districtID, double x, double y);
        int VNPostOffice_Update(int id, string name, string locationName, string districtName,
            string address, string phone, string fax, int locationID, int districtID, double x, double y);

        VNPostOffice VNPostOffice_GetByID(int id);
    }
}

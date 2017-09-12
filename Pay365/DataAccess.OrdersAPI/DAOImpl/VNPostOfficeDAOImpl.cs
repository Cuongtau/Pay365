using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.OrdersAPI.DAO;
using DataAccess.OrdersAPI.DTO;
using DBHelpers;
using Pay365.Utils;

namespace DataAccess.OrdersAPI.DAOImpl
{
    public class VNPostOfficeDAOImpl : IVNPostOfficeDAO
    {

        // List
        public List<VNPostOffice> VNPostOffice_GetPage(int locationID, int districtID, int curPage, int recordPerPage, ref int totalRecord)
        {
            try
            {
                var pars = new SqlParameter[5];
                pars[0] = new SqlParameter("@_LocationID", locationID == 0 ? DBNull.Value : (object)locationID);
                pars[1] = new SqlParameter("@_DistrictID", districtID == 0 ? DBNull.Value : (object)districtID);
                pars[2] = new SqlParameter("@_CurrPage", curPage);
                pars[3] = new SqlParameter("@_RecordPerPage", recordPerPage);
                pars[4] = new SqlParameter("@_TotalRecord", SqlDbType.Int) { Direction = ParameterDirection.Output };
                var list = new DBHelper(Config.BillingOrdersAPIConnectionString).GetListSP<VNPostOffice>("SP_VNPostOffice_GetPage", pars);
                totalRecord = Convert.ToInt32(pars[4].Value);
                return list;
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new List<VNPostOffice>();
            }
        }


        // Insert
        public int VNPostOffice_Insert(string name, string locationName, string districtName,
            string address, string phone, string fax, int locationID, int districtID, double x, double y)
        {
            try
            {
                var pars = new SqlParameter[11];
                pars[0] = new SqlParameter("@_Name", name);
                pars[1] = new SqlParameter("@_LocationName", locationName);
                pars[2] = new SqlParameter("@_DistrictName", districtName);
                pars[3] = new SqlParameter("@_Address", address);
                pars[4] = new SqlParameter("@_Phone", phone);
                pars[5] = new SqlParameter("@_Fax", fax);
                pars[6] = new SqlParameter("@_LocationID", locationID);
                pars[7] = new SqlParameter("@_DistrictID", districtID);
                pars[8] = new SqlParameter("@_X", x);  // latitude
                pars[9] = new SqlParameter("@_Y", y);   // longitude
                pars[10] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_VNPostOffice_Insert", pars);
                return Convert.ToInt32(pars[10].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }

        // Update
        public int VNPostOffice_Update(int id, string name, string locationName, string districtName,
        string address, string phone, string fax, int locationID, int districtID, double x, double y)
        {
            try
            {
                var pars = new SqlParameter[12];
                pars[0] = new SqlParameter("@_ID", id);
                pars[1] = new SqlParameter("@_Name", name);
                pars[2] = new SqlParameter("@_LocationName", locationName);
                pars[3] = new SqlParameter("@_DistrictName", districtName);
                pars[4] = new SqlParameter("@_Address", address);
                pars[5] = new SqlParameter("@_Phone", phone);
                pars[6] = new SqlParameter("@_Fax", fax);
                pars[7] = new SqlParameter("@_LocationID", locationID);
                pars[8] = new SqlParameter("@_DistrictID", districtID);
                pars[9] = new SqlParameter("@_X", x);  // latitude
                pars[10] = new SqlParameter("@_Y", y);   // longitude
                pars[11] = new SqlParameter("@_ResponseStatus", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(Config.BillingOrdersAPIConnectionString).ExecuteNonQuerySP("SP_VNPostOffice_UpdateDetail", pars);
                return Convert.ToInt32(pars[11].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        } 


        public VNPostOffice VNPostOffice_GetByID(int id)
        {
            try
            { 
                var pars = new SqlParameter[1];
                pars[0] = new SqlParameter("@_ID", id);  //ID 
                return new DBHelper(Config.BillingOrdersAPIConnectionString).GetInstanceSP<VNPostOffice>("SP_VNPostOffice_GetbyID", pars);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return new VNPostOffice();
            }
        }


    }
}

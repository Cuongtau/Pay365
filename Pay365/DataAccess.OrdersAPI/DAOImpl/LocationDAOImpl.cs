using DataAccess.OrdersAPI.DAO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DBHelpers;
using Pay365.Utils;
using DataAccess.OrdersAPI.DTO;

namespace DataAccess.OrdersAPI.DAOImpl
{
    public class LocationDAOImpl : ILocationDAO
    {
        public List<National> GetAllNational()
        {
            try
            {
                var list = new DBHelper(Config.BillingOrdersAPIConnectionString).GetListSP<National>("SP_National_GetList");
                if (list == null || list.Count <= 0)
                    NLogLogger.LogInfo("Sai. Check voi DB SP SP_National_GetList khong lay duoc danh sach quoc gia");
                return list;
            }
            catch (Exception ex)
            {
                NLogLogger.LogInfo("Loi lay danh sach quoc gia" +
                    Environment.NewLine + ex);

                return new List<National>();
            }
        }


    }
}

using DataAccess.OrdersAPI.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.OrdersAPI.DAO
{
    public interface ILocationDAO
    {
        List<National> GetAllNational();
    }

}

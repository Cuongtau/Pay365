using System;
using DataAccess.OrdersAPI.DAO;
using DataAccess.OrdersAPI.Factory;

namespace DataAccess.OrdersAPI.Factory
{
   public abstract class AbstractDAOFactory
   {
       public static AbstractDAOFactory Instance()
       {
           try
           {
               return (AbstractDAOFactory)new ADODAOFactory();
           }
           catch (Exception ex)
           {

               throw new Exception("Couldn't create AbstractDAOFactory: " + ex.Message);  
           }
       }
       public abstract IBankDAO CreateBank();
       public abstract IOrderDAO CreateOrder();
       public abstract IMerchantOrderDAO CreateMerchantOrder();
       public abstract IIntegratedPaymentDAO CreateIntegratedPayment();
       public abstract IVNPostOfficeDAO CreateVnPostOffice();
       public abstract ILocationDAO CreateLocation();
   }
}


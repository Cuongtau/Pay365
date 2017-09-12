using DataAccess.OrdersAPI.Factory;
using DataAccess.OrdersAPI.DAO;
using DataAccess.OrdersAPI.DAOImpl;

namespace DataAccess.OrdersAPI.Factory
{
    public class ADODAOFactory : AbstractDAOFactory
    {
 
        public override IBankDAO CreateBank()
        {
            return (IBankDAO) new BankDAOImpl();
        }
        public override IOrderDAO CreateOrder()
        {
            return (IOrderDAO)new OrderDAOImpl();
        }
      
        public override IMerchantOrderDAO CreateMerchantOrder()
        {
            return (IMerchantOrderDAO)new MerchantOrderDAOImpl();
        }

        public override IIntegratedPaymentDAO CreateIntegratedPayment()
        {
            return (IIntegratedPaymentDAO)new IntegratedPaymentDAOImpl();
        }

        public override IVNPostOfficeDAO CreateVnPostOffice()
        {
            return (IVNPostOfficeDAO) new VNPostOfficeDAOImpl();
        }

        public override ILocationDAO CreateLocation()
        {
            return (ILocationDAO)new LocationDAOImpl();
        }


    }
}

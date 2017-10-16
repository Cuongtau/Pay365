using Shoppin.DataAccess.DAO;
using Shoppin.DataAccess.IDAO;
namespace Shoppin.DataAccess.Factory
{
    public class ADODAOFactory : AbstractDAOFactory
    {
        public override IAccountDAO AccountDAO()
        {
            return (IAccountDAO)new AccountDAO();
        }
    }
}

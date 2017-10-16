using Shoppin.DataAccess.DAO;
using System;
namespace Shoppin.DataAccess.Factory
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
                throw new Exception("Couldn't create AbstractDAOFactory: ");
            }
        }
        public abstract IAccountDAO AccountDAO();
    }
}


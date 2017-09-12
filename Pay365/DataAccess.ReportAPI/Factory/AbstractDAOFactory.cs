using System;
using DataAccess.ReportAPI.DAO;

namespace DataAccess.ReportAPI.Factory
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
       public abstract IUsersDAO CreateUsersDAO();
       public abstract IUsersLogDAO CreateUsersLogDAO();
       public abstract IErrorLogDAO CreateErrorLogDAO();
       public abstract IFucntionsDAO CreateFunctionDAO();
       public abstract IUserRoleDAO CreateUserRoleDAO();
       public abstract IReportDataDAO CreateReportDataDAO();
       public abstract IReportDBDAO CreateReportDBDAO();
   }
}


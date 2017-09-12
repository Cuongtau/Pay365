using System;
using DataAccess.ReportAPI.DAO;
using DataAccess.ReportAPI.DAOImpl;

namespace DataAccess.ReportAPI.Factory
{
    public class ADODAOFactory : AbstractDAOFactory
    {
        public override IUsersDAO CreateUsersDAO()
        {
            return new UsersDAOImpl();
        }

        public override IUsersLogDAO CreateUsersLogDAO()
        {
            return new UsersLogDAOImpl();
        }
        public override IErrorLogDAO CreateErrorLogDAO()
        {
            return new ErrorLogDAOImpl();
        }
        public override IFucntionsDAO CreateFunctionDAO()
        {
            return new FunctionsDAOImpl();
        }
        public override IUserRoleDAO CreateUserRoleDAO()
        {
            return new UserRoleDAOImpl();
        }
        public override IReportDataDAO CreateReportDataDAO()
        {
            return (IReportDataDAO)new ReportDataDAOImpl();
        }
        public override IReportDBDAO CreateReportDBDAO()
        {
            return (IReportDBDAO)new ReportDBDAOImpl();
        }
    }
}

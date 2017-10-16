using DAL.IRepository;
using DAL.Model;
using DbHelpers;
using System;
using System.Data;
using System.Data.SqlClient;
using UtilLibraries;

namespace DAL.Repository
{
    public class AccountRepository: IAccountRepository
    {
        private readonly string connectString;
        public AccountRepository()
        {
            connectString = new ConnectDatabase().ConnectString;
        }

        /// <summary>
        /// Dang ky tk
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        public int Register(Account account)
        {
            try
            {
                var pars = new SqlParameter[5];
                pars[0] = new SqlParameter("@_AccountName", account.AccountName);
                pars[1] = new SqlParameter("@_Password", account.Password);
                pars[2] = new SqlParameter("@_Email", account.Email);
                pars[3] = new SqlParameter("@_PhoneNumber", account.PhoneNumber);
                pars[4] = new SqlParameter("@_ResponseCode", SqlDbType.Int) { Direction = ParameterDirection.Output };
                new DBHelper(connectString).ExecuteNonQuerySP("SP_RegisterAccount", pars);
                return Convert.ToInt32(pars[4].Value);
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return -969;
            }
        }
    }
}

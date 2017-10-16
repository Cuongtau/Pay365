using DAL.IRepository;
using DAL.Model;
using Services.IService;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Service
{
    public class AccountService: IAccountService
    {
        private IAccountRepository _iAccountRepository;
        public AccountService(IAccountRepository iCustomerRepository)
        {
            _iAccountRepository = iCustomerRepository;
        }
        public int Register(Account account)
        {
            return _iAccountRepository.Register(account);
        }
    }
}

using DAL.IRepository;
using DAL.Repository;
using DryIoc;
using Services.IService;
using Services.Service;
namespace ShoppinOnline
{
    public class CompositionConfig
    {
        public CompositionConfig(IRegistrator registrator)
        {
            registrator.Register<IAccountRepository, AccountRepository>();
            registrator.Register<IAccountService, AccountService>();
        }
    }
}

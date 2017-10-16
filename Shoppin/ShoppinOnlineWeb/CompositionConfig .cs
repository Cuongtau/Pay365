using DryIoc;
using Services.IService;
using Services.Service;
namespace ShoppinOnline
{
    public class CompositionConfig
    {
        public CompositionConfig(IRegistrator registrator)
        {
            registrator.Register<IAccountService, AccountService>();
        }
    }
}

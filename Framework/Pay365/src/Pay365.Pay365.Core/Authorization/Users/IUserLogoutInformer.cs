using System.Collections.Generic;
using Abp.Dependency;
using Abp.RealTime;

namespace Pay365.Pay365.Authorization.Users
{
    public interface IUserLogoutInformer
    {
        void InformClients(IReadOnlyList<IOnlineClient> clients);
    }
}

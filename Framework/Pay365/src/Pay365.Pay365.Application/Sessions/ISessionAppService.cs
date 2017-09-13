using System.Threading.Tasks;
using Abp.Application.Services;
using Pay365.Pay365.Sessions.Dto;

namespace Pay365.Pay365.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}

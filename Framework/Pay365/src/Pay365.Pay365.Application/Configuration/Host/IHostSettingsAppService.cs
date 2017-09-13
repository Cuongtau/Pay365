using System.Threading.Tasks;
using Abp.Application.Services;
using Pay365.Pay365.Configuration.Host.Dto;

namespace Pay365.Pay365.Configuration.Host
{
    public interface IHostSettingsAppService : IApplicationService
    {
        Task<HostSettingsEditDto> GetAllSettings();

        Task UpdateAllSettings(HostSettingsEditDto input);

        Task SendTestEmail(SendTestEmailInput input);
    }
}

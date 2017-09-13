using System.Threading.Tasks;
using Abp.Application.Services;
using Pay365.Pay365.Configuration.Tenants.Dto;

namespace Pay365.Pay365.Configuration.Tenants
{
    public interface ITenantSettingsAppService : IApplicationService
    {
        Task<TenantSettingsEditDto> GetAllSettings();

        Task UpdateAllSettings(TenantSettingsEditDto input);

        Task ClearLogo();

        Task ClearCustomCss();
    }
}

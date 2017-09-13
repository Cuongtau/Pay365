using Abp.Application.Services;
using Pay365.Pay365.Tenants.Dashboard.Dto;

namespace Pay365.Pay365.Tenants.Dashboard
{
    public interface ITenantDashboardAppService : IApplicationService
    {
        GetMemberActivityOutput GetMemberActivity();
    }
}

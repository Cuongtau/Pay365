using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Pay365.Pay365.Authorization.Permissions.Dto;

namespace Pay365.Pay365.Authorization.Permissions
{
    public interface IPermissionAppService : IApplicationService
    {
        ListResultDto<FlatPermissionWithLevelDto> GetAllPermissions();
    }
}

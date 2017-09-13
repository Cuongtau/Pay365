using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Pay365.Pay365.Authorization.Permissions.Dto;

namespace Pay365.Pay365.Authorization.Users.Dto
{
    public class GetUserPermissionsForEditOutput
    {
        public List<FlatPermissionDto> Permissions { get; set; }

        public List<string> GrantedPermissionNames { get; set; }
    }
}
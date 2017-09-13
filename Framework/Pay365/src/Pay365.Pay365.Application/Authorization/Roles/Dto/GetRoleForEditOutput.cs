using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Pay365.Pay365.Authorization.Permissions.Dto;

namespace Pay365.Pay365.Authorization.Roles.Dto
{
    public class GetRoleForEditOutput
    {
        public RoleEditDto Role { get; set; }

        public List<FlatPermissionDto> Permissions { get; set; }

        public List<string> GrantedPermissionNames { get; set; }
    }
}
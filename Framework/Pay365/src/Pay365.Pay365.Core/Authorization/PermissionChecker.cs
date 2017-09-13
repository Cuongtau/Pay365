using Abp.Authorization;
using Pay365.Pay365.Authorization.Roles;
using Pay365.Pay365.Authorization.Users;
using Pay365.Pay365.MultiTenancy;

namespace Pay365.Pay365.Authorization
{
    /// <summary>
    /// Implements <see cref="PermissionChecker"/>.
    /// </summary>
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {

        }
    }
}

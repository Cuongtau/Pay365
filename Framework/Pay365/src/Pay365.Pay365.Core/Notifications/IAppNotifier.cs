using System.Threading.Tasks;
using Abp;
using Abp.Notifications;
using Pay365.Pay365.Authorization.Users;
using Pay365.Pay365.MultiTenancy;

namespace Pay365.Pay365.Notifications
{
    public interface IAppNotifier
    {
        Task WelcomeToTheApplicationAsync(User user);

        Task NewUserRegisteredAsync(User user);

        Task NewTenantRegisteredAsync(Tenant tenant);

        Task SendMessageAsync(UserIdentifier user, string message, NotificationSeverity severity = NotificationSeverity.Info);
    }
}

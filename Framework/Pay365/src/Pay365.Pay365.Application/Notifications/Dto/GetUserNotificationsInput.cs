using Abp.Notifications;
using Pay365.Pay365.Dto;

namespace Pay365.Pay365.Notifications.Dto
{
    public class GetUserNotificationsInput : PagedInputDto
    {
        public UserNotificationState? State { get; set; }
    }
}
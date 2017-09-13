using System.Threading.Tasks;
using Abp.Configuration;

namespace Pay365.Pay365.Timing
{
    public interface ITimeZoneService
    {
        Task<string> GetDefaultTimezoneAsync(SettingScopes scope, int? tenantId);
    }
}

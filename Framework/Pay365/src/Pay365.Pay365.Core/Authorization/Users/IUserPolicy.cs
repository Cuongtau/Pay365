using System.Threading.Tasks;
using Abp.Domain.Policies;

namespace Pay365.Pay365.Authorization.Users
{
    public interface IUserPolicy : IPolicy
    {
        Task CheckMaxUserCountAsync(int tenantId);
    }
}

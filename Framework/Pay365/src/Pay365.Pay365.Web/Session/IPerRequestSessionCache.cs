using System.Threading.Tasks;
using Pay365.Pay365.Sessions.Dto;

namespace Pay365.Pay365.Web.Session
{
    public interface IPerRequestSessionCache
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformationsAsync();
    }
}

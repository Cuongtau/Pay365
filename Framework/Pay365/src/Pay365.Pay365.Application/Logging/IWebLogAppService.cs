using Abp.Application.Services;
using Pay365.Pay365.Dto;
using Pay365.Pay365.Logging.Dto;

namespace Pay365.Pay365.Logging
{
    public interface IWebLogAppService : IApplicationService
    {
        GetLatestWebLogsOutput GetLatestWebLogs();

        FileDto DownloadWebLogs();
    }
}

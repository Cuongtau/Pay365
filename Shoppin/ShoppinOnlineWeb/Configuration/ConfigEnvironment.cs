using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Pay365.Pay365.Configuration;
using UtilLibraries;

namespace ShoppinOnline.Configuration
{
    public class ConfigEnvironment
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;
        public string ConnectString { get; private set; }
        public ConfigEnvironment(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = GetAppConfiguration(env);
            CommonStorages.ConnectionString = _appConfiguration.GetConnectionString(ShopConsts.ConnectionStringName);
        }

        private IConfigurationRoot GetAppConfiguration(IHostingEnvironment env)
        {
            return AppConfigurations.Get(env.ContentRootPath, env.EnvironmentName, env.IsDevelopment());
        }
    }
}

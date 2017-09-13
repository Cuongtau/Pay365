using Abp.WebApi.Controllers;

namespace Pay365.Pay365.WebApi
{
    public abstract class Pay365ApiControllerBase : AbpApiController
    {
        protected Pay365ApiControllerBase()
        {
            LocalizationSourceName = Pay365Consts.LocalizationSourceName;
        }
    }
}
using Abp.Domain.Services;

namespace Pay365.Pay365
{
    public abstract class Pay365DomainServiceBase : DomainService
    {
        /* Add your common members for all your domain services. */

        protected Pay365DomainServiceBase()
        {
            LocalizationSourceName = Pay365Consts.LocalizationSourceName;
        }
    }
}

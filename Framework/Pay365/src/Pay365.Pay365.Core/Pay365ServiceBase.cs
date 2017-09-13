using Abp;

namespace Pay365.Pay365
{
    /// <summary>
    /// This class can be used as a base class for services in this application.
    /// It has some useful objects property-injected and has some basic methods most of services may need to.
    /// It's suitable for non domain nor application service classes.
    /// For domain services inherit <see cref="Pay365DomainServiceBase"/>.
    /// For application services inherit Pay365AppServiceBase.
    /// </summary>
    public abstract class Pay365ServiceBase : AbpServiceBase
    {
        protected Pay365ServiceBase()
        {
            LocalizationSourceName = Pay365Consts.LocalizationSourceName;
        }
    }
}
using Abp.Dependency;
using Abp.Runtime.Session;
using Abp.Web.Mvc.Views;

namespace Pay365.Pay365.Web.Views
{
    public abstract class Pay365WebViewPageBase : Pay365WebViewPageBase<dynamic>
    {
       
    }

    public abstract class Pay365WebViewPageBase<TModel> : AbpWebViewPage<TModel>
    {
        public IAbpSession AbpSession { get; private set; }
        
        protected Pay365WebViewPageBase()
        {
            AbpSession = IocManager.Instance.Resolve<IAbpSession>();
            LocalizationSourceName = Pay365Consts.LocalizationSourceName;
        }
    }
}
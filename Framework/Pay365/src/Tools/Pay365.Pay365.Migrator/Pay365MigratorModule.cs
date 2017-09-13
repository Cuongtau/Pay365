using System.Data.Entity;
using System.Reflection;
using Abp.Events.Bus;
using Abp.Modules;
using Castle.MicroKernel.Registration;
using Pay365.Pay365.EntityFramework;

namespace Pay365.Pay365.Migrator
{
    [DependsOn(typeof(Pay365DataModule))]
    public class Pay365MigratorModule : AbpModule
    {
        public override void PreInitialize()
        {
            Database.SetInitializer<Pay365DbContext>(null);

            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
            Configuration.ReplaceService(typeof(IEventBus), () =>
            {
                IocManager.IocContainer.Register(
                    Component.For<IEventBus>().Instance(NullEventBus.Instance)
                );
            });
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
        }
    }
}
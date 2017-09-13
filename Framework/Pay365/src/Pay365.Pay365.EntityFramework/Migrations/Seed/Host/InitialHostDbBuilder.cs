using Pay365.Pay365.EntityFramework;

namespace Pay365.Pay365.Migrations.Seed.Host
{
    public class InitialHostDbBuilder
    {
        private readonly Pay365DbContext _context;

        public InitialHostDbBuilder(Pay365DbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            new DefaultEditionCreator(_context).Create();
            new DefaultLanguagesCreator(_context).Create();
            new HostRoleAndUserCreator(_context).Create();
            new DefaultSettingsCreator(_context).Create();

            _context.SaveChanges();
        }
    }
}

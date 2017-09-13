using EntityFramework.DynamicFilters;
using Pay365.Pay365.EntityFramework;

namespace Pay365.Pay365.Tests.TestDatas
{
    public class TestDataBuilder
    {
        private readonly Pay365DbContext _context;
        private readonly int _tenantId;

        public TestDataBuilder(Pay365DbContext context, int tenantId)
        {
            _context = context;
            _tenantId = tenantId;
        }

        public void Create()
        {
            _context.DisableAllFilters();

            new TestOrganizationUnitsBuilder(_context, _tenantId).Create();

            _context.SaveChanges();
        }
    }
}

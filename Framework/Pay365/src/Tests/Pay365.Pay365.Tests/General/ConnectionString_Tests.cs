using System.Data.SqlClient;
using Shouldly;
using Xunit;

namespace Pay365.Pay365.Tests.General
{
    public class ConnectionString_Tests
    {
        [Fact]
        public void SqlConnectionStringBuilder_Test()
        {
            var csb = new SqlConnectionStringBuilder("Server=localhost; Database=Pay365; Trusted_Connection=True;");
            csb["Database"].ShouldBe("Pay365");
        }
    }
}

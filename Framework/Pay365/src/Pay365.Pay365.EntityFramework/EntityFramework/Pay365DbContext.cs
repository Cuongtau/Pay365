using System.Data.Common;
using System.Data.Entity;
using Abp.Zero.EntityFramework;
using Pay365.Pay365.Authorization.Roles;
using Pay365.Pay365.Authorization.Users;
using Pay365.Pay365.Chat;
using Pay365.Pay365.Friendships;
using Pay365.Pay365.MultiTenancy;
using Pay365.Pay365.Storage;

namespace Pay365.Pay365.EntityFramework
{
    /* Constructors of this DbContext is important and each one has it's own use case.
     * - Default constructor is used by EF tooling on design time.
     * - constructor(nameOrConnectionString) is used by ABP on runtime.
     * - constructor(existingConnection) is used by unit tests.
     * - constructor(existingConnection,contextOwnsConnection) can be used by ABP if DbContextEfTransactionStrategy is used.
     * See http://www.aspnetboilerplate.com/Pages/Documents/EntityFramework-Integration for more.
     */

    public class Pay365DbContext : AbpZeroDbContext<Tenant, Role, User>
    {
        /* Define an IDbSet for each entity of the application */

        public virtual IDbSet<BinaryObject> BinaryObjects { get; set; }

        public virtual IDbSet<Friendship> Friendships { get; set; }

        public virtual IDbSet<ChatMessage> ChatMessages { get; set; }

        public Pay365DbContext()
            : base("Default")
        {
            
        }

        public Pay365DbContext(string nameOrConnectionString)
            : base(nameOrConnectionString)
        {

        }

        public Pay365DbContext(DbConnection existingConnection)
           : base(existingConnection, false)
        {

        }

        public Pay365DbContext(DbConnection existingConnection, bool contextOwnsConnection)
            : base(existingConnection, contextOwnsConnection)
        {

        }
    }
}

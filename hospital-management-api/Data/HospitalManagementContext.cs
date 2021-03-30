using Microsoft.EntityFrameworkCore;

namespace hospital_management_api.Data
{
    public class HospitalManagementContext : DbContext
    {
        public HospitalManagementContext(DbContextOptions<HospitalManagementContext> options)
                    : base(options)
        {
        }

        public DbSet<Lookup> Lookup { get; set; }
        public DbSet<LookupType> LookupType { get; set; }
        public DbSet<Question> Question { get; set; }
    }
}
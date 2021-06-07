using hospital_management_api.Models;
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
        public DbSet<Address> Address { get; set; }
        public DbSet<Patient> Patient { get; set; }
        public DbSet<Doctor> Doctor { get; set; }
        public DbSet<Hospital> Hospital { get; set; }
        public DbSet<Appointment> Appointment { get; set; }
        public DbSet<AppointmentSlot> AppointmentSlot { get; set; }
        public DbSet<AppointmentSlotCancelled> AppointmentSlotCancelled { get; set; }
        public DbSet<NGXLogInterface> Log { get; set; }
    }
}
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Recruitment.Domain.Entities;

namespace Recruitment.Persistence
{
    public interface IRecruitmentDbContext
    {
        int SaveChanges();
    }

    public class RecruitmentDbContext : IdentityDbContext<User, ApplicationRole, string, IdentityUserClaim<string>,
        ApplicationUserRole, IdentityUserLogin<string>,
        IdentityRoleClaim<string>, IdentityUserToken<string>>, IRecruitmentDbContext
    {
        public RecruitmentDbContext(string connectionString) : base(GetOptions(connectionString))
        { }

        public RecruitmentDbContext(DbContextOptions<RecruitmentDbContext> options) : base(options)
        { }

        private static DbContextOptions GetOptions(string connectionString)
        {
            return new DbContextOptionsBuilder().UseSqlServer(connectionString).Options;
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<JobTitle> JobTitles { get; set; }
        public DbSet<CustomerJobTitle> CustomersJobTitles { get; set; }

        public static object SqlServerDbContextOptionsExtensions { get; private set; }
    }
}
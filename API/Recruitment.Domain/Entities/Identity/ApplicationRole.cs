using Microsoft.AspNetCore.Identity;

namespace Recruitment.Domain.Entities
{
    public class ApplicationRole : IdentityRole
    {
        public string Description { get; set; }
        public ICollection<ApplicationUserRole> UserRoles { get; set; }
    }
}
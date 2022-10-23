using Microsoft.AspNetCore.Identity;

namespace Recruitment.Domain.Entities
{
    public class ApplicationUserRole : IdentityUserRole<string>
    {
        public virtual User User { get; set; }
        public virtual ApplicationRole Role { get; set; }
    }
}
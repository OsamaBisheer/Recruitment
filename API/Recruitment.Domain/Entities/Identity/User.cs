using Microsoft.AspNetCore.Identity;
using Recruitment.Domain.ViewModels;

namespace Recruitment.Domain.Entities
{
    public class User : IdentityUser
    {
        public int CustomerId { get; set; }

        public bool IsEnabled { get; set; }

        public ICollection<ApplicationUserRole> UserRoles { get; set; }

        public static User Create(CustomerModel customerUser)
        {
            return new User
            {
                UserName = customerUser.Email,
                Email = customerUser.Email,
                EmailConfirmed = false,
                IsEnabled = true,
                PhoneNumber = $"{customerUser.Mobile}",
                PhoneNumberConfirmed = false
            };
        }
    }
}
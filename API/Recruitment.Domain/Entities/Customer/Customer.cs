using Recruitment.Domain.ViewModels;

namespace Recruitment.Domain.Entities
{
    public class Customer : AuditableEntity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }

        public ICollection<CustomerJobTitle> CustomerJobTitles { get; set; }

        public static Customer Create(CustomerModel model)
        {
            return new Customer()
            {
                Name = model.Name,
                Email = model.Email,
                Mobile = model.Mobile,
            };
        }
    }
}
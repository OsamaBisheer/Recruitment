using System.ComponentModel.DataAnnotations.Schema;

namespace Recruitment.Domain.Entities
{
    public class CustomerJobTitle : AuditableEntity
    {
        [ForeignKey("Customer")]
        public int CustomerId { get; set; }

        [ForeignKey("JobTitle")]
        public int JobTitleId { get; set; }

        public Customer Customer { get; set; }

        public JobTitle JobTitle { get; set; }

        public static CustomerJobTitle Create(int customerId, int jobTitleId)
        {
            return new CustomerJobTitle { CustomerId = customerId, JobTitleId = jobTitleId };
        }
    }
}
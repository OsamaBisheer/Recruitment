using Recruitment.Domain.Enums;
using Recruitment.Domain.ViewModels;
using System.ComponentModel.DataAnnotations.Schema;

namespace Recruitment.Domain.Entities
{
    public class JobTitle : AuditableEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Responsibilities { get; set; }
        public string Skills { get; set; }

        [Column(TypeName = "tinyint")]
        public JobCategory JobCategory { get; set; }

        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public int MaximumApplications { get; set; }

        public ICollection<CustomerJobTitle> CustomersJobTitle { get; set; }

        public static JobTitle Create(JobTitleModel model)
        {
            return new JobTitle()
            {
                Name = model.Name,
                Description = model.Description,
                Responsibilities = model.Responsibilities,
                Skills = model.Skills,
                JobCategory = model.JobCategory,
                From = model.From,
                To = model.To,
                MaximumApplications = model.MaximumApplications,
                CreatedBy=model.CreatedByUserName
            };
        }

        public void Update(JobTitleModel model)
        {
            Name = model.Name;
            Description = model.Description;
            Responsibilities = model.Responsibilities;
            Skills = model.Skills;
            JobCategory = model.JobCategory;
            From = model.From;
            To = model.To;
            MaximumApplications = model.MaximumApplications;
            SetLastUpdated(model.CreatedByUserName);
        }
    }
}
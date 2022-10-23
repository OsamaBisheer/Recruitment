using DelegateDecompiler;
using Recruitment.Domain.Entities;
using Recruitment.Domain.Enums;
using Recruitment.Domain.Utilities;

namespace Recruitment.Domain.ViewModels
{
    public class JobTitleModel:ViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Responsibilities { get; set; }
        public string Skills { get; set; }

        public JobCategory JobCategory { get; set; }

        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public int MaximumApplications { get; set; }

        public string Validate()
        {
            if (string.IsNullOrWhiteSpace(Name)) return "Name is required";

            if (string.IsNullOrWhiteSpace(Description)) return "Description is required";

            if (string.IsNullOrWhiteSpace(Responsibilities)) return "Responsibilities is required";

            if (string.IsNullOrWhiteSpace(Skills)) return "Skills is required";

            if (MaximumApplications < 1) return "Max applications should be positive number";

            if (DateUtility.IsFirstLower(To, From)) return "To date can not be lower than from date";

            return null;
        }

        [Decompile]
        public static JobTitleModel Create(JobTitle jobTitle)
        {
            return new JobTitleModel
            {
                Id = jobTitle.Id,
                Name = jobTitle.Name,
                Description = jobTitle.Description,
                Responsibilities = jobTitle.Responsibilities,
                Skills = jobTitle.Skills,
                JobCategory = jobTitle.JobCategory,
                From = jobTitle.From,
                To = jobTitle.To,
                MaximumApplications = jobTitle.MaximumApplications,
            };
        }
    }
}
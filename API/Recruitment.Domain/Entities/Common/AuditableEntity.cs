namespace Recruitment.Domain.Entities
{
    public class AuditableEntity : Entity
    {
        public AuditableEntity()
        {
            DateTime dateTimeNow = DateTime.UtcNow;
            CreatedOn = dateTimeNow;
            CreatedOnSearchable = dateTimeNow.Ticks;
            CreatedBy = "System";
        }

        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedOn { get; set; }
        public bool IsDeleted { get; set; }
        public long? CreatedOnSearchable { get; set; }

        public void SetLastUpdated(string userName = "System")
        {
            LastUpdatedOn = DateTime.UtcNow;
            LastUpdatedBy = !string.IsNullOrEmpty(userName) ? userName : "System";
        }
    }
}
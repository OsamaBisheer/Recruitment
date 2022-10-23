using Recruitment.Domain.Entities;
using Recruitment.Domain.ViewModels;

namespace Recruitment.Domain.IRepositories
{
    public interface IJobTitleRepository : IGenericRepository<JobTitle>
    {
        DataTableResponse<JobTitleModel> GetJobTitles(DataTableRequest request);
    }
}
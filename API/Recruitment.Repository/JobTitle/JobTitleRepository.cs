using DelegateDecompiler;
using Recruitment.Repository.Common;
using Recruitment.Domain.Entities;
using Recruitment.Domain.IRepositories;
using Recruitment.Domain.ViewModels;
using Recruitment.Repository.Helpers;
using Recruitment.Persistence;

namespace Recruitment.Repository.JobTitles
{
    public class JobTitleRepository : GenericRepository<JobTitle>, IJobTitleRepository
    {
        public JobTitleRepository(RecruitmentDbContext context) : base(context)
        {
        }

        public DataTableResponse<JobTitleModel> GetJobTitles(DataTableRequest request)
        {
            var search = string.IsNullOrEmpty(request.Search) ? string.Empty : request.Search.ToLower();

            var result = GetAll().OrderByDescending(jt => jt.Id).Where(jt => !jt.IsDeleted)
                .Where(jt => jt.Name.ToLower() == search || jt.Name.ToLower().Contains(search))
                .Decompile().Select(ui => JobTitleModel.Create(ui));

            int totalRecords = result.Count();

            result = result.OrderByDynamic(request.OrderColumn, request.OrderDir)
                .Skip(request.PageNumber * request.PageSize)
                .Take(request.PageSize);

            return result.ToDataTableResult(totalRecords);
        }
    }
}
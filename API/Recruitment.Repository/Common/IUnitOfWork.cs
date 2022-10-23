using Recruitment.Domain.Entities;
using Recruitment.Domain.IRepositories;
using Recruitment.Persistence;

namespace Recruitment.Repository.Common
{
    public interface IUnitOfWork : IDisposable
    {
        IJobTitleRepository JobTitles { get; }
        IGenericRepository<Customer> Customers { get; }
        IGenericRepository<CustomerJobTitle> CustomersJobTitles { get; }

        RecruitmentDbContext Context { get; }

        int Commit();
    }
}
using Recruitment.Domain.Entities;
using Recruitment.Domain.IRepositories;
using Recruitment.Persistence;
using Recruitment.Repository.JobTitles;

namespace Recruitment.Repository.Common
{
    /// <summary>
    /// The Entity Framework implementation of IUnitOfWork
    /// </summary>
    public sealed class UnitOfWork : IUnitOfWork
    {
        /// <summary>
        /// The DbContext
        /// </summary>
        public RecruitmentDbContext Context { get; }

        public IJobTitleRepository JobTitles { get; private set; }
        public IGenericRepository<Customer> Customers { get; private set; }
        public IGenericRepository<CustomerJobTitle> CustomersJobTitles { get; private set; }

        /// <summary>
        /// Initializes a new instance of the UnitOfWork class.
        /// </summary>
        /// <param name="context">The object context</param>
        public UnitOfWork(RecruitmentDbContext context)
        {
            Context = context;

            JobTitles = new JobTitleRepository(context);
            Customers = new GenericRepository<Customer>(context);
            CustomersJobTitles = new GenericRepository<CustomerJobTitle>(context);
        }

        /// <summary>
        /// Saves all pending changes
        /// </summary>
        /// <returns>The number of objects in an Added, Modified, or Deleted state</returns>
        public int Commit()
        {
            // Save changes with the default options
            return Context.SaveChanges();
        }

        /// <summary>
        /// Disposes the current object
        /// </summary>
        public void Dispose()
        {
            Context.Dispose();
        }
    }
}
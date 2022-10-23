using System.Linq.Expressions;

namespace Recruitment.Domain.IRepositories
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        TEntity Find(int id);

        IQueryable<TEntity> GetAll();

        IQueryable<TEntity> GetAllIncluding(params Expression<Func<TEntity, object>>[] includes);

        IQueryable<TEntity> Get(Expression<Func<TEntity, bool>> predicate);

        IQueryable<TEntity> GetIncluding(Expression<Func<TEntity, bool>> predicate, params Expression<Func<TEntity, object>>[] includes);

        TEntity SingleOrDefault(Expression<Func<TEntity, bool>> predicate);

        TEntity AddAndSave(TEntity entity);

        TEntity Add(TEntity entity);

        void AddRange(IEnumerable<TEntity> entities);

        TEntity UpdateAndSave(TEntity entity);

        TEntity Update(TEntity entity);

        void UpdateAll(List<TEntity> entities);

        void RemoveAndSave(TEntity entity);

        void Remove(TEntity entity);

        void RemoveRange(IEnumerable<TEntity> entities);

        void Commit();
    }
}
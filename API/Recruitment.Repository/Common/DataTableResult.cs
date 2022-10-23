using Microsoft.EntityFrameworkCore;
using Recruitment.Domain.ViewModels;

namespace Recruitment.Repository.Common
{
    public static class DataTableResult
    {
        public static DataTableResponse<T> ToDataTableResult<T>(this IQueryable<T> q, int totalRecords) where T : class
        {
            return q.AsNoTracking().ToList().ToDataTableResult(totalRecords);
        }

        public static DataTableResponse<T> ToDataTableResult<T>(this List<T> list, int totalRecords)
        {
            return new DataTableResponse<T>
            {
                Data = list,
                TotalRecords = totalRecords
            };
        }
    }
}
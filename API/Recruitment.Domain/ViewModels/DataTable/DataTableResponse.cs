namespace Recruitment.Domain.ViewModels
{
    public class DataTableResponse<T>
    {
        public int TotalRecords { get; set; }
        public IList<T> Data { get; set; }
    }
}
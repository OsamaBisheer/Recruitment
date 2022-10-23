﻿namespace Recruitment.Domain.ViewModels
{
    public class DataTableRequest
    {
        public string Search { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string OrderColumn { get; set; }
        public int OrderDir { get; set; }
    }
}
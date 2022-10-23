namespace Recruitment.Domain.ViewModels
{
    public class ResponseModel
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public dynamic Result { get; set; }
    }

    public class SuccessResponseModel : ResponseModel
    {
        public SuccessResponseModel()
        {
            IsSuccess = true;
        }
    }

    public class FailureResponseModel : ResponseModel
    {
        public FailureResponseModel()
        {
            IsSuccess = false;
        }
    }
}
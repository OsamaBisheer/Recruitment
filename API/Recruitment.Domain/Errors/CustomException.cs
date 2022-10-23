namespace Recruitment.Domain.Errors
{
    public class CustomException : Exception
    {
        public CustomException()
        {
        }

        public CustomException(string msg)
            : base(msg)
        {
        }
    }
}
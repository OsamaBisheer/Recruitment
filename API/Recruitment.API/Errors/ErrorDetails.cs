using Newtonsoft.Json;

namespace Portfolio.API.Errors
{
    public class ErrorDetails
    {
        public int StatusCode { get; set; }
        public string MethodName { get; set; }
        public string Message { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
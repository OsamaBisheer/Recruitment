using log4net;
using log4net.Config;
using Recruitment.Domain.Errors;
using System.Diagnostics;
using System.Net;
using System.Reflection;

namespace Portfolio.API.Errors
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            string message = exception.Message;

            if (exception.InnerException != null)
            {
                message = exception.InnerException.Message;
            }

            var s = new StackTrace(exception);
            var thisAsm = Assembly.GetExecutingAssembly();
            var methodName = s.GetFrames().Select(f => f.GetMethod()).First(m => m.Module.Assembly == thisAsm).Name.Trim();

            var logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
            XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));

            var logMessage = $"\r\n Message: {message}\r\n Method Name: {methodName}\r\n At: {exception.StackTrace }";
            LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType).Error(logMessage);

            return context.Response.WriteAsync(new ErrorDetails()
            {
                StatusCode = context.Response.StatusCode,
                MethodName = methodName,
                Message = (exception is CustomException) ? message : "Server Error"
            }.ToString());
        }
    }
}
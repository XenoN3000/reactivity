using System.Net;
using System.Text.Json;
using Application.Core;

namespace API.Middleware;

public class ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
{
    private readonly RequestDelegate _next = next;
    private readonly ILogger<ExceptionMiddleware> _logger = logger;
    private readonly IHostEnvironment _env = env;


    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            if (ex.InnerException != null)
            {
                _logger.LogError(ex.InnerException, ex.InnerException.Message);

            }

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            // var respone = _env.IsDevelopment()
            //     ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace)
            //     : new AppException(context.Response.StatusCode, "Internal Server Error");

            var respone = new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace);

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            
            var json = JsonSerializer.Serialize(respone, options);
            
            await context.Response.WriteAsync(json);
        }
    }
}
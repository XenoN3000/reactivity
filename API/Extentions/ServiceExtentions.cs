using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extentions;

public static class ServiceExtentions
{
    public static void ConfigureCors(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy",
                builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000"));
        });
    }

    public static void ConfigureIISIntegration(this IServiceCollection services)
    {
        services.Configure<IISOptions>(option => { });
    }


    public static void ConfigurDatabase(this IServiceCollection services, string connetionStringName) =>
        services.AddDbContext<DataContext>(opt =>
        {
            opt.UseSqlite(connetionStringName);
        });
}
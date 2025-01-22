using Application.Activities;
using Application.Core;
using Application.Interfaces;
using CloudinaryDotNet;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Photos;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions;

public static class ServiceExtensions
{
    public static IServiceCollection ConfigureHttpContextAccessor(this IServiceCollection services)
    {
        services.AddHttpContextAccessor();
        services.AddScoped<IUserAccessor, UserAccessor>();

        return services;
    }

    public static IServiceCollection ConfigureControllerServices(this IServiceCollection services)
    {
        services.AddControllers(options =>
        {
            var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
            options.Filters.Add(new AuthorizeFilter(policy));
        });

        return services;
    }

    public static IServiceCollection ConfigureCors(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy",
                builder =>
                    builder
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials()
                        .WithOrigins("http://localhost:3000"));
        });

        return services;
    }

    // public static IServiceCollection ConfigureIISIntegration(this IServiceCollection services)
    // {
    //     services.Configure<IISOptions>(option => { });
    //     return services;
    // }


    public static IServiceCollection AddMediatorConfig(this IServiceCollection services)
    {
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(List.Handler).Assembly));

        return services;
    }


    public static IServiceCollection AddSignalRConfig(this IServiceCollection services)
    {
        services.AddSignalR();
        return services;
    }


    public static IServiceCollection AddAutoMapperConfig(this IServiceCollection services)
    {
        services.AddAutoMapper(typeof(MappingProfiles).Assembly);
        return services;
    }

    public static IServiceCollection AddValidationConfig(this IServiceCollection services)
    {
        services.AddFluentValidationAutoValidation();
        services.AddValidatorsFromAssemblyContaining<Create>();

        return services;
    }

    public static IServiceCollection AddCloudConfig(this IServiceCollection services, IConfigurationSection section)
    {
        services.AddScoped<IPhotoAccessor, PhotoAccessor>();
        services.Configure<CloudSettings>(section);

        return services;
    }

    public static IServiceCollection ConfigurDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<DataContext>(opt =>
        {
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            string connStr;

            if (env == "Development")
            {
                connStr = configuration.GetConnectionString("DefaultConnection");
            }
            else
            {
                var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
                
                // Parse connection URL to connection string for Npgsql
                connUrl = connUrl.Replace("postgresql://", string.Empty);
                var pgUserPass = connUrl.Split("@")[0];
                var pgHostPortDb = connUrl.Split("@")[1];
                var pgHostPort = pgHostPortDb.Split("/")[0];
                var pgDb = pgHostPortDb.Split("/")[1];
                var pgUser = pgUserPass.Split(":")[0];
                var pgPass = pgUserPass.Split(":")[1];
                var pgHost = pgHostPort.Split(":")[0];
                var pgPort = pgHostPort.Split(":")[1];

                // var pgHost = "reactivities";
                // var pgPort = "5432";
                // var pgUser = "root";
                // var pgPass = "y2ZBlbRa3WA3cQ4GK90vcGqV";
                // var pgDb = "reactivities";
                
                // connStr = configuration.GetConnectionString("DefaultConnection");


                connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb}; Trust Server Certificate=true";
            }
            opt.UseNpgsql(connStr);
        });
        return services;
    }
}
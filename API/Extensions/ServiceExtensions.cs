using Application.Activities;
using Application.Core;
using Application.Interfaces;
using FluentValidation;
using FluentValidation.AspNetCore;
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
                builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000"));
        });

        return services;
    }

    public static IServiceCollection ConfigureIISIntegration(this IServiceCollection services)
    {
        services.Configure<IISOptions>(option => { });
        return services;
    }


    public static IServiceCollection AddMediatorConfig(this IServiceCollection services)
    {
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(List.Handler).Assembly));

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

    public static IServiceCollection ConfigurDatabase(this IServiceCollection services, string connetionStringName)
    {
        services.AddDbContext<DataContext>(opt => { opt.UseSqlite(connetionStringName); });

        return services;
    }
}
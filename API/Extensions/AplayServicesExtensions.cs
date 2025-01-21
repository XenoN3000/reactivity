namespace API.Extensions;

public static class AplayServicesExtensions
{
    public static IServiceCollection ApplayServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.ConfigureControllerServices();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.ConfigurDatabase(configuration);
        services.ConfigureCors();
        services.AddMediatorConfig();
        services.AddAutoMapperConfig();
        services.AddIdentityServices(configuration);
        services.AddValidationConfig();
        services.AddCloudConfig(configuration.GetSection("Cloudinary"));
        services.ConfigureHttpContextAccessor();
        services.AddSignalRConfig();
        
        return services;
    }
}
namespace API.Extensions;

public static class AplayServicesExtensions
{
    public static IServiceCollection ApplayServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.ConfigureControllerServices();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.ConfigurDatabase(configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException());
        services.ConfigureCors();
        services.ConfigureIISIntegration();
        services.AddMediatorConfig();
        services.AddAutoMapperConfig();
        services.AddIdentityServices(configuration);
        services.AddValidationConfig();
        services.AddCloudConfig(configuration.GetSection("Cloudinary"));
        services.ConfigureHttpContextAccessor();
        
        return services;
    }
}
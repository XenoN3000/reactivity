namespace API.Extentions;

public static class ApplayServicesExtetions
{
    public static IServiceCollection ApplayServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.ConfigurDatabase(configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException());
        services.ConfigureCors();
        services.ConfigureIISIntegration();
        services.AddMediatorConfig();
        services.AddAutoMapperConfig();

        return services;
    }
}
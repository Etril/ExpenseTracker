public static class ServiceExtensions
{
    public static void AddAuthServices(this IServiceCollection services)
    {
        services.AddScoped<IAuthService, AuthService>();
    }

    public static void AddExpensesServices(this IServiceCollection services)
    {
        
    }
}

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;


static class JwtAuthExtensions
{
    public static IServiceCollection AddJwtAuth(this IServiceCollection services, IConfiguration config)
    {
        var key= Encoding.UTF8.GetBytes(config.["Jwt:Key"]);

        services.AddAuthentication(options =>
        {
           options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme; 

        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
        
        {
            ValidateIssuer= true,
            ValidateAudience= true,
            ValidateLifetime= true,
            ValidateIssuerSigningKey= true,
            ValidIssuer= config["Jwt:issuer"],
            ValidAudience= config["Jwt:Audience"],
            IssuerSigningKey= new SymmetricSecurityKey(key)

        };
        }
        
        );
    return services;    
    }
    
}
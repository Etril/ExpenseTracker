using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using backend.DTOs;
using Microsoft.AspNetCore.Hosting;


public class AuthService : IAuthService
{
    private readonly string _userFilePath;
    private readonly IConfiguration _config;
    private readonly byte[] _signingKey;

    public AuthService(IWebHostEnvironment env, IConfiguration config)
    {
        
        _userFilePath = Path.Combine(env.ContentRootPath, "Data", "user.json");
        _config = config;

        var key = _config["Jwt:Key"];
        _signingKey = Encoding.UTF8.GetBytes(key ?? throw new ArgumentNullException("Jwt:Key not configured"));
    }

    public async Task<LoginResponseDto> LoginAsync(LoginRequestDto dto)
    {
        var json = await File.ReadAllTextAsync(_userFilePath);
        var info = JsonSerializer.Deserialize<UserModel>(json);

        if (info == null ||
        info.user != dto.User ||
        info.password != dto.Password)
{
    return new LoginResponseDto
    {
        Success = false,
        Message = "Invalid credentials"
    };
}

var claims = new[]
{
    new Claim(ClaimTypes.Name, info.user!),
    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
};

var creds = new SigningCredentials(
    new SymmetricSecurityKey(_signingKey),
    SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
    issuer: _config["Jwt:Issuer"],
    audience: _config["Jwt:Audience"],
    claims: claims,
    expires: DateTime.UtcNow.AddMinutes(
        Convert.ToDouble(_config["Jwt:ExpireMinutes"])
    ),
    signingCredentials: creds
);

var jwt = new JwtSecurityTokenHandler().WriteToken(token);

return new LoginResponseDto
{
    Success = true,
    Token = jwt
};


    }
}
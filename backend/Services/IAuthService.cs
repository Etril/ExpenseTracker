using backend.DTOs;
using Microsoft.AspNetCore.Identity.Data;

public interface IAuthService
{
    Task<LoginResponseDto> LoginAsync(LoginRequestDto dto);
}

using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class LoginRequestDto
    {
        [Required]
        public string? User { get; set; }

        [Required]
        public string? Password { get; set; }
    }

    public class LoginResponseDto
    {
        public bool Success { get; set; }
        public string? Token { get; set; }
        public string? Message { get; set; }

    }
}


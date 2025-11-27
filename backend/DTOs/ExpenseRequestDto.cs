using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{

public class ExpenseRequestDto
{
    [Required]
    public string? Title {get; set;}

    [Required]
    public decimal Amount {get; set;}

    [Required]
    public string? Category {get; set;}
    
    [Required]
    public DateTime Date { get; set; }

    [Required]
    public string? Type {get; set;}
}

public class ExpensesRequestResponseDto {

    public bool Success { get; set; }
    public string? Message {get; set;}
}
}


public class ExpensesResponseDto
{
    
    public int Id { get; set ; }
    public string? Title { get; set;}
    
    public decimal Amount { get; set; }

    public string? Category { get; set; }

    public DateTime Date { get; set; }

    public string? Type { get; set; }


}
using backend.DTOs;

public interface IExpensesService
{
    Task<IEnumerable<ExpensesResponseDto>> GetAllExpensesAsync();
    Task<WidgetsDto> GetWidgetsAsync();
    
    Task<TrendsDto> GetTrendsAsync();

    Task<ExpensesRequestResponseDto> PostExpenseAsync (ExpenseRequestDto dto);
    
}
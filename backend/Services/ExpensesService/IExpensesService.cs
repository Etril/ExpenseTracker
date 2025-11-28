using backend.DTOs;

public interface IExpensesService
{
    Task<IEnumerable<ExpensesResponseDto>> GetAllExpensesAsync();
    Task<WidgetsDto> GetWidgetsAsync();
    
    Task<TrendsDto> GetTrendsAsync();

    Task<ExpensesRequestResponseDto> PostExpenseAsync (ExpenseRequestDto dto);

    Task<ExpensesRequestResponseDto> DeleteExpenseAsync(int id);

    Task<ExpensesRequestResponseDto> PutExpenseAsync (int id, ExpenseRequestDto dto);
    
    
}
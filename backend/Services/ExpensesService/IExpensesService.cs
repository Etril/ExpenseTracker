using backend.DTOs;

public interface IExpensesService
{
    Task<IEnumerable<ExpensesResponseDto>> GetAllExpensesAsync();
}
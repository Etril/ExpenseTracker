using System.Linq;
using System.Text;
using System.Text.Json;
using backend.DTOs;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;

public class ExpensesService : IExpensesService 
{
    
    private readonly string _expensesFilePath;

    public ExpensesService(IWebHostEnvironment env) {
         _expensesFilePath = Path.Combine(env.ContentRootPath, "Data", "expenses.json");
    }
    
    public async Task<IEnumerable<ExpensesResponseDto>> GetAllExpensesAsync()
    {
    
        var json= await File.ReadAllTextAsync(_expensesFilePath);
        var db = JsonSerializer.Deserialize<ExpensesDb>(
    json,
    new JsonSerializerOptions
    {
        PropertyNameCaseInsensitive = true
    });
        
        if (db.Expenses == null) {
            return Enumerable.Empty<ExpensesResponseDto>();
        }

        return db.Expenses.Select (e => new ExpensesResponseDto {
            Title = e.Title, 
            Amount= e.Amount, 
            Category = e.Category, 
            Date= e.Date, 
            Type = e.Type
        });


    }


}
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

        var json = await File.ReadAllTextAsync(_expensesFilePath);
        var db = JsonSerializer.Deserialize<ExpensesDbModel>(
    json,
    new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
);

var expenses = db?.Expenses ?? new List<ExpensesModel>();
        
        if (expenses == null) {
            return Enumerable.Empty<ExpensesResponseDto>();
        }

        return expenses.Select (e => new ExpensesResponseDto {
            Title = e.Title, 
            Amount= e.Amount, 
            Category = e.Category, 
            Date= e.Date, 
            Type = e.Type
        });
    }

    public async Task<WidgetsDto> GetWidgetsAsync()
    {
        var json = await File.ReadAllTextAsync(_expensesFilePath);
        var db = JsonSerializer.Deserialize<ExpensesDbModel>(
    json,
    new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
);

var expenses = db?.Expenses ?? new List<ExpensesModel>();

        if (expenses == null) return new WidgetsDto
        {
            TopCategory = "N/A",
            BiggestExpenseCategory = "N/A",
            LowestCategory = "N/A"
        };

        var topCategory= ComputeTopCategory(expenses);
        var biggestExpense= ComputeBiggestExpense(expenses);
        var lowestCategory= ComputeLowestCategory(expenses);



        return new WidgetsDto
    {
        TopCategory = topCategory,
        BiggestExpenseCategory = biggestExpense,
        LowestCategory = lowestCategory
    };
    }

    private string ComputeTopCategory(IEnumerable<ExpensesModel> expenses) {
        return expenses
        .GroupBy(e => e.Category)
        .OrderByDescending(g => g.Count())
        .FirstOrDefault()?.Key ?? "N/A";
    }

    private string ComputeLowestCategory(IEnumerable<ExpensesModel> expenses) {
        return expenses
        .GroupBy(e=> e.Category)
        .OrderBy(g => g.Count())
        .FirstOrDefault()?.Key ?? "N/A";
    }

    private string ComputeBiggestExpense(IEnumerable<ExpensesModel> expenses) {
          return expenses
            .OrderByDescending(e => e.Amount)
            .FirstOrDefault()?.Category ?? "N/A";
    }


    }


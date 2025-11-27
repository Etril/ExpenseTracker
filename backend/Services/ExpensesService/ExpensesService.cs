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

    public async Task<TrendsDto> GetTrendsAsync()
    {
        var json= await File.ReadAllTextAsync(_expensesFilePath);
        var db= JsonSerializer.Deserialize<ExpensesDbModel>(
    json,
    new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
        );

        var expenses= db?.Expenses ?? new List<ExpensesModel>();

        if (expenses == null ) return new TrendsDto
        {
            Trends= 0,

            Total = 0
        };

        decimal TotalAmount= ComputeTotalAmount(expenses);
        decimal CurrentTrends= ComputeTrends(expenses);

        return new TrendsDto
        {
            Trends= CurrentTrends,

            Total= TotalAmount
        };

    }

    public async Task<ExpensesRequestResponseDto> PostExpenseAsync(ExpenseRequestDto dto) {
        try {
            var json = await File.ReadAllTextAsync(_expensesFilePath);

        var db = JsonSerializer.Deserialize<ExpensesDbModel>(
            json,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
        );

        var expenses = db?.Expenses ?? new List<ExpensesModel>();
        

        var newExpense= new ExpensesModel {
            Id= expenses.Any() ? expenses.Max(e => e.Id) + 1 : 1,
            Title= dto.Title!,
            Amount= dto.Amount,
            Category= dto.Category,
            Date= dto.Date,
            Type= dto.Type!
        };

        expenses.Add(newExpense);

        var updatedDb = new ExpensesDbModel
        {
            Expenses= expenses
        };
        
        var updatedJson = JsonSerializer.Serialize(updatedDb, new JsonSerializerOptions
        {
            WriteIndented = true
        });

        await File.WriteAllTextAsync(_expensesFilePath, updatedJson);

        return new ExpensesRequestResponseDto
        {
            Success= true, 
            Message="Expense successfully created"
        };
        }
        catch (Exception ex)
        {
            return new ExpensesRequestResponseDto
            {
                Success=false, 
                Message= $"Error: {ex.Message}"
            };
        }

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

    private decimal ComputeTrends(IEnumerable<ExpensesModel> expenses)
    {
        var lastFive= expenses
        .OrderByDescending(e => e.Date)
        .Take(5);

        return lastFive.Any()
        ? lastFive.Average(e => e.Amount)
        : 0;
    }

    private decimal ComputeTotalAmount(IEnumerable<ExpensesModel> expenses)
    {
        return expenses.Sum(e => e.Amount);
    }


    }


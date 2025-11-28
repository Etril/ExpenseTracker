
using backend.DTOs;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/[controller]")]

public class ExpensesController : ControllerBase
{
    private readonly IExpensesService _expensesService;

    public ExpensesController (IExpensesService expensesService)
    {
        _expensesService= expensesService;
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetAllExpense()
    {
        var result= await _expensesService.GetAllExpensesAsync();
        return Ok(result);
    }

    [Authorize]
    [HttpGet("widgets")]
    
    public async Task<IActionResult> GetWidgets() {
        var result= await _expensesService.GetWidgetsAsync();
        return Ok(result);
    }

    [Authorize]
    [HttpGet("trends")]

    public async Task <IActionResult> GetTrends()
    {
        var result= await _expensesService.GetTrendsAsync();
        return Ok(result);
    }

    [Authorize]
    [HttpPost]
    public async Task <IActionResult> PostExpense([FromBody] ExpenseRequestDto dto)
    {
        var result= await _expensesService.PostExpenseAsync(dto);
        return Ok(result);
    }

    [Authorize]
    [HttpDelete("{id}")]

    public async Task <IActionResult> DeleteExpense(int id)
    {
        var result= await _expensesService.DeleteExpenseAsync(id);
        return Ok(result);
    }

    [Authorize]
    [HttpPut("{id}")]

    public async Task <IActionResult> PutExpense(int id, [FromBody] ExpenseRequestDto dto)
    {
        var result= await _expensesService.PutExpenseAsync(id, dto);
        return Ok(result);
    }




}
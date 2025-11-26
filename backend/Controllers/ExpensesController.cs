
using backend.DTOs;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]

public class ExpensesController : ControllerBase
{
    private readonly IExpensesService _expensesService;

    public ExpensesController (IExpensesService expensesService)
    {
        _expensesService= expensesService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllExpense()
    {
        var result= await _expensesService.GetAllExpensesAsync();
        return Ok(result);
    }



}
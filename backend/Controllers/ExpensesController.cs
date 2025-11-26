
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





}
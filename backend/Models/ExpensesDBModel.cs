public class ExpensesDb
{
    public decimal Total { get; set; }
    public bool Trend { get; set; }
    public WidgetsDto Widgets { get; set; } = new();
    public List<ExpensesModel> Expenses { get; set; } = new();
}
namespace TodoApi.Model.Models;

public class Todo
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public bool Completed { get; set; } = false;
    public DateTime AddedDate { get; set; } = DateTime.Now;

    public int TodoListId { get; set; }
    public TodoList? TodoList { get; set; } = null;
}

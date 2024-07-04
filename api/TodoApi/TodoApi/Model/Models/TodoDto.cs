namespace TodoApi.Model.Models;

public class TodoDto
{
    public string Name { get; set; } = string.Empty;

    public bool Completed { get; set; } = false;

    public DateTime AddedDate { get; set; } = DateTime.Now;

    // Used for deserialization
    public TodoDto()
    {
    }

    public TodoDto(Todo todo)
    {
        Name = todo.Name;
        Completed = todo.Completed;
        AddedDate = todo.AddedDate;
    }

    public Todo ToTodo()
    {
        return new Todo
        {
            Name = Name,
            Completed = Completed,
            AddedDate = AddedDate
        };
    }
}

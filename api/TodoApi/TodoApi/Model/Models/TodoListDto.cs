namespace TodoApi.Model.Models;

public class TodoListDto
{
    public string Name { get; set; } = string.Empty;

    public string CreatedByUser { get; set; } = string.Empty;

    public List<TodoDto> Todos { get; set; } = new List<TodoDto>();

    public TodoListDto()
    {

    }

    public TodoListDto(TodoList todoList)
    {
        Name = todoList.Name;
        CreatedByUser = todoList.CreatedByUser;
        Todos = todoList.Todos.Select(t => new TodoDto(t)).ToList();
    }

    public TodoList ToTodoList()
    {
        return new TodoList
        {
            Name = Name,
            CreatedByUser = CreatedByUser,
            Todos = Todos.Select(t => t.ToTodo()).ToList()
        };
    }
}

namespace TodoApi.Model.Models;

public class TodoListDto
{
    public string Name { get; set; } = string.Empty;

    public List<TodoDto> Todos { get; set; } = new List<TodoDto>();
}

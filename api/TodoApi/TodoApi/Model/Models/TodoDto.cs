namespace TodoApi.Model.Models;

public class TodoDto
{
    public string Name { get; set; } = string.Empty;

    public bool Completed { get; set; } = false;
}

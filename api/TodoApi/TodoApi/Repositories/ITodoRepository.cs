using TodoApi.Model.Models;

namespace TodoApi.Repositories;

public interface ITodoRepository
{
    Task<TodoListDto> GetTodoListAsync(string name);

    Task AddOrUpdateTodoListAsync(TodoListDto todoListDto);
}

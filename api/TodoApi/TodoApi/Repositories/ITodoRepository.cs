using TodoApi.Model.Models;

namespace TodoApi.Repositories;

public interface ITodoRepository
{
    Task<TodoListDto> GetTodoListAsync(string username, string todoName);

    Task AddOrUpdateTodoListAsync(TodoListDto todoListDto);
}

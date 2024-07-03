using Microsoft.EntityFrameworkCore;
using TodoApi.Model;
using TodoApi.Model.Models;

namespace TodoApi.Repositories;

public class TodoRepository(DatabaseContext context) : ITodoRepository
{
    public DatabaseContext DatabaseContext { get; } = context;

    public async Task AddOrUpdateTodoListAsync(TodoListDto todoListDto)
    {
        var existingTodoList = await DatabaseContext.TodoLists
            .Include(tl => tl.Todos)
            .FirstOrDefaultAsync(tl => tl.Name == todoListDto.Name);

        if (existingTodoList is not null)
        {
            existingTodoList.Name = todoListDto.Name;

            existingTodoList.Todos = new List<Todo>();
            foreach (var todoDto in todoListDto.Todos)
            {
                existingTodoList.Todos.Add(new Todo
                {
                    Name = todoDto.Name,
                    Completed = todoDto.Completed
                });
            }

            DatabaseContext.Entry(existingTodoList).State = EntityState.Modified;

            await DatabaseContext.SaveChangesAsync();

            return;
        }

        await DatabaseContext.TodoLists.AddAsync(new TodoList()
        {
            Name = todoListDto.Name,
            Todos = todoListDto.Todos.Select(t => new Todo
            {
                Name = t.Name,
                Completed = t.Completed
            }).ToList()
        });

        await DatabaseContext.SaveChangesAsync();
    }

    public async Task<TodoListDto> GetTodoListAsync(string name)
    {
        var todoList = await DatabaseContext.TodoLists
            .Include(tl => tl.Todos)
            .Where(tl => tl.Name == name)
            .FirstOrDefaultAsync();

        if (todoList is null)
        {
            throw new ArgumentException("Todo list not found");
        }

        var todoListDto = new TodoListDto
        {
            Name = todoList.Name,
            Todos = todoList.Todos.Select(t => new TodoDto
            {
                Name = t.Name,
                Completed = t.Completed
            }).ToList()
        };

        return todoListDto;
    }
}

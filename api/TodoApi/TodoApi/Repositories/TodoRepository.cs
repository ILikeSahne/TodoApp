﻿using Microsoft.EntityFrameworkCore;
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
            .FirstOrDefaultAsync(tl => tl.CreatedByUser == todoListDto.CreatedByUser && tl.Name == todoListDto.Name);

        if (existingTodoList is not null)
        {
            existingTodoList.Name = todoListDto.Name;

            existingTodoList.Todos = new List<Todo>();
            foreach (var todoDto in todoListDto.Todos)
            {
                existingTodoList.Todos.Add(todoDto.ToTodo());
            }

            DatabaseContext.Entry(existingTodoList).State = EntityState.Modified;

            await DatabaseContext.SaveChangesAsync();

            return;
        }

        await DatabaseContext.TodoLists.AddAsync(todoListDto.ToTodoList());

        await DatabaseContext.SaveChangesAsync();
    }

    public async Task<TodoListDto> GetTodoListAsync(string username, string todoListName)
    {
        var todoList = await DatabaseContext.TodoLists
            .Include(tl => tl.Todos)
            .Where(tl => tl.Name == todoListName && tl.CreatedByUser == username)
            .FirstOrDefaultAsync();

        if (todoList is null)
        {
            throw new ArgumentException("Todo list not found");
        }

        var todoListDto = new TodoListDto(todoList);

        return todoListDto;
    }
}

using Markdig;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Model;
using TodoApi.Model.Models;
using TodoApi.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DatabaseContext>(opt =>
    opt.UseInMemoryDatabase("TodoList"));

builder.Services.AddTransient<ITodoRepository, TodoRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

var descriptionFilePath = Path.Combine(AppContext.BaseDirectory, "Description.md");
var description = File.ReadAllText(descriptionFilePath);
var htmlDescription = Markdown.ToHtml(description);

app.MapGet("/", () => Results.Content(htmlDescription, "text/html"));

app.MapPost("/todos", async (ITodoRepository todoRepository, [FromBody] TodoListDto todoList) =>
{
    try
    {
        Console.WriteLine("test");

        await todoRepository.AddOrUpdateTodoListAsync(todoList);

        return Results.Created($"/todos/{todoList.Name}", todoList);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }
});

app.MapGet("/todos/{username}/{todoName}", async (string username, string todoName, ITodoRepository todoRepository) =>
{
    try
    {
        return Results.Ok(await todoRepository.GetTodoListAsync(username, todoName));
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }
});

app.Run();
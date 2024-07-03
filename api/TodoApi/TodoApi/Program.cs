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
        await todoRepository.AddOrUpdateTodoListAsync(todoList);

        return Results.Created($"/todos/{todoList.Name}", todoList);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }
});

app.MapGet("/todos/{name}", async (string name, ITodoRepository todoRepository) =>
{
    try
    {
        return Results.Ok(await todoRepository.GetTodoListAsync(name));
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }
});

app.Run();
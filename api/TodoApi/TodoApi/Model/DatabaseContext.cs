using Microsoft.EntityFrameworkCore;
using TodoApi.Model.Models;

namespace TodoApi.Model;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
    {
    }

    public DbSet<Todo> Todos { get; set; }

    public DbSet<TodoList> TodoLists { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TodoList>()
            .HasMany(tl => tl.Todos)
            .WithOne(t => t.TodoList)
            .HasForeignKey(t => t.TodoListId);
    }
}

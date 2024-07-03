# Todo API

## Available Endpoints

### 1. POST /todos
- **Description**: Add or update a todo list. Requires a TodoListDto in the request body.
  - **Success**: Returns 201 Created with the URL of the created/updated todo list.
  - **Failure**: Returns 400 Bad Request with an error message.

### 2. GET /todos/{name}
- **Description**: Retrieve a todo list by its name.
  - **Success**: Returns 200 OK with the todo list.
  - **Failure**: Returns 400 Bad Request with an error message.
 - **Link**: [Test Todo](/todos/test)

## Object Models

### TodoDto
- **Name**: string
  - Represents the name of the todo item.
- **Completed**: bool
  - Indicates whether the todo item is completed.

### TodoListDto
- **Name**: string
  - Represents the name of the todo list.
- **Todos**: List<TodoDto>
  - A list of todo items in the todo list.

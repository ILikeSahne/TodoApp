import TodoDto from './TodoDto';

interface TodoListDto {
  name: string;
  createdByUser: string;
  todos: TodoDto[];
}

export function sortTodoListDto(dto: TodoListDto): TodoListDto {
  dto.todos.sort((a, b): number => {
    const dateA = new Date(a.addedDate).valueOf();
    const dateB = new Date(b.addedDate).valueOf();
    return dateA - dateB;
  });

  return dto;
}

export default TodoListDto;

import {loadTodoList, saveTodoList} from './TodoListApi';

export async function renameTodoList(
  username: string,
  oldName: string,
  newName: string,
) {
  try {
    const todoList = await loadTodoList(username, oldName);

    todoList.name = newName;

    await saveTodoList(todoList);
  } catch (error) {
    console.error(error);
  }
}

export async function createEmptyTodoList(
  username: string,
  todoListName: string,
) {
  try {
    const newTodoList = {
      name: todoListName,
      createdByUser: username,
      todos: [],
    };

    await saveTodoList(newTodoList);
  } catch (error) {
    console.error(error);
  }
}

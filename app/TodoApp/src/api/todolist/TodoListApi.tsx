import RNFetchBlob from 'rn-fetch-blob';
import TodoListDto, {sortTodoListDto} from './models/TodoListDto';
import TodoDto from './models/TodoDto';

export async function loadTodoList(
  username: string,
  todoName: string,
): Promise<TodoListDto> {
  try {
    const encodedUsername = encodeURIComponent(username);
    const encodedTodoName = encodeURIComponent(todoName);

    const response = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      `https://10.0.2.2:10002/todos/${encodedUsername}/${encodedTodoName}`,
    );

    // status code ok
    if (response.info().status !== 200) {
      const errorMessage = await response.text();
      console.error(errorMessage);

      return Promise.reject(errorMessage);
    }

    let loadedTodoList = (await response.json()) as TodoListDto;

    loadedTodoList = sortTodoListDto(loadedTodoList);

    return Promise.resolve(loadedTodoList);
  } catch (error) {
    console.error(error);
  }

  return Promise.reject('Error loading todo list');
}

export async function saveTodoList(todoList: TodoListDto) {
  try {
    const response = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'POST',
      'https://10.0.2.2:10002/todos',
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify(todoList),
    );

    console.log(JSON.stringify(todoList));

    // status code created
    if (response.info().status !== 201) {
      const errorMessage = await response.text();
      console.error(errorMessage);

      return;
    }
  } catch (error) {
    console.error(error);
  }
}

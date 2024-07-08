import {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import TodoList from '../components/todolist/TodoList';
import TodoListDto, {sortTodoListDto} from '../models/todolist/TodoListDto';
import {StackNavigationProp} from '@react-navigation/stack';

export interface TodoListViewerRouteParams {
  todoListName: string;
  username: string;
}

interface TodoListViewerProps {
  route?: {
    params?: TodoListViewerRouteParams;
  };
  navigation?: StackNavigationProp<any>;
}

function TodoListViewerScreen({
  route,
  navigation,
}: TodoListViewerProps): React.JSX.Element {
  const [todoList, setTodoList] = useState<TodoListDto>({
    name: route!.params!.todoListName,
    createdByUser: route!.params!.username,
    todos: [],
  });

  async function updateTodoListFromServer() {
    try {
      const response = await RNFetchBlob.config({
        trusty: true,
      }).fetch(
        'GET',
        `https://10.0.2.2:10002/todos/${route!.params!.username}/${
          route!.params!.todoListName
        }`,
      );

      if (response.info().status !== 200) {
        const errorMessage = await response.text();
        console.error(errorMessage);

        return;
      }

      let loadedTodoList = (await response.json()) as TodoListDto;

      loadedTodoList = sortTodoListDto(loadedTodoList);

      console.log(loadedTodoList.todos);

      setTodoList(loadedTodoList);
    } catch (error) {
      console.error(error);
    }
  }

  async function saveTodos() {
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

  async function updateAndReloadTodos() {
    await saveTodos();

    await updateTodoListFromServer();
  }

  useEffect(() => {
    updateTodoListFromServer();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TodoList
        todoList={todoList}
        todoListChanged={todoList => {
          setTodoList(todoList);

          updateAndReloadTodos();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});

export default TodoListViewerScreen;

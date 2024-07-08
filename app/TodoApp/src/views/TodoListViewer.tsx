import {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Dialog from 'react-native-dialog';
import TodoList from '../components/todolist/TodoList';
import TodoListDto, {sortTodoListDto} from '../api/todolist/models/TodoListDto';
import {StackNavigationProp} from '@react-navigation/stack';
import {loadTodoList, saveTodoList} from '../api/todolist/TodoListApi';
import AddButton from '../components/common/AddButton';

const defaultNewTodoName = 'New Todo';

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
    name: '',
    createdByUser: '',
    todos: [],
  });
  const [showAddTodoDialog, setShowAddTodoDialog] = useState(false);

  const [newTodoName, setNewTodoName] = useState(defaultNewTodoName);

  const loadTodoListFromApi = async () => {
    setTodoList(
      await loadTodoList(route!.params!.username, route!.params!.todoListName),
    );
  };

  const addTodo = () => {
    setShowAddTodoDialog(false);

    todoList.todos.push({
      name: newTodoName,
      completed: false,
      addedDate: new Date(),
    });

    setTodoList({...todoList!});
  };

  useEffect(() => {
    loadTodoListFromApi();
  }, []);

  useEffect(() => {
    saveTodoList(todoList);
  }, [todoList]);

  return (
    <SafeAreaView style={styles.container}>
      <Dialog.Container
        visible={showAddTodoDialog}
        onBackdropPress={() => setShowAddTodoDialog(false)}>
        <Dialog.Title>Enter name of new Todo-List</Dialog.Title>
        <Dialog.Input
          onChangeText={setNewTodoName}
          defaultValue={defaultNewTodoName}
        />
        <Dialog.Button
          label="Cancel"
          onPress={() => setShowAddTodoDialog(false)}
        />
        <Dialog.Button label="Add" onPress={addTodo} />
      </Dialog.Container>

      <TodoList
        todoList={todoList}
        todoListChanged={todoList => {
          setTodoList(todoList);
        }}
      />

      <AddButton onPress={() => setShowAddTodoDialog(true)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    flex: 1,
  },
});

export default TodoListViewerScreen;

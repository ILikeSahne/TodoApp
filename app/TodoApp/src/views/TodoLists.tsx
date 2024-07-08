import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet, View} from 'react-native';
import GlobalStyles from '../style/GlobalStyles';
import {IconButton, useTheme} from 'react-native-paper';
import Dialog from 'react-native-dialog';
import {StackNavigationProp} from '@react-navigation/stack';
import {TodoListViewerRouteParams} from './TodoListViewer';
import TodoListItem from '../components/todolist/TodoListItem';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {
  createEmptyTodoList,
  renameTodoList,
} from '../api/todolist/TodoListApiHelper';
import {showMessage} from 'react-native-flash-message';
import AddButton from '../components/common/AddButton';

const defaultNewTodoListName = 'New Todo-List';

export interface TodoListScreenRouteParams {
  username: string;
}

interface TodoListsScreenProps {
  route?: {
    params?: TodoListScreenRouteParams;
  };
  navigation?: StackNavigationProp<any>;
}

function TodoListsScreen({
  route,
  navigation,
}: TodoListsScreenProps): React.JSX.Element {
  const theme = useTheme();
  const styles = makeStyles(theme.colors);

  const [todoLists, setTodoLists] = useState<string[]>([]);
  const [newTodoListName, setNewTodoListName] = useState(
    defaultNewTodoListName,
  );

  const [addTodoListDialogVisible, setAddTodoListDialogVisible] =
    useState(false);

  async function loadTodoLists() {
    const todoListsJson = await AsyncStorage.getItem(
      `${route!.params?.username}_todolists`,
    );

    const todoLists = JSON.parse(todoListsJson ?? '[]') as string[];

    setTodoLists(todoLists);
  }

  function addTodoList() {
    if (todoLists.includes(newTodoListName)) {
      Alert.alert('Todo-List already exists');
      return;
    }

    setAddTodoListDialogVisible(false);

    setTodoLists([...todoLists, newTodoListName]);

    createEmptyTodoList(route!.params!.username, newTodoListName);
  }

  const closeNewTodoListDialog = () => {
    setAddTodoListDialogVisible(false);
  };

  function openTodoList(todoListName: string) {
    navigation?.navigate('TodoListViewer', {
      todoListName: todoListName,
      username: route!.params!.username,
    } as TodoListViewerRouteParams);
  }

  useEffect(() => {
    loadTodoLists();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(
      `${route!.params!.username}_todolists`,
      JSON.stringify(todoLists),
    );
  }, [todoLists]);

  const renameTodo = (todoListName: string, newName: string) => {
    todoLists.splice(todoLists.indexOf(todoListName), 1, newName);

    setTodoLists([...todoLists]);

    renameTodoList(route!.params!.username, todoListName, newName);
  };

  const deleteTodoList = (todoListName: string) => {
    todoLists.splice(todoLists.indexOf(todoListName), 1);

    setTodoLists([...todoLists]);

    showMessage({
      message: 'Todo-List deleted',
      type: 'warning',
    });
  };

  return (
    <View style={styles.container}>
      <Dialog.Container
        visible={addTodoListDialogVisible}
        onBackdropPress={closeNewTodoListDialog}>
        <Dialog.Title>Enter name of new Todo-List</Dialog.Title>
        <Dialog.Input
          onChangeText={setNewTodoListName}
          defaultValue={defaultNewTodoListName}></Dialog.Input>
        <Dialog.Button label="Cancel" onPress={closeNewTodoListDialog} />
        <Dialog.Button label="Add" onPress={addTodoList} />
      </Dialog.Container>

      <FlatList
        data={todoLists}
        contentContainerStyle={{gap: GlobalStyles.gridSize}}
        renderItem={({item}) => (
          <TodoListItem
            text={item}
            onClick={() => openTodoList(item)}
            onRename={newName => renameTodo(item, newName)}
            onDelete={() => deleteTodoList(item)}
          />
        )}
      />
      <AddButton onPress={() => setAddTodoListDialogVisible(true)} />
    </View>
  );
}

const makeStyles = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      margin: 8,
    },
  });

export default TodoListsScreen;

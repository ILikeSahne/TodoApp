import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import TodoList from '../components/todolist/TodoList';
import GlobalStyles from '../style/GlobalStyles';
import {Button, Icon, IconButton} from 'react-native-paper';
import Dialog from 'react-native-dialog';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase, RouteProp, useRoute} from '@react-navigation/native';
import {TodoListViewerRouteParams} from './TodoListViewer';
import EditableItem from '../components/common/EditableItem';

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

  function addTodoList(todoListName: string) {
    if (todoLists.includes(todoListName)) {
      Alert.alert('Todo-List already exists');
      return;
    }

    setTodoLists([...todoLists, todoListName]);

    setAddTodoListDialogVisible(false);
  }

  function showNewTodoListDialog() {
    setAddTodoListDialogVisible(true);
  }

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

  return (
    <View style={styles.container}>
      <Dialog.Container visible={addTodoListDialogVisible}>
        <Dialog.Title>Enter name of new Todo-List</Dialog.Title>
        <Dialog.Input
          onChangeText={setNewTodoListName}
          defaultValue={defaultNewTodoListName}></Dialog.Input>
        <Dialog.Button
          label="Add"
          onPress={() => {
            addTodoList(newTodoListName);
          }}
        />
      </Dialog.Container>

      <FlatList
        data={todoLists}
        contentContainerStyle={{gap: GlobalStyles.gridSize}}
        renderItem={({item}) => <EditableItem></EditableItem>}
      />
      <IconButton
        style={styles.icon}
        icon="plus"
        size={GlobalStyles.gridSize * 6}
        onPress={showNewTodoListDialog}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
  icon: {
    position: 'absolute',
    bottom: GlobalStyles.gridSize,
    right: GlobalStyles.gridSize,
    backgroundColor: GlobalStyles.color.gray,
    borderRadius: GlobalStyles.gridSize * 2,
  },
});

export default TodoListsScreen;

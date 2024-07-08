import React, {useState} from 'react';
import {FlatList, StyleSheet, Switch, Text, View} from 'react-native';
import TodoListDto from '../../api/todolist/models/TodoListDto';
import Todo from './Todo';
import GlobalStyles from '../../style/GlobalStyles';
import TodoDto from '../../api/todolist/models/TodoDto';
import {showMessage} from 'react-native-flash-message';

interface TodoListProps {
  todoList?: TodoListDto;

  todoListChanged?: (todoList: TodoListDto) => void;
}

function TodoList(props: TodoListProps): React.JSX.Element {
  const todoCompletedChanged = (item: TodoDto, completed: boolean) => {
    item.completed = completed;

    props.todoListChanged?.({...props.todoList!});
  };

  const todoRenamed = (item: TodoDto, newName: string) => {
    item.name = newName;

    props.todoListChanged?.({...props.todoList!});
  };

  const todoDeleted = (item: TodoDto) => {
    showMessage({
      message: 'Todo deleted',
      type: 'warning',
    });

    props.todoList?.todos.splice(props.todoList.todos.indexOf(item), 1);

    props.todoListChanged?.({...props.todoList!});
  };

  return (
    <View>
      {props.todoList && (
        <FlatList
          data={props.todoList?.todos}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{gap: GlobalStyles.gridSize}}
          renderItem={({item}) => (
            <Todo
              todo={item}
              completedChanged={completed => {
                todoCompletedChanged(item, completed);
              }}
              onRename={newName => {
                todoRenamed(item, newName);
              }}
              onDelete={() => {
                todoDeleted(item);
              }}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  todo: {
    margin: 8,
  },
});

export default TodoList;

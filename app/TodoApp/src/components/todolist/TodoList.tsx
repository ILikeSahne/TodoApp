import React, {useState} from 'react';
import {FlatList, StyleSheet, Switch, Text, View} from 'react-native';
import TodoListDto from '../../models/todolist/TodoListDto';
import Todo from './Todo';
import GlobalStyles from '../../style/GlobalStyles';

interface TodoListProps {
  todoList?: TodoListDto;

  todoListChanged?: (todoList: TodoListDto) => void;
}

function TodoList(props: TodoListProps): React.JSX.Element {
  return (
    <View>
      {props.todoList && (
        <FlatList
          data={props.todoList?.todos}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{gap: GlobalStyles.gridSize}}
          renderItem={({item}) => (
            <View>
              <Todo
                todo={item}
                completedChanged={completed => {
                  item.completed = completed;

                  props.todoListChanged &&
                    props.todoListChanged({...props.todoList!});
                }}
              />
            </View>
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

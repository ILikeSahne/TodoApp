import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import TodoDto from '../../models/todolist/TodoDto';
import {Button, IconButton} from 'react-native-paper';

export interface TodoProps {
  todo: TodoDto;

  completedChanged?: (completed: boolean) => void;
}

function Todo(props: TodoProps): React.JSX.Element {
  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Switch
          value={props.todo.completed}
          onValueChange={() => {
            props.completedChanged &&
              props.completedChanged(!props.todo.completed);
          }}
        />
        <Text>{props.todo.name}</Text>
      </View>

      <IconButton icon="delete"></IconButton>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Todo;

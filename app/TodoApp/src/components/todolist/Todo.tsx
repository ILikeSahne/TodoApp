import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TodoDto from '../../api/todolist/models/TodoDto';
import {
  Button,
  Icon,
  IconButton,
  RadioButton,
  Switch,
  useTheme,
} from 'react-native-paper';
import OptionsDots from '../common/OptionDots';
import GlobalStyles from '../../style/GlobalStyles';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';

export interface TodoProps {
  todo: TodoDto;

  completedChanged?: (completed: boolean) => void;
  onRename: (newName: string) => void;
  onDelete: () => void;
}

function Todo(props: TodoProps): React.JSX.Element {
  const theme = useTheme();
  const styles = makeStyles(theme.colors);

  return (
    <TouchableOpacity
      style={styles.outer}
      onPress={() => props.completedChanged?.(!props.todo.completed)}
      activeOpacity={0.3}>
      <View style={styles.inner}>
        <Icon
          source="check-bold"
          size={GlobalStyles.gridSize * 2}
          color={
            props.todo.completed
              ? theme.colors.onSecondaryContainer
              : GlobalStyles.color.onSecondaryContainerDisabled
          }
        />
        <Text style={styles.text}>{props.todo.name}</Text>
      </View>

      <OptionsDots
        onRename={props.onRename}
        onDelete={props.onDelete}
        renameText={props.todo.name}
      />
    </TouchableOpacity>
  );
}

const makeStyles = (colors: MD3Colors) =>
  StyleSheet.create({
    outer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.secondaryContainer,
      borderRadius: GlobalStyles.gridSize,
      padding: GlobalStyles.gridSize,
    },
    inner: {
      display: 'flex',
      gap: GlobalStyles.gridSize,
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      color: colors.onSecondaryContainer,
    },
  });

export default Todo;

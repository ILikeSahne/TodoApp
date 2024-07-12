import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Touchable,
} from 'react-native';
import {Icon, useTheme} from 'react-native-paper';
import GlobalStyles from '../../style/GlobalStyles';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import OptionsDots from '../common/OptionDots';

interface TodoListItemProps {
  text: string;

  onClick: () => void;
  onRename: (newName: string) => void;
  onDelete: () => void;
}

function TodoListItem(props: TodoListItemProps): React.JSX.Element {
  const theme = useTheme();
  const styles = makeStyles(theme.colors);

  const handleClick = () => {
    props.onClick?.();
  };

  return (
    <TouchableOpacity onPress={handleClick}>
      <View style={styles.container}>
        <Text style={styles.text}>{props.text}</Text>

        <OptionsDots
          onRename={newName => props.onRename(newName)}
          onDelete={() => props.onDelete()}
          renameHeader="Rename Todo-List"
          renameText={props.text}
          deleteHeader="Delete Todo-List"
          deleteText={`Are you sure you want to delete the Todo-List "${props.text}"?`}
        />
      </View>
    </TouchableOpacity>
  );
}

const makeStyles = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.secondaryContainer,
      borderRadius: GlobalStyles.gridSize,
      padding: GlobalStyles.gridSize,
    },
    text: {
      color: colors.onSecondaryContainer,
    },
  });

export default TodoListItem;

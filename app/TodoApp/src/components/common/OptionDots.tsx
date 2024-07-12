import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Dialog from 'react-native-dialog';
import {Icon, useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import GlobalStyles from '../../style/GlobalStyles';
import {showMessage} from 'react-native-flash-message';

interface OptionsDotsProps {
  onRename: (newName: string) => void;
  onDelete: () => void;

  renameHeader: string;
  renameText: string;

  deleteHeader: string;
  deleteText: string;
}

const OptionsDots = (props: OptionsDotsProps) => {
  const theme = useTheme();
  const styles = makeStyles(theme.colors);
  const optionsStyles = makeOptionsStyles(theme.colors);

  const [newText, setNewText] = useState(props.renameText);

  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleRename = () => {
    setShowRenameDialog(false);

    if (newText === props.renameText) {
      return;
    }

    props.onRename?.(newText);
  };

  const handleDelete = () => {
    setShowDeleteDialog(false);

    props.onDelete?.();
  };

  return (
    <View>
      <Dialog.Container
        visible={showRenameDialog}
        onBackdropPress={() => setShowRenameDialog(false)}>
        <Dialog.Title>{props.renameHeader}</Dialog.Title>
        <Dialog.Input
          onChangeText={text => setNewText(text)}
          defaultValue={props.renameText}
        />
        <Dialog.Button
          label="Cancel"
          onPress={() => setShowRenameDialog(false)}
        />
        <Dialog.Button label="Save" onPress={handleRename} />
      </Dialog.Container>

      <Dialog.Container
        visible={showDeleteDialog}
        onBackdropPress={() => setShowDeleteDialog(false)}>
        <Dialog.Title>{props.deleteHeader}</Dialog.Title>
        <Dialog.Description>{props.deleteText}</Dialog.Description>
        <Dialog.Button
          label="Cancel"
          onPress={() => setShowDeleteDialog(false)}
        />
        <Dialog.Button label="Confirm" onPress={handleDelete} />
      </Dialog.Container>

      <Menu>
        <MenuTrigger>
          <Icon
            source="dots-vertical"
            size={GlobalStyles.gridSize * 3}
            color={theme.colors.onSecondaryContainer}
          />
        </MenuTrigger>
        <MenuOptions customStyles={optionsStyles}>
          <MenuOption onSelect={() => setShowRenameDialog(true)}>
            <Text style={styles.optionsText}>Rename</Text>
          </MenuOption>
          <MenuOption onSelect={() => setShowDeleteDialog(true)}>
            <Text style={styles.deleteText}>Delete</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

const makeStyles = (colors: MD3Colors) =>
  StyleSheet.create({
    deleteText: {
      color: GlobalStyles.color.delete,
    },
    optionsText: {
      color: colors.onSurface,
    },
  });

const makeOptionsStyles = (colors: MD3Colors) => ({
  optionsContainer: {
    borderRadius: GlobalStyles.gridSize / 2,
  },
});

export default OptionsDots;

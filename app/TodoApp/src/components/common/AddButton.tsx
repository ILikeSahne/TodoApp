import {StyleSheet} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import GlobalStyles from '../../style/GlobalStyles';

interface AddButtonProps {
  onPress?: () => void;
}

const AddButton = (props: AddButtonProps): React.JSX.Element => {
  const theme = useTheme();
  const styles = makeStyles(theme.colors);

  return (
    <IconButton
      style={styles.icon}
      icon="plus"
      size={GlobalStyles.gridSize * 6}
      iconColor={theme.colors.onPrimaryContainer}
      onPress={() => props.onPress?.()}
    />
  );
};

const makeStyles = (colors: MD3Colors) =>
  StyleSheet.create({
    icon: {
      position: 'absolute',
      margin: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colors.primaryContainer,
      borderRadius: GlobalStyles.gridSize * 2,
    },
  });

export default AddButton;

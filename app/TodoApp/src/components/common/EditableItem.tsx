import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {Icon} from 'react-native-paper';
import GlobalStyles from '../../style/GlobalStyles';

function EditableItem(): React.JSX.Element {
  const [showOptions, setShowOptions] = useState(false);

  const handleRename = () => {
    setShowOptions(false);
    // Add your logic for renaming the item here
    Alert.alert('Rename', 'Item renamed successfully');
  };

  const handleDelete = () => {
    setShowOptions(false);
    // Add your logic for deleting the item here
    Alert.alert('Delete', 'Item deleted successfully');
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        borderWidth: 1,
      }}>
      <Text>Custom Text</Text>
      <TouchableOpacity onPress={() => setShowOptions(!showOptions)}>
        <Icon source="cog-outline" size={GlobalStyles.gridSize * 3} />
      </TouchableOpacity>
      {showOptions && (
        <View
          style={{
            position: 'absolute',
            top: 20,
            right: 10,
            backgroundColor: 'white',
            padding: 10,
          }}>
          <TouchableOpacity onPress={handleRename}>
            <Text>Rename</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default EditableItem;

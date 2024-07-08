import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {View, Button, Alert, StyleSheet} from 'react-native';
import {TodoListScreenRouteParams} from './TodoLists';
import {TextInput} from 'react-native-paper';
import GlobalStyles from '../style/GlobalStyles';

interface LoginProps {
  navigation: StackNavigationProp<any>;
}

const LoginScreen = (props: LoginProps) => {
  const [username, setUsername] = useState('test');
  const [password, setPassword] = useState('pw');

  const handleLogin = () => {
    if (username.trim().length == 0) {
      Alert.alert('Username is required');
      return;
    }

    if (password.trim().length == 0) {
      Alert.alert('Password is required');
      return;
    }

    props.navigation.navigate('TodoLists', {
      username: username,
    } as TodoListScreenRouteParams);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.marginBottom}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.marginBottom}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: GlobalStyles.gridSize,
    flex: 1,
  },
  marginBottom: {
    marginBottom: GlobalStyles.gridSize,
  },
});

export default LoginScreen;

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/views/Home';
import LoginScreen from './src/views/Login';
import TodoListViewerScreen from './src/views/TodoListViewer';
import TodoListsScreen from './src/views/TodoLists';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="TodoLists" component={TodoListsScreen} />
        <Stack.Screen name="TodoListViewer" component={TodoListViewerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

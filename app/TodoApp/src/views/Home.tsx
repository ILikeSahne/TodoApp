import {StyleSheet, Text, View} from 'react-native';

function HomeScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;

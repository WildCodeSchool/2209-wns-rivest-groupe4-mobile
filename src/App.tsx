import { View, Text, StyleSheet } from 'react-native';
import Demo from './components/Demo';

export default function App() {
  return (
    <View style={styles.container}>
      <Text> App</Text>
      <Demo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

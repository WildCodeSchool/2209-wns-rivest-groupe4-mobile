import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LoginForm from '../components/LoginForm';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>
      <LoginForm />
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

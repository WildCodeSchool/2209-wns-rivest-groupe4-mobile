import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import LoginForm from '../features/LoginForm';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to</Text>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
      <LoginForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 80,
  },
  title: {
    color: '#fff',
    fontSize: 40,
  },
  logo: {
    width: 100,
    height: 100,
  },
});

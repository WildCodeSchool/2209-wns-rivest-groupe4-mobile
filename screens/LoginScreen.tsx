import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LoginForm from '../features/LoginForm';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#1d2448', '#131d2f']}
        end={{ x: 0.8, y: 1.0 }}
        style={styles.background}
      >
        <Text style={styles.title}>Welcome to</Text>
        <LoginForm />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 40,
  },
});

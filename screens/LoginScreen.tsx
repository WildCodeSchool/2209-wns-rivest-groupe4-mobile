import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LoginForm from '../features/LoginForm';

export default function LoginScreen() {
  return (
    <LinearGradient
      colors={['#1d2448', '#131d2f']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView>
        <KeyboardAvoidingView>
          <View style={styles.container}>
            <Text style={styles.title}>Welcome to</Text>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <LoginForm />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </LinearGradient>
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

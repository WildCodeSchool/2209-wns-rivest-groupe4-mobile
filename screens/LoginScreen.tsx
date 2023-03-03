import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from 'react-native';

import LoginForm from '../features/LoginForm/LoginForm';

export default function LoginScreen() {
  const windowHeight = useWindowDimensions().height;

  return (
    <LinearGradient
      colors={['#1d2448', '#131d2f']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
      style={{ ...styles.container, minHeight: Math.round(windowHeight) }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ ...styles.container, minHeight: Math.round(windowHeight) }}
      >
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <Text style={styles.title}>Welcome to</Text>
              <Image
                style={styles.logo}
                source={require('../assets/logo.png')}
              />
              <LoginForm />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    paddingTop: 60,
    padding: 24,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
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

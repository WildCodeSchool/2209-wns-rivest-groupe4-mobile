import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import ContactForm from '../features/ContactForm/ContactForm';
import { LinearGradient } from 'expo-linear-gradient';

export default function ContactScreen() {
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
            <Image
              style={styles.return}
              source={require('../assets/arrow-left-solid.png')}
            />
            <Text style={styles.title}>Need help ?</Text>
            <ContactForm />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Aldrich-Regular',
    fontSize: 40,
    color: 'white',
    marginTop: 80,
    marginBottom: 120,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  return: {
    position: 'absolute',
    width: 28,
    height: 30,
    top: 50,
    left: -30,
  },
});

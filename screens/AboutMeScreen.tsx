import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React from 'react';
import AboutMeForm from '../features/AboutMeForm';
import { LinearGradient } from 'expo-linear-gradient';

export default function AboutMeScreen() {
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
            <Text style={styles.title}>Modify my information </Text>
            <AboutMeForm />
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

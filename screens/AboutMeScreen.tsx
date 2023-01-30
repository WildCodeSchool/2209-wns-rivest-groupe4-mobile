import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import AboutMeForm from '../features/AboutMeForm';

export default function AboutMeScreen() {
  return (
    <View>
      <Image
        style={styles.return}
        source={require('../assets/arrow-left-solid.png')}
      />
      <Text style={styles.title}>About Me</Text>
      <AboutMeForm />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Aldrich-Regular',
    fontSize: 50,
    color: 'white',
    marginTop: 80,
    marginBottom: 120,
    textAlign: 'center',
  },
  return: {
    position: 'absolute',
    width: 28,
    height: 30,
    top: 50,
    left: -30,
  },
});

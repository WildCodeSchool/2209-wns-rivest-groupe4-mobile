import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import ContactForm from '../features/ContactForm';

export default function ContactScreen() {
  return (
    <View>
      <Image
        style={styles.return}
        source={require('../assets/arrow-left-solid.png')}
      />
      <Text style={styles.title}>Contact us</Text>
      <ContactForm />
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

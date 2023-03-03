import { Image, StyleSheet, TextInput, View } from 'react-native';
import React from 'react';

export default function AboutMeForm() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="John"
          placeholderTextColor="white"
        ></TextInput>
        <Image
          style={styles.logoUser}
          source={require('../../assets/user.png')}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="JohnDoe123"
          placeholderTextColor="white"
        ></TextInput>
        <Image
          style={styles.logoUserTag}
          source={require('../../assets/user-tag.png')}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="john@doe.com"
          placeholderTextColor="white"
          keyboardType="email-address"
          autoCapitalize="none"
        ></TextInput>
        <Image style={styles.logoAt} source={require('../../assets/at.png')} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="*************"
          placeholderTextColor="white"
          autoCapitalize="none"
        ></TextInput>
        <Image
          style={styles.logoLock}
          source={require('../../assets/lock.png')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  input: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    width: 280,
    color: 'white',
  },
  logoAt: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 0,
    color: 'white',
  },
  logoUser: {
    width: 20,
    height: 23,
    position: 'absolute',
    right: 0,
    color: 'white',
  },
  logoUserTag: {
    width: 25,
    height: 20,
    position: 'absolute',
    right: 0,
    color: 'white',
  },
  logoLock: {
    width: 20,
    height: 23,
    position: 'absolute',
    right: 0,
    color: 'white',
  },
});

import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-ui-lib';
import { Switch } from 'react-native-gesture-handler';

export default function MyProjects() {
  const [isPrivate, setPrivate] = useState(false);
  const [text, setText] = useState('Public');

  const toggleSwitch = () => {
    if (isPrivate == true) {
      setText('Private');
    } else {
      setText('Public');
    }
    setPrivate((previusState) => !previusState);
  };

  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.title}>How many days a month :</Text>
        <View style={styles.row}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
              {text}
            </Text>
            <Switch
              trackColor={{ false: 'grey', true: 'red' }}
              thumbColor={isPrivate ? 'lightgrey' : 'lightgrey'}
              onValueChange={toggleSwitch}
              value={isPrivate}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 10, color: 'white' }}>858</Text>
            <Image
              style={styles.logo}
              source={require('../assets/heart.png')}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 10, color: 'white' }}>305</Text>
            <Image
              style={styles.logo}
              source={require('../assets/speech-bubble.png')}
            />
          </View>
        </View>
        <View style={styles.content}>
          <Image
            style={styles.img}
            source={require('../assets/functionDemo.png')}
          />
          <Text style={styles.text}>12/05/2022 at 00:12</Text>
          <Text style={styles.text}>
            Simple project which allows you to get number of days for a month.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus.
          </Text>
          <View style={styles.rowButton}>
            <Text style={styles.language}>JavaScript</Text>
            <Button style={styles.access}>
              <Text style={styles.access}>Access the project</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 15,
  },
  logo: {
    width: 26,
    height: 25,
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  content: {
    borderRadius: 20,
    backgroundColor: '#111c2a',
    width: 365,
  },
  text: {
    marginTop: 8,
    marginLeft: 10,
    color: 'lightgrey',
  },
  title: {
    fontSize: 20,
    color: 'white',
    textDecorationLine: 'underline',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    marginBottom: 5,
  },
  rowButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    marginBottom: 15,
  },
  language: {
    fontWeight: 'bold',
    backgroundColor: 'yellow',
    width: 100,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 10,
  },
  access: {
    fontWeight: 'bold',
    backgroundColor: 'lightblue',
    width: 180,
    textAlign: 'center',
    borderRadius: 10,
  },
});

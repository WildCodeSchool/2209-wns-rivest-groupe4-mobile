import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-ui-lib';

export default function ProjectSupport() {
  return (
    <View style={styles.mainContainer}>
      <View>
        <View style={styles.row}>
          <Text style={styles.title}>Get Winners :</Text>
          <Text style={styles.by}>by TheHackerman </Text>
        </View>
        <View style={styles.content}>
          <Image
            style={styles.img}
            source={require('../assets/projectSupport.png')}
          />
          <View style={styles.row}>
            <Text style={styles.text}>16/01/2023 at 10:26</Text>
            <View style={styles.textLogo}>
              <Text style={{ marginRight: 10, color: 'white' }}>328</Text>
              <Image
                style={styles.logo}
                source={require('../assets/heart.png')}
              />
            </View>
            <View style={styles.textLogo}>
              <Text style={{ marginRight: 10, color: 'white' }}>152</Text>
              <Image
                style={styles.logo}
                source={require('../assets/speech-bubble.png')}
              />
            </View>
          </View>
          <Text style={styles.language}>JavaScript</Text>
          <Text style={styles.text}>
            Simple project which allows you to get number of days for a month.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus.
          </Text>
          <View style={styles.rowButton}>
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
    width: 20,
    height: 20,
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
    padding: 5,
  },
  by: {
    fontSize: 16,
    marginTop: 4,
    color: 'white',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    textAlignVertical: 'center',
    marginRight: 10,
  },
  textLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
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
    borderRadius: 5,
    marginLeft: 10,
    marginTop: 8,
  },
  access: {
    fontWeight: 'bold',
    backgroundColor: 'lightblue',
    width: 180,
    textAlign: 'center',
    borderRadius: 10,
  },
});

import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import IProjectsListing from 'interfaces/IProjectsListing';
import GradientButton from 'components/GradientButton';

type Props = {
  project: IProjectsListing;
};

export default function ProjectSupported({ project }: Props) {
  return (
    <View style={styles.mainContainer}>
      <View>
        <View style={styles.row}>
          <Text style={styles.title}>{project.name}</Text>
          <Text style={styles.by}>by {project.user.pseudo}</Text>
        </View>
        <View style={styles.content}>
          <Image
            style={styles.img}
            source={require('../assets/projectSupport.png')}
          />
          <View style={styles.row}>
            <Text style={styles.text}>{`${project.updatedAt
              .toString()
              .split('T')[0]
              .split('-')
              .reverse()
              .join('/')} at ${
              project.updatedAt.toString().split('T')[1].split('.')[0]
            }`}</Text>
            <View style={styles.textLogo}>
              <Text style={{ marginRight: 10, color: 'white' }}>
                {project.likes.length}
              </Text>
              <Image
                style={styles.logo}
                source={require('../assets/heart-solid-red.png')}
              />
            </View>
            <View style={styles.textLogo}>
              <Text style={{ marginRight: 10, color: 'white' }}>
                {project.comments.length}
              </Text>
              <Image
                style={styles.logo}
                source={require('../assets/speech-bubble.png')}
              />
            </View>
          </View>
          <Text style={styles.language}>JavaScript</Text>
          <Text style={styles.text}>{project.description.length}</Text>
          <View style={styles.rowButton}>
            <GradientButton onPress={() => {}} gradient={'cyanToBlue'}>
              Access the project
            </GradientButton>
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

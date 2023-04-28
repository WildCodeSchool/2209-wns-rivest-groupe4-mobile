import React, { useContext, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import IProjectsListing from '../interfaces/IProjectsListing';
import { Text, View, Image, Modal } from 'react-native-ui-lib';
import { Pressable } from 'react-native';
import { ScrollView, Switch } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import GradientButton from '../components/GradientButton';
import { UserContext } from 'contexts/UserContext';
import { UPDATE_PUBLIC_STATE } from '../apollo/mutations';
import { LinearGradient } from 'expo-linear-gradient';
import ProjectDetails from './ProjectDetails';

type Props = {
  project: IProjectsListing;
};

export default function MyProjectsCard({ project }: Props) {
  const [isPrivate, setPrivate] = useState(project.isPublic);
  const [modalVisible, setModalVisible] = useState(false);
  const [modifyPublicState] = useMutation(UPDATE_PUBLIC_STATE);
  const { token } = useContext(UserContext);

  const modifyPrivacy = async () => {
    await modifyPublicState({
      variables: {
        modifyProjectId: Number(project.id),
        isPublic: !project.isPublic,
      },
      context: {
        headers: {
          authorization: token,
        },
      },
      onCompleted: () => {
        setPrivate(!isPrivate);
      },
    });
  };

  return (
    <View style={styles.mainContainer}>
      <ProjectDetails
        project={project}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View>
        <Text style={styles.title}>{project.name}</Text>
        <View style={styles.row}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
              {project.description}
            </Text>
            <Switch
              trackColor={{ false: 'grey', true: 'red' }}
              thumbColor={isPrivate ? 'lightgrey' : 'lightgrey'}
              onValueChange={() => modifyPrivacy()}
              value={isPrivate}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 10, color: 'white' }}>
              {project.likes.length}
            </Text>
            <Image
              style={styles.logo}
              source={require('../assets/heart-solid-red.png')}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 10, color: 'white' }}>
              {project.comments.length}
            </Text>
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
          <Text style={styles.text}>{`${project.updatedAt
            .toString()
            .split('T')[0]
            .split('-')
            .reverse()
            .join('/')} at ${
            project.updatedAt.toString().split('T')[1].split('.')[0]
          }`}</Text>
          <Text style={styles.text}>{project.description}</Text>
          <View style={styles.rowButton}>
            <Text style={styles.language}>JavaScript</Text>
            <GradientButton
              onPress={() => setModalVisible(true)}
              gradient={'cyanToBlue'}
            >
              Access the project
            </GradientButton>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 10,
    width: '100%',
    height: '100%',
  },
  modalView: {
    margin: 5,
    flex: 1,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
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
    paddingVertical: 10,
  },
  access: {
    fontWeight: 'bold',
    backgroundColor: 'lightblue',
    width: 180,
    textAlign: 'center',
    borderRadius: 10,
  },
});

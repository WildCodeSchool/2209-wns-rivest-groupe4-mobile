import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import IProjectsListing from '../interfaces/IProjectsListing';
import { Text, View, Image, Modal } from 'react-native-ui-lib';
import { Switch } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import GradientButton from '../components/GradientButton';
import { UserContext } from 'contexts/UserContext';
import { UPDATE_PUBLIC_STATE } from '../apollo/mutations';
import ProjectDetails from './ProjectDetails';

type Props = {
  project: IProjectsListing;
};

export default function MyProjectsCard({ project }: Props) {
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
      refetchQueries: ['GetSharedProjects'],
      update: (cache) => {
        cache.modify({
          id: cache.identify({
            __typename: 'Project',
            id: Number(project.id),
          }),
          fields: {
            isPublic: () => !project.isPublic,
          },
        });
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
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 10,
            }}
          >
            <Text
              style={{
                color: project.isPublic ? 'green' : 'red',
                fontWeight: 'bold',
                fontSize: 16,
              }}
            >
              {project.isPublic ? 'Public' : 'Private'}
            </Text>
            <Switch
              trackColor={{ false: 'red', true: 'green' }}
              thumbColor={project.isPublic ? 'lightgrey' : 'lightgrey'}
              onValueChange={() => modifyPrivacy()}
              value={project.isPublic}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <Text style={{ marginRight: 10, color: 'white' }}>
                {project.likes.length}
              </Text>
              <Image
                style={styles.logo}
                source={require('../assets/heart-solid-white.png')}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ marginRight: 10, color: 'white' }}>
                {project.comments.length}
              </Text>
              <Image
                style={styles.logo}
                source={require('../assets/speech-bubble.png')}
              />
            </View>
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
          <Text style={styles.language}>JavaScript</Text>

          <Text style={styles.description}>{project.description}</Text>
          <View style={styles.rowButton}>
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
    marginTop: 20,
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
    height: 200,
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
  description: {
    marginTop: 8,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: 'lightgrey',
    maxHeight: 50,
  },
  title: {
    fontSize: 20,
    color: 'white',
    textDecorationLine: 'underline',
    paddingLeft: 10,
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 0,
    padding: 0,
  },
  rowButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
    marginBottom: 15,
  },
  language: {
    fontWeight: 'bold',
    backgroundColor: 'yellow',
    width: 100,
    textAlign: 'center',
    marginLeft: 10,
    marginTop: 8,
    height: 20,
  },
  access: {
    fontWeight: 'bold',
    backgroundColor: 'lightblue',
    width: 180,
    textAlign: 'center',
    borderRadius: 10,
  },
});

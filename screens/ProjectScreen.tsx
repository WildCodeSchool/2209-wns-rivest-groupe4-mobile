import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import MyAccount from '../features/MyAccount';
import { UserContext } from 'contexts/UserContext';
import { useQuery } from '@apollo/client';
import IProjectsListing from 'interfaces/IProjectsListing';
import {
  GET_PROJECTS_BY_USER_ID,
  GET_PROJECTS_SUPPORTED,
} from 'apollo/queries';
import MyProjectsCard from '../features/MyProjectCard';
import ProjectSupported from '../features/ProjectsSupported';

export default function ProjectScreen() {
  const { user, token } = useContext(UserContext);
  const [userProjects, setUserProjects] = useState<IProjectsListing[]>();
  const [projectsSupported, setProjectsSupported] =
    useState<IProjectsListing[]>();

  useQuery(GET_PROJECTS_BY_USER_ID, {
    variables: { userId: user?.id },
    context: {
      headers: {
        authorization: token,
      },
    },
    onCompleted(data: { getProjectsByUserId: IProjectsListing[] }) {
      setUserProjects(data.getProjectsByUserId);
    },
  });

  useQuery(GET_PROJECTS_SUPPORTED, {
    variables: { userId: user?.id },
    context: {
      headers: {
        authorization: token,
      },
    },
    onCompleted(data: { getProjectsSupported: IProjectsListing[] }) {
      setProjectsSupported(data.getProjectsSupported);
    },
  });

  return (
    <LinearGradient
      colors={['#1d2448', '#131d2f']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.title}>My Projects</Text>
          {userProjects?.map((project) => (
            <MyProjectsCard key={project.id} project={project} />
          ))}
          {userProjects?.length === 0 && (
            <Text style={styles.text}>No project yet</Text>
          )}
          <Text style={styles.title}>Projects Supported</Text>
          {projectsSupported?.map((project) => (
            <ProjectSupported key={project.id} project={project} />
          ))}
          {projectsSupported?.length === 0 && (
            <Text style={styles.text}>No project supported yet</Text>
          )}
          <Text style={styles.title}>My Account Access</Text>
          <MyAccount />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  text: {
    color: '#fff',
    fontSize: 15,
    marginTop: 0,
  },
  title: {
    color: '#fff',
    fontSize: 40,
    marginTop: 50,
    marginBottom: 5,
  },
  logo: {
    width: 100,
    height: 100,
  },
});

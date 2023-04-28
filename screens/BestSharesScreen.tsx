import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { UserContext } from 'contexts/UserContext';
import { useQuery } from '@apollo/client';
import IProjectsListing from 'interfaces/IProjectsListing';
import { GET_SHARED_PROJECTS } from 'apollo/queries';
import ProjectSupported from 'features/ProjectsSupported';

export default function BestSharesScreen() {
  const { user, token } = useContext(UserContext);
  const [projectsShared, setprojectsShared] = useState<IProjectsListing[]>();

  useQuery(GET_SHARED_PROJECTS, {
    context: {
      headers: {
        authorization: token,
      },
    },
    onCompleted(data: { getSharedProjects: IProjectsListing[] }) {
      setprojectsShared(data.getSharedProjects);
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
          <Text style={styles.title}>Best Shares</Text>
          {projectsShared?.map((project) => (
            <ProjectSupported key={project.id} project={project} />
          ))}
          {projectsShared?.length === 0 && (
            <Text style={styles.text}>No project yet</Text>
          )}
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

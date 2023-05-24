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
  const { token } = useContext(UserContext);

  const { loading, data, error } = useQuery(GET_SHARED_PROJECTS, {
    context: {
      headers: {
        authorization: token,
      },
    },
  });

  if (loading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

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
          {data && data.getSharedProjects.length === 0 ? (
            <Text style={styles.text}>No project yet</Text>
          ) : (
            data &&
            data.getSharedProjects.map((project: IProjectsListing) => (
              <ProjectSupported key={project.id} project={project} />
            ))
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

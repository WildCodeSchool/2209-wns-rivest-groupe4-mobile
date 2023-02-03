import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MyProjects from '../features/MyProjects';
import { ScrollView } from 'react-native-gesture-handler';
import ProjectSupport from '../features/ProjectsSupported';
import MyAccount from '../features/MyAccount';

export default function ProjectScreen() {
  return (
    <LinearGradient
      colors={['#1d2448', '#131d2f']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView>
        <KeyboardAvoidingView>
          <View style={styles.container}>
            <Text style={styles.title}>My Projects</Text>
            <MyProjects />
            <Text style={styles.title}>Projects Supported</Text>
            <ProjectSupport />
            <Text style={styles.title}> My Account Access </Text>
            <MyAccount />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 40,
    marginTop: 10,
  },
  logo: {
    width: 100,
    height: 100,
  },
});

import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { UserContext } from 'contexts/UserContext';
import { useQuery } from '@apollo/client';
import IProjectsListing from 'interfaces/IProjectsListing';
import { GET_SHARED_PROJECTS } from 'apollo/queries';
import ProjectSupported from 'features/ProjectsSupported';
import { Picker } from '@react-native-picker/picker';

export default function BestSharesScreen() {
  const { token } = useContext(UserContext);
  const [projectsShared, setprojectsShared] = useState<IProjectsListing[]>();
  const [pickerValue, setPickerValue] = useState<String>('Date 🔼');
  const [selectedFilter, setSelectedFilter] = useState<String>('createdAt');
  const [order, setOrder] = useState<String | null>('ASC');
  const [searchQuery, setSearchQuery] = useState<String | null>(null);

  const { refetch } = useQuery(GET_SHARED_PROJECTS, {
    variables: {
      limit: 10,
      offset: 0,
      query: searchQuery,
      order,
      orderBy: selectedFilter,
    },
    context: {
      headers: {
        authorization: token,
      },
    },
    onCompleted(data: { getSharedProjects: IProjectsListing[] }) {
      setprojectsShared(data.getSharedProjects);
    },
  });

  const handleSearchQuery = (text: string) => {
    setSearchQuery(text);
    refetch();
  };

  const handleSearchSort = (itemValue: String) => {
    switch (itemValue) {
      case 'DateAsc':
        setOrder('ASC');
        setSelectedFilter('createdAt');
        break;
      case 'DateDesc':
        setOrder('DESC');
        setSelectedFilter('createdAt');
        break;
      case 'MostLiked':
        setOrder('DESC');
        setSelectedFilter('likes');
        break;
      case 'LessLiked':
        setOrder('ASC');
        setSelectedFilter('likes');
        break;
      case 'TopCommented':
        setOrder('DESC');
        setSelectedFilter('comments');
        break;
      case 'LessCommented':
        setOrder('ASC');
        setSelectedFilter('comments');
        break;
      default:
        break;
    }
    setPickerValue(itemValue);
    refetch();
  };

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
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginVertical: 20,
              width: '100%',
            }}
          >
            <TextInput
              style={styles.search}
              placeholder="Search"
              placeholderTextColor="black"
              onChangeText={(text) => handleSearchQuery(text)}
            ></TextInput>
            <Picker
              selectedValue={pickerValue}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                handleSearchSort(itemValue)
              }
            >
              <Picker.Item label="Date 🔼" value="DateAsc" />
              <Picker.Item label="Date 🔽" value="DateDesc" />
              <Picker.Item label="Likes 🔼" value="MostLiked" />
              <Picker.Item label="Likes 🔽" value="LessLiked" />
              <Picker.Item label="Comments 🔼" value="TopCommented" />
              <Picker.Item label="Comments 🔽" value="LessCommented" />
            </Picker>
          </View>
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
  search: {
    width: 150,
    backgroundColor: '#fff',
    height: 50,
    paddingLeft: 10,
    color: 'black',
  },
  picker: {
    width: 170,
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 1,
    minHeight: 50,
  },
});

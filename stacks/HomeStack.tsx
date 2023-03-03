import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNav from 'features/BottomNav/BottomNav';
import React from 'react';
import { StyleSheet } from 'react-native';
import AboutMeScreen from 'screens/AboutMeScreen';
import ContactScreen from 'screens/ContactScreen';

export type HomeStackNavigatorParamList = {
  Home: undefined;
  About: undefined;
  Contact: undefined;
};

const Stack = createNativeStackNavigator<HomeStackNavigatorParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomNav}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutMeScreen}
        options={{
          title: 'About Me',
          headerStyle: {
            backgroundColor: '#1d2448',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          title: 'Contact us',
          headerStyle: {
            backgroundColor: '#1d2448',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});

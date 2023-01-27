import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import Settings from './Settings';

export default function Nav() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Best') {
              iconName = focused ? 'star-outline' : 'star';
            } else if (route.name === 'Profil') {
              iconName = focused ? 'person-outline' : 'person';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings-outline' : 'md-settings-sharp';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarStyle: { backgroundColor: '#1D3148' },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'lightgrey',
        })}
      >
        <Tab.Screen
          name="Best"
          component={LoginScreen}
          options={{
            headerStyle: {
              backgroundColor: '#1D3148',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Tab.Screen
          name="Profil"
          component={LoginScreen}
          options={{
            headerStyle: {
              backgroundColor: '#1D3148',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            headerStyle: {
              backgroundColor: '#1D3148',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            unmountOnBlur: true,
          }}
        />
      </Tab.Navigator>
      <Tab.Group>
        <Tab.Screen name="Home" component={Settings} />
      </Tab.Group>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
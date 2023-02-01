import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from '../features/Settings';
import EditorScreen from '../screens/EditorScreen';

const Tab = createBottomTabNavigator();

export default function BottomNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap | undefined;

          if (route.name === 'Best') {
            iconName = focused ? 'star-outline' : 'star';
          } else if (route.name === 'Login') {
            iconName = focused ? 'person-outline' : 'person';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings-outline' : 'md-settings-sharp';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarStyle: { backgroundColor: '#1d2448' },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'lightgrey',
      })}
    >
      <Tab.Screen
        name="Best"
        component={EditorScreen}
        options={{
          headerStyle: {
            backgroundColor: '#1d2448',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="Login"
        component={EditorScreen}
        options={{
          headerStyle: {
            backgroundColor: '#1d2448',
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
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
}

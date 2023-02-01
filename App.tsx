import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import AboutMeScreen from './screens/AboutMeScreen';
import LoginScreen from './screens/LoginScreen';
import BottomNav from './features/BottomNav';
import ContactScreen from './screens/ContactScreen';
import { AuthContext } from 'context/AuthContext';

const Stack = createNativeStackNavigator();

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:5001/',
  cache: new InMemoryCache(),
});

type ReducerState = {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null | undefined;
};

type ReducerAction = {
  type: 'RESTORE_TOKEN' | 'SIGN_IN' | 'SIGN_OUT';
  token: string | null | undefined;
};

const initialState: ReducerState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
};

const reducer = (prevState: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
  }
};

export default function App() {
  const [fontsLoaded] = useFonts({
    'Aldrich-Regular': require('./assets/fonts/Aldrich-Regular.ttf'),
    'Barlow-Black': require('./assets/fonts/Barlow-Black.ttf'),
    'Barlow-BlackItalic': require('./assets/fonts/Barlow-BlackItalic.ttf'),
    'Barlow-Bold': require('./assets/fonts/Barlow-Bold.ttf'),
    'Barlow-BoldItalic': require('./assets/fonts/Barlow-BoldItalic.ttf'),
    'Barlow-ExtraBold': require('./assets/fonts/Barlow-ExtraBold.ttf'),
    'Barlow-ExtraBoldItalic': require('./assets/fonts/Barlow-ExtraBoldItalic.ttf'),
    'Barlow-ExtraLightItalic': require('./assets/fonts/Barlow-ExtraLightItalic.ttf'),
    'Barlow-ExtraLight': require('./assets/fonts/Barlow-ExtraLight.ttf'),
    'Barlow-Italic': require('./assets/fonts/Barlow-Italic.ttf'),
    'Barlow-Light': require('./assets/fonts/Barlow-Light.ttf'),
    'Barlow-LightItalic': require('./assets/fonts/Barlow-LightItalic.ttf'),
    'Barlow-Medium': require('./assets/fonts/Barlow-Medium.ttf'),
    'Barlow-MediumItalic': require('./assets/fonts/Barlow-MediumItalic.ttf'),
    'Barlow-Regular': require('./assets/fonts/Barlow-Regular.ttf'),
    'Barlow-SemiBold': require('./assets/fonts/Barlow-SemiBoldItalic.ttf'),
    'Barlow-SemiBoldItalic': require('./assets/fonts/Barlow-SemiBoldItalic.ttf'),
    'Barlow-Thin': require('./assets/fonts/Barlow-Thin.ttf'),
    'Barlow-ThinItalic': require('./assets/fonts/Barlow-ThinItalic.ttf'),
  });

  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync('authToken');
      } catch (err) {
        console.error(err);
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (token: string) => {
        dispatch({ type: 'SIGN_IN', token });
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync('authToken');
        dispatch({
          type: 'SIGN_OUT',
          token: null,
        });
      },
      signUp: async (token: string) => {
        dispatch({ type: 'SIGN_IN', token });
      },
    }),
    [],
  );

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator>
            {state.userToken == null ? (
              <Stack.Screen
                name="SignIn"
                component={LoginScreen}
                options={{
                  headerShown: false,
                }}
              />
            ) : (
              <>
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
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

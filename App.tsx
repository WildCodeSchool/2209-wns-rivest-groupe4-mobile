import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BACKEND_PORT, BACKEND_URL } from '@env';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from 'contexts/AuthContext';
import { User, UserContext } from 'contexts/UserContext';
import { useFonts } from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import React, { useMemo, useState } from 'react';
import AuthStack from 'stacks/AuthStack';
import HomeStack from 'stacks/HomeStack';
import fonts from './assets/fonts/fonts';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: `http://${BACKEND_URL}:${BACKEND_PORT}/`,
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
  const [fontsLoaded] = useFonts(fonts);

  const [authState, dispatch] = React.useReducer(reducer, initialState);
  const [user, setUser] = useState<User | null>(null);

  React.useEffect(() => {
    (async () => {
      let userToken;
      let user;
      try {
        userToken = await SecureStore.getItemAsync('authToken');
        user = await SecureStore.getItemAsync('user');
      } catch (err) {
        console.error(err);
      }
      if (user && userToken) {
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        setUser(JSON.parse(user));
      }
    })();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (token: string) => {
        dispatch({ type: 'SIGN_IN', token });
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync('authToken');
        await SecureStore.deleteItemAsync('user');
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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authContext}>
        <UserContext.Provider value={{ user, setUser }}>
          <NavigationContainer>
            {authState.userToken == null ? <AuthStack /> : <HomeStack />}
          </NavigationContainer>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

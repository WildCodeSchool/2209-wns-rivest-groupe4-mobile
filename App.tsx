import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AuthTokenContext } from 'context/AuthTokenContext';
import LoginScreen from './screens/LoginScreen';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:5001/',
  cache: new InMemoryCache(),
});

export default function App() {
  const [authToken, setAuthToken] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      const result = await SecureStore.getItemAsync('authToken');
      result && setAuthToken(result);
    })();
  }, []);

  return (
    <ApolloProvider client={client}>
      <AuthTokenContext.Provider value={{ authToken, setAuthToken }}>
        <View style={styles.container}>
          <LoginScreen />
        </View>
      </AuthTokenContext.Provider>
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

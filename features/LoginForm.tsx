import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-ui-lib';
import { TextField } from 'react-native-ui-lib/src/incubator';
import { gql, useLazyQuery } from '@apollo/client';
import { AuthContext } from 'context/AuthContext';

const GET_TOKEN = gql`
  query GetTokenWithUser($password: String!, $email: String!) {
    getTokenWithUser(password: $password, email: $email) {
      token
    }
  }
`;

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = React.useContext(AuthContext);

  const [login, { loading, error, data }] = useLazyQuery(GET_TOKEN, {
    onCompleted: async (data) => {
      await SecureStore.setItemAsync('authToken', data.getTokenWithUser.token);
      signIn(data.getTokenWithUser.token);
      console.log(data.getTokenWithUser);
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View>
        <TextField
          placeholder={'Email'}
          floatingPlaceholder
          autoCapitalize={'none'}
          autoComplete={'email'}
          onChangeText={(e: string) => setEmail(e)}
          enableErrors
          validate={['required', 'email', (value: string) => value.length > 6]}
          validationMessage={[
            'Field is required',
            'Email is invalid',
            'Password is too short',
          ]}
          maxLength={30}
          style={styles.input}
        />
        <TextField
          placeholder={'Password'}
          floatingPlaceholder
          secureTextEntry={true}
          autoCapitalize={'none'}
          onChangeText={(e: string) => setPassword(e)}
          enableErrors
          validate={['required', 'email', (value: string) => value.length > 6]}
          validationMessage={[
            'Field is required',
            'Password is invalid',
            'Password is too short',
          ]}
          maxLength={30}
          style={styles.input}
        />
      </View>
      <View>
        <Text style={styles.text}>You don&apos;t have an account yet ?</Text>
        <Text style={styles.text}>Register now</Text>
      </View>
      <Button
        label={'Login'}
        onPress={() => {
          login({
            variables: {
              password: password,
              email: email,
            },
          });
        }}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 100,
    width: '100%',
  },
  title: {
    color: '#fff',
    fontSize: 40,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    color: '#fff',
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    width: '100%',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
});

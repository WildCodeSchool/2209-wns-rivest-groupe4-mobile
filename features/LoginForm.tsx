import { gql, useLazyQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GradientButton from 'components/GradientButton';
import { AuthContext } from 'contexts/AuthContext';
import { UserContext } from 'contexts/UserContext';
import * as SecureStore from 'expo-secure-store';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Checkbox, LoaderScreen } from 'react-native-ui-lib';
import { TextField } from 'react-native-ui-lib/src/incubator';
import { gql, useLazyQuery } from '@apollo/client';
import { AuthContext } from 'context/AuthContext';
import { AuthStackNavigatorParamList } from 'stacks/AuthStack';

const GET_TOKEN = gql`
  query GetTokenWithUser($password: String!, $email: String!) {
    getTokenWithUser(password: $password, email: $email) {
      token
      user {
        id
        email
        pseudo
        premium
      }
    }
  }
`;

export default function LoginForm() {
  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<AuthStackNavigatorParamList, 'SignIn'>
    >();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const { signIn } = React.useContext(AuthContext);
  const { setUser } = useContext(UserContext);

  const [login, { loading, error }] = useLazyQuery(GET_TOKEN, {
    onCompleted: async (data) => {
      if (remember) {
        await SecureStore.setItemAsync(
          'authToken',
          data.getTokenWithUser.token,
        );
        await SecureStore.setItemAsync(
          'user',
          JSON.stringify(data.getTokenWithUser.user),
        );
      }
      setUser(data.user);
      signIn(data.getTokenWithUser.token);
      console.log(data.getTokenWithUser);
    },
    onError(error) {
      alert(error.message);
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {loading ? (
        <LoaderScreen color={'#fff'} />
      ) : (
        <>
          <View>
            <TextField
              placeholder={'Email'}
              keyboardType={'email-address'}
              floatingPlaceholder
              autoCapitalize={'none'}
              autoComplete={'email'}
              onChangeText={(e: string) => setEmail(e)}
              enableErrors
              validateOnBlur
              validate={['required', 'email']}
              validationMessage={['Email is required', 'Email is invalid']}
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
              validateOnBlur
              validate={['required', (value: string) => value.length >= 8]}
              validationMessage={[
                'Password is required',
                'Password is too short',
              ]}
              maxLength={30}
              style={styles.input}
            />
            {error?.message === 'Invalid Auth' && (
              <Text style={styles.errorMessage}>Invalid Credentials</Text>
            )}
            <Checkbox
              label={'Stay connected'}
              value={remember}
              onValueChange={() => setRemember(!remember)}
              color={'#fff'}
              size={16}
              borderRadius={0}
              labelStyle={{ color: '#fff' }}
            />
          </View>
          <View>
            <Text style={styles.text}>
              You don&apos;t have an account yet ?
            </Text>
            <TouchableOpacity onPress={() => navigate('SignUp')}>
              <Text style={styles.text}>Register now</Text>
            </TouchableOpacity>
          </View>
          <GradientButton
            gradient="cyanToBlue"
            onPress={() => {
              login({
                variables: {
                  password: password,
                  email: email,
                },
              });
            }}
          >
            LOGIN
          </GradientButton>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    minHeight: 500,
  },
  title: {
    fontFamily: 'Aldrich-Regular',
    color: '#fff',
    fontSize: 40,
    textAlign: 'center',
  },
  input: {
    color: '#fff',
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    minWidth: 260,
  },
  errorMessage: {
    color: 'red',
    marginVertical: 10,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
});

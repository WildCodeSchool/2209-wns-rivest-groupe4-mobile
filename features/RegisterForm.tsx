import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GradientButton from 'components/GradientButton';
import { AuthContext } from 'contexts/AuthContext';
import { UserContext } from 'contexts/UserContext';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextField } from 'react-native-ui-lib/src/incubator';
import { AuthStackNavigatorParamList } from 'stacks/AuthStack';

const CREATE_USER = gql`
  mutation Mutation($pseudo: String!, $password: String!, $email: String!) {
    createUser(pseudo: $pseudo, password: $password, email: $email) {
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

export default function RegisterForm() {
  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<AuthStackNavigatorParamList, 'SignIn'>
    >();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pseudo, setPseudo] = useState('');

  const { signUp } = React.useContext(AuthContext);
  const { setUser } = useContext(UserContext);

  const [register, { error }] = useMutation(CREATE_USER, {
    onCompleted: async (data) => {
      setUser(data.createUser.user);
      signUp(data.createUser.token);
    },
    onError(error, clientOptions) {
      alert(error.message);
    },
  });

  const submit = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
    } else {
      register({
        variables: {
          email,
          password,
          pseudo,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
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
          validationMessage={['Field is required', 'Password is too short']}
          maxLength={30}
          style={styles.input}
        />
        <TextField
          placeholder={'Confirm Password'}
          floatingPlaceholder
          secureTextEntry={true}
          autoCapitalize={'none'}
          onChangeText={(e: string) => setConfirmPassword(e)}
          enableErrors
          validateOnBlur
          validate={['required', (value: string) => value.length >= 8]}
          validationMessage={['Field is required', 'Password is too short']}
          maxLength={30}
          style={styles.input}
        />
        <TextField
          placeholder={'Pseudo'}
          floatingPlaceholder
          autoCapitalize={'none'}
          onChangeText={(e: string) => setPseudo(e)}
          enableErrors
          validateOnBlur
          validate={['required']}
          validationMessage={['Pseudo is required']}
          maxLength={30}
          style={styles.input}
        />
      </View>
      <View>
        <Text style={styles.text}>You have an account yet ?</Text>
        <TouchableOpacity onPress={() => navigate('SignIn')}>
          <Text style={styles.text}>Login now</Text>
        </TouchableOpacity>
      </View>
      <GradientButton gradient="cyanToBlue" onPress={submit}>
        REGISTER
      </GradientButton>
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
  text: {
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    width: '50%',
  },
});

import { Image, StyleSheet, TextInput, View } from 'react-native';
import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { MODIFY_USER } from '../../apollo/mutations';
import GradientButton from 'components/GradientButton';
import { UserContext } from 'contexts/UserContext';

export default function AboutMeForm() {
  const { user, setUser, token } = useContext(UserContext);
  const [statusModification, setStatusModification] = useState('');
  const [userUpdates, setUserUpdates] = useState<{
    name?: string;
    email?: string;
    pseudo?: string;
    password?: string;
  }>({
    email: user?.email,
    pseudo: user?.pseudo,
  });

  const [modifyUser, { loading, data, error }] = useMutation(MODIFY_USER);

  const handleClickModify = async () => {
    await modifyUser({
      variables: { ...userUpdates, modifyUserId: user?.id },
      context: {
        headers: {
          authorization: token,
        },
      },
      onError: () => {
        setStatusModification('error');
      },
      onCompleted: (data) => {
        setUser(data.modifyUser.user);
        setStatusModification('ok');
      },
    });
  };

  return (
    <View style={styles.mainContainer}>
      {/* <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="John"
          placeholderTextColor="white"
          onChangeText={(text) =>
            setUserUpdates({
              ...userUpdates,
              name: text,
            })
          }
        ></TextInput>
        <Image
          style={styles.logoUser}
          source={require('../../assets/user.png')}
        />
      </View> */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          defaultValue={user?.pseudo}
          placeholderTextColor="white"
          onChangeText={(text) =>
            setUserUpdates({
              ...userUpdates,
              pseudo: text,
            })
          }
        ></TextInput>
        <Image
          style={styles.logoUserTag}
          source={require('../../assets/user-tag.png')}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          defaultValue={user?.email}
          placeholderTextColor="white"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) =>
            setUserUpdates({
              ...userUpdates,
              email: text,
            })
          }
        ></TextInput>
        <Image style={styles.logoAt} source={require('../../assets/at.png')} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          defaultValue="*************"
          placeholderTextColor="white"
          autoCapitalize="none"
          // onChangeText={(text) =>
          //   setUserUpdates({
          //     ...userUpdates,
          //     password: text,
          //   })
          // }
        ></TextInput>
        <Image
          style={styles.logoLock}
          source={require('../../assets/lock.png')}
        />
      </View>
      <GradientButton
        onPress={handleClickModify}
        gradient={
          statusModification == 'ok'
            ? 'greenToBlue'
            : statusModification == 'error'
            ? 'redToYellow'
            : 'cyanToBlue'
        }
      >
        {statusModification == 'ok'
          ? 'Saved !'
          : statusModification == 'error'
          ? 'Error...'
          : 'Change'}
      </GradientButton>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  input: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    width: 280,
    color: 'white',
  },
  logoAt: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 0,
    color: 'white',
  },
  logoUser: {
    width: 20,
    height: 23,
    position: 'absolute',
    right: 0,
    color: 'white',
  },
  logoUserTag: {
    width: 25,
    height: 20,
    position: 'absolute',
    right: 0,
    color: 'white',
  },
  logoLock: {
    width: 20,
    height: 23,
    position: 'absolute',
    right: 0,
    color: 'white',
  },
});

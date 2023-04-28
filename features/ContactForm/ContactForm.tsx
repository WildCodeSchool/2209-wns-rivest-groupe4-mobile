import { gql, useLazyQuery } from '@apollo/client';
import GradientButton from 'components/GradientButton';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, View, Image, StyleSheet, Text } from 'react-native';

type FormValues = {
  name: string;
  email: string;
  reason: string;
};

export const SEND_MAIL = gql`
  query Query($name: String!, $email: String!, $reason: String!) {
    SendMail(name: $name, email: $email, reason: $reason)
  }
`;
const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default function ContactForm() {
  const [statusModification, setStatusModification] = useState('');

  const [mail] = useLazyQuery(SEND_MAIL, {
    onError: () => {
      setStatusModification('error');
    },
    onCompleted(data: { SendMail: FormValues }) {
      setStatusModification('ok');
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = handleSubmit((data) => {
    mail({
      variables: data,
    });
    reset();
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="white"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="name"
        />
        <Image
          style={styles.logoUser}
          source={require('../../assets/user.png')}
        />
      </View>
      {errors.name && <Text style={styles.valid}>Name is required.</Text>}
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              autoComplete="email"
              placeholder="Enter your mail"
              placeholderTextColor="white"
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={(value) => onChange(reg.test(value))}
              value={value}
            />
          )}
          name="email"
        />
        <Image style={styles.logoAt} source={require('../../assets/at.png')} />
      </View>
      {errors.email && <Text style={styles.valid}>Email is required.</Text>}
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              editable
              multiline
              placeholder="Explain your problem"
              placeholderTextColor="white"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="reason"
        />
      </View>
      {errors.reason && <Text style={styles.reason}>Reason is required.</Text>}
      <View style={errors.reason ? null : { marginTop: 40 }} />
      <GradientButton
        onPress={onSubmit}
        gradient={
          statusModification == 'ok'
            ? 'greenToBlue'
            : statusModification == 'error'
            ? 'redToYellow'
            : 'cyanToBlue'
        }
      >
        {statusModification == 'ok'
          ? 'Mail Sent'
          : statusModification == 'error'
          ? 'Error ...'
          : 'SEND'}
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
    marginBottom: 5,
    marginTop: 40,
  },
  valid: {
    color: 'red',
    marginTop: 10,
  },
  reason: {
    color: 'red',
    marginTop: 10,
    marginBottom: 30,
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
});

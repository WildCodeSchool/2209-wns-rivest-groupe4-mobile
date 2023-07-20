import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useContext } from 'react';
import { UserContext } from 'contexts/UserContext';
import { useQuery } from '@apollo/client';
import {
  GET_DAILY_RUNS,
  GET_USER_COMMENTS,
  GET_USER_LIKES,
} from 'apollo/queries';
import ILike from 'interfaces/ILike';
import IComment from 'interfaces/IComment';
import GradientButton from 'components/GradientButton';

export default function MyAccount() {
  const { user, token } = useContext(UserContext);
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<number>(0);
  const [runs, setRuns] = useState<number>(0);

  useQuery(GET_USER_LIKES, {
    context: {
      headers: {
        authorization: token,
      },
    },
    onCompleted(data: { getMonthlyLikesByUser: ILike[] }) {
      setLikes(data.getMonthlyLikesByUser.length);
    },
  });

  useQuery(GET_DAILY_RUNS, {
    context: {
      headers: {
        authorization: token,
      },
    },
    onCompleted(data: { getDailyRunsUser: number }) {
      setRuns(data.getDailyRunsUser);
    },
  });

  useQuery(GET_USER_COMMENTS, {
    context: {
      headers: {
        authorization: token,
      },
    },
    onCompleted(data: { getMonthlyCommentsByUser: IComment[] }) {
      setComments(data.getMonthlyCommentsByUser.length);
    },
  });

  return (
    <View style={styles.mainContainer}>
      {user?.premium ? (
        <Text
          style={{
            color: 'brown',
            fontSize: 18,
            marginLeft: 20,
            marginTop: 10,
            fontWeight: 'bold',
          }}
        >
          • Premium Account
        </Text>
      ) : (
        <Text
          style={{
            color: 'green',
            fontSize: 18,
            marginLeft: 20,
            marginTop: 10,
            fontWeight: 'bold',
          }}
        >
          • Free Account
        </Text>
      )}
      <Text style={styles.text}>Number of runs today :</Text>
      <View style={styles.row}>
        <View style={styles.counter}>
          {user?.premium ? (
            <Text style={styles.counter}> {runs} / ∞</Text>
          ) : (
            <Text style={styles.counter}> {runs} / 50</Text>
          )}
        </View>
        <View
          style={{
            backgroundColor: '#f1672c',
            width: user?.premium ? `100%` : `${runs * 2}%`,
            borderRadius: 5,
            height: 30,
          }}
        />
      </View>
      <Text style={styles.text}>Number of likes this month :</Text>
      <View style={styles.row}>
        <View style={styles.counter}>
          {user?.premium ? (
            <Text style={styles.counter}> {likes} / ∞</Text>
          ) : (
            <Text style={styles.counter}> {likes} / 5</Text>
          )}
        </View>
        <View
          style={{
            backgroundColor: '#f1bf25',
            width: user?.premium ? `100%` : `${likes * 20}%`,
            borderRadius: 5,
            height: 30,
          }}
        />
      </View>
      <Text style={styles.text}>Number commentaries this month :</Text>
      <View style={styles.row}>
        <View style={styles.counter}>
          {user?.premium ? (
            <Text style={styles.counter}> {comments} / ∞</Text>
          ) : (
            <Text style={styles.counter}> {comments} / 5</Text>
          )}
        </View>
        <View
          style={{
            backgroundColor: '#3178c6',
            width: user?.premium ? `100%` : `${comments * 20}%`,
            borderRadius: 5,
            height: 30,
          }}
        />
      </View>
      {!user?.premium && (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <GradientButton gradient={'redToYellow'} onPress={() => {}}>
            PREMIUM ACCESS
          </GradientButton>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: 400,
    width: '100%',
  },
  row: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginLeft: 25,
    marginRight: 25,
    height: 30,
  },
  counter: {
    textAlign: 'center',
    alignItems: 'center',
    color: 'black',
    width: '100%',
    marginTop: 1,
    position: 'absolute',
    zIndex: 2,
  },
  text: {
    marginTop: 20,
    marginBottom: 4,
    marginLeft: 25,
    marginRight: 25,
    fontSize: 16,
    color: 'white',
  },
});

import { Button, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

export default function MyAccount() {
  //faire un apelle a la bdd pour savoir le nombre de run + nombre de like
  const [count, setCount] = useState(0);
  const [like, setLike] = useState(0);
  const [comment, setComment] = useState(0);
  const [isPremium, setIsPremium] = useState(true);

  return (
    <View style={styles.mainContainer}>
      {isPremium ? (
        <Text
          style={{
            color: 'brown',
            fontSize: 18,
            marginLeft: 20,
            marginTop: 10,
            fontWeight: 'bold',
          }}
        >
          {' '}
          • Premium Account{' '}
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
          {' '}
          • Free Account{' '}
        </Text>
      )}
      <Text style={styles.text}> Number of runs this month :</Text>
      <View style={styles.row}>
        <View style={styles.counter}>
          {isPremium ? (
            <Text style={styles.counter}> {count} / ∞</Text>
          ) : (
            <Text style={styles.counter}> {count} / 50</Text>
          )}
        </View>
        <View
          style={{
            backgroundColor: '#f1672c',
            width: isPremium ? `100%` : `${count * 2}%`,
            borderRadius: 5,
            height: 30,
          }}
        />
      </View>
      <Text style={styles.text}> Number of likes this month :</Text>
      <View style={styles.row}>
        <View style={styles.counter}>
          {isPremium ? (
            <Text style={styles.counter}> {like} / ∞</Text>
          ) : (
            <Text style={styles.counter}> {like} / 5</Text>
          )}
        </View>
        <View
          style={{
            backgroundColor: '#f1bf25',
            width: isPremium ? `100%` : `${like * 20}%`,
            borderRadius: 5,
            height: 30,
          }}
        />
      </View>
      <Text style={styles.text}> Number commentaries this month :</Text>
      <View style={styles.row}>
        <View style={styles.counter}>
          {isPremium ? (
            <Text style={styles.counter}> {comment} / ∞</Text>
          ) : (
            <Text style={styles.counter}> {comment} / 5</Text>
          )}
        </View>
        <View
          style={{
            backgroundColor: '#3178c6',
            width: isPremium ? `100%` : `${comment * 20}%`,
            borderRadius: 5,
            height: 30,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
        }}
      >
        <Button
          title="Run"
          onPress={() => {
            if (isPremium == true) {
              setCount(count + 1);
            } else if (count >= 50) {
              //faire une modale
              setCount(0);
              alert(`vous avez éffectuer vos ${count} run aujourd'hui `);
            } else setCount(count + 1);
          }}
        />
        <Button
          title="like"
          onPress={() => {
            if (isPremium == true) {
              setLike(like + 1);
            } else if (like >= 5) {
              //faire une modale
              setLike(0);
              alert(`vous avez éffectuer vos ${like} like aujourd'hui `);
            } else setLike(like + 1);
          }}
        />
        <Button
          title="comment"
          onPress={() => {
            if (isPremium == true) {
              setComment(comment + 1);
            } else if (comment >= 5) {
              //faire une modale
              setComment(0);
              alert(
                `vous avez éffectuer vos ${comment} commentaire aujourd'hui `,
              );
            } else setComment(comment + 1);
          }}
        />
        <Button
          title="premium"
          onPress={() => {
            if (isPremium == false) setIsPremium(true);
            else setIsPremium(false);
          }}
        />
      </View>
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

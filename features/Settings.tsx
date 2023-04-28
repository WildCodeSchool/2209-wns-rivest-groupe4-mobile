import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from 'contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function Settings() {
  const { signOut } = React.useContext(AuthContext);

  const navigation = useNavigation<any>();

  return (
    <LinearGradient
      colors={['#1d2448', '#131d2f']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
      style={styles.flexView}
    >
      <View style={styles.modalContent}>
        <View style={styles.center}>
          <TouchableHighlight
            onPress={() => navigation.navigate({ name: 'About' })}
            style={styles.btnClickContain}
            underlayColor="none"
          >
            <View style={styles.btnContainer}>
              <Text style={styles.text}>About me</Text>
              <Icon
                name="person-outline"
                size={35}
                color="#FFFFFF"
                style={styles.icon}
              />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => navigation.navigate({ name: 'Contact' })}
            style={styles.btnClickContain}
            underlayColor="none"
          >
            <View style={styles.btnContainer}>
              <Text style={styles.text}>Contact us</Text>
              <Icon
                name="mail-outline"
                size={35}
                color="#FFFFFF"
                style={styles.icon}
              />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => signOut()}
            style={styles.btnClickContain}
            underlayColor="none"
          >
            <View style={styles.btnContainer}>
              <Text style={styles.text}>Logout</Text>
              <Icon
                name="log-out-outline"
                size={35}
                color="#FFFFFF"
                style={styles.icon}
              />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flexView: {
    width: '100%',
    padding: 0,
    flex: 1,
    backgroundColor: '#1d2448',
  },
  modalContent: {
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 330,
    paddingBottom: 20,
  },
  center: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    flexDirection: 'row',
    color: '#ffffff',
    fontSize: 25,
    marginTop: 50,
  },
  icon: {
    fontWeight: 'bold',
    marginTop: 50,
    marginLeft: 50,
  },
  btnClickContain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    alignSelf: 'stretch',
  },
});

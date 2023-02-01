import React, { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from 'context/AuthContext';

export default function Settings() {
  const [isModalVisible, setModalVisible] = useState(true);

  const { signOut } = React.useContext(AuthContext);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const navigation = useNavigation<any>();

  return (
    <View style={styles.flexView}>
      <Modal
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.center}>
            <View style={styles.barIcon} />
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
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  flexView: {
    flex: 1,
    backgroundColor: 'white',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#1D3148',
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
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: '#bbb',
    borderRadius: 3,
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

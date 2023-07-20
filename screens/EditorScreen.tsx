import React, { useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import WebView from 'react-native-webview';
import { StyleSheet } from 'react-native';
import { Image, Modal } from 'react-native-ui-lib';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
};

const EditorScreen = ({ modalVisible, setModalVisible }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);

  const hideLoader = () => {
    if (loading) {
      setLoading(false);
    }
  };

  return (
    <Modal
      transparent={true}
      onBackdropPress={() => setModalVisible(false)}
      onBackButtonPress={() => setModalVisible(false)}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <LinearGradient
        colors={['#1d2448', '#131d2f']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={styles.mainContainer}
      >
        <View style={styles.modalView}>
          <View style={styles.top}>
            <Pressable
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Image
                style={styles.logoClose}
                source={require('../assets/xmark-solid.png')}
              />
            </Pressable>
          </View>
          <SafeAreaView style={styles.container}>
            <View style={styles.content}>
              <WebView
                onLoadEnd={hideLoader}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                source={{
                  uri: `https://staging.rivest4.wns.wilders.dev/mobile-code-editor`,
                }}
              />
              {loading && (
                <View>
                  <Text>Loading...</Text>
                </View>
              )}
            </View>
          </SafeAreaView>
        </View>
      </LinearGradient>
    </Modal>
  );
};

export default EditorScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  modalView: {
    margin: 5,
    flex: 1,
    borderRadius: 5,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'flex-start',
    width: '100%',
    elevation: 5,
    height: '100%',
  },
  top: {
    width: '100%',
    height: 20,
  },
  logoClose: {
    width: 15,
    height: 15,
  },
  buttonClose: {
    color: 'white',
    width: 20,
    marginTop: 5,
    height: 20,
  },
  container: { flex: 1, width: '100%', height: '100%', marginTop: 20 },
  content: { flex: 1, elevation: 0, height: '100%' },
});

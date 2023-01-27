import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import WebView from 'react-native-webview';
import { StyleSheet } from 'react-native';
import { FRONTEND_URL, FRONTEND_PORT } from '@env';

const EditorScreen = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const hideLoader = () => {
    if (loading) {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <WebView
          onLoadEnd={hideLoader}
          source={{
            uri: `http://${FRONTEND_URL}:${FRONTEND_PORT}/mobile-code-editor`,
          }}
        />
        {loading && (
          <View>
            <Text>Loading...</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default EditorScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, elevation: 0 },
});

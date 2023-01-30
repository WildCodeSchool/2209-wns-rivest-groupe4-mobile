import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import LoginScreen from './screens/LoginScreen';
import ContactScreen from './screens/ContactScreen';
import AboutMeScreen from './screens/AboutMeScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Aldrich-Regular': require('./assets/fonts/Aldrich-Regular.ttf'),
    'Barlow-Black': require('./assets/fonts/Barlow-Black.ttf'),
    'Barlow-BlackItalic': require('./assets/fonts/Barlow-BlackItalic.ttf'),
    'Barlow-Bold': require('./assets/fonts/Barlow-Bold.ttf'),
    'Barlow-BoldItalic': require('./assets/fonts/Barlow-BoldItalic.ttf'),
    'Barlow-ExtraBold': require('./assets/fonts/Barlow-ExtraBold.ttf'),
    'Barlow-ExtraBoldItalic': require('./assets/fonts/Barlow-ExtraBoldItalic.ttf'),
    'Barlow-ExtraLightItalic': require('./assets/fonts/Barlow-ExtraLightItalic.ttf'),
    'Barlow-ExtraLight': require('./assets/fonts/Barlow-ExtraLight.ttf'),
    'Barlow-Italic': require('./assets/fonts/Barlow-Italic.ttf'),
    'Barlow-Light': require('./assets/fonts/Barlow-Light.ttf'),
    'Barlow-LightItalic': require('./assets/fonts/Barlow-LightItalic.ttf'),
    'Barlow-Medium': require('./assets/fonts/Barlow-Medium.ttf'),
    'Barlow-MediumItalic': require('./assets/fonts/Barlow-MediumItalic.ttf'),
    'Barlow-Regular': require('./assets/fonts/Barlow-Regular.ttf'),
    'Barlow-SemiBold': require('./assets/fonts/Barlow-SemiBoldItalic.ttf'),
    'Barlow-SemiBoldItalic': require('./assets/fonts/Barlow-SemiBoldItalic.ttf'),
    'Barlow-Thin': require('./assets/fonts/Barlow-Thin.ttf'),
    'Barlow-ThinItalic': require('./assets/fonts/Barlow-ThinItalic.ttf'),
  });

  if (!fontsLoaded) {
    return <View></View>;
  } else {
    return (
      <LinearGradient
        colors={['#1d2448', '#131d2f']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <AboutMeScreen />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

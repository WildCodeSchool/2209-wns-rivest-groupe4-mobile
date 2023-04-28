import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

//To add gradient style
//Add your style name in Gradient Type
type Gradient = 'cyanToBlue' | 'redToYellow' | 'greenToBlue';
type ColorPalette = { [key: string]: [string, string] };

type Props = {
  onPress: () => void;
  children: React.ReactNode;
  gradient: Gradient;
};

//Add your gradient color associate to your style name
const possibleGradient: ColorPalette = {
  cyanToBlue: ['#06b6d4', '#3f83f8'],
  redToYellow: ['#F05252', '#FCE96A'],
  greenToBlue: ['#00D40E', '#00BA2D'],
};

export default function GradientButton({ onPress, children, gradient }: Props) {
  const colors = possibleGradient[gradient];

  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <Text style={styles.text}>{children}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#fff',
  },
});

import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';

type ButtonStyle = 'light' | 'dark';

export const setupTransparentNavBar = () => {
  if (Platform.OS !== 'android') return;
  NavigationBar.setPositionAsync('absolute');
  NavigationBar.setBackgroundColorAsync('transparent');
};

export const setAndroidNavBar = (buttonStyle: ButtonStyle) => {
  if (Platform.OS !== 'android') return;
  NavigationBar.setButtonStyleAsync(buttonStyle);
};

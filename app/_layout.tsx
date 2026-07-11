import FlyToCartOverlay from '@/src/components/cart/FlyToCartOverlay';
import AnimatedSplash from '@/src/components/common/AnimatedSplash';
import ThemeProvider, { useTheme } from '@/src/theme/ThemeProvider';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/checkout` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    OutfitBold: require('../assets/fonts/Outfit-Bold.ttf'),
    OutfitLight: require('../assets/fonts/Outfit-Light.ttf'),
    OutfitRegular: require('../assets/fonts/Outfit-Regular.ttf'),
    OutfitThin: require('../assets/fonts/Outfit-Thin.ttf'),
    OutfitSemiBold: require('../assets/fonts/Outfit-SemiBold.ttf'),
    OutfitMedium: require('../assets/fonts/Outfit-Medium.ttf'),
  });

  const [showAnimatedSplash, setShowAnimatedSplash] = useState(true);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      // Hide the native splash immediately; the custom AnimatedSplash
      // overlay below takes over for the actual branded animation.
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <RootLayoutNav />
          <FlyToCartOverlay />
          {showAnimatedSplash && <AnimatedSplash onFinish={() => setShowAnimatedSplash(false)} />}
          <Toast />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function RootLayoutNav() {
  const { theme } = useTheme();

  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: theme.background } }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="checkout" options={{ presentation: 'modal', headerShown: false }} />
    </Stack>
  );
}

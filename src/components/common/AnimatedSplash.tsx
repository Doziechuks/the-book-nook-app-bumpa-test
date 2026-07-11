import { PRIMARY } from '@/src/theme/colors';
import { FONTS } from '@/src/theme/typography';
import { SymbolView } from 'expo-symbols';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface AnimatedSplashProps {
  onFinish: () => void;
}

const AnimatedSplash = ({ onFinish }: AnimatedSplashProps) => {
  const cartScale = useSharedValue(0.4);
  const cartOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(12);
  const containerOpacity = useSharedValue(1);

  useEffect(() => {
    cartOpacity.value = withTiming(1, {
      duration: 400,
      easing: Easing.out(Easing.ease),
    });
    cartScale.value = withSequence(
      withTiming(1.15, { duration: 450, easing: Easing.out(Easing.exp) }),
      withTiming(1, { duration: 200, easing: Easing.inOut(Easing.ease) }),
    );

    textOpacity.value = withDelay(450, withTiming(1, { duration: 500 }));
    textTranslateY.value = withDelay(
      450,
      withTiming(0, { duration: 500, easing: Easing.out(Easing.ease) }),
    );

    containerOpacity.value = withDelay(
      1700,
      withTiming(0, { duration: 350 }, (finished) => {
        if (finished) {
          runOnJS(onFinish)();
        }
      }),
    );
  }, [cartOpacity, cartScale, textOpacity, textTranslateY, containerOpacity, onFinish]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));
  const cartStyle = useAnimatedStyle(() => ({
    opacity: cartOpacity.value,
    transform: [{ scale: cartScale.value }],
  }));
  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  return (
    <Animated.View style={[styles.wrapper, containerStyle]}>
      <Animated.View style={cartStyle}>
        <SymbolView
          name={{
            ios: 'cart.fill',
            android: 'shopping_cart',
            web: 'shopping_cart',
          }}
          size={64}
          tintColor="#FFFFFF"
        />
      </Animated.View>
      <Animated.Text style={[styles.title, textStyle]}>The Book Nook</Animated.Text>
    </Animated.View>
  );
};

export default AnimatedSplash;

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: PRIMARY[500],
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  title: {
    marginTop: 16,
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: FONTS.outfit_bold,
    letterSpacing: 0.5,
  },
});

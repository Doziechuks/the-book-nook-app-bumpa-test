import { useFlyAnimationStore } from '@/src/store/flyAnimationStore';
import { Image } from 'expo-image';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const ICON_SIZE = 40;

const FlyToCartOverlay = () => {
  const flightRequest = useFlyAnimationStore((state) => state.flightRequest);
  const cartIconPosition = useFlyAnimationStore((state) => state.cartIconPosition);
  const clearFlight = useFlyAnimationStore((state) => state.clearFlight);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (!flightRequest || !cartIconPosition) return;

    translateX.value = flightRequest.from.x - ICON_SIZE / 2;
    translateY.value = flightRequest.from.y - ICON_SIZE / 2;
    scale.value = 1;
    opacity.value = 1;

    translateX.value = withTiming(cartIconPosition.x - ICON_SIZE / 2, {
      duration: 650,
      easing: Easing.inOut(Easing.cubic),
    });
    translateY.value = withTiming(cartIconPosition.y - ICON_SIZE / 2, {
      duration: 650,
      easing: Easing.in(Easing.cubic),
    });
    scale.value = withTiming(0.3, {
      duration: 650,
      easing: Easing.inOut(Easing.cubic),
    });
    opacity.value = withTiming(
      0,
      { duration: 650, easing: Easing.inOut(Easing.cubic) },
      (finished) => {
        if (finished) {
          runOnJS(clearFlight)();
        }
      },
    );
  }, [flightRequest, cartIconPosition, translateX, translateY, scale, opacity, clearFlight]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  if (!flightRequest || !cartIconPosition) return null;

  return (
    <Animated.View style={[styles.icon, animatedStyle]} pointerEvents="none">
      <Image source={{ uri: flightRequest.imageUri }} style={styles.image} contentFit="cover" />
    </Animated.View>
  );
};

export default FlyToCartOverlay;

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: 8,
    overflow: 'hidden',
    zIndex: 9999,
    elevation: 9999,
  },
  image: { width: '100%', height: '100%' },
});

import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';

export const useHasNavButtons = () => {
  const insets = useSafeAreaInsets();
  const hasNavButtons = Platform.OS === 'android' && insets.bottom >= 40;
  const bottomPadding = hasNavButtons ? moderateScale(50) : moderateScale(35);

  return bottomPadding;
};

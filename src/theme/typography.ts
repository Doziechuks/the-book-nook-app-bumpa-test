import { Platform } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const FONT_SIZES = {
  xxs: moderateScale(9),
  xs: Platform.OS === 'ios' ? moderateScale(10) : moderateScale(9),
  sm: Platform.OS === 'ios' ? moderateScale(12) : moderateScale(11),
  base: Platform.OS === 'ios' ? moderateScale(14) : moderateScale(13),
  md: Platform.OS === 'ios' ? moderateScale(16) : moderateScale(15),
  lg: Platform.OS === 'ios' ? moderateScale(18) : moderateScale(17),
  xl: Platform.OS === 'ios' ? moderateScale(20) : moderateScale(18),
  '2xl': Platform.OS === 'ios' ? moderateScale(24) : moderateScale(22),
  '2l': Platform.OS === 'ios' ? moderateScale(25) : moderateScale(23),
  '3xl': Platform.OS === 'ios' ? moderateScale(28) : moderateScale(25),
  '4xl': Platform.OS === 'ios' ? moderateScale(32) : moderateScale(29),
  '4l': Platform.OS === 'ios' ? moderateScale(35) : moderateScale(32),
  '5xl': Platform.OS === 'ios' ? moderateScale(40) : moderateScale(37),
};

const FONTS = {
  outfit_regular: 'OutfitRegular',
  outfit_light: 'OutfitLight',
  outfit_bold: 'OutfitBold',
  outfit_thin: 'OutfitThin',
  outfit_semi_bold: 'OutfitSemiBold',
  outfit_medium: 'OutfitMedium',
};

const TYPOGRAPHY = {
  h1: {
    fontFamily: FONTS.outfit_bold,
    fontSize: FONT_SIZES['4xl'],
    lineHeight: FONT_SIZES['4xl'] * 1.2,
  },
  h2: {
    fontFamily: FONTS.outfit_bold,
    fontSize: FONT_SIZES['2xl'],
    lineHeight: FONT_SIZES['2xl'] * 1.25,
  },
  h3: {
    fontFamily: FONTS.outfit_semi_bold,
    fontSize: FONT_SIZES.xl,
    lineHeight: FONT_SIZES.xl * 1.3,
  },
  subtitle: {
    fontFamily: FONTS.outfit_medium,
    fontSize: FONT_SIZES.md,
    lineHeight: FONT_SIZES.md * 1.4,
  },
  body: {
    fontFamily: FONTS.outfit_regular,
    fontSize: FONT_SIZES.base,
    lineHeight: FONT_SIZES.base * 1.5,
  },
  bodyMedium: {
    fontFamily: FONTS.outfit_medium,
    fontSize: FONT_SIZES.base,
    lineHeight: FONT_SIZES.base * 1.5,
  },
  caption: {
    fontFamily: FONTS.outfit_regular,
    fontSize: FONT_SIZES.sm,
    lineHeight: FONT_SIZES.sm * 1.4,
  },
  small: {
    fontFamily: FONTS.outfit_light,
    fontSize: FONT_SIZES.xs,
    lineHeight: FONT_SIZES.xs * 1.4,
  },
  button: {
    fontFamily: FONTS.outfit_semi_bold,
    fontSize: FONT_SIZES.md,
    lineHeight: FONT_SIZES.md * 1.2,
  },
};

export { FONT_SIZES, FONTS, TYPOGRAPHY };

import React, { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps as RNPressableProps,
  Text,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { useTheme } from '../theme/ThemeProvider';
import { FONT_SIZES, FONTS } from '../theme/typography';

type Variant = 'primary' | 'secondary' | 'outline' | 'disabled' | 'danger' | 'ghost' | 'muted';

interface ButtonProps extends RNPressableProps {
  disabled?: boolean;
  isLoading?: boolean;
  variant?: Variant;
  children: ReactNode;
}

const Button = ({ disabled, isLoading, variant = 'primary', children, ...rest }: ButtonProps) => {
  const { theme } = useTheme();
  const isDisabled = disabled || isLoading;

  const renderVariantWrapper: Record<Variant, object> = {
    primary: { backgroundColor: theme.primary },
    secondary: { backgroundColor: theme.primaryMuted },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: theme.primary,
    },
    muted: { backgroundColor: theme.primaryMuted },
    disabled: { backgroundColor: theme.disabled },
    danger: { backgroundColor: theme.error },
    ghost: { backgroundColor: 'transparent' },
  };

  const renderVariantText: Record<Variant, object> = {
    primary: { color: theme.onPrimary },
    secondary: { color: theme.primary },
    outline: { color: theme.primary },
    muted: { color: theme.primary },
    disabled: { color: theme.disabledText },
    danger: { color: theme.onPrimary },
    ghost: { color: theme.text },
  };

  const activeVariant = isDisabled ? 'disabled' : variant;

  return (
    <Pressable
      {...rest}
      style={[styles.wrapper, renderVariantWrapper[activeVariant]]}
      disabled={isDisabled}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={theme.onPrimary} />
      ) : (
        <Text style={[styles.btnText, renderVariantText[activeVariant]]}>{children}</Text>
      )}
    </Pressable>
  );
};

export default Button;

const styles = ScaledSheet.create({
  wrapper: {
    height: moderateScale(44),
    width: 'auto',
    paddingHorizontal: '16@s',
    borderRadius: moderateScale(28),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.outfit_semi_bold,
  },
});

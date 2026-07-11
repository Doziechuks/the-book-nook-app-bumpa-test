import Button from '@/src/components/Button';
import { useTheme } from '@/src/theme/ThemeProvider';
import { FONT_SIZES, FONTS } from '@/src/theme/typography';
import { SymbolView } from 'expo-symbols';
import React from 'react';
import { Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({
  message = 'Something went wrong. Please try again.',
  onRetry,
}: ErrorStateProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles.wrapper} accessibilityRole="alert">
      <View style={[styles.iconCircle, { backgroundColor: theme.errorBg }]}>
        <SymbolView
          name={{
            ios: 'exclamationmark.triangle.fill',
            android: 'warning',
            web: 'warning',
          }}
          size={30}
          tintColor={theme.error}
        />
      </View>
      <Text style={[styles.title, { color: theme.text }]}>{message}</Text>
      {onRetry && (
        <View style={styles.action}>
          <Button variant="primary" onPress={onRetry}>
            Try Again
          </Button>
        </View>
      )}
    </View>
  );
};

export default ErrorState;

const styles = ScaledSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24@s',
  },
  iconCircle: {
    width: '64@s',
    height: '64@s',
    borderRadius: '32@s',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16@s',
  },
  title: {
    fontFamily: FONTS.outfit_medium,
    fontSize: FONT_SIZES.md,
    textAlign: 'center',
  },
  action: { marginTop: '20@s' },
});

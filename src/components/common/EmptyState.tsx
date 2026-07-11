import Button from '@/src/components/Button';
import { useTheme } from '@/src/theme/ThemeProvider';
import { FONT_SIZES, FONTS } from '@/src/theme/typography';
import { SFSymbol, SymbolView } from 'expo-symbols';
import React from 'react';
import { Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface EmptyStateProps {
  icon?: SFSymbol;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState = ({ icon = 'tray', title, subtitle, actionLabel, onAction }: EmptyStateProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles.wrapper}>
      <View style={[styles.iconCircle, { backgroundColor: theme.primaryMuted }]}>
        <SymbolView
          name={{ ios: icon, android: 'inbox', web: 'inbox' }}
          size={32}
          tintColor={theme.primary}
        />
      </View>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      {subtitle && <Text style={[styles.subtitle, { color: theme.textMuted }]}>{subtitle}</Text>}
      {actionLabel && onAction && (
        <View style={styles.action}>
          <Button variant="primary" onPress={onAction}>
            {actionLabel}
          </Button>
        </View>
      )}
    </View>
  );
};

export default EmptyState;

const styles = ScaledSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24@s',
  },
  iconCircle: {
    width: '72@s',
    height: '72@s',
    borderRadius: '36@s',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16@s',
  },
  title: {
    fontFamily: FONTS.outfit_semi_bold,
    fontSize: FONT_SIZES.lg,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: FONTS.outfit_regular,
    fontSize: FONT_SIZES.sm,
    textAlign: 'center',
    marginTop: '6@s',
  },
  action: { marginTop: '20@s' },
});

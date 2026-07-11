import { formatCurrency } from '@/src/shared-utils/useCurrency';
import { useTheme } from '@/src/theme/ThemeProvider';
import { FONT_SIZES, FONTS } from '@/src/theme/typography';
import React from 'react';
import { Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface PriceTagProps {
  price: number;
  originalPrice?: number;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_MAP = {
  sm: FONT_SIZES.sm,
  md: FONT_SIZES.md,
  lg: FONT_SIZES.xl,
};

const PriceTag = ({ price, originalPrice, size = 'md' }: PriceTagProps) => {
  const { theme } = useTheme();

  return (
    <View
      style={styles.wrapper}
      accessibilityRole="text"
      accessibilityLabel={`Price ${formatCurrency(price, 'NGN')}`}
    >
      <Text style={[styles.price, { color: theme.text, fontSize: SIZE_MAP[size] }]}>
        {formatCurrency(price, 'NGN')}
      </Text>
      {typeof originalPrice === 'number' && originalPrice > price && (
        <Text style={[styles.originalPrice, { color: theme.textMuted }]}>
          {formatCurrency(originalPrice, 'NGN')}
        </Text>
      )}
    </View>
  );
};

export default PriceTag;

const styles = ScaledSheet.create({
  wrapper: { flexDirection: 'row', alignItems: 'center', gap: '6@s' },
  price: { fontFamily: FONTS.outfit_semi_bold },
  originalPrice: {
    fontFamily: FONTS.outfit_regular,
    fontSize: FONT_SIZES.sm,
    textDecorationLine: 'line-through',
  },
});

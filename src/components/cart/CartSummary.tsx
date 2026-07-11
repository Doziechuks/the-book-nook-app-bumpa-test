import { formatCurrency } from '@/src/shared-utils/useCurrency';
import { Theme } from '@/src/theme/colors';
import { useTheme } from '@/src/theme/ThemeProvider';
import { FONT_SIZES, FONTS } from '@/src/theme/typography';
import { CartTotals } from '@/src/utils/computeCartTotals';
import React from 'react';
import { Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface CartSummaryProps {
  totals: CartTotals;
}

interface RowProps {
  label: string;
  value: string;
  bold?: boolean;
  theme: Theme;
}

const Row = ({ label, value, bold, theme }: RowProps) => (
  <View style={styles.row}>
    <Text
      style={[styles.label, { color: bold ? theme.text : theme.textMuted }, bold && styles.bold]}
    >
      {label}
    </Text>
    <Text style={[styles.value, { color: theme.text }, bold && styles.bold]}>{value}</Text>
  </View>
);

const CartSummary = ({ totals }: CartSummaryProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <Row label="Subtotal" value={formatCurrency(totals.subtotal, 'NGN')} theme={theme} />
      <Row label="Tax" value={formatCurrency(totals.tax, 'NGN')} theme={theme} />
      {totals.deliveryFee > 0 && (
        <Row label="Delivery Fee" value={formatCurrency(totals.deliveryFee, 'NGN')} theme={theme} />
      )}
      <View style={[styles.divider, { backgroundColor: theme.border }]} />
      <Row label="Total" value={formatCurrency(totals.total, 'NGN')} bold theme={theme} />
    </View>
  );
};

export default CartSummary;

const styles = ScaledSheet.create({
  wrapper: {
    borderRadius: '14@s',
    borderWidth: 1,
    padding: '16@s',
    gap: '8@vs',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { fontFamily: FONTS.outfit_regular, fontSize: FONT_SIZES.sm },
  value: { fontFamily: FONTS.outfit_medium, fontSize: FONT_SIZES.sm },
  bold: { fontFamily: FONTS.outfit_semi_bold, fontSize: FONT_SIZES.md },
  divider: { height: 1, marginVertical: '4@vs' },
});

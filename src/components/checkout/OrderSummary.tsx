import CartSummary from '@/src/components/cart/CartSummary';
import { formatCurrency } from '@/src/shared-utils/useCurrency';
import { useTheme } from '@/src/theme/ThemeProvider';
import { FONT_SIZES, FONTS } from '@/src/theme/typography';
import { CartItem } from '@/src/types/book';
import { computeCartTotals } from '@/src/utils/computeCartTotals';
import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface OrderSummaryProps {
  items: CartItem[];
  deliveryFee: number;
}

const OrderSummary = ({ items, deliveryFee }: OrderSummaryProps) => {
  const { theme } = useTheme();
  const totals = computeCartTotals(items, deliveryFee);

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.heading, { color: theme.text }]}>Order Summary</Text>
      {items.map((item) => (
        <View key={item.book.id} style={styles.itemRow}>
          <Image source={{ uri: item.book.coverImage }} style={styles.cover} contentFit="cover" />
          <View style={styles.itemDetails}>
            <Text numberOfLines={1} style={[styles.itemTitle, { color: theme.text }]}>
              {item.book.title}
            </Text>
            <Text style={[styles.itemMeta, { color: theme.textMuted }]}>Qty {item.quantity}</Text>
          </View>
          <Text style={[styles.itemPrice, { color: theme.text }]}>
            {formatCurrency(item.book.price * item.quantity, 'NGN')}
          </Text>
        </View>
      ))}
      <CartSummary totals={totals} />
    </View>
  );
};

export default OrderSummary;

const styles = ScaledSheet.create({
  wrapper: { gap: '12@vs' },
  heading: { fontFamily: FONTS.outfit_semi_bold, fontSize: FONT_SIZES.lg },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: '10@s' },
  cover: { width: '36@s', height: '52@s', borderRadius: '6@s' },
  itemDetails: { flex: 1 },
  itemTitle: { fontFamily: FONTS.outfit_medium, fontSize: FONT_SIZES.sm },
  itemMeta: { fontFamily: FONTS.outfit_regular, fontSize: FONT_SIZES.xs },
  itemPrice: { fontFamily: FONTS.outfit_medium, fontSize: FONT_SIZES.sm },
});

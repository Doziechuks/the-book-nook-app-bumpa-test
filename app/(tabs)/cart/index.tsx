import Button from '@/src/components/Button';
import CartItemRow from '@/src/components/cart/CartItemRow';
import CartSummary from '@/src/components/cart/CartSummary';
import EmptyCart from '@/src/components/cart/EmptyCart';
import { ROUTES } from '@/src/constants/routes';
import { useCartStore, useCartTotals } from '@/src/store/cartStore';
import { useTheme } from '@/src/theme/ThemeProvider';
import { FONT_SIZES, FONTS } from '@/src/theme/typography';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScaledSheet, s } from 'react-native-size-matters';

const CartScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const items = useCartStore((state) => state.items);
  const totals = useCartTotals();

  const containerStyle = [
    styles.wrapper,
    { backgroundColor: theme.background, paddingTop: insets.top },
  ];

  if (items.length === 0) {
    return (
      <View style={containerStyle}>
        <Text style={[styles.heading, { color: theme.text }]}>Cart</Text>
        <EmptyCart />
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      <Text style={[styles.heading, { color: theme.text }]}>Cart</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.book.id}
        renderItem={({ item }) => <CartItemRow item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <View
        style={[
          styles.footer,
          {
            backgroundColor: theme.background,
            borderColor: theme.border,
            paddingBottom: insets.bottom + s(12),
          },
        ]}
      >
        <CartSummary totals={totals} />
        <Button
          variant="primary"
          onPress={() => router.push(ROUTES.CHECKOUT)}
          accessibilityLabel="Proceed to checkout"
        >
          {`Checkout (${totals.itemCount})`}
        </Button>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = ScaledSheet.create({
  wrapper: { flex: 1 },
  heading: {
    fontFamily: FONTS.outfit_bold,
    fontSize: FONT_SIZES['2xl'],
    paddingHorizontal: '16@s',
    marginTop: '8@vs',
    marginBottom: '8@vs',
  },
  listContent: { paddingHorizontal: '16@s', paddingBottom: '220@vs' },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    padding: '16@s',
    gap: '12@vs',
  },
});

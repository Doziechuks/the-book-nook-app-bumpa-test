import PriceTag from '@/src/components/common/PriceTag';
import { useCartStore } from '@/src/store/cartStore';
import { useTheme } from '@/src/theme/ThemeProvider';
import { FONT_SIZES, FONTS } from '@/src/theme/typography';
import { CartItem } from '@/src/types/book';
import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface CartItemRowProps {
  item: CartItem;
}

const CartItemRow = ({ item }: CartItemRowProps) => {
  const { theme } = useTheme();
  const incrementQty = useCartStore((state) => state.incrementQty);
  const decrementQty = useCartStore((state) => state.decrementQty);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <View
      style={[styles.wrapper, { borderColor: theme.border }]}
      testID={`cart-item-${item.book.id}`}
    >
      <Image
        source={{ uri: item.book.coverImage }}
        style={styles.cover}
        contentFit="cover"
        cachePolicy="disk"
      />
      <View style={styles.details}>
        <Text numberOfLines={1} style={[styles.title, { color: theme.text }]}>
          {item.book.title}
        </Text>
        <Text numberOfLines={1} style={[styles.author, { color: theme.textMuted }]}>
          {item.book.author}
        </Text>
        <PriceTag price={item.book.price} size="sm" />

        <View style={styles.qtyRow}>
          <Pressable
            onPress={() => decrementQty(item.book.id)}
            style={[styles.qtyButton, { borderColor: theme.border }]}
            accessibilityLabel={`Decrease quantity of ${item.book.title}`}
            hitSlop={8}
          >
            <SymbolView
              name={{ ios: 'minus', android: 'remove', web: 'remove' }}
              size={14}
              tintColor={theme.text}
            />
          </Pressable>
          <Text style={[styles.qtyText, { color: theme.text }]}>{item.quantity}</Text>
          <Pressable
            onPress={() => incrementQty(item.book.id)}
            style={[styles.qtyButton, { borderColor: theme.border }]}
            accessibilityLabel={`Increase quantity of ${item.book.title}`}
            hitSlop={8}
          >
            <SymbolView
              name={{ ios: 'plus', android: 'add', web: 'add' }}
              size={14}
              tintColor={theme.text}
            />
          </Pressable>
        </View>
      </View>

      <Pressable
        onPress={() => removeItem(item.book.id)}
        style={styles.removeButton}
        accessibilityLabel={`Remove ${item.book.title} from cart`}
        hitSlop={8}
      >
        <SymbolView
          name={{ ios: 'xmark', android: 'close', web: 'close' }}
          size={16}
          tintColor={theme.textMuted}
        />
      </Pressable>
    </View>
  );
};

export default CartItemRow;

const styles = ScaledSheet.create({
  wrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: '12@vs',
    gap: '12@s',
  },
  cover: { width: '56@s', height: '80@s', borderRadius: '8@s' },
  details: { flex: 1, gap: '4@vs' },
  title: { fontFamily: FONTS.outfit_medium, fontSize: FONT_SIZES.base },
  author: { fontFamily: FONTS.outfit_regular, fontSize: FONT_SIZES.xs },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10@s',
    marginTop: '4@vs',
  },
  qtyButton: {
    width: '26@s',
    height: '26@s',
    borderRadius: '13@s',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontFamily: FONTS.outfit_medium,
    fontSize: FONT_SIZES.sm,
    minWidth: '16@s',
    textAlign: 'center',
  },
  removeButton: { padding: '4@s' },
});

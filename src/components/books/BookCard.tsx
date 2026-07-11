import PriceTag from '@/src/components/common/PriceTag';
import RatingStars from '@/src/components/common/RatingStars';
import { useCartStore } from '@/src/store/cartStore';
import { useFlyAnimationStore } from '@/src/store/flyAnimationStore';
import { useTheme } from '@/src/theme/ThemeProvider';
import { FONT_SIZES, FONTS } from '@/src/theme/typography';
import { Book } from '@/src/types/book';
import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import React, { useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ScaledSheet, s } from 'react-native-size-matters';
import Toast from 'react-native-toast-message';

interface BookCardProps {
  book: Book;
  onPress: () => void;
  width?: number;
}

const CARD_WIDTH = s(150);

const BookCard = ({ book, onPress, width = CARD_WIDTH }: BookCardProps) => {
  const { theme } = useTheme();
  const addItem = useCartStore((state) => state.addItem);
  const requestFlight = useFlyAnimationStore((state) => state.requestFlight);
  const coverRef = useRef<View>(null);
  const outOfStock = book.stock <= 0;

  const handleAddToCart = () => {
    coverRef.current?.measureInWindow((x, y, w, h) => {
      requestFlight({ x: x + w / 2, y: y + h / 2 }, book.coverImage);
    });
    addItem(book);
    Toast.show({
      type: 'success',
      text1: 'Added to cart',
      text2: book.title,
    });
  };

  return (
    <Pressable
      onPress={onPress}
      style={[styles.wrapper, { width, backgroundColor: theme.surface, borderColor: theme.border }]}
      accessibilityRole="button"
      accessibilityLabel={`View details for ${book.title}`}
    >
      <View ref={coverRef} style={styles.coverWrapper}>
        <Image
          source={{ uri: book.coverImage }}
          style={styles.cover}
          contentFit="cover"
          transition={200}
          cachePolicy="disk"
          recyclingKey={book.id}
        />
        <Pressable
          onPress={handleAddToCart}
          disabled={outOfStock}
          style={[
            styles.addButton,
            { backgroundColor: outOfStock ? theme.disabled : theme.primary },
          ]}
          hitSlop={8}
          accessibilityLabel={`Add ${book.title} to cart`}
        >
          <SymbolView
            name={{ ios: 'plus', android: 'add', web: 'add' }}
            size={16}
            tintColor={theme.onPrimary}
          />
        </Pressable>
        {outOfStock && (
          <View style={[styles.outOfStockBadge, { backgroundColor: theme.overlay }]}>
            <Text style={styles.outOfStockText}>Out of stock</Text>
          </View>
        )}
      </View>
      <Text numberOfLines={1} style={[styles.title, { color: theme.text }]}>
        {book.title}
      </Text>
      <Text numberOfLines={1} style={[styles.author, { color: theme.textMuted }]}>
        {book.author}
      </Text>
      <RatingStars rating={book.rating} size={11} showValue={false} />
      <PriceTag price={book.price} size="sm" />
    </Pressable>
  );
};

export default BookCard;

const styles = ScaledSheet.create({
  wrapper: {
    borderRadius: '14@s',
    borderWidth: 1,
    padding: '8@s',
    gap: '4@vs',
  },
  coverWrapper: {
    borderRadius: '10@s',
    overflow: 'hidden',
    aspectRatio: 2 / 3,
    position: 'relative',
  },
  cover: { width: '100%', height: '100%' },
  addButton: {
    position: 'absolute',
    bottom: '6@s',
    right: '6@s',
    width: '28@s',
    height: '28@s',
    borderRadius: '14@s',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outOfStockText: {
    color: '#FFFFFF',
    fontFamily: FONTS.outfit_semi_bold,
    fontSize: FONT_SIZES.xs,
  },
  title: {
    fontFamily: FONTS.outfit_medium,
    fontSize: FONT_SIZES.sm,
    marginTop: '4@vs',
  },
  author: { fontFamily: FONTS.outfit_regular, fontSize: FONT_SIZES.xs },
});

import ReviewItem from '@/src/components/books/ReviewItem';
import Button from '@/src/components/Button';
import ErrorState from '@/src/components/common/ErrorState';
import LoadingSkeleton from '@/src/components/common/LoadingSkeleton';
import PriceTag from '@/src/components/common/PriceTag';
import RatingStars from '@/src/components/common/RatingStars';
import { useBookDetails } from '@/src/hooks/useBookDetails';
import { useCartStore } from '@/src/store/cartStore';
import { useFlyAnimationStore } from '@/src/store/flyAnimationStore';
import { useTheme } from '@/src/theme/ThemeProvider';
import { FONT_SIZES, FONTS } from '@/src/theme/typography';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import React, { useRef } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScaledSheet, s } from 'react-native-size-matters';
import Toast from 'react-native-toast-message';

const BookDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { book, isLoading, error, refetch } = useBookDetails(id);
  const addItem = useCartStore((state) => state.addItem);
  const requestFlight = useFlyAnimationStore((state) => state.requestFlight);
  const coverRef = useRef<View>(null);

  const handleAddToCart = () => {
    if (!book) return;
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

  if (isLoading) {
    return (
      <View style={[styles.wrapper, { backgroundColor: theme.background, paddingTop: insets.top }]}>
        <View style={styles.loadingContent}>
          <LoadingSkeleton width="100%" height={s(320)} borderRadius={16} />
          <LoadingSkeleton width="70%" height={20} style={{ marginTop: s(16) }} />
          <LoadingSkeleton width="40%" height={16} style={{ marginTop: s(8) }} />
          <LoadingSkeleton width="100%" height={80} style={{ marginTop: s(16) }} />
        </View>
      </View>
    );
  }

  if (error || !book) {
    return (
      <View style={[styles.wrapper, { backgroundColor: theme.background, paddingTop: insets.top }]}>
        <ErrorState message={error ?? 'This book could not be found.'} onRetry={refetch} />
      </View>
    );
  }

  const outOfStock = book.stock <= 0;

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: s(120) }}
      >
        <View ref={coverRef} style={styles.coverWrapper}>
          <Image
            source={{ uri: book.coverImage }}
            style={styles.cover}
            contentFit="cover"
            transition={200}
            cachePolicy="disk"
          />
          <Pressable
            onPress={() => router.back()}
            style={[styles.backButton, { top: insets.top + s(8), backgroundColor: theme.overlay }]}
            hitSlop={8}
            accessibilityLabel="Go back"
          >
            <SymbolView
              name={{
                ios: 'chevron.left',
                android: 'arrow_back',
                web: 'arrow_back',
              }}
              size={18}
              tintColor="#FFFFFF"
            />
          </Pressable>
        </View>

        <View style={styles.content}>
          <Text style={[styles.category, { color: theme.primary }]}>{book.category}</Text>
          <Text style={[styles.title, { color: theme.text }]}>{book.title}</Text>
          <Text style={[styles.author, { color: theme.textMuted }]}>by {book.author}</Text>

          <View style={styles.metaRow}>
            <RatingStars rating={book.rating} reviewCount={book.reviews.length} />
            <PriceTag price={book.price} size="lg" />
          </View>

          <Text style={[styles.stock, { color: outOfStock ? theme.error : theme.success }]}>
            {outOfStock ? 'Out of stock' : `${book.stock} in stock`}
          </Text>

          <Text style={[styles.sectionHeading, { color: theme.text }]}>Description</Text>
          <Text style={[styles.description, { color: theme.textMuted }]}>{book.description}</Text>

          <Text style={[styles.sectionHeading, { color: theme.text }]}>
            Reviews ({book.reviews.length})
          </Text>
          {book.reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
            paddingBottom: insets.bottom + s(12),
          },
        ]}
      >
        <Button
          variant="primary"
          disabled={outOfStock}
          onPress={handleAddToCart}
          accessibilityLabel={`Add ${book.title} to cart`}
        >
          {outOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </View>
    </View>
  );
};

export default BookDetailsScreen;

const styles = ScaledSheet.create({
  wrapper: { flex: 1 },
  loadingContent: { padding: '16@s' },
  coverWrapper: { width: '100%', height: '340@vs', position: 'relative' },
  cover: { width: '100%', height: '100%' },
  backButton: {
    position: 'absolute',
    left: '16@s',
    width: '36@s',
    height: '36@s',
    borderRadius: '18@s',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { padding: '16@s' },
  category: {
    fontFamily: FONTS.outfit_semi_bold,
    fontSize: FONT_SIZES.xs,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: FONTS.outfit_bold,
    fontSize: FONT_SIZES['2xl'],
    marginTop: '4@vs',
  },
  author: {
    fontFamily: FONTS.outfit_regular,
    fontSize: FONT_SIZES.sm,
    marginTop: '2@vs',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '12@vs',
  },
  stock: {
    fontFamily: FONTS.outfit_medium,
    fontSize: FONT_SIZES.sm,
    marginTop: '8@vs',
  },
  sectionHeading: {
    fontFamily: FONTS.outfit_semi_bold,
    fontSize: FONT_SIZES.lg,
    marginTop: '20@vs',
    marginBottom: '8@vs',
  },
  description: {
    fontFamily: FONTS.outfit_regular,
    fontSize: FONT_SIZES.sm,
    lineHeight: FONT_SIZES.sm * 1.6,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    padding: '16@s',
  },
});

import BookCard from '@/src/components/books/BookCard';
import CategoryPill from '@/src/components/books/CategoryPill';
import EmptyState from '@/src/components/common/EmptyState';
import ErrorState from '@/src/components/common/ErrorState';
import LoadingSkeleton from '@/src/components/common/LoadingSkeleton';
import SearchBar from '@/src/components/common/SearchBar';
import { ROUTES } from '@/src/constants/routes';
import { useBooks } from '@/src/hooks/useBooks';
import { CATEGORY_LIST } from '@/src/services/mockBooks';
import { useTheme } from '@/src/theme/ThemeProvider';
import { FONT_SIZES, FONTS } from '@/src/theme/typography';
import { Book, GetBooksParams } from '@/src/types/book';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScaledSheet, s } from 'react-native-size-matters';

const SORT_OPTIONS: {
  id: NonNullable<GetBooksParams['sort']>;
  label: string;
}[] = [
  { id: 'title-asc', label: 'Title A-Z' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating-desc', label: 'Top Rated' },
];

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = (SCREEN_WIDTH - s(24) - s(12)) / 2;

const ProductsScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ search?: string; category?: string }>();

  const [search, setSearch] = useState(params.search ?? '');
  const [category, setCategory] = useState(params.category ?? 'All');
  const [sort, setSort] = useState<NonNullable<GetBooksParams['sort']>>('title-asc');

  useEffect(() => {
    if (params.search) setSearch(params.search);
  }, [params.search]);

  useEffect(() => {
    if (params.category) setCategory(params.category);
  }, [params.category]);

  const { books, isLoading, isLoadingMore, error, loadMore, refresh } = useBooks({
    search,
    category: category === 'All' ? undefined : category,
    sort,
  });

  const categories = useMemo(() => ['All', ...CATEGORY_LIST], []);

  const renderItem = ({ item }: { item: Book }) => (
    <View style={styles.cardWrapper}>
      <BookCard
        book={item}
        width={CARD_WIDTH}
        onPress={() => router.push(ROUTES.PRODUCT_DETAILS(item.id))}
      />
    </View>
  );

  const renderHeader = () => (
    <View style={styles.filters}>
      <SearchBar value={search} onSearch={setSearch} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillRow}
      >
        {categories.map((item) => (
          <CategoryPill
            key={item}
            label={item}
            selected={category === item}
            onPress={() => setCategory(item)}
          />
        ))}
      </ScrollView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillRow}
      >
        {SORT_OPTIONS.map((option) => (
          <CategoryPill
            key={option.id}
            label={option.label}
            selected={sort === option.id}
            onPress={() => setSort(option.id)}
          />
        ))}
      </ScrollView>
      <Text style={[styles.resultCount, { color: theme.textMuted }]}>
        {books.length} book{books.length === 1 ? '' : 's'} found
      </Text>
    </View>
  );

  const containerStyle = [
    styles.wrapper,
    { backgroundColor: theme.background, paddingTop: insets.top + s(12) },
  ];

  if (isLoading && books.length === 0) {
    return (
      <View style={containerStyle}>
        {renderHeader()}
        <View style={styles.skeletonGrid}>
          {Array.from({ length: 6 }, (_, i) => (
            <LoadingSkeleton
              key={i}
              width={CARD_WIDTH}
              height={CARD_WIDTH * 1.7}
              borderRadius={14}
              style={styles.cardWrapper}
            />
          ))}
        </View>
      </View>
    );
  }

  if (error && books.length === 0) {
    return (
      <View style={containerStyle}>
        {renderHeader()}
        <ErrorState message={error} onRetry={refresh} />
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        onEndReachedThreshold={0.4}
        onEndReached={loadMore}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={7}
        removeClippedSubviews
        ListEmptyComponent={
          <EmptyState
            icon="magnifyingglass"
            title="No books found"
            subtitle="Try a different search term or category."
          />
        }
        ListFooterComponent={
          isLoadingMore ? (
            <ActivityIndicator style={styles.footerLoader} color={theme.primary} />
          ) : null
        }
      />
    </View>
  );
};

export default ProductsScreen;

const styles = ScaledSheet.create({
  wrapper: { flex: 1 },
  listContent: { paddingHorizontal: '12@s', paddingBottom: '32@vs' },
  filters: { gap: '10@vs', marginBottom: '12@vs' },
  pillRow: { gap: '8@s' },
  resultCount: { fontFamily: FONTS.outfit_regular, fontSize: FONT_SIZES.xs },
  cardWrapper: { margin: '6@s' },
  skeletonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: '6@s',
  },
  footerLoader: { marginVertical: '16@vs' },
});

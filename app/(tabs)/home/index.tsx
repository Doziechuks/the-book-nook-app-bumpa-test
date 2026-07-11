import BookCarousel from '@/src/components/books/BookCarousel';
import CategoryPill from '@/src/components/books/CategoryPill';
import ErrorState from '@/src/components/common/ErrorState';
import LoadingSkeleton from '@/src/components/common/LoadingSkeleton';
import SearchBar from '@/src/components/common/SearchBar';
import { ROUTES } from '@/src/constants/routes';
import { useBooks } from '@/src/hooks/useBooks';
import { CATEGORY_LIST } from '@/src/services/mockBooks';
import { useTheme } from '@/src/theme/ThemeProvider';
import { FONT_SIZES, FONTS } from '@/src/theme/typography';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScaledSheet, s } from 'react-native-size-matters';

const HomeScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { books, isLoading, error, refresh } = useBooks({
    sort: 'rating-desc',
  });
  const featured = books.slice(0, 10);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`${ROUTES.PRODUCTS}?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + s(16),
          paddingBottom: s(32),
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: theme.textMuted }]}>Welcome back</Text>
          <Text style={[styles.heading, { color: theme.text }]}>Find your next great read</Text>
        </View>

        <View style={styles.searchWrapper}>
          <SearchBar onSearch={handleSearch} placeholder="Search books or authors" />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Browse by category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          >
            {CATEGORY_LIST.map((category) => (
              <CategoryPill
                key={category}
                label={category}
                onPress={() =>
                  router.push(`${ROUTES.PRODUCTS}?category=${encodeURIComponent(category)}`)
                }
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Featured books</Text>
          {isLoading ? (
            <View style={styles.skeletonRow}>
              {[1, 2, 3].map((key) => (
                <LoadingSkeleton key={key} width={s(150)} height={s(230)} borderRadius={14} />
              ))}
            </View>
          ) : error ? (
            <ErrorState message={error} onRetry={refresh} />
          ) : (
            <BookCarousel books={featured} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = ScaledSheet.create({
  wrapper: { flex: 1 },
  header: { paddingHorizontal: '16@s', marginBottom: '16@vs' },
  greeting: { fontFamily: FONTS.outfit_regular, fontSize: FONT_SIZES.sm },
  heading: {
    fontFamily: FONTS.outfit_bold,
    fontSize: FONT_SIZES['2xl'],
    marginTop: '4@vs',
  },
  searchWrapper: { paddingHorizontal: '16@s', marginBottom: '24@vs' },
  section: { marginBottom: '24@vs' },
  sectionTitle: {
    fontFamily: FONTS.outfit_semi_bold,
    fontSize: FONT_SIZES.lg,
    paddingHorizontal: '16@s',
    marginBottom: '12@vs',
  },
  categoryList: { paddingHorizontal: '16@s', gap: '8@s' },
  skeletonRow: { flexDirection: 'row', paddingHorizontal: '16@s', gap: '12@s' },
});

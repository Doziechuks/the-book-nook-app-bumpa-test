import BookCard from '@/src/components/books/BookCard';
import { ROUTES } from '@/src/constants/routes';
import { Book } from '@/src/types/book';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList } from 'react-native';
import { s } from 'react-native-size-matters';

interface BookCarouselProps {
  books: Book[];
}

const BookCarousel = ({ books }: BookCarouselProps) => {
  const router = useRouter();

  return (
    <FlatList
      data={books}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ gap: s(12), paddingHorizontal: s(16) }}
      renderItem={({ item }) => (
        <BookCard book={item} onPress={() => router.push(ROUTES.PRODUCT_DETAILS(item.id))} />
      )}
    />
  );
};

export default BookCarousel;

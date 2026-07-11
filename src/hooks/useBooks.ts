import { getBooks } from '@/src/services/booksApi';
import { Book, GetBooksParams } from '@/src/types/book';
import { useCallback, useEffect, useRef, useState } from 'react';

const PAGE_SIZE = 12;

interface UseBooksOptions {
  search?: string;
  category?: string;
  sort?: GetBooksParams['sort'];
}

export const useBooks = ({ search = '', category, sort }: UseBooksOptions = {}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);

  const fetchPage = useCallback(
    async (targetPage: number, append: boolean) => {
      const currentRequest = ++requestId.current;
      if (append) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      try {
        const response = await getBooks({
          page: targetPage,
          limit: PAGE_SIZE,
          search,
          category,
          sort,
        });

        if (currentRequest !== requestId.current) return;

        setBooks((prev) => (append ? [...prev, ...response.data] : response.data));
        setPage(response.page);
        setHasMore(response.hasMore);
      } catch (err) {
        if (currentRequest !== requestId.current) return;
        setError(err instanceof Error ? err.message : 'Failed to load books.');
      } finally {
        if (currentRequest === requestId.current) {
          setIsLoading(false);
          setIsLoadingMore(false);
        }
      }
    },
    [search, category, sort],
  );

  useEffect(() => {
    fetchPage(1, false);
  }, [fetchPage]);

  const loadMore = () => {
    if (isLoadingMore || isLoading || !hasMore) return;
    fetchPage(page + 1, true);
  };

  const refresh = () => fetchPage(1, false);

  return {
    books,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    refresh,
  };
};

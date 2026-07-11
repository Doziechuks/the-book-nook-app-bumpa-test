import { getBookById } from '@/src/services/booksApi';
import { Book } from '@/src/types/book';
import { useEffect, useState } from 'react';

interface UseBookDetailsResult {
  book: Book | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useBookDetails = (id: string | undefined): UseBookDetailsResult => {
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      setError('No book selected.');
      return;
    }

    let isCancelled = false;

    const fetchBook = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await getBookById(id);
        if (!isCancelled) {
          setBook(result);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load this book.');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchBook();

    return () => {
      isCancelled = true;
    };
  }, [id, retryToken]);

  const refetch = () => setRetryToken((token) => token + 1);

  return { book, isLoading, error, refetch };
};

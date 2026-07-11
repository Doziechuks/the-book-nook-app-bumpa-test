import { ApiError, getBookById, getBooks } from '@/src/services/booksApi';
import { MOCK_BOOKS } from '@/src/services/mockBooks';

describe('booksApi', () => {
  describe('getBooks', () => {
    it('returns the first page of results with correct pagination metadata', async () => {
      const response = await getBooks({ page: 1, limit: 10 });

      expect(response.data).toHaveLength(10);
      expect(response.page).toBe(1);
      expect(response.totalItems).toBe(MOCK_BOOKS.length);
      expect(response.hasMore).toBe(true);
    });

    it('filters by search query across title and author', async () => {
      const target = MOCK_BOOKS[5];
      const response = await getBooks({ search: target.title.slice(0, 6) });

      expect(response.data.some((book) => book.id === target.id)).toBe(true);
    });

    it('filters by category', async () => {
      const category = MOCK_BOOKS[0].category;
      const response = await getBooks({ category, limit: MOCK_BOOKS.length });

      expect(response.data.every((book) => book.category === category)).toBe(true);
    });

    it('sorts by price ascending', async () => {
      const response = await getBooks({
        sort: 'price-asc',
        limit: MOCK_BOOKS.length,
      });
      const prices = response.data.map((book) => book.price);
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(sorted);
    });
  });

  describe('getBookById', () => {
    it('resolves with the matching book', async () => {
      const target = MOCK_BOOKS[0];
      const result = await getBookById(target.id);
      expect(result).toEqual(target);
    });

    it('throws an ApiError for an unknown id', async () => {
      await expect(getBookById('does-not-exist')).rejects.toBeInstanceOf(ApiError);
    });
  });
});

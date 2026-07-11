import { Book, GetBooksParams, PaginatedResponse } from '@/src/types/book';
import { MOCK_BOOKS } from './mockBooks';

const NETWORK_DELAY_MS = { min: 500, max: 900 };

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const randomDelay = () =>
  delay(NETWORK_DELAY_MS.min + Math.random() * (NETWORK_DELAY_MS.max - NETWORK_DELAY_MS.min));

export class ApiError extends Error {}

export const getBooks = async (params: GetBooksParams = {}): Promise<PaginatedResponse<Book>> => {
  await randomDelay();

  const { page = 1, limit = 12, search = '', category, sort } = params;

  let results = MOCK_BOOKS;

  if (search.trim()) {
    const query = search.trim().toLowerCase();
    results = results.filter(
      (book) =>
        book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query),
    );
  }

  if (category && category !== 'All') {
    results = results.filter((book) => book.category === category);
  }

  if (sort) {
    results = [...results].sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'title-asc':
        default:
          return a.title.localeCompare(b.title);
      }
    });
  }

  const totalItems = results.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const start = (page - 1) * limit;
  const data = results.slice(start, start + limit);

  return {
    data,
    page,
    limit,
    totalItems,
    totalPages,
    hasMore: page < totalPages,
  };
};

export const getBookById = async (id: string): Promise<Book> => {
  await randomDelay();

  const book = MOCK_BOOKS.find((b) => b.id === id);
  if (!book) {
    throw new ApiError(`Book with id "${id}" was not found.`);
  }
  return book;
};

import { useBookDetails } from '@/src/hooks/useBookDetails';
import { getBookById } from '@/src/services/booksApi';
import { renderHook, waitFor } from '@testing-library/react-native';

jest.mock('@/src/services/booksApi', () => ({
  getBookById: jest.fn(),
}));

const mockBook = {
  id: 'book-1',
  title: 'Test Driven Fiction',
  author: 'Jane Doe',
  description: 'A book about testing.',
  price: 12.5,
  coverImage: 'https://example.com/cover.jpg',
  reviews: [],
  rating: 4.2,
  category: 'Fiction',
  stock: 5,
};

describe('useBookDetails', () => {
  beforeEach(() => {
    (getBookById as jest.Mock).mockReset();
  });

  it('starts in a loading state and resolves with the book', async () => {
    (getBookById as jest.Mock).mockResolvedValue(mockBook);

    const { result } = await renderHook(() => useBookDetails('book-1'));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.book).toEqual(mockBook);
    expect(result.current.error).toBeNull();
  });

  it('surfaces an error message when the fetch fails', async () => {
    (getBookById as jest.Mock).mockRejectedValue(
      new Error('Book with id "missing" was not found.'),
    );

    const { result } = await renderHook(() => useBookDetails('missing'));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.book).toBeNull();
    expect(result.current.error).toBe('Book with id "missing" was not found.');
  });

  it('sets an error immediately when no id is provided', async () => {
    const { result } = await renderHook(() => useBookDetails(undefined));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('No book selected.');
  });
});

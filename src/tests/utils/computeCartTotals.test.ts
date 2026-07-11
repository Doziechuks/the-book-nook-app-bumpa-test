import { Book, CartItem } from '@/src/types/book';
import { computeCartTotals } from '@/src/utils/computeCartTotals';

const book: Book = {
  id: 'book-1',
  title: 'Test Driven Fiction',
  author: 'Jane Doe',
  description: '',
  price: 10,
  coverImage: '',
  reviews: [],
  rating: 4,
  category: 'Fiction',
  stock: 5,
};

const items: CartItem[] = [{ book, quantity: 2 }];

describe('computeCartTotals', () => {
  it('defaults the delivery fee to 0 when not provided', () => {
    const totals = computeCartTotals(items);
    expect(totals.deliveryFee).toBe(0);
    expect(totals.total).toBe(totals.subtotal + totals.tax);
  });

  it('adds the delivery fee into the total when provided', () => {
    const totals = computeCartTotals(items, 1500);
    expect(totals.deliveryFee).toBe(1500);
    expect(totals.total).toBe(totals.subtotal + totals.tax + 1500);
  });
});

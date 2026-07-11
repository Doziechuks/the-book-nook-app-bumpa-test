import { useCartStore } from '@/src/store/cartStore';
import { Book } from '@/src/types/book';

const bookA: Book = {
  id: 'book-a',
  title: 'Book A',
  author: 'Author A',
  description: '',
  price: 10,
  coverImage: '',
  reviews: [],
  rating: 4,
  category: 'Fiction',
  stock: 5,
};

const bookB: Book = { ...bookA, id: 'book-b', title: 'Book B', price: 20 };

describe('cartStore', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  it('adds a new book to the cart', () => {
    useCartStore.getState().addItem(bookA);
    expect(useCartStore.getState().items).toEqual([{ book: bookA, quantity: 1 }]);
  });

  it('increments quantity when adding a book already in the cart', () => {
    useCartStore.getState().addItem(bookA);
    useCartStore.getState().addItem(bookA);
    expect(useCartStore.getState().items[0].quantity).toBe(2);
  });

  it('increments and decrements quantity', () => {
    useCartStore.getState().addItem(bookA);
    useCartStore.getState().incrementQty(bookA.id);
    expect(useCartStore.getState().items[0].quantity).toBe(2);

    useCartStore.getState().decrementQty(bookA.id);
    expect(useCartStore.getState().items[0].quantity).toBe(1);
  });

  it('removes the item once quantity is decremented to zero', () => {
    useCartStore.getState().addItem(bookA);
    useCartStore.getState().decrementQty(bookA.id);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('removes an item directly', () => {
    useCartStore.getState().addItem(bookA);
    useCartStore.getState().addItem(bookB);
    useCartStore.getState().removeItem(bookA.id);
    expect(useCartStore.getState().items).toEqual([{ book: bookB, quantity: 1 }]);
  });

  it('clears the cart', () => {
    useCartStore.getState().addItem(bookA);
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});

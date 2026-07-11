import CartItemRow from '@/src/components/cart/CartItemRow';
import { useCartStore } from '@/src/store/cartStore';
import { fireEvent, render, screen } from '@/src/tests/test-utils';
import { Book } from '@/src/types/book';
import React from 'react';

const mockBook: Book = {
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

describe('CartItemRow', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [{ book: mockBook, quantity: 1 }] });
  });

  it('renders the book title, author and quantity', async () => {
    const item = useCartStore.getState().items[0];
    await render(<CartItemRow item={item} />);

    expect(screen.getByText('Test Driven Fiction')).toBeTruthy();
    expect(screen.getByText('Jane Doe')).toBeTruthy();
    expect(screen.getByText('1')).toBeTruthy();
  });

  it('increments the quantity when the + button is pressed', async () => {
    const item = useCartStore.getState().items[0];
    await render(<CartItemRow item={item} />);

    fireEvent.press(screen.getByLabelText(`Increase quantity of ${mockBook.title}`));

    expect(useCartStore.getState().items[0].quantity).toBe(2);
  });

  it('removes the item from the cart when the remove button is pressed', async () => {
    const item = useCartStore.getState().items[0];
    await render(<CartItemRow item={item} />);

    fireEvent.press(screen.getByLabelText(`Remove ${mockBook.title} from cart`));

    expect(useCartStore.getState().items).toHaveLength(0);
  });
});

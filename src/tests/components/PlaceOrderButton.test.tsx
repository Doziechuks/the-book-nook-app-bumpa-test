import PlaceOrderButton from '@/src/components/checkout/PlaceOrderButton';
import { postCheckout } from '@/src/services/checkoutApi';
import { useCartStore } from '@/src/store/cartStore';
import { useOrdersStore } from '@/src/store/ordersStore';
import { fireEvent, render, screen, waitFor } from '@/src/tests/test-utils';
import { Book } from '@/src/types/book';
import React from 'react';

jest.mock('@/src/services/checkoutApi', () => ({
  postCheckout: jest.fn(),
}));

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

const cartItem = { book: mockBook, quantity: 1 };

describe('PlaceOrderButton', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [cartItem] });
    useOrdersStore.setState({ orders: [] });
    (postCheckout as jest.Mock).mockReset();
  });

  it('clears the cart, records the order and calls onSuccess when checkout succeeds', async () => {
    const mockOrder = {
      id: 'order-123456',
      items: [cartItem],
      subtotal: 12.5,
      tax: 0.94,
      total: 13.44,
      paymentMethod: 'card' as const,
      placedAt: new Date().toISOString(),
      status: 'pending' as const,
      deliveryMethod: 'pickup' as const,
      deliveryFee: 0,
    };
    (postCheckout as jest.Mock).mockResolvedValue(mockOrder);

    const onSuccess = jest.fn();
    await render(
      <PlaceOrderButton
        items={[cartItem]}
        paymentMethod="card"
        deliveryMethod="pickup"
        deliveryFee={0}
        onSuccess={onSuccess}
      />,
    );

    fireEvent.press(screen.getByLabelText('Place order'));

    await waitFor(() => expect(onSuccess).toHaveBeenCalledWith('order-123456'));

    expect(useCartStore.getState().items).toHaveLength(0);
    expect(useOrdersStore.getState().orders).toHaveLength(1);
  });

  it('does not clear the cart when checkout fails', async () => {
    (postCheckout as jest.Mock).mockRejectedValue(new Error('Card declined'));

    const onSuccess = jest.fn();
    await render(
      <PlaceOrderButton
        items={[cartItem]}
        paymentMethod="card"
        deliveryMethod="pickup"
        deliveryFee={0}
        onSuccess={onSuccess}
      />,
    );

    fireEvent.press(screen.getByLabelText('Place order'));

    await waitFor(() => expect(postCheckout).toHaveBeenCalled());

    expect(onSuccess).not.toHaveBeenCalled();
    expect(useCartStore.getState().items).toHaveLength(1);
  });

  it('does not submit when disabled is true', async () => {
    const onSuccess = jest.fn();
    await render(
      <PlaceOrderButton
        items={[cartItem]}
        paymentMethod="card"
        deliveryMethod="delivery"
        deliveryFee={1500}
        disabled
        onSuccess={onSuccess}
      />,
    );

    fireEvent.press(screen.getByLabelText('Place order'));

    expect(postCheckout).not.toHaveBeenCalled();
  });
});

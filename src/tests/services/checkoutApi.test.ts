import { CheckoutError, postCheckout } from '@/src/services/checkoutApi';
import { Book, CartItem, CheckoutPayload } from '@/src/types/book';

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

const items: CartItem[] = [{ book, quantity: 1 }];

const basePayload: CheckoutPayload = {
  items,
  total: 0,
  paymentMethod: 'card',
  deliveryMethod: 'pickup',
  deliveryFee: 0,
};

describe('postCheckout', () => {
  it('adds the delivery fee into the returned total and starts as pending', async () => {
    const order = await postCheckout({
      ...basePayload,
      deliveryMethod: 'delivery',
      deliveryFee: 1500,
      deliveryAddress: {
        recipientName: 'Jane Doe',
        phone: '08012345678',
        address: '1 Test Street',
      },
    });

    expect(order.deliveryFee).toBe(1500);
    expect(order.total).toBe(order.subtotal + order.tax + 1500);
    expect(order.status).toBe('pending');
    expect(order.deliveryMethod).toBe('delivery');
  });

  it('throws a CheckoutError when the card ends in 0000', async () => {
    await expect(postCheckout({ ...basePayload, cardLast4: '0000' })).rejects.toBeInstanceOf(
      CheckoutError,
    );
  });
});

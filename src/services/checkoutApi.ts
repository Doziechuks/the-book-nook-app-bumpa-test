import { CheckoutPayload, Order } from '@/src/types/book';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class CheckoutError extends Error {}

/**
 * A card ending in "0000" simulates a decline, so the failure path is
 * deterministic (and testable) instead of relying on random flakiness.
 */
export const postCheckout = async (payload: CheckoutPayload): Promise<Order> => {
  await delay(1200);

  if (payload.cardLast4 === '0000') {
    throw new CheckoutError('Your card was declined. Please try a different payment method.');
  }

  const subtotal = payload.items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.075 * 100) / 100;

  return {
    id: `order-${Date.now()}`,
    items: payload.items,
    subtotal: Math.round(subtotal * 100) / 100,
    tax,
    total: Math.round((subtotal + tax + payload.deliveryFee) * 100) / 100,
    paymentMethod: payload.paymentMethod,
    placedAt: new Date().toISOString(),
    status: 'pending',
    deliveryMethod: payload.deliveryMethod,
    deliveryFee: payload.deliveryFee,
    deliveryAddress: payload.deliveryAddress,
  };
};

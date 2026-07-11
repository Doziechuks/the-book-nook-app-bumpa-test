import { CartItem } from '@/src/types/book';

const TAX_RATE = 0.075;

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
}

export const computeCartTotals = (items: CartItem[], deliveryFee = 0): CartTotals => {
  const subtotal = items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    itemCount,
    subtotal: Math.round(subtotal * 100) / 100,
    tax,
    deliveryFee,
    total: Math.round((subtotal + tax + deliveryFee) * 100) / 100,
  };
};

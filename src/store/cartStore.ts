import { Book, CartItem } from '@/src/types/book';
import { computeCartTotals } from '@/src/utils/computeCartTotals';
import { useMemo } from 'react';
import { create } from 'zustand';

interface CartState {
  items: CartItem[];
  addItem: (book: Book, quantity?: number) => void;
  removeItem: (bookId: string) => void;
  incrementQty: (bookId: string) => void;
  decrementQty: (bookId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (book, quantity = 1) =>
    set((state) => {
      const existing = state.items.find((item) => item.book.id === book.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.book.id === book.id ? { ...item, quantity: item.quantity + quantity } : item,
          ),
        };
      }
      return { items: [...state.items, { book, quantity }] };
    }),
  removeItem: (bookId) =>
    set((state) => ({
      items: state.items.filter((item) => item.book.id !== bookId),
    })),
  incrementQty: (bookId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.book.id === bookId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    })),
  decrementQty: (bookId) =>
    set((state) => ({
      items: state.items
        .map((item) => (item.book.id === bookId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    })),
  clearCart: () => set({ items: [] }),
}));

export const useCartTotals = () => {
  const items = useCartStore((state) => state.items);
  return useMemo(() => computeCartTotals(items), [items]);
};

export const useCartItemCount = () =>
  useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));

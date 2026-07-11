import { Order } from '@/src/types/book';
import { create } from 'zustand';

interface OrdersState {
  orders: Order[];
  addOrder: (order: Order) => void;
  cancelOrder: (orderId: string) => void;
}

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: [],
  addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
  cancelOrder: (orderId) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status: 'canceled' } : order,
      ),
    })),
}));

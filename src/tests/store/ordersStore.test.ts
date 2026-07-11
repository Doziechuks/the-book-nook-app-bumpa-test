import { useOrdersStore } from '@/src/store/ordersStore';
import { Order } from '@/src/types/book';

const makeOrder = (id: string): Order => ({
  id,
  items: [],
  subtotal: 10,
  tax: 0.75,
  total: 10.75,
  paymentMethod: 'card',
  placedAt: new Date().toISOString(),
  status: 'pending',
  deliveryMethod: 'pickup',
  deliveryFee: 0,
});

describe('ordersStore', () => {
  beforeEach(() => {
    useOrdersStore.setState({ orders: [] });
  });

  it('prepends new orders', () => {
    useOrdersStore.getState().addOrder(makeOrder('order-1'));
    useOrdersStore.getState().addOrder(makeOrder('order-2'));

    expect(useOrdersStore.getState().orders.map((o) => o.id)).toEqual(['order-2', 'order-1']);
  });

  it('cancels the matching order and leaves others untouched', () => {
    useOrdersStore.setState({
      orders: [makeOrder('order-1'), makeOrder('order-2')],
    });

    useOrdersStore.getState().cancelOrder('order-1');

    const orders = useOrdersStore.getState().orders;
    expect(orders.find((o) => o.id === 'order-1')?.status).toBe('canceled');
    expect(orders.find((o) => o.id === 'order-2')?.status).toBe('pending');
  });
});

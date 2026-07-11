import OrderListItem from '@/src/components/orders/OrderListItem';
import { fireEvent, render, screen } from '@/src/tests/test-utils';
import { Order } from '@/src/types/book';
import React from 'react';

const baseOrder: Order = {
  id: 'order-123456',
  items: [],
  subtotal: 10,
  tax: 0.75,
  total: 10.75,
  paymentMethod: 'card',
  placedAt: new Date().toISOString(),
  status: 'pending',
  deliveryMethod: 'delivery',
  deliveryFee: 1500,
};

describe('OrderListItem', () => {
  it('renders the order id, delivery method and total', async () => {
    await render(<OrderListItem order={baseOrder} />);

    expect(screen.getByText('#123456')).toBeTruthy();
    expect(screen.getByText('Doorstep Delivery')).toBeTruthy();
    expect(screen.getByText('Pending')).toBeTruthy();
  });

  it('shows a Cancel Order button for pending orders and calls onCancel when pressed', async () => {
    const onCancel = jest.fn();
    await render(<OrderListItem order={baseOrder} onCancel={onCancel} />);

    fireEvent.press(screen.getByLabelText('Cancel order #123456'));

    expect(onCancel).toHaveBeenCalled();
  });

  it('hides the Cancel Order button for non-pending orders', async () => {
    await render(
      <OrderListItem order={{ ...baseOrder, status: 'completed' }} onCancel={jest.fn()} />,
    );

    expect(screen.queryByLabelText('Cancel order #123456')).toBeNull();
  });
});

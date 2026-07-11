import OrderStatusTabs from '@/src/components/orders/OrderStatusTabs';
import { fireEvent, render, screen } from '@/src/tests/test-utils';
import React from 'react';

describe('OrderStatusTabs', () => {
  it('renders all four status tabs', async () => {
    await render(<OrderStatusTabs value="all" onChange={jest.fn()} />);

    expect(screen.getByText('All')).toBeTruthy();
    expect(screen.getByText('Pending')).toBeTruthy();
    expect(screen.getByText('Completed')).toBeTruthy();
    expect(screen.getByText('Canceled')).toBeTruthy();
  });

  it('marks the active tab as selected', async () => {
    await render(<OrderStatusTabs value="pending" onChange={jest.fn()} />);

    expect(screen.getByText('Pending').parent?.props.accessibilityState.selected).toBe(true);
    expect(screen.getByText('All').parent?.props.accessibilityState.selected).toBe(false);
  });

  it("calls onChange with the pressed tab's id", async () => {
    const onChange = jest.fn();
    await render(<OrderStatusTabs value="all" onChange={onChange} />);

    fireEvent.press(screen.getByText('Completed'));

    expect(onChange).toHaveBeenCalledWith('completed');
  });
});

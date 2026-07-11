import DeliveryMethodSelector from '@/src/components/checkout/DeliveryMethodSelector';
import { STORE_ADDRESS } from '@/src/constants/delivery';
import { fireEvent, render, screen } from '@/src/tests/test-utils';
import React from 'react';

describe('DeliveryMethodSelector', () => {
  it('shows the store address for pickup and the fee note for delivery', async () => {
    await render(<DeliveryMethodSelector value="pickup" onChange={jest.fn()} />);

    expect(screen.getByText(STORE_ADDRESS)).toBeTruthy();
    expect(screen.getByText(/Adds .* delivery fee/)).toBeTruthy();
  });

  it('marks the selected option as selected', async () => {
    await render(<DeliveryMethodSelector value="delivery" onChange={jest.fn()} />);

    expect(screen.getByLabelText('Doorstep Delivery').props.accessibilityState.selected).toBe(true);
    expect(screen.getByLabelText('Store Pickup').props.accessibilityState.selected).toBe(false);
  });

  it("calls onChange with the pressed option's id", async () => {
    const onChange = jest.fn();
    await render(<DeliveryMethodSelector value="pickup" onChange={onChange} />);

    fireEvent.press(screen.getByLabelText('Doorstep Delivery'));

    expect(onChange).toHaveBeenCalledWith('delivery');
  });
});

import PriceTag from '@/src/components/common/PriceTag';
import { render, screen } from '@/src/tests/test-utils';
import React from 'react';

describe('PriceTag', () => {
  it('renders the formatted price', async () => {
    await render(<PriceTag price={24.99} />);
    expect(screen.getByText('₦24.99')).toBeTruthy();
  });

  it('shows a struck-through original price when discounted', async () => {
    await render(<PriceTag price={19.99} originalPrice={29.99} />);
    expect(screen.getByText('₦19.99')).toBeTruthy();
    expect(screen.getByText('₦29.99')).toBeTruthy();
  });

  it('hides the original price when it is not higher than the price', async () => {
    await render(<PriceTag price={19.99} originalPrice={19.99} />);
    expect(screen.queryAllByText('₦19.99')).toHaveLength(1);
  });
});

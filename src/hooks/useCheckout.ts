import { postCheckout } from '@/src/services/checkoutApi';
import { CheckoutPayload, Order } from '@/src/types/book';
import { useState } from 'react';

export const useCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);

  const submitOrder = async (
    payload: CheckoutPayload,
  ): Promise<{ order: Order | null; error: string | null }> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await postCheckout(payload);
      setOrder(result);
      return { order: result, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong placing your order.';
      setError(message);
      return { order: null, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setOrder(null);
  };

  return { submitOrder, isLoading, error, order, reset };
};

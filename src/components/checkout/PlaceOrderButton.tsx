import Button from '@/src/components/Button';
import { useCheckout } from '@/src/hooks/useCheckout';
import { useCartStore } from '@/src/store/cartStore';
import { useOrdersStore } from '@/src/store/ordersStore';
import { CartItem, DeliveryAddress, DeliveryMethod, PaymentMethod } from '@/src/types/book';
import { computeCartTotals } from '@/src/utils/computeCartTotals';
import React from 'react';
import Toast from 'react-native-toast-message';

interface PlaceOrderButtonProps {
  items: CartItem[];
  paymentMethod: PaymentMethod;
  cardLast4?: string;
  deliveryMethod: DeliveryMethod;
  deliveryFee: number;
  deliveryAddress?: DeliveryAddress;
  disabled?: boolean;
  onSuccess: (orderId: string) => void;
}

const PlaceOrderButton = ({
  items,
  paymentMethod,
  cardLast4,
  deliveryMethod,
  deliveryFee,
  deliveryAddress,
  disabled,
  onSuccess,
}: PlaceOrderButtonProps) => {
  const { submitOrder, isLoading } = useCheckout();
  const clearCart = useCartStore((state) => state.clearCart);
  const addOrder = useOrdersStore((state) => state.addOrder);

  const handlePress = async () => {
    const totals = computeCartTotals(items, deliveryFee);
    const { order, error } = await submitOrder({
      items,
      total: totals.total,
      paymentMethod,
      cardLast4,
      deliveryMethod,
      deliveryFee,
      deliveryAddress,
    });

    if (order) {
      addOrder(order);
      clearCart();
      Toast.show({
        type: 'success',
        text1: 'Order placed!',
        text2: `Order #${order.id.slice(-6)}`,
      });
      onSuccess(order.id);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Checkout failed',
        text2: error ?? 'Please try again.',
      });
    }
  };

  return (
    <Button
      variant="primary"
      isLoading={isLoading}
      disabled={items.length === 0 || disabled}
      onPress={handlePress}
      accessibilityLabel="Place order"
    >
      Place Order
    </Button>
  );
};

export default PlaceOrderButton;

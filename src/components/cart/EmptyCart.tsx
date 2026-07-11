import EmptyState from '@/src/components/common/EmptyState';
import { ROUTES } from '@/src/constants/routes';
import { useRouter } from 'expo-router';
import React from 'react';

const EmptyCart = () => {
  const router = useRouter();

  return (
    <EmptyState
      icon="cart"
      title="Your cart is empty"
      subtitle="Browse our collection and add a few books you love."
      actionLabel="Browse Books"
      onAction={() => router.push(ROUTES.PRODUCTS)}
    />
  );
};

export default EmptyCart;

import CategoryPill from '@/src/components/books/CategoryPill';
import { Order } from '@/src/types/book';
import React from 'react';
import { ScrollView } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

export type OrderStatusFilter = 'all' | Order['status'];

interface OrderStatusTabsProps {
  value: OrderStatusFilter;
  onChange: (status: OrderStatusFilter) => void;
}

const TABS: { id: OrderStatusFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'completed', label: 'Completed' },
  { id: 'canceled', label: 'Canceled' },
];

const OrderStatusTabs = ({ value, onChange }: OrderStatusTabsProps) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.pillRow}
  >
    {TABS.map((tab) => (
      <CategoryPill
        key={tab.id}
        label={tab.label}
        selected={value === tab.id}
        onPress={() => onChange(tab.id)}
      />
    ))}
  </ScrollView>
);

export default OrderStatusTabs;

const styles = ScaledSheet.create({
  pillRow: {
    flexDirection: 'row',
    gap: '8@s',
    paddingHorizontal: '16@s',
  },
});

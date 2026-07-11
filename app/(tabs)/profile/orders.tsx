import EmptyState from '@/src/components/common/EmptyState';
import OrderListItem from '@/src/components/orders/OrderListItem';
import OrderStatusTabs, { OrderStatusFilter } from '@/src/components/orders/OrderStatusTabs';
import { useOrdersStore } from '@/src/store/ordersStore';
import { useTheme } from '@/src/theme/ThemeProvider';
import { FONT_SIZES, FONTS } from '@/src/theme/typography';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScaledSheet, s } from 'react-native-size-matters';

const EMPTY_MESSAGES: Record<OrderStatusFilter, string> = {
  all: "You haven't placed any orders yet.",
  pending: 'No pending orders.',
  completed: 'No completed orders.',
  canceled: 'No canceled orders.',
};

const OrdersScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const orders = useOrdersStore((state) => state.orders);
  const cancelOrder = useOrdersStore((state) => state.cancelOrder);
  const [filter, setFilter] = useState<OrderStatusFilter>('all');

  const filteredOrders = useMemo(
    () => (filter === 'all' ? orders : orders.filter((order) => order.status === filter)),
    [orders, filter],
  );

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.background, paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8} accessibilityLabel="Go back">
          <SymbolView
            name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }}
            size={20}
            tintColor={theme.text}
          />
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Orders</Text>
        <View style={{ width: s(20) }} />
      </View>

      <View style={styles.tabsWrapper}>
        <OrderStatusTabs value={filter} onChange={setFilter} />
      </View>

      {filteredOrders.length === 0 ? (
        <EmptyState icon="bag" title="No orders" subtitle={EMPTY_MESSAGES[filter]} />
      ) : (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {filteredOrders.map((order) => (
            <OrderListItem
              key={order.id}
              order={order}
              onCancel={order.status === 'pending' ? () => cancelOrder(order.id) : undefined}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default OrdersScreen;

const styles = ScaledSheet.create({
  wrapper: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '16@s',
    paddingVertical: '12@vs',
  },
  headerTitle: { fontFamily: FONTS.outfit_semi_bold, fontSize: FONT_SIZES.lg },
  tabsWrapper: { marginBottom: '12@vs' },
  content: { padding: '16@s', gap: '12@vs', paddingBottom: '40@vs' },
});

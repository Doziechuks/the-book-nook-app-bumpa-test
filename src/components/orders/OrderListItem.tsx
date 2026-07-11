import Button from '@/src/components/Button';
import { formatCurrency } from '@/src/shared-utils/useCurrency';
import { useTheme } from '@/src/theme/ThemeProvider';
import { FONT_SIZES, FONTS } from '@/src/theme/typography';
import { Order } from '@/src/types/book';
import moment from 'moment';
import React from 'react';
import { Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface OrderListItemProps {
  order: Order;
  onCancel?: () => void;
}

const STATUS_LABEL: Record<Order['status'], string> = {
  pending: 'Pending',
  completed: 'Completed',
  canceled: 'Canceled',
};

const OrderListItem = ({ order, onCancel }: OrderListItemProps) => {
  const { theme } = useTheme();

  const statusColor: Record<Order['status'], { fg: string; bg: string }> = {
    pending: { fg: theme.warning, bg: theme.warningBg },
    completed: { fg: theme.success, bg: theme.successBg },
    canceled: { fg: theme.error, bg: theme.errorBg },
  };
  const { fg, bg } = statusColor[order.status];

  return (
    <View style={[styles.wrapper, { borderColor: theme.border }]}>
      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.orderId, { color: theme.text }]}>#{order.id.slice(-6)}</Text>
          <Text style={[styles.orderDate, { color: theme.textMuted }]}>
            {moment(order.placedAt).format('MMM D, YYYY - h:mm A')}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: bg }]}>
          <Text style={[styles.statusText, { color: fg }]}>{STATUS_LABEL[order.status]}</Text>
        </View>
      </View>

      <Text style={[styles.deliveryMethod, { color: theme.textMuted }]}>
        {order.deliveryMethod === 'delivery' ? 'Doorstep Delivery' : 'Store Pickup'}
      </Text>

      <Text style={[styles.orderTotal, { color: theme.text }]}>
        {formatCurrency(order.total, 'NGN')}
      </Text>

      {order.status === 'pending' && onCancel && (
        <View style={styles.cancelButton}>
          <Button
            variant="outline"
            onPress={onCancel}
            accessibilityLabel={`Cancel order #${order.id.slice(-6)}`}
          >
            Cancel Order
          </Button>
        </View>
      )}
    </View>
  );
};

export default OrderListItem;

const styles = ScaledSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: '12@s',
    padding: '14@s',
    gap: '8@vs',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderId: { fontFamily: FONTS.outfit_medium, fontSize: FONT_SIZES.sm },
  orderDate: {
    fontFamily: FONTS.outfit_regular,
    fontSize: FONT_SIZES.xs,
    marginTop: '2@vs',
  },
  statusBadge: {
    borderRadius: '10@s',
    paddingHorizontal: '10@s',
    paddingVertical: '4@vs',
  },
  statusText: { fontFamily: FONTS.outfit_medium, fontSize: FONT_SIZES.xs },
  deliveryMethod: {
    fontFamily: FONTS.outfit_regular,
    fontSize: FONT_SIZES.xs,
  },
  orderTotal: { fontFamily: FONTS.outfit_semi_bold, fontSize: FONT_SIZES.sm },
  cancelButton: { marginTop: '4@vs', alignItems: 'flex-start' },
});

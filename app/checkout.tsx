import Button from '@/src/components/Button';
import EmptyState from '@/src/components/common/EmptyState';
import DeliveryMethodSelector from '@/src/components/checkout/DeliveryMethodSelector';
import OrderSummary from '@/src/components/checkout/OrderSummary';
import PaymentMethodSelector from '@/src/components/checkout/PaymentMethodSelector';
import PlaceOrderButton from '@/src/components/checkout/PlaceOrderButton';
import { DELIVERY_FEE } from '@/src/constants/delivery';
import { ROUTES } from '@/src/constants/routes';
import { useCartStore } from '@/src/store/cartStore';
import { useTheme } from '@/src/theme/ThemeProvider';
import { FONT_SIZES, FONTS } from '@/src/theme/typography';
import { DeliveryMethod, PaymentMethod } from '@/src/types/book';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScaledSheet, s } from 'react-native-size-matters';

const CheckoutScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const items = useCartStore((state) => state.items);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('pickup');
  const [recipientName, setRecipientName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState<string | null>(null);

  const containerStyle = [
    styles.wrapper,
    { backgroundColor: theme.background, paddingTop: insets.top },
  ];

  if (items.length === 0 && !orderPlaced) {
    return (
      <View style={containerStyle}>
        <EmptyState
          icon="cart"
          title="Nothing to check out"
          subtitle="Your cart is empty."
          actionLabel="Back to Cart"
          onAction={() => router.back()}
        />
      </View>
    );
  }

  if (orderPlaced) {
    return (
      <View style={[containerStyle, styles.centered]}>
        <View style={[styles.successIcon, { backgroundColor: theme.successBg }]}>
          <SymbolView
            name={{
              ios: 'checkmark.circle.fill',
              android: 'check_circle',
              web: 'check_circle',
            }}
            size={48}
            tintColor={theme.success}
          />
        </View>
        <Text style={[styles.successTitle, { color: theme.text }]}>Order Confirmed!</Text>
        <Text style={[styles.successSubtitle, { color: theme.textMuted }]}>
          Order #{orderPlaced.slice(-6)} is on its way to your library.
        </Text>
        <View style={styles.successButton}>
          <Button variant="primary" onPress={() => router.replace(ROUTES.HOME)}>
            Continue Shopping
          </Button>
        </View>
      </View>
    );
  }

  const cardLast4 = cardNumber.replace(/\s/g, '').slice(-4);
  const deliveryFee = deliveryMethod === 'delivery' ? DELIVERY_FEE : 0;
  const isDeliveryFormValid =
    deliveryMethod === 'pickup' ||
    (recipientName.trim() !== '' && phone.trim() !== '' && address.trim() !== '');

  return (
    <View style={containerStyle}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8} accessibilityLabel="Close checkout">
          <SymbolView
            name={{ ios: 'xmark', android: 'close', web: 'close' }}
            size={20}
            tintColor={theme.text}
          />
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Checkout</Text>
        <View style={{ width: s(20) }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <DeliveryMethodSelector value={deliveryMethod} onChange={setDeliveryMethod} />

        {deliveryMethod === 'delivery' && (
          <View style={styles.addressForm}>
            <View style={styles.cardInputWrapper}>
              <Text style={[styles.cardLabel, { color: theme.textMuted }]}>Recipient Name</Text>
              <TextInput
                value={recipientName}
                onChangeText={setRecipientName}
                placeholder="Jane Doe"
                placeholderTextColor={theme.textMuted}
                style={[
                  styles.cardInput,
                  {
                    color: theme.text,
                    borderColor: theme.border,
                    backgroundColor: theme.surface,
                  },
                ]}
                accessibilityLabel="Recipient name"
              />
            </View>
            <View style={styles.cardInputWrapper}>
              <Text style={[styles.cardLabel, { color: theme.textMuted }]}>Phone Number</Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="080 1234 5678"
                placeholderTextColor={theme.textMuted}
                keyboardType="phone-pad"
                style={[
                  styles.cardInput,
                  {
                    color: theme.text,
                    borderColor: theme.border,
                    backgroundColor: theme.surface,
                  },
                ]}
                accessibilityLabel="Phone number"
              />
            </View>
            <View style={styles.cardInputWrapper}>
              <Text style={[styles.cardLabel, { color: theme.textMuted }]}>Delivery Address</Text>
              <TextInput
                value={address}
                onChangeText={setAddress}
                placeholder="Street, city, state"
                placeholderTextColor={theme.textMuted}
                multiline
                style={[
                  styles.cardInput,
                  {
                    color: theme.text,
                    borderColor: theme.border,
                    backgroundColor: theme.surface,
                  },
                ]}
                accessibilityLabel="Delivery address"
              />
            </View>
          </View>
        )}

        <OrderSummary items={items} deliveryFee={deliveryFee} />

        <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />

        {paymentMethod === 'card' && (
          <View style={styles.cardInputWrapper}>
            <Text style={[styles.cardLabel, { color: theme.textMuted }]}>Card Number</Text>
            <TextInput
              value={cardNumber}
              onChangeText={setCardNumber}
              placeholder="4242 4242 4242 4242"
              placeholderTextColor={theme.textMuted}
              keyboardType="number-pad"
              style={[
                styles.cardInput,
                {
                  color: theme.text,
                  borderColor: theme.border,
                  backgroundColor: theme.surface,
                },
              ]}
              maxLength={19}
              accessibilityLabel="Card number"
            />
          </View>
        )}
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
            paddingBottom: insets.bottom + s(12),
          },
        ]}
      >
        <PlaceOrderButton
          items={items}
          paymentMethod={paymentMethod}
          cardLast4={paymentMethod === 'card' ? cardLast4 : undefined}
          deliveryMethod={deliveryMethod}
          deliveryFee={deliveryFee}
          deliveryAddress={
            deliveryMethod === 'delivery' ? { recipientName, phone, address } : undefined
          }
          disabled={!isDeliveryFormValid}
          onSuccess={setOrderPlaced}
        />
      </View>
    </View>
  );
};

export default CheckoutScreen;

const styles = ScaledSheet.create({
  wrapper: { flex: 1 },
  centered: { alignItems: 'center', justifyContent: 'center', padding: '24@s' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '16@s',
    paddingVertical: '12@vs',
  },
  headerTitle: { fontFamily: FONTS.outfit_semi_bold, fontSize: FONT_SIZES.lg },
  content: { padding: '16@s', gap: '20@vs', paddingBottom: '140@vs' },
  addressForm: { gap: '14@vs' },
  cardInputWrapper: { gap: '6@vs' },
  cardLabel: { fontFamily: FONTS.outfit_medium, fontSize: FONT_SIZES.sm },
  cardInput: {
    borderWidth: 1,
    borderRadius: '10@s',
    padding: '12@s',
    fontFamily: FONTS.outfit_regular,
    fontSize: FONT_SIZES.base,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    padding: '16@s',
  },
  successIcon: {
    width: '88@s',
    height: '88@s',
    borderRadius: '44@s',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16@vs',
  },
  successTitle: {
    fontFamily: FONTS.outfit_bold,
    fontSize: FONT_SIZES.xl,
    textAlign: 'center',
  },
  successSubtitle: {
    fontFamily: FONTS.outfit_regular,
    fontSize: FONT_SIZES.sm,
    textAlign: 'center',
    marginTop: '6@vs',
  },
  successButton: { marginTop: '24@vs', width: '100%' },
});

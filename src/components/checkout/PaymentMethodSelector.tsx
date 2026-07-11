import { useTheme } from '@/src/theme/ThemeProvider';
import { FONT_SIZES, FONTS } from '@/src/theme/typography';
import { PaymentMethod } from '@/src/types/book';
import { SFSymbol, SymbolView } from 'expo-symbols';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

const OPTIONS: { id: PaymentMethod; label: string; icon: SFSymbol }[] = [
  { id: 'card', label: 'Credit / Debit Card', icon: 'creditcard.fill' },
  { id: 'paypal', label: 'PayPal', icon: 'dollarsign.circle.fill' },
  { id: 'apple-pay', label: 'Apple Pay', icon: 'applelogo' },
];

const PaymentMethodSelector = ({ value, onChange }: PaymentMethodSelectorProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.heading, { color: theme.text }]}>Payment Method</Text>
      {OPTIONS.map((option) => {
        const selected = value === option.id;
        return (
          <Pressable
            key={option.id}
            onPress={() => onChange(option.id)}
            style={[
              styles.option,
              {
                borderColor: selected ? theme.primary : theme.border,
                backgroundColor: theme.surface,
              },
            ]}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
          >
            <SymbolView
              name={{ ios: option.icon, android: 'payment', web: 'payment' }}
              size={20}
              tintColor={selected ? theme.primary : theme.textMuted}
            />
            <Text style={[styles.optionLabel, { color: theme.text }]}>{option.label}</Text>
            <View style={[styles.radio, { borderColor: selected ? theme.primary : theme.border }]}>
              {selected && <View style={[styles.radioDot, { backgroundColor: theme.primary }]} />}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default PaymentMethodSelector;

const styles = ScaledSheet.create({
  wrapper: { gap: '10@vs' },
  heading: { fontFamily: FONTS.outfit_semi_bold, fontSize: FONT_SIZES.lg },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12@s',
    borderWidth: 1.5,
    borderRadius: '12@s',
    padding: '12@s',
  },
  optionLabel: {
    flex: 1,
    fontFamily: FONTS.outfit_medium,
    fontSize: FONT_SIZES.sm,
  },
  radio: {
    width: '20@s',
    height: '20@s',
    borderRadius: '10@s',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: { width: '10@s', height: '10@s', borderRadius: '5@s' },
});

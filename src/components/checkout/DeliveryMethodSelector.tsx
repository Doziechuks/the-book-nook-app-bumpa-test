import { formatCurrency } from '@/src/shared-utils/useCurrency';
import { DELIVERY_FEE, STORE_ADDRESS } from '@/src/constants/delivery';
import { useTheme } from '@/src/theme/ThemeProvider';
import { FONT_SIZES, FONTS } from '@/src/theme/typography';
import { DeliveryMethod } from '@/src/types/book';
import { SFSymbol, SymbolView } from 'expo-symbols';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface DeliveryMethodSelectorProps {
  value: DeliveryMethod;
  onChange: (method: DeliveryMethod) => void;
}

const OPTIONS: {
  id: DeliveryMethod;
  label: string;
  subtitle: string;
  icon: SFSymbol;
}[] = [
  {
    id: 'pickup',
    label: 'Store Pickup',
    subtitle: STORE_ADDRESS,
    icon: 'storefront.fill',
  },
  {
    id: 'delivery',
    label: 'Doorstep Delivery',
    subtitle: `Adds ${formatCurrency(DELIVERY_FEE, 'NGN')} delivery fee`,
    icon: 'shippingbox.fill',
  },
];

const DeliveryMethodSelector = ({ value, onChange }: DeliveryMethodSelectorProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.heading, { color: theme.text }]}>Delivery Method</Text>
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
            accessibilityLabel={option.label}
          >
            <SymbolView
              name={{ ios: option.icon, android: 'local_shipping', web: 'local_shipping' }}
              size={20}
              tintColor={selected ? theme.primary : theme.textMuted}
            />
            <View style={styles.optionText}>
              <Text style={[styles.optionLabel, { color: theme.text }]}>{option.label}</Text>
              <Text style={[styles.optionSubtitle, { color: theme.textMuted }]}>
                {option.subtitle}
              </Text>
            </View>
            <View style={[styles.radio, { borderColor: selected ? theme.primary : theme.border }]}>
              {selected && <View style={[styles.radioDot, { backgroundColor: theme.primary }]} />}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default DeliveryMethodSelector;

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
  optionText: { flex: 1, gap: '2@vs' },
  optionLabel: {
    fontFamily: FONTS.outfit_medium,
    fontSize: FONT_SIZES.sm,
  },
  optionSubtitle: {
    fontFamily: FONTS.outfit_regular,
    fontSize: FONT_SIZES.xs,
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

import { useTheme } from '@/src/theme/ThemeProvider';
import { FONT_SIZES, FONTS } from '@/src/theme/typography';
import React from 'react';
import { Pressable, Text } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface CategoryPillProps {
  label: string;
  selected?: boolean;
  onPress: () => void;
}

const CategoryPill = ({ label, selected, onPress }: CategoryPillProps) => {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.pill,
        {
          backgroundColor: selected ? theme.primary : theme.surface,
          borderColor: selected ? theme.primary : theme.border,
        },
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Text style={[styles.label, { color: selected ? theme.onPrimary : theme.textMuted }]}>
        {label}
      </Text>
    </Pressable>
  );
};

export default CategoryPill;

const styles = ScaledSheet.create({
  pill: {
    borderWidth: 1,
    borderRadius: '20@s',
    paddingHorizontal: '14@s',
    paddingVertical: '8@vs',
  },
  label: { fontFamily: FONTS.outfit_medium, fontSize: FONT_SIZES.sm },
});

import { useTheme } from '@/src/theme/ThemeProvider';
import { FONTS } from '@/src/theme/typography';
import React from 'react';
import { Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface RatingStarsProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: number;
}

const RatingStars = ({ rating, size = 14, showValue = true, reviewCount }: RatingStarsProps) => {
  const { theme } = useTheme();
  const rounded = Math.round(rating);

  return (
    <View style={styles.wrapper} accessibilityLabel={`Rated ${rating} out of 5 stars`}>
      <View style={styles.stars}>
        {Array.from({ length: 5 }, (_, i) => (
          <Text key={i} style={{ fontSize: size, color: i < rounded ? '#F5A623' : theme.border }}>
            ★
          </Text>
        ))}
      </View>
      {showValue && (
        <Text style={[styles.label, { color: theme.textMuted, fontSize: size * 0.8 }]}>
          {rating.toFixed(1)}
          {typeof reviewCount === 'number' ? ` (${reviewCount})` : ''}
        </Text>
      )}
    </View>
  );
};

export default RatingStars;

const styles = ScaledSheet.create({
  wrapper: { flexDirection: 'row', alignItems: 'center', gap: '4@s' },
  stars: { flexDirection: 'row' },
  label: { fontFamily: FONTS.outfit_regular },
});

import RatingStars from '@/src/components/common/RatingStars';
import { useTheme } from '@/src/theme/ThemeProvider';
import { FONT_SIZES, FONTS } from '@/src/theme/typography';
import { Review } from '@/src/types/book';
import moment from 'moment';
import React from 'react';
import { Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface ReviewItemProps {
  review: Review;
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.wrapper, { borderColor: theme.border }]}>
      <View style={styles.header}>
        <Text style={[styles.user, { color: theme.text }]}>{review.user}</Text>
        <Text style={[styles.date, { color: theme.textMuted }]}>
          {moment(review.date).format('MMM D, YYYY')}
        </Text>
      </View>
      <RatingStars rating={review.rating} size={12} showValue={false} />
      <Text style={[styles.comment, { color: theme.textMuted }]}>{review.comment}</Text>
    </View>
  );
};

export default ReviewItem;

const styles = ScaledSheet.create({
  wrapper: { borderBottomWidth: 1, paddingVertical: '12@vs', gap: '4@vs' },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  user: { fontFamily: FONTS.outfit_semi_bold, fontSize: FONT_SIZES.sm },
  date: { fontFamily: FONTS.outfit_regular, fontSize: FONT_SIZES.xs },
  comment: {
    fontFamily: FONTS.outfit_regular,
    fontSize: FONT_SIZES.sm,
    marginTop: '2@vs',
  },
});

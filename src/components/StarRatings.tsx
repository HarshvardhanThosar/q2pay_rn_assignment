import React from 'react';
import {StyleSheet, View} from 'react-native';

// I C O N S
import Icon from 'react-native-vector-icons/dist/Ionicons';

const MAX_RATING = 5,
  STAR_SIZES = {
    small: 12,
    medium: 16,
  };

type StarRatingsProps = {
  rating: number;
  variant: keyof typeof STAR_SIZES;
};
const StarRatings = ({rating, variant = 'small'}: StarRatingsProps) => {
  const _stars = [];
  for (let i = 1; i <= MAX_RATING; i++) {
    if (i <= rating) {
      _stars.push(
        <Icon key={i} name="star" size={STAR_SIZES[variant]} color="#A57C00" />,
      );
    } else {
      const _diff = i - rating;
      if (_diff > 0.5) {
        _stars.push(
          <Icon
            key={i}
            name="star-outline"
            size={STAR_SIZES[variant]}
            color="#A57C00"
          />,
        );
      } else {
        _stars.push(
          <Icon
            key={i}
            name="star-half-outline"
            size={STAR_SIZES[variant]}
            color="#A57C00"
          />,
        );
      }
    }
  }

  return <View style={styles.list}>{_stars}</View>;
};

export default StarRatings;

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
  },
});

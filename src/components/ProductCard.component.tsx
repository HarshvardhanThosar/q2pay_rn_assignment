import React from 'react';
import {Alert, Share, StyleSheet, View} from 'react-native';
import {Card, IconButton, Text} from 'react-native-paper';
import StarRatings from './StarRatings';

// U T I L S
import parseCurrency from '../utils/parseCurrency';

// T Y P E S
import type ProductType from '../types/Product.type';
import constants from '../constants/constants';

function ProductCard({item}: {item: ProductType}) {
  const {id, thumbnail, brand, title, rating, price, discountPercentage} = item;
  const parsedPrice = parseCurrency(price);
  const shareData = {
    url: `${constants.DEEPLINK_URL}products/${id}`,
    title: `${brand} | ${title}`,
    get message() {
      return `I found this amazing product. ${brand} | ${title} at an awesome discount on ${this.url}`;
    },
  };

  async function _onShare() {
    try {
      if (!item) {
        throw new Error('Product details not found!');
      }
      const result = await Share.share({
        url: shareData.url,
        title: shareData.title,
        message: shareData.message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }

  return (
    <Card style={styles.card} mode="outlined">
      <View style={styles.row}>
        <Card.Cover
          source={
            thumbnail
              ? {uri: thumbnail}
              : require('./../assets/placeholders/product.jpeg')
          }
          style={styles.featuredThumbnail}
        />
        <Card.Content style={styles.content}>
          <Text style={styles.productBrand} numberOfLines={1}>
            {brand}
          </Text>
          <Text style={styles.productTitle} numberOfLines={2}>
            {title}
          </Text>
          <View style={styles.row}>
            <Text style={styles.productRating} numberOfLines={1}>
              {rating}
            </Text>
            <StarRatings key={rating} rating={rating} variant="small" />
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.productPrice} numberOfLines={1}>
                {parsedPrice}
              </Text>
              <Text style={styles.productDiscountPercentage} numberOfLines={1}>
                ({Math.floor(discountPercentage)}% off)
              </Text>
            </View>
            <IconButton
              mode="contained-tonal"
              icon="share"
              onPress={_onShare}
            />
          </View>
        </Card.Content>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
  },
  column: {
    width: '100%',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  featuredThumbnail: {
    width: 140,
    height: 180,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  content: {
    padding: 0,
    justifyContent: 'center',
    flex: 1,
  },
  productBrand: {
    width: '100%',
    paddingBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  productTitle: {
    width: '100%',
    fontSize: 16,
  },
  productPrice: {
    width: '100%',
    fontSize: 20,
    paddingTop: 4,
  },
  productRating: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  productDiscountPercentage: {
    fontSize: 12,
    color: '#888888',
  },
});

export default ProductCard;

import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  Alert,
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  Share,
  StyleSheet,
  View,
} from 'react-native';
import {Card, IconButton, Text} from 'react-native-paper';
import StarRatings from '../components/StarRatings';

// T Y P E S
import {type ProductStackParams} from '../routers/ProductFlow-Stack/ProductFlow.stack';

// U T I L S  /  C O N S T A N T S
import constants from '../constants/constants';
import parseCurrency from '../utils/parseCurrency';

// H O O K S
import {useProductDetails} from '../hooks/useProduct.hook';
import Loader from '../components/Loader.component';
import ErrorMessage from '../components/ErrorMessage.component';

const {width} = Dimensions.get('screen');

const ProductDetailsRoute = () => {
  const {params} = useRoute<RouteProp<ProductStackParams, 'product_details'>>();
  const id = params?.id;
  const {data, error, isFetching, isLoading, refetch, isRefetching} =
    useProductDetails(id);
  const parsedPrice = parseCurrency(data?.price ?? 0);
  const shareData = {
    url: `${constants.DEEPLINK_URL}products/${data?.id}`,
    title: `${data?.brand} | ${data?.title}`,
    get message() {
      return `I found this amazing product. ${data?.brand} | ${data?.title} at an awesome discount on ${this.url}`;
    },
  };

  function _renderProductImage({item}: {item: string}) {
    return (
      <Card style={styles.featuredThumbnail}>
        <Card.Cover source={{uri: item}} />
      </Card>
    );
  }

  async function _onShare() {
    try {
      if (!data) {
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
    } catch (_error: any) {
      Alert.alert(_error.message);
    }
  }

  if (error) {
    return <ErrorMessage message={error.message} retry={refetch} />;
  }

  if (isFetching || isLoading || !data) {
    return <Loader />;
  }

  return (
    <ScrollView
      style={styles.screen}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }>
      <View style={styles.featuredThumbnailContainer}>
        <FlatList
          horizontal
          data={data.images}
          renderItem={_renderProductImage}
          pagingEnabled
        />
        <IconButton
          mode="contained-tonal"
          style={styles.shareButton}
          icon="share"
          onPress={_onShare}
        />
      </View>
      <Text style={styles.productBrand}>{data.brand}</Text>
      <Text style={styles.productTitle}>{data.title}</Text>
      <View style={styles.row_space_between}>
        <Text style={styles.productCategory}>{data.category}</Text>
        <View style={styles.row}>
          <Text style={styles.productRating} numberOfLines={1}>
            {data.rating}
          </Text>
          <StarRatings
            key={data.rating}
            rating={data.rating}
            variant="medium"
          />
        </View>
      </View>
      <Text style={styles.productDiscription}>{data.description}</Text>
      <View>
        <Text style={styles.productDiscountPercentage}>
          Get upto ({Math.floor(data.discountPercentage)}% off)
        </Text>
        <Text style={styles.productPrice}>{parsedPrice}</Text>
      </View>
      <Text style={styles.productStock}>Only {data.stock} left in stock</Text>
    </ScrollView>
  );
};

const sidePaddingForScreen = 20;
const styles = StyleSheet.create({
  screen: {
    padding: sidePaddingForScreen,
  },
  row: {
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  row_space_between: {
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
  featuredThumbnailContainer: {
    position: 'relative',
  },
  shareButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#FFFFFFE0',
  },
  featuredThumbnail: {
    width: width - 2 * sidePaddingForScreen,
  },
  productBrand: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  productTitle: {
    width: '100%',
    fontSize: 22,
  },
  productCategory: {
    maxWidth: '100%',
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#344966',
    alignSelf: 'flex-start',
    color: '#344966',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  productDiscription: {
    paddingTop: 10,
    fontSize: 16,
  },
  productRating: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDiscountPercentage: {
    fontSize: 16,
    color: '#555555',
  },
  productPrice: {
    width: '100%',
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 4,
  },
  productStock: {
    paddingTop: 5,
    fontSize: 16,
  },
});

export default ProductDetailsRoute;

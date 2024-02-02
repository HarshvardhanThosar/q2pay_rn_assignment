import React from 'react';
import {FlatList, Pressable, StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// C O M P O N E N T S
import ProductCard from '../components/ProductCard.component';

// T Y P E S
import type ProductType from '../types/Product.type';
import {type ProductStackParams} from '../routers/ProductFlow-Stack/ProductFlow.stack';

// H O O K S
import {useProductListing} from '../hooks/useProduct.hook';
import Loader from '../components/Loader.component';
import ErrorMessage from '../components/ErrorMessage.component';

type ProductListingRouteProps = {
  navigation: NativeStackNavigationProp<ProductStackParams, 'product_listing'>;
};

const ProductListingRoute = ({navigation}: ProductListingRouteProps) => {
  const {navigate} = navigation;
  const {
    data: responseData,
    error,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useProductListing();
  const data = responseData?.pages.reduce((acc: ProductType[], page) => {
    if (page?.products && page.products?.length) {
      return [...acc, ...page.products];
    } else {
      return acc;
    }
  }, []);

  function _renderItem({item}: {item: ProductType}) {
    return (
      <Pressable
        style={styles.listItem}
        onPress={_ =>
          navigate('product_details', {
            id: item.id,
          })
        }>
        <ProductCard item={item} />
      </Pressable>
    );
  }

  if (error) {
    return <ErrorMessage message={error.message} retry={refetch} />;
  }

  if (!data) {
    return <Loader />;
  }

  return (
    <FlatList
      style={styles.list}
      data={data}
      renderItem={_renderItem}
      keyExtractor={(item, index) => `item@${item}-index@${index}`}
      onRefresh={refetch}
      refreshing={isLoading}
      onEndReached={() => fetchNextPage()}
      ListFooterComponent={hasNextPage ? <Loader /> : null}
    />
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    padding: 10,
  },
  list: {
    paddingVertical: 5,
  },
  listItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default ProductListingRoute;

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// R O U T E S
import ProductListingRoute from '../../routes/ProductListing.route';
import ProductDetailsRoute from '../../routes/ProductDetails.route';

// C O M P O N E N T S
import Header from '../../components/Header.component';

export type ProductStackParams = {
  product_listing: undefined;
  product_details: {
    id: number | string | undefined;
  };
};

enum ProductStackRoutes {
  product_listing = 'product_listing',
  product_details = 'product_details',
}

export {ProductStackRoutes};

const Stack = createNativeStackNavigator<ProductStackParams>();

const ProductListingHeader = (_: any) => <Header title="Product Listing" />;
const ProductDetailsHeader = (_: any) => <Header title="Product Details" />;

const ProductFlow = () => {
  return (
    <Stack.Navigator initialRouteName="product_listing">
      <Stack.Screen
        name="product_listing"
        component={ProductListingRoute}
        options={{
          title: 'Product Listing',
          header: ProductListingHeader,
        }}
      />
      <Stack.Screen
        name="product_details"
        component={ProductDetailsRoute}
        options={{
          title: 'Product Details',
          header: ProductDetailsHeader,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProductFlow;

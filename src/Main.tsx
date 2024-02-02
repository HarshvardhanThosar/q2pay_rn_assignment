import React from 'react';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';

// R O U T E R S   /   N A V I G A T O R S
import ProductFlow, {
  ProductStackRoutes,
} from './routers/ProductFlow-Stack/ProductFlow.stack';

function Main(): React.JSX.Element {
  const linking: LinkingOptions<ReactNavigation.RootParamList> = {
    prefixes: ['/'],
    config: {
      screens: {
        [ProductStackRoutes.product_details]: 'product/:id',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <ProductFlow />
    </NavigationContainer>
  );
}

export default Main;

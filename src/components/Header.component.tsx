import React from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Appbar} from 'react-native-paper';

// T Y P E S
import {type ProductStackParams} from '../routers/ProductFlow-Stack/ProductFlow.stack';

type HeaderPropsType = {
  title: string;
};

const Header = ({title}: HeaderPropsType) => {
  const navigation = useNavigation<NavigationProp<ProductStackParams>>();
  const route = useRoute<RouteProp<ProductStackParams>>();
  const {name} = route;
  const showBackButton = name !== 'product_listing' ? true : false;

  const _goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('product_listing');
    }
  };

  return (
    <Appbar.Header>
      {showBackButton ? <Appbar.BackAction onPress={_goBack} /> : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default Header;

import {configureFonts, MD2LightTheme} from 'react-native-paper';
import fontConfig from './fontConfig';

const theme = {
  ...MD2LightTheme,
  fonts: configureFonts({config: fontConfig, isV3: false}),
};

export default theme;

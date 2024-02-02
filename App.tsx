/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import theme from './src/configs/theme';
import {PaperProvider} from 'react-native-paper';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

// C O M P O N E N T S
import Main from './src/Main';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <Main />
      </PaperProvider>
    </QueryClientProvider>
  );
}

export default App;

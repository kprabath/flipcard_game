import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

import GameScreen from './src/screens/game.screen';
import store from './src/store';

export default () => (
  <Provider store={store}>
    <SafeAreaProvider>
      <GameScreen />
    </SafeAreaProvider>
  </Provider>
);

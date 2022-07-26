import React, {ReactElement} from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {render} from '@testing-library/react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import store from '../store';

export const renderWithMockStore = (
  component: ReactElement,
  mockStore: object,
) => {
  const mockReducer = configureStore([]);

  return {
    ...render(
      <SafeAreaProvider
        initialSafeAreaInsets={{top: 1, left: 2, right: 3, bottom: 4}}>
        <Provider store={mockReducer(mockStore)}>{component}</Provider>
      </SafeAreaProvider>,
    ),
    store,
  };
};

export const renderWithRedux = (component: ReactElement) => {
  return {
    ...render(
      <SafeAreaProvider
        initialSafeAreaInsets={{top: 1, left: 2, right: 3, bottom: 4}}>
        <Provider store={store}>{component}</Provider>{' '}
      </SafeAreaProvider>,
    ),
    store,
  };
};

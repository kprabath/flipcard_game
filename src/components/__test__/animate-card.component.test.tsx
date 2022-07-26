import React from 'react';
import {fireEvent} from '@testing-library/react-native';

import GameCard from '../game/animated-card.component';
import {renderWithMockStore, renderWithRedux} from '../../library/test.utils';
import store from '../../store';
import {Reducers} from '../../library/types';

describe('GameCard', () => {
  it('When the card loads, the back view with a question mark should be visible', () => {
    const C = <GameCard text={43} id={1} />;
    const {getByText} = renderWithMockStore(C, mockStore());
    expect(getByText('?')).toBeTruthy();
  });

  it('when the card is pressed the totalcount should get updated and the front view should be visible', () => {
    const C = <GameCard text={43} id={1} />;
    const {getByTestId} = renderWithRedux(C);
    const button = getByTestId('1');
    expect(button).toBeTruthy();
    fireEvent.press(button);
    expect((store.getState() as Reducers).cardReducer.totalClicks).toEqual(1);
    expect(
      (store.getState() as Reducers).cardReducer.currentItem.value,
    ).toEqual(43);
  });
});

const mockStore = (totalClicks = 0) => ({
  cardReducer: {
    totalClicks,
    previousItem: {id: 1, value: 100},
    currentItem: {id: 2, value: 100},
  },
});

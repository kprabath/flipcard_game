import {cleanup} from '@testing-library/react-native';
import React from 'react';

import {renderWithMockStore} from '../../library/test.utils';
import {CardObjectType} from '../../library/types';
import GameScreen from '../game.screen';

jest.useFakeTimers();

describe('GameScreen', () => {
  afterEach(cleanup);
  it('should show  the restart button and the steps should be 0', () => {
    const {getByText, getByTestId} = renderWithMockStore(
      <GameScreen />,
      mockStore(),
    );
    expect(getByText('Restart')).toBeTruthy();
    expect(getByTestId('STEPS')).toBeTruthy();
  });

  it('should render array of cards elments', () => {
    const {getAllByText} = renderWithMockStore(
      <GameScreen />,
      mockStore(
        0,
        [],
        [
          {id: 1, value: 1},
          {id: 2, value: 2},
          {id: 1, value: 1},
          {id: 2, value: 2},
          {id: 3, value: 3},
          {id: 3, value: 3},
        ],
      ),
    );
    expect(getAllByText('2')).toHaveLength(2);
    expect(getAllByText('3')).toHaveLength(2);
    expect(getAllByText('1')).toHaveLength(2);
  });

  it('should show greetings prompt when cards array length equals matchId length', () => {
    const {getByText} = renderWithMockStore(
      <GameScreen />,
      mockStore(
        0,
        [1, 1, 2, 2, 3, 3],
        [
          {id: 1, value: 1},
          {id: 2, value: 2},
          {id: 1, value: 1},
          {id: 2, value: 2},
          {id: 3, value: 3},
          {id: 3, value: 3},
        ],
      ),
    );
    expect(getByText('Congratulations!')).toBeTruthy();
  });
});

const mockStore = (
  totalClicks = 0,
  matchedIds: Array<Number> = [],
  cards: Array<CardObjectType> = [],
) => ({
  cardReducer: {
    totalClicks,
    previousItem: {id: 1, value: 100},
    currentItem: {id: 2, value: 100},
    matchedIds,
    cards,
  },
});

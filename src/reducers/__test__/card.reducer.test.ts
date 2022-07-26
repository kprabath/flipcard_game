import {
  incrementTotalClicks,
  resetCards,
  setCards,
} from '../../actions/card.actions';
import {CardObjectType, CardReducerType} from '../../library/types';

import cardreducer from '../card.reducer';

describe('card reducer', () => {
  it('should handle SET_CARDS action', () => {
    const cards: Array<CardObjectType> = [
      {id: 1, value: 1},
      {id: 2, value: 2},
      {id: 3, value: 3},
      {id: 1, value: 1},
      {id: 2, value: 2},
      {id: 2, value: 2},
    ];
    expect(cardreducer(getReducer(), setCards({cards}))).toEqual({
      ...getReducer(),
      cards,
    });
  });
  it('should handle INCREMENT_TOTAL_COUNT action', () => {
    expect(cardreducer(getReducer(), incrementTotalClicks())).toEqual({
      ...getReducer(),
      totalClicks: 1,
    });
  });
  it('should handle RESET_PLAY action', () => {
    expect(cardreducer(getReducer(), resetCards())).toEqual(getReducer());
  });
});

const getReducer = (
  totalClicks = 0,
  matchedIds: Array<number> = [],
  cards: Array<CardObjectType> = [],
): CardReducerType => ({
  totalClicks,
  matchedIds,
  cards,
  previousItem: {id: -1, value: -100},
  currentItem: {id: -2, value: -200},
});

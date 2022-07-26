import {SET_CARDS, SET_SELECTED_ITEM} from '../../constants/actions.constants';
import {CardObjectType} from '../../library/types';
import {setCards, setSelectedItem} from '../card.actions';

describe('Card actions', () => {
  it('should create action setCard', () => {
    const cards: Array<CardObjectType> = [
      {id: 1, value: 1},
      {id: 2, value: 2},
      {id: 3, value: 3},
      {id: 1, value: 1},
      {id: 2, value: 2},
      {id: 2, value: 2},
    ];
    const expectedAction = {
      type: SET_CARDS,
      payload: {cards},
    };
    expect(setCards({cards})).toEqual(expectedAction);
  });

  it('should create action setSelectedItem', () => {
    const expectedAction = {
      type: SET_SELECTED_ITEM,
      payload: {item: {id: 2, value: 3}},
    };
    expect(setSelectedItem({item: {id: 2, value: 3}})).toEqual(expectedAction);
  });
});

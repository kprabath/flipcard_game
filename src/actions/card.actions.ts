import {
  ADD_TO_MACTHED_IDS,
  INCREMENT_TOTAL_COUNT,
  RESET_PLAY,
  SET_CARDS,
  SET_SELECTED_ITEM,
} from '../constants/actions.constants';
import {CardObjectType} from '../library/types';

export const setCards = (payload: {cards: Array<CardObjectType>}) => ({
  type: SET_CARDS,
  payload,
});

export const incrementTotalClicks = () => ({
  type: INCREMENT_TOTAL_COUNT,
});

export const setSelectedItem = (payload: {item: CardObjectType}) => ({
  type: SET_SELECTED_ITEM,
  payload,
});

export const addToMatchIds = (payload: {matchedIds: number}) => ({
  type: ADD_TO_MACTHED_IDS,
  payload,
});

export const resetCards = () => ({type: RESET_PLAY});

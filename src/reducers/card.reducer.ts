import {
  ADD_TO_MACTHED_IDS,
  INCREMENT_TOTAL_COUNT,
  RESET_PLAY,
  SET_CARDS,
  SET_SELECTED_ITEM,
} from '../constants/actions.constants';

import {CardReducerType} from '../library/types';

const INTIAL_STATE: CardReducerType = {
  previousItem: {id: -1, value: -100},
  currentItem: {id: -2, value: -200},
  matchedIds: [],
  totalClicks: 0,
  cards: [],
};

export default (
  state = INTIAL_STATE,
  {type, payload}: {type: string; payload?: any},
) => {
  switch (type) {
    case INCREMENT_TOTAL_COUNT:
      return {...state, totalClicks: state.totalClicks + 1};
    case SET_SELECTED_ITEM:
      return {
        ...state,
        currentItem: payload?.item,
        previousItem: state.currentItem,
      };
    case ADD_TO_MACTHED_IDS:
      return {
        ...state,
        matchedIds: [...state.matchedIds, payload?.matchedIds],
      };
    case SET_CARDS:
      return {
        ...state,
        cards: payload?.cards,
      };
    case RESET_PLAY:
      return {
        ...INTIAL_STATE,
        cards: state?.cards,
      };
    default:
      return state;
  }
};

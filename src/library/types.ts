export type CardObjectType = {
  id: number;
  value: number;
};

export type CardReducerType = {
  totalClicks: number;
  previousItem: CardObjectType;
  currentItem: CardObjectType;
  matchedIds: Array<Number> | [];
  cards: Array<CardObjectType>;
};

export type Reducers = {
  cardReducer: CardReducerType;
};

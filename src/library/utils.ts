// Define generic util functions here

import {Dimensions} from 'react-native';

export const generateUniquenumber = (from: number, to: number) =>
  Math.floor(Math.random() * to) + from;

export const generateUniquenumberArray = (numberOfElements: number) => {
  let array: Array<number> = [];
  while (array.length < numberOfElements) {
    const t = generateUniquenumber(1, 100);
    if (array.find(el => el === t) === undefined) {
      array.push(t);
    }
  }
  return array;
};

export const generatePairs = <T>(array: Array<T>): T[] =>
  array.reduce<T[]>(
    (acc, currentvalue) => acc.concat([currentvalue, currentvalue]),
    [],
  );
export const shuffleElements = <T>(array: T[]) =>
  array.sort(() => Math.random() - 0.5);

export const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} =
  Dimensions.get('screen');

export const getScaleNumber = (size: number) => {
  const dimension = Math.min(SCREEN_HEIGHT, SCREEN_WIDTH);
  const dpi = Math.round(dimension / 375);
  if (dpi >= 2) {
    return (size * dpi) / 4 + size;
  }
  return size;
};

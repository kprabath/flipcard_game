import {
  generatePairs,
  generateUniquenumber,
  generateUniquenumberArray,
} from '../utils';

describe('generateUniquenumber', () => {
  it('generate a random number withing a given range', () => {
    expect(generateUniquenumber(1, 100)).toBeGreaterThanOrEqual(1);
    expect(generateUniquenumber(1, 100)).toBeLessThanOrEqual(100);
  });
});

describe('generateUniquenumberArray', () => {
  it('given the number of iteration generate a unqiue set of numbers', () => {
    const array = generateUniquenumberArray(6);
    expect(new Set(array).size).toEqual(array.length);
  });
});

describe('generatePairs', () => {
  it('given an array generatePairs should add a duplicate for each element', () => {
    const array = [1, 2, 3];
    expect(generatePairs(array)).toEqual([1, 1, 2, 2, 3, 3]);
  });
});

// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, test } from 'vitest';

import { createRangeArray } from './createRangeArray';

test('start와 end를 받아 array를 만드는 createRangeArray 함수를 테스트한다', () => {
  expect(createRangeArray(1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test('start가 end보다 크면 빈 배열을 반환한다', () => {
  expect(createRangeArray(12, 10)).toEqual([]);
});

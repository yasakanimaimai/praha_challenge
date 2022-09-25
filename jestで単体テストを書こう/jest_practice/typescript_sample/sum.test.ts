// `jest ./typescript_sample`
// - Jestはテストの実行時にテストコードの型検査を行いません。
// 型検査を行いたい場合、代わりに`ts-jest`を使用するか、TypeScriptコンパイラの`tsc`をテストとは別に使用してください。
// → `jest.config.js`のtransformでtsの場合は`ts-jest`を使うように設定する
// - JSをテストするときはコメントアウトしないとエラーになる。JSとTSのどちらも一斉にテストするのはできないのか？


import {describe, expect, test} from '@jest/globals';
import { sum } from './sum';

test('basic', () => {
  expect(sum()).toBe(0);
});

test('basic again', () => {
  expect(sum(1, 2)).toBe(3);
});
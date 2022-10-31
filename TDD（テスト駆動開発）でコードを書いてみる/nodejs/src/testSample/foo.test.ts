import { sum } from './foo';

describe('foo.ts', () => {
  test('引数を指定しないと0を返す', () => {
    expect(sum()).toBe(0);
  });
  
  test('1,2を渡すと3を返す', () => {
    expect(sum(1, 2)).toBe(3);
  });
});

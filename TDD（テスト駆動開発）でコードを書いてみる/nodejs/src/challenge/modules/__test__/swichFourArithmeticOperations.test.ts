import exp = require('constants');
import { swichFourArithmeticOperations } from '../swichFourArithmeticOperations';

import add from '../add';
import multiply from '../multiply';
import subtract from '../subtract';
import divide from '../divide';

describe('swichFourArithmeticOperations', () => {

  it('計算対象の引数が無ければエラーを返す', () => {
    expect(() => swichFourArithmeticOperations('add')).toThrowError('Lack of calculation target arg');
  });

  it('計算対象の引数の数が31個以上なら引数過多のエラーを返す', () => {
    const arg31 = [
      0,1,2,3,4,5,6,7,8,9,
      0,1,2,3,4,5,6,7,8,9,
      0,1,2,3,4,5,6,7,8,9,
      0
    ];
    expect(() => swichFourArithmeticOperations('add', ...arg31)).toThrowError('Over arg number');
  });

  it('addを渡すとadd()が実行される',() => {
    const numbers = [3,10,3];
    expect(swichFourArithmeticOperations('add', ...numbers)).toBe(16);
  })

  it('multiplyを渡すとmultiply()が実行される',() => {
    const numbers = [3,10,3];
    expect(swichFourArithmeticOperations('multiply', ...numbers)).toBe(90);
  })

  it('subtractを渡すとsubtract()が実行される',() => {
    const numbers = [10,5,3];
    expect(swichFourArithmeticOperations('subtract', ...numbers)).toBe(2);
  })

  it('divideを渡すとdivide()が実行される',() => {
    const numbers = [100,10];
    expect(swichFourArithmeticOperations('divide', ...numbers)).toBe(10);
  })

});

describe('add', () => {
  it('計算結果が1000を超える場合は「too big」を返す', () => {
    const arg = [500, 501];
    expect(add(arg)).toBe('too big');
  });
})

describe('multiply', () => {
  it('計算結果が1000を超える場合は「big big number」を返す', () => {
    const arg = [21, 50];
    expect(multiply(arg)).toBe('big big number');
  });
})

describe('subtract', () => {
  it('計算結果がマイナスの場合は「negative number」を返す', () => {
    const arg = [2,3,4];
    expect(subtract(arg)).toBe('negative number');
  });
})

describe('subtract', () => {
  it('計算結果がマイナスの場合は「negative number」を返す', () => {
    const arg = [2,3,4];
    expect(subtract(arg)).toBe('negative number');
  });
})

describe('divide', () => {
  it('小数点以下4桁以降は切り捨てる', () => {
    const arg = [1,3];
    expect(divide(arg)).toBe(0.333);
  });
})
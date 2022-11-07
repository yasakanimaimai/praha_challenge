import { fourArithmeticOperations, Operators } from '../fourArithmeticOperations';

import add from '../add';
import multiply from '../multiply';
import subtract from '../subtract';
import divide from '../divide';

describe('fourArithmeticOperations', () => {

  let operators: Operators;

  beforeAll(() => {
    operators = {
      add: add,
      multiply: multiply,
      subtract: subtract,
      divide: divide,
    };
  })

  it('計算対象の引数が無ければエラーを返す', () => {
    const executor = new fourArithmeticOperations(operators);
    expect(() => executor.exec('add')).toThrowError('Lack of calculation target arg');
  });

  it('計算対象の引数の数が31個以上なら引数過多のエラーを返す', () => {
    const executor = new fourArithmeticOperations(operators);
    const arg31 = [
      0,1,2,3,4,5,6,7,8,9,
      0,1,2,3,4,5,6,7,8,9,
      0,1,2,3,4,5,6,7,8,9,
      0
    ];
    expect(() => executor.exec('add', ...arg31)).toThrowError('Over arg number');
  });

  it('(境界値)計算対象の引数が1なら実行される', () => {
    const executor = new fourArithmeticOperations(operators);
    expect(executor.exec('add', 1)).toBe(1);
  });

  it('(境界値)計算対象の引数が30なら実行される', () => {
    const executor = new fourArithmeticOperations(operators);
    const args = Array(30).fill(Number(1));
    expect(executor.exec('add', ...args)).toBe(30);
  });

  it('addを指定するとadd()が実行される',() => {
    const spyAdd = jest.spyOn(operators, 'add');
    const executor = new fourArithmeticOperations(operators);
    expect(executor.exec('add', 3, 10, 3)).toBe(16);
    expect(spyAdd).toHaveBeenCalled();
  })

  it('multiplyを指定するとmultiply()が実行される',() => {
    const spyMultiply = jest.spyOn(operators, 'multiply');
    const executor = new fourArithmeticOperations(operators);
    expect(executor.exec('multiply', 3, 10, 3)).toBe(90);
    expect(spyMultiply).toHaveBeenCalled();
  })

  it('subtractを指定するとsubtract()が実行される',() => {
    const spySubtract = jest.spyOn(operators, 'subtract');
    const executor = new fourArithmeticOperations(operators);
    expect(executor.exec('subtract', 10, 5, 3)).toBe(2);
    expect(spySubtract).toHaveBeenCalled();
  })

  it('divideを指定するとdivide()が実行される',() => {
    const spyDivide = jest.spyOn(operators, 'divide');
    const executor = new fourArithmeticOperations(operators);
    expect(executor.exec('divide', 100, 10)).toBe(10);
    expect(spyDivide).toHaveBeenCalled();
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
  it('小数点4桁以降は切り捨てる', () => {
    const arg = [1,3];
    expect(divide(arg)).toBe(0.333);
  });
})
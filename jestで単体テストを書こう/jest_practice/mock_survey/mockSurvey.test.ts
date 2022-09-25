// https://zenn.dev/dove/scraps/e537b453395ea8

import { describe, it, jest, expect } from '@jest/globals';
import Users from './users';

// jest.mockでhogeオブジェクトをmock化している？
jest.mock('./hoge', () => {
  return {
    hogeFunc: () => 'fuga',
  };
});

describe('mock survey', () => {

  const mockFunc = jest.fn(x => 42 + x);
  const array: number[] = [0, 1];
  array.forEach(num => mockFunc(num));

  it('mock.calls', () => {
    expect(mockFunc.mock.calls.length).toBe(2);

    // The first argument of the first call to the function was 0
    expect(mockFunc.mock.calls[0][0]).toBe(0);

    // The first argument of the second call to the function was 1
    expect(mockFunc.mock.calls[1][0]).toBe(1);

    // The return value of the second call to the function was 43
    expect(mockFunc.mock.results[1].value).toBe(43);
  });


  it('mock.calls custom mathcer', () => {
    expect(mockFunc).toHaveBeenCalled();
    expect(mockFunc).toHaveBeenCalledWith(0);
    expect(mockFunc).toHaveBeenLastCalledWith(1);
    expect(mockFunc).toMatchSnapshot();
  });

  it('set return value', () => {
    const myMock = jest.fn();
    myMock.mockReturnValueOnce(0).mockReturnValueOnce(1).mockReturnValueOnce(2);
    expect(myMock()).toBe(0);
    expect(myMock()).toBe(1);
    expect(myMock()).toBe(2);
  });

  it('jest mock', () => {
    expect(Users.all()).toBe('fuga');
  });


});


// https://tech.uzabase.com/entry/2021/03/17/165008
import { describe, it, jest, expect } from '@jest/globals';
import FizzBuzz from './FizzBuzz';
import FizzBuzzExecutor from './FizzBuzzExecutor';

describe('FizzBuzzは', () => {
  it('3の倍数を受け取るとFizzを返す', () => {
    expect(new FizzBuzz().execute(3)).toEqual('Fizz');
  });

  it('5の倍数を受け取るとBuzzを返す', () => {
    expect(new FizzBuzz().execute(5)).toEqual('Buzz');
  });

  it('15の倍数を受け取るとBuzzを返す', () => {
    expect(new FizzBuzz().execute(15)).toEqual('FizzBuzz');
  });

  it('15の倍数を受け取るとBuzzを返す', () => {
    expect(new FizzBuzz().execute(30)).toEqual('FizzBuzz');
  });

  it('0を受け取ると0を返す', () => {
    expect(new FizzBuzz().execute(0)).toEqual(0);
  });
});

describe('FizzBuzzExecutorは', () => {
  it('1から100までFizzBuzzをする', () => {
    // fizzbuzzの実装に依存したくないのでモックにする
    const fizzBuzz = {} as FizzBuzz;
    const execute = jest.fn();
    fizzBuzz.execute = execute;
    new FizzBuzzExecutor(fizzBuzz).execute(1, 100);
    expect(execute).toHaveBeenCalledTimes(100);
  });
});
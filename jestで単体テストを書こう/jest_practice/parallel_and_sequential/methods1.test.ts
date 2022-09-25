import { describe, it, jest, expect } from '@jest/globals';
import {sum} from './sumArray';


describe('describe1', () => {
  console.log('describe1');

  it('', () => {
    console.log('test1');
    expect(sum()).toBe(235440);
  })

  it('', () => {
    console.log('test2');
    expect(sum()).toBe(235440);
  })

})

describe('describe2', () => {
  console.log('describe2');

  it('', () => {
    console.log('test3');
    expect(sum()).toBe(235440);
  })

  it('', () => {
    console.log('test4');
    expect(sum()).toBe(235440);
  })

})

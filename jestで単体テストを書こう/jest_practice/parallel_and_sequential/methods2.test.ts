import { describe, it, jest, expect } from '@jest/globals';
import {sum} from './sumArray';


describe('describe3', () => {
  console.log('describe3');

  it('', () => {
    console.log('test5');
    expect(sum()).toBe(235440);
  })

  it('', () => {
    console.log('test6');
    expect(sum()).toBe(235440);
  })

})

describe('describe4', () => {
  console.log('describe4');

  it('', () => {
    console.log('test7');
    expect(sum()).toBe(235440);
  })

  it('', () => {
    console.log('test8');
    expect(sum()).toBe(235440);
  })

})

import {describe, expect, it, jest} from '@jest/globals';
import { Driver, Gateway } from "./gateway";

it("aaa", () => {
  const expected = 'test';

  const driverMock = jest.fn<TestDriver, []>().mockImplementation(() => {
    return {
      fetch:() => {
        return "test";
      }
    };
  });
  const driver = driverMock();
  const gateway = new Gateway(driver);
  const actual = gateway.fetch();
  expect(actual).toBe(expect);
})
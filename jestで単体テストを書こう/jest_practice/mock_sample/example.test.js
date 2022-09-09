import greeter, { greet } from "./greeter";

// mockの実用例
// 起動時間によって戻り値が異なる関数を呼び出す
// 起動時間オブジェクトのmockを作ることで指定時間の戻り値を返却できる
describe("#greeter", () => {
  describe("#greet", () => {
    const noonTime = new Date("2020-10-10T15:00:00");
    const morningTime = new Date("2020-10-10T08:00:00");

    beforeEach(() => {
      Date = jest.fn(() => noonTime);
    });

    describe("mock date function", () => {
      it("Hello <name> when the time is 12:00 - 05:59", () => {
        expect(greet("hoge")).toEqual("Hello Hoge!");
      });

      it("Good morning <name> when the time is 06:00-11:59", () => {
        Date = jest.fn(() => morningTime);
        expect(greet("foo")).toEqual("Good morning Foo!");
      });
    });
  });
});
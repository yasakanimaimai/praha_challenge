describe("#jest.fn", () => {
  it("Check `jest.fn()` specification", () => {
    const mockFunction = jest.fn();
    expect(mockFunction("test")).toBe(undefined); // mockFunction関数の結果は`undefined`である

    expect(mockFunction).toHaveProperty("mock"); // mockFunction関数はmockプロパティを持っている

    expect(mockFunction.mock.calls.length).toBe(1); // mockFunction関数は1度呼び出された

    expect(mockFunction.mock.calls[0]).toEqual(["test"]); // mockFunction関数が1度呼び出された際に、引数は"test"だった

    expect(mockFunction.mock.results.length).toBe(1); // mockFunction関数の結果は1つある

    expect(mockFunction.mock.results[0].type).toBe("return"); // mockFunction関数が1度目に呼び出された結果は正常にリターンされている

    expect(mockFunction.mock.results[0].value).toBe(undefined); // mockFunction関数の1度目の結果は`undefined`である

    expect(mockFunction.mock.instances[0]).toBe(undefined); // mockFunction関数からnewを利用してインスタンスを作成していない
  });
});

// mockFunction関数の返り値にHogeを設定
it("return `Hoge`", () => {
  const mockFunction = jest.fn().mockImplementation(() => "Hoge");
  expect(mockFunction()).toBe("Hoge");
});

// mockImplementationは省略可能
it("return `Hoge`", () => {
  const mockFunction = jest.fn(() => "Hoge");
  expect(mockFunction()).toBe("Hoge");
});


// mockImplementationOnce：mockFunction呼び出し時に一度だけ返す値を設定
// 連続で設定した場合、mockFunctionはその順番で値を返す
it("return true once then it returns false", () => {
  const mockFunction = jest
    .fn()
    .mockImplementationOnce(() => true)
    .mockImplementationOnce(() => false);
  expect(mockFunction()).toBe(true);
  expect(mockFunction()).toBe(false);
  expect(mockFunction()).toBe(undefined); // デフォルトの返り値である`undefined`がリターンされる
});
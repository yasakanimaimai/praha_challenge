describe("#spyOn", () => {
  // Math.random()が0.1を返すようになる。オリジナルの関数では0から1以下を返す
  const spy = jest.spyOn(Math, "random").mockImplementation(() => 0.1); 

  afterEach(() => {
    spy.mockRestore();
    // jest.restoreAllMocks(); // 他にモック化している関数があれば、こちら1行ですべてのモック化した関数を元に戻すことができます
  });

  // 何度やっても0.1を返すかを確認
  it("Math.random return 1", () => {
    expect(Math.random()).toEqual(0.1);
    expect(Math.random()).toEqual(0.1);
    expect(Math.random()).toEqual(0.1);
    expect(Math.random()).toEqual(0.1);
    expect(Math.random()).toEqual(0.1);
  });

  //afterEachが実行され、randomは0から1以下を返す

  it("Math.random return under 1", () => {
    expect(Math.random()).toBeLessThan(1); // 1未満である
    expect(Math.random() < 1).toEqual(true); // toEqualで1未満であることを評価する
  });
});
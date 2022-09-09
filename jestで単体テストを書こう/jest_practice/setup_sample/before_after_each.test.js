// テストDBの代わり
const store = {
  users: [],
};

// テスト前にダミーデータを追加
beforeEach(() => {
  store.users.push("山田太郎");
});

// テスト終了後はテストDBをクリーンアップ
afterEach(() => {
  store.users = [];
});

it("既存のユーザが存在する場合にユーザを追加しても、以前のユーザーが上書きされずに新たなユーザが追加される", () => {
  const existingUser = store.users[0];
  store.users.push("山田花子");

  expect(store.users[0]).toBe(existingUser);
  expect(store.users[1]).toBe("山田花子");
});

it("1つ前のテストでstoreに追加したユーザが削除されている", () => {
  expect(store.users[0]).toBe("山田太郎");
  expect(store.users.length).toBe(1);
});
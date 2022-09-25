// `jest ./setup_sample`
// [この記事](https://zenn.dev/tentel/books/08b63492b00f0a/viewer/b98847)を参考にした。


const store = {
  users: [],
};

const createDummyData = () => {
  return new Promise((resolve, reject) => {
    // １秒後にstore.usersにユーザを追加
    setTimeout(() => {
      try {
        store.users.push("山田太郎");
        resolve();
      } catch (e) {
        console.error(e);
        reject();
      }
    }, 1000);
  });
};

const clearDummyData = () => {
  return new Promise((resolve, reject) => {
    // １秒後にstore.usersを初期化
    setTimeout(() => {
      try {
        store.users = [];
        resolve();
      } catch (e) {
        console.error(e);
        reject();
      }
    }, 1000);
  });
};

beforeAll(async () => {
  await createDummyData();
});

afterAll(() => {
  return clearDummyData();
});

it("beforeAll / afterAll の非同期処理の扱い方1", () => {
  store.users.push("山田花子");
  expect(store.users[0]).toBe("山田太郎");
  expect(store.users[1]).toBe("山田花子");
});

it("beforeAll / afterAll の非同期処理の扱い方2", () => {
  // afterAllがitごとに動作していないことを確認
  expect(store.users[1]).toBe("山田花子");
  expect(store.users.length).toBe(2);
});
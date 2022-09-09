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

beforeEach(async () => {
  await createDummyData();
});

afterEach(() => {
  return clearDummyData();
});

describe("スコープを絞る例", () => {
  beforeEach(() => {
    store.users = [];
  });

  it("describeのなかで宣言したbeforeEachが動作していることを確認", () => {
    expect(store.users.length).toBe(0);
  });
});

it("describeのなかで宣言したbeforeEachが、describeの外で動作しないことを確認", () => {
  store.users.push("山田花子");
  expect(store.users[0]).toBe("山田太郎");
  expect(store.users[1]).toBe("山田花子");
});
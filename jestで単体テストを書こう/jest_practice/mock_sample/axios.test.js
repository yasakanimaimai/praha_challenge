// `jest ./mock_sample`
// [この記事](https://qiita.com/YSasago/items/6109c5d3fbdbffa31c9f#%E7%89%B9%E5%AE%9A%E3%81%AE%E9%96%A2%E6%95%B0%E3%82%92%E3%83%A2%E3%83%83%E3%82%AF%E5%8C%96%E3%81%97%E3%82%88%E3%81%86)を参考にした。
// - mockのメリットは、外部の実装から切り離してテストできること


import axios from "axios";
import Users from "./user";

jest.mock("axios");

test("should fetch users", async () => {
  const users = [{ name: "Bob" }];
  const resp = { data: users };

  // axiosで取得する値を設定
  // axiosの取得先と切り離してテストできるところがメリット？
  axios.get.mockResolvedValue(resp);
  //axios.get.mockImplementation(() => Promise.resolve(resp))

  await expect(Users.all()).resolves.toEqual(users);
});
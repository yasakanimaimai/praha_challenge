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
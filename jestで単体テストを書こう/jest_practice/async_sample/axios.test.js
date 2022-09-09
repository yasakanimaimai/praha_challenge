const axios = require('axios')

function getApiData() {
  const axiosData = axios.get('https://jsonplaceholder.typicode.com/posts/1');
  return axiosData;
}

test('the post id is 1', () => {

  // 取得されるはずのオブジェクト
  const correctObject = {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  };

  // テスト実行
  expect.assertions(1)
  return getApiData(1).then(res => {
    expect(res.data).toStrictEqual(correctObject)
  })
})
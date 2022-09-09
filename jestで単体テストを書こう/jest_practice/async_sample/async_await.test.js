const axios = require('axios')

function getPostId() {
  const postId = axios.get('https://jsonplaceholder.typicode.com/posts/').then(res => res.data[0].id);
  return postId;
}

test('the post id is 1', async () => {
  expect.assertions(1);
  const postId = await getPostId(1);
  expect(postId).toBe(1);
})
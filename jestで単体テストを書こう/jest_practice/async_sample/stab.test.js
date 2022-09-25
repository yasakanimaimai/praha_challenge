const getPostId = jest.fn()
getPostId.mockReturnValue(1)

test('the post id is 1', async () => {
  expect.assertions(1)
  const id = await getPostId(1)
  expect(id).toBe(1)
})
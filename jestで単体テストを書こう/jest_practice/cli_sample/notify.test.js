function hello() {
  return 'hello';
}

test('hello', () => {
  expect(hello()).toBe('mistake' + 'hello');
});
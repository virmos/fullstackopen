const listHelper = require('../utils/for_testing')

test('palindrome of a', () => {
  const blogs = [{ 'Name': 'Dijkstra' }]

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


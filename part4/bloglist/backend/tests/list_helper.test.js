const listHelper = require('../utils/list_helper')

describe('total blogs', () => {
  test('number of blogs of blogs array', () => {
    const blogs = [{ author: 'Dijkstra' }]
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  test('total likes of blogs array', () => {
    const blogs = [
      { author: 'Dijkstra', likes: 10 },
      { author: 'Bob', likes: 4 },
      { author: 'Harry', likes: 3 },
      { author: 'Jimmy', likes: 2 }]

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(19)
  })
})

describe('favorite blog', () => {
  test('favorite blog (left -> right)', () => {
    const blogs = [
      { author: 'Dijkstra', likes: 10 },
      { author: 'Bob', likes: 4 },
      { author: 'Harry', likes: 3 },
      { author: 'Jimmy', likes: 2 }]

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toBe(blogs[0])
  })
})

describe('most blogs', () => {
  test('author who created the most blogs', () => {
    const blogs = [
      { author: 'Dijkstra', title: 'A', likes: 10 },
      { author: 'Dijkstra', title: 'B', likes: 10 },
      { author: 'Bob', title: 'C', likes: 4 },
      { author: 'Bob', title: 'D',  likes: 4 },
      { author: 'Harry', title: 'E', likes: 3 },
      { author: 'Harry', title: 'F', likes: 3 },
      { author: 'Harry', title: 'G', likes: 3 },
      { author: 'Jimmy', title: 'H', likes: 2 }]

    const result = listHelper.mostBlogs(blogs)
    expect(result.author).toBe('Harry')
    expect(result.blogs).toBe(3)
  })
})

describe('most likes', () => {
  test('author who has the blog with most likes', () => {
    const blogs = [
      { author: 'Dijkstra', title: 'A', likes: 10 },
      { author: 'Dijkstra', title: 'B', likes: 15 },
      { author: 'Bob', title: 'C', likes: 4 },
      { author: 'Bob', title: 'D',  likes: 4 },
      { author: 'Harry', title: 'E', likes: 3 },
      { author: 'Harry', title: 'F', likes: 3 },
      { author: 'Harry', title: 'G', likes: 3 },
      { author: 'Jimmy', title: 'H', likes: 2 }]

    const result = listHelper.mostLikes(blogs)
    expect(result.author).toBe('Dijkstra')
    expect(result.likes).toBe(15)
  })
})

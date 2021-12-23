const _ = require('lodash')

const dummy = (blogs) => {
  return blogs.length
}

const totalLikes = (blogs) => {
  return blogs.reduce((a, b) => a + b.likes, 0)
}

const favoriteBlog = (blogs) => {
  let favorite = blogs[0]
  let maxLikes = blogs[0].likes
  for (let index = 0; index < blogs.length; index++) {
    if (blogs[index].likes > maxLikes) {
      favorite = blogs[index]
      maxLikes = blogs[index].maxLikes
    }
  }
  return favorite
}

const mostBlogs = (blogs) => {
  let currentMostBlog = 0
  let currentMostKey = null
  _.chain(blogs).groupBy('author').map((value, key) => {
    if (value.length > currentMostBlog) {
      currentMostBlog = value.length
      currentMostKey = key
    }
  }).value()
  return { author: currentMostKey, blogs: currentMostBlog }
}

const mostLikes = (blogs) => {
  const sortedByLikes = (_.sortBy(blogs, (blog) => blog.likes))
  const mostLikesObject = sortedByLikes[sortedByLikes.length - 1]
  return {
    author: mostLikesObject.author,
    likes: mostLikesObject.likes
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
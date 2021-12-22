const Blog = require('../models/blog.js')
const blogsRouter = require('express').Router()

blogsRouter.get('/', (request, response, next) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  }).catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)
  blog.save().then(savedBlog => {
    response.status(201).json(savedBlog)
  }).catch(error => next(error))
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id).then(newBlog => {
    if (newBlog) {
      response.json(newBlog)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


module.exports = blogsRouter
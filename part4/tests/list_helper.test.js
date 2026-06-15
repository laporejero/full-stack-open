const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { listWithOneBlog, initialBlogs } = require('./test_helper')


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
})

describe('favorite blog', () => {
  test('blog with the most likes', () => {
    const result = listHelper.favoriteBlog(initialBlogs)
    assert.deepStrictEqual(result, {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
    })
  })
})

describe('most blogs', () => {
  test('author with largest number of blogs', () => {
    const result = listHelper.mostBlogs(initialBlogs)

    assert.deepStrictEqual(result, {
      author: "Robert C. Martin",
      blogs: 3
    })
  })
})

describe('most likes', () => {
  test('author whose blog posts have the largest amount of likes', () => {
    const result = listHelper.mostLikes(initialBlogs)

    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })
})

module.exports = { blogs }
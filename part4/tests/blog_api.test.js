const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper.js')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    
    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blog list returns the correct amount of blog posts', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blogs have id property', async () => {
    const response = await api.get('/api/blogs')
    
    assert(response.body[0].id)
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'New Blog',
        author: 'Fullstackopen',
        url: 'http://www.fullstackopen.com/',
        likes: 10,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const blogs = blogsAtEnd.map(blog => blog.title)
    assert(blogs.includes('New Blog'))
})

describe('addition of a new blog', () => {
    test('blog with "likes" property missing will default to 0', async () => {
        const newBlog = {
            title: 'Test Blog',
            author: 'Tester',
            url: 'http://test.com'
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDb()
        const savedBlog = blogs.find(blog => blog.title === 'Test Blog')

        assert.strictEqual(savedBlog.likes, 0)
    })

    test('new blog without title cannot be added', async () => {
        const newBlog = {
            url: 'http://blog.com',
            author: 'fullstackopen',
            likes: 5
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        
        const blogs = await helper.blogsInDb()

        assert.strictEqual(blogs.length, helper.initialBlogs.length)
    })

    test('new blog without url cannot be added', async () => {
        const newBlog = {
            title: 'Test blog',
            author: 'fullstackopen',
            likes: 5
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        
        const blogs = await helper.blogsInDb()

        assert.strictEqual(blogs.length, helper.initialBlogs.length)
    })
})

describe('deletion of a blog', () => {
    test('succeed with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        const ids = blogsAtEnd.map(blog => blog.id)
        assert(!ids.includes(blogToDelete.id))

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
})

describe('updating of a blog', () => {
    test('update the number of likes for a blog post', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        blogToUpdate.likes = 20
        
        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDb()
        const updatedBlog = blogs.find(blog => blog.id === blogToUpdate.id)

        assert.strictEqual(updatedBlog.likes, 20)
    })
})

after(async () => {
    await mongoose.connection.close()
})
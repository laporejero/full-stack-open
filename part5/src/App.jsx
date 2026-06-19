import { useState, useEffect } from 'react'
// services
import blogService from './services/blogs'
import loginService from './services/login'
// components
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState(false)
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const showError = (message) => {
    setError(true)
    setNotificationMsg(message)

    setTimeout(() => {
      setError(false)
      setNotificationMsg(null)
    }, 5000)
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      
      window.localStorage.setItem('loggedBlogListUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setError(true)
      if (username.trim() === '' || password.trim() === '') {
        showError('username and password must not be empty')
      } else {
        showError('wrong username or password')
      }
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogListUser')
    setUser(null)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleAddBlog = async event => {
    event.preventDefault()

    try {
      const blogObject = {
        title: title,
        author: author,
        url: url
      }

      const savedBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(savedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotificationMsg(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setNotificationMsg(null)
      }, 5000)
    } catch {
      showError('failed to create blog')
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMsg} error={error} />
        <LoginForm 
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMsg} error={error} />
      <p>
        {user.name} logged in 
        <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog">
        <h2>create new</h2>
        <form onSubmit={handleAddBlog}>
          <label>
            title:
            <input 
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)} 
            />
          </label><br />
          <label>
            author:
            <input 
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)} 
            />
          </label><br />
          <label>
            url:
            <input 
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)} 
            />
          </label><br />
          <button type='submit'>create</button>
        </form>
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
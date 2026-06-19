import { useState, useEffect } from 'react'
// services
import blogService from './services/blogs'
import loginService from './services/login'
// components
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState(false)
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const showNotification = (message, bool) => {
    setError(bool)
    setNotificationMsg(message)

    setTimeout(() => {
      // setError(false)
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
        showNotification('username and password must not be empty', true)
      } else {
        showNotification('wrong username or password', true)
      }
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogListUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const savedBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(savedBlog))
      showNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, false)
    } catch {
      showNotification('failed to create blog', true)
    }
  }

  const updateBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject.id, blogObject)

      setBlogs(prevBlogs =>
        prevBlogs.map(blog =>
          blog.id === updatedBlog.id
            ? updatedBlog
            : blog
        ))
    } catch {
      showNotification('failed to update blog', true)
    }
  }

  const deleteBlog = async (blogObject) => {
    const confirmed = window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)

    if (!confirmed) return

    try {
      await blogService.remove(blogObject.id)

      setBlogs(prevBlogs =>
        prevBlogs.filter(blog => blog.id !== blogObject.id)
      )
    } catch (error) {
      let errorMsg
      if (error.response.status === 403) {
        errorMsg = 'you are not authorized to delete this blog'
      } else {
        errorMsg = 'failed to delete blog'
      }
      showNotification(errorMsg, true)
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

  const sortedBlogsByLikes = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMsg} error={error} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog">
        <CreateBlogForm createBlog={addBlog} />
      </Togglable>

      {sortedBlogsByLikes.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  )
}

export default App
import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
// services
import blogService from './services/blogs'
import loginService from './services/login'
// components
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'
import BlogList from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState(false)
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

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
      navigate('/')
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
    navigate('/')
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

  const padding = { padding: 5 }

  const sortedBlogsByLikes = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <div>
        <Link style={padding} to="/">blogs</Link>
        {!user 
          ? <Link style={padding} to="/login">login</Link>
          : <button onClick={handleLogout}>logout</button>
        }
      </div>

      <Routes>
        <Route path='/blogs/:id' element={
          <Blog
            blogs={blogs}
            user={user}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
          />
        } />
        <Route path="/" element={
          <BlogList 
            blogs={sortedBlogsByLikes}
            user={user}
            handleLogout={handleLogout}
            notificationMsg={notificationMsg}
            error={error}
            addBlog={addBlog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
          />
        } />
        {!user &&
          <Route path="/login" element={
            <LoginForm
              handleLogin={handleLogin}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              message={notificationMsg}
              error={error}
            />
          } />
        }
      </Routes>
    </div>
  )
}

export default App
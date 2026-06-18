import { useState, useEffect } from 'react'
// services
import blogService from './services/blogs'
import loginService from './services/login'
// components
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
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
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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

  const handleAddBlog = event => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(blogObject)
      .then(savedBlog => {
        setBlogs(blogs.concat(savedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
      })
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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
      <p>
        {user.name} logged in 
        <button onClick={handleLogout}>logout</button>
      </p>

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

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
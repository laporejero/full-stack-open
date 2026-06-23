import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const id = useParams().id
  const navigate = useNavigate()

  const [viewBlog, setViewBlog] = useState(false)

  const toggleView = () => {
    setViewBlog(!viewBlog)
  }

  const handleLike = () => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1
    })
  }

  const handeDelete = () => {
    deleteBlog(blog)
    navigate('/')
  }

  const blogStyle = {
    padding: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className='blog'>
      <h2>{blog.author}: {blog.title}</h2>
      <a href={blog.url}>{blog.url}</a> <br />
      <span>
        likes {blog.likes} 
        { user !== null && <button onClick={handleLike}>like</button>}
      </span> <br />
      <span>Added by {blog.user.name}</span>
      <br />
      { (user !== null && user.username === blog.user.username) && 
        <button onClick={handeDelete}>remove</button>
      }


      {/* <button onClick={toggleView}>{ viewBlog ? 'hide' : 'view' }</button> */}
      {/* <div 
        className='blog-details'
        style={{ display: viewBlog ? '' : 'none' }}
      >
        { user.username === blog.user.username && <button onClick={handeDelete}>remove</button> }
      </div> */}
    </div>
  )
}

export default Blog
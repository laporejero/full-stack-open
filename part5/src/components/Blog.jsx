import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
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
  }

  const blogStyle = {
    padding: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div className='blog'>
        {blog.title} {blog.author}
        <button onClick={toggleView}>{ viewBlog ? 'hide' : 'view' }</button>
        <div 
          className='blog-details'
          style={{ display: viewBlog ? '' : 'none' }}
        >
          <span>{blog.url}</span> <br />
          <span>{blog.likes} <button onClick={handleLike}>like</button></span> <br />
          <span>{blog.user.name}</span>
          <br />
          <button onClick={handeDelete}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
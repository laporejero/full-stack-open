import { useState } from 'react'

const Blog = ({ blog }) => {
  const [viewBlog, setViewBlog] = useState(false)

  const toggleView = () => {
    setViewBlog(!viewBlog)
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
      <div>
        {blog.title} {blog.author} 
        <button onClick={toggleView}>{ viewBlog ? 'hide' : 'view' }</button>
        <div style={{ display: viewBlog ? '' : 'none' }}>
          <span>{blog.url}</span> <br />
          <span>{blog.likes} <button>like</button></span> <br />
          <span>{blog.user.name}</span>
        </div>
      </div>
    </div>
  )  
}

export default Blog
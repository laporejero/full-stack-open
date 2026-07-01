import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, Typography, Link, Button, Stack } from '@mui/material'

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
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5">
          {blog.title}
        </Typography>

        <Typography sx={{ mt: 1 }}>
          by {blog.author} 
        </Typography>

        <Link href={blog.url} target="_blank" rel="noopener noreferrer" >
          <Typography sx={{ mt: 1 }}>{blog.url}</Typography>
        </Link>

        <Typography sx={{ mt: 1 }}>
          Added by {blog.user.name}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }} >
          <Typography>
            {blog.likes} likes
          </Typography>

          { user !== null && (
            <Button size="small" variant="outlined" onClick={handleLike} >like</Button>
          )}

          { user !== null && 
            user.username === blog.user.username && (
              <Button color="error" variant="outlined" size="small" onClick={handeDelete}>remove</Button>
            )
          }
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Blog
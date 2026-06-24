import { useState } from 'react'
import { TextField, Button } from "@mui/material"

const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <TextField 
          label="title"
          value={title}
          style={{ marginTop: 10, width: 300 }}
          onChange={event => setTitle(event.target.value)}

          size='small'
          fullWidth='true'
        />
        <br />
        <TextField 
          label="author"
          value={author}
          style={{ marginTop: 10, width: 300 }}
          size='small'
          onChange={event => setAuthor(event.target.value)}
        />
        <br />
        <TextField 
          label="url"
          value={url}
          style={{ marginTop: 10, width: 300 }}
          size='small'
          onChange={event => setUrl(event.target.value)}
        />
        <br />
        <div>
          <Button type="submit" variant="contained" style={{ marginTop: 10 }}>create</Button>
        </div>
      </form>
    </div>
  )
}

export default CreateBlogForm
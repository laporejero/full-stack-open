import { useState } from 'react'

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
                <label>
                    title:
                    <input 
                    type="text"
                    value={title}
                    onChange={event => setTitle(event.target.value)} 
                    />
                </label><br />
                <label>
                    author:
                    <input 
                    type="text"
                    value={author}
                    onChange={event => setAuthor(event.target.value)} 
                    />
                </label><br />
                <label>
                    url:
                    <input 
                    type="text"
                    value={url}
                    onChange={event => setUrl(event.target.value)} 
                    />
                </label><br />
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default CreateBlogForm
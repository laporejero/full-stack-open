import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

test('Create a new blog', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<CreateBlogForm createBlog={createBlog} />)

    const title = screen.getByLabelText('title:')
    const author = screen.getByLabelText('author:')
    const url = screen.getByLabelText('url:')
    const createBtn = screen.getByText('create')

    await user.type(title, 'Testing React apps')
    await user.type(author, 'Full Stack Open')
    await user.type(url, 'https://fullstackopen.com')
    await user.click(createBtn)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Testing React apps')
    expect(createBlog.mock.calls[0][0].author).toBe('Full Stack Open')
    expect(createBlog.mock.calls[0][0].url).toBe('https://fullstackopen.com')
})

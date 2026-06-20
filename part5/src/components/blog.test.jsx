import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test("renders blog's title and author", () => {
    const blog = {
        title: 'Testing React apps',
        author: 'fullstackopen',
        url: 'https://example.com',
        likes: 10,
        user: {
            name: 'Admin'
        }
    }

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.blog')
    const otherDetails = container.querySelector('.blog-details')

    expect(div).toHaveTextContent('Testing React apps')
    expect(div).toHaveTextContent('fullstackopen')
    expect(otherDetails).toHaveTextContent('https://example.com')
    expect(otherDetails).toHaveTextContent('10')
    expect(otherDetails).not.toBeVisible()
})

test('url and likes are shown when button is clicked', async () => {
    const blog = {
        title: 'Testing React apps',
        author: 'fullstackopen',
        url: 'https://example.com',
        likes: 10,
        user: {
            name: 'Admin'
        }
    }

    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.getByText('https://example.com')
    const likes = screen.getByText('10')
    expect(url).toBeVisible()
    expect(likes).toBeVisible()
})
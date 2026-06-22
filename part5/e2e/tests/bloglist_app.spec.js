const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Test User',
                username: 'user',
                password: 'test'
            }
        })

        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        const locator = page.getByText('Log in to application')
        await expect(locator).toBeVisible()
        await expect(page.getByLabel('username')).toBeVisible()
        await expect(page.getByLabel('password')).toBeVisible()
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'user', 'test')
            await expect(page.getByText('Test User logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'user', 'wrong')
            await expect(page.getByText('wrong username or password')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'user', 'test')
        })

        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'create new blog' }).click()
            await createBlog(
                page, 
                'A Blog Created by Playwright', 
                'Lionel Messi',
                'https://blog.test'
            )

            await expect(page.getByText('a new blog A Blog Created by Playwright by Lionel Messi added')).toBeVisible()
            await expect(page.getByText('A Blog Created by Playwright Lionel Messi')).toBeVisible()
            await expect(page.getByRole('button', { name: 'view' })).toBeVisible()
        })

        test('a blog can be liked', async ({ page }) => {
            await page.getByRole('button', { name: 'create new blog' }).click()
            await createBlog(
                page, 
                'A Blog Created by Playwright', 
                'Lionel Messi',
                'https://blog.test'
            )

            const blog = page.getByText('A Blog Created by Playwright').locator('..')
            await blog.getByRole('button', { name: 'view' }).click()
            await expect(blog.getByText('0')).toBeVisible()
            await blog.getByRole('button', { name: 'like' }).click()
            await page.pause()
            await expect(blog.getByText('1')).toBeVisible()
        })

        describe('several blogs exists', () => {
            beforeEach(async ({ page }) => {
                await page.getByRole('button', { name: 'create new blog' }).click()
                await createBlog(
                    page, 
                    'first blog', 
                    'fullstackopen',
                    'https://blog.test/first'
                )
                await createBlog(
                    page, 
                    'second blog', 
                    'fullstackopen',
                    'https://blog.test/second'
                )
                await createBlog(
                    page, 
                    'third blog', 
                    'fullstackopen',
                    'https://blog.test/third'
                )
            })

            test('a blog can be deleted by the user who added it', async({ page }) => {
                await page.pause()
                const blog = page.locator('.blog').filter({
                    hasText: 'third blog fullstackopen'
                })
                await blog.getByRole('button', { name: 'view' }).click()

                page.once('dialog', dialog => {
                    dialog.accept()
                })

                await blog.getByRole('button', { name: 'remove' }).click()

                await expect(page.getByText('third blog fullstackopen')).not.toBeVisible()
            })
        })
    })

    describe('when a blog has been created by one user', () => {
        beforeEach(async ({ page, request }) => {
            await request.post('http://localhost:3003/api/users', {
                data: {
                    name: 'User 1',
                    username: 'user1',
                    password: 'test1'
                }
            })
            await request.post('http://localhost:3003/api/users', {
                data: {
                    name: 'User 2',
                    username: 'user2',
                    password: 'test2'
                }
            })
            await loginWith(page, 'user1', 'test1')
            await page.getByRole('button', { name: 'create new blog' }).click()
            await createBlog(
                page, 
                'Blog created by User 1', 
                'User 1',
                'https://blog.test/blog-1'
            )
        })

        test('only the creator sees the delete button', async ({ page }) => {
            await page.pause()
            await expect(page.getByText('Blog created by User 1 User 1')).toBeVisible()
            await page.getByRole('button', { name: 'view' }).click()
            await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()

            await page.getByRole('button', { name: 'logout' }).click()
            await loginWith(page, 'user2', 'test2')
            await page.getByRole('button', { name: 'view' }).click()
            await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })
    })
})
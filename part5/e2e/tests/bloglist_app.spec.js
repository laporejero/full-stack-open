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
            await createBlog(
                page, 
                'Building Accessible Web Components', 
                'Rachel Green',
                'https://a11yweb.dev'
            )

            await expect(page.getByText('a new blog Building Accessible Web Components by Rachel Green added')).toBeVisible()
            await expect(page.getByText('Building Accessible Web Components Rachel Green')).toBeVisible()
            await expect(page.getByRole('button', { name: 'view' })).toBeVisible()
        })
    })
})
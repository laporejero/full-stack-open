const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Test User",
        username: "user",
        password: "test",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("login")).toBeVisible();
    await page.getByRole("link", { name: "login" }).click();
    await expect(page.getByLabel("username")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "user", "test");
      await expect(page.getByRole("button", { name: "logout" })).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "user", "wrong");
      await expect(page.getByText("wrong username or password")).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "user", "test");
    });

    test("A logged-in user can create a blog", async ({ page }) => {
      await createBlog(
        page,
        "A Blog Created by Playwright",
        "Lionel Messi",
        "https://blog.test",
      );
      await page.pause();
      await expect(
        page.getByText(
          "a new blog A Blog Created by Playwright by Lionel Messi added",
        ),
      ).toBeVisible();
      await page.pause();
      await expect(
        page.getByRole("link", {
          name: "A Blog Created by Playwright by Lionel Messi",
        }),
      ).toBeVisible();
    });

    test("a blog can be liked", async ({ page }) => {
      await createBlog(
        page,
        "A Blog Created by Playwright",
        "Lionel Messi",
        "https://blog.test",
      );

      await page.pause();
      await expect(
        page.getByRole("link", {
          name: "A Blog Created by Playwright by Lionel Messi",
        }),
      ).toBeVisible();
      await page
        .getByRole("link", {
          name: "A Blog Created by Playwright by Lionel Messi",
        })
        .click();
      await expect(page.getByText("likes 0")).toBeVisible();
      await page.getByRole("button", { name: "like" }).click();
      await page.pause();
      await expect(page.getByText("likes 1")).toBeVisible();
    });

    test.only("A logged-in user can delete a blog", async ({ page }) => {
      await createBlog(
        page,
        "A Blog Created by Playwright",
        "Lionel Messi",
        "https://blog.test",
      );

      await page.pause();
      await expect(
        page.getByRole("link", {
          name: "A Blog Created by Playwright by Lionel Messi",
        }),
      ).toBeVisible();
      await page
        .getByRole("link", {
          name: "A Blog Created by Playwright by Lionel Messi",
        })
        .click();

      page.once("dialog", (dialog) => {
        dialog.accept();
      });

      await page.getByRole("button", { name: "remove" }).click();
      await page.pause();
      await expect(
        page.getByText("third blog by fullstackopen"),
      ).not.toBeVisible();
    });
  });

  describe("when a blog has been created by one user", () => {
    beforeEach(async ({ page, request }) => {
      await request.post("http://localhost:3003/api/users", {
        data: {
          name: "User 1",
          username: "user1",
          password: "test1",
        },
      });
      await request.post("http://localhost:3003/api/users", {
        data: {
          name: "User 2",
          username: "user2",
          password: "test2",
        },
      });
      await loginWith(page, "user1", "test1");
      await createBlog(page, "New Blog", "Blogger", "https://blog.test/blog-1");
    });

    test("only the creator sees the delete button", async ({ page }) => {
      await page.pause();
      await expect(
        page.getByRole("link", { name: "New Blog by Blogger" }),
      ).toBeVisible();
      await page.getByRole("link", { name: "New Blog by Blogger" }).click();
      await expect(page.getByRole("button", { name: "remove" })).toBeVisible();

      await page.getByRole("button", { name: "logout" }).click();
      await loginWith(page, "user2", "test2");
      await page.getByRole("link", { name: "New Blog by Blogger" }).click();
      await expect(
        page.getByRole("button", { name: "remove" }),
      ).not.toBeVisible();
    });
  });

  describe("several blogs with likes added", () => {
    beforeEach(async ({ page, request }) => {
      const loginResponse = await request.post(
        "http://localhost:3003/api/login",
        {
          data: {
            username: "user",
            password: "test",
          },
        },
      );

      const loginData = await loginResponse.json();
      const token = loginData.token;

      await request.post("http://localhost:3003/api/blogs", {
        data: {
          title: "first blog",
          author: "fullstackopen",
          url: "https://blog.test/first",
          likes: 5,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await request.post("http://localhost:3003/api/blogs", {
        data: {
          title: "second blog",
          author: "fullstackopen",
          url: "https://blog.test/second",
          likes: 15,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await request.post("http://localhost:3003/api/blogs", {
        data: {
          title: "third blog",
          author: "fullstackopen",
          url: "https://blog.test/third",
          likes: 10,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await page.goto("http://localhost:5173");
    });

    test("blogs are arranged in order according to the likes", async ({
      page,
    }) => {
      const blogs = page.locator("li");
      await expect(blogs.nth(0)).toContainText("second blog by fullstackopen");
      await expect(blogs.nth(1)).toContainText("third blog by fullstackopen");
      await expect(blogs.nth(2)).toContainText("first blog by fullstackopen");
    });
  });
});

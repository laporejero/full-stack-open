import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogList from "./BlogList";

const blog = {
  title: "Testing React apps",
  author: "fullstackopen",
  url: "https://example.com",
  likes: 10,
  user: {
    username: "admin",
    user: "Administrator",
  },
};

const user = {
  username: "User",
  name: "Test User",
};

test("blog information and likes are displayed to unauthenticated users, buttons are not displayed", () => {
  render(
    <MemoryRouter>
      <Blog blog={blog} user={null} />
    </MemoryRouter>,
  );

  expect(screen.getByText("fullstackopen: Testing React apps")).toBeVisible();
  expect(screen.getByText("likes 10")).toBeVisible();
  expect(
    screen.queryByRole("button", { name: "like" }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "remove" }),
  ).not.toBeInTheDocument();
});

test("Authenticated users who are not the blog’s creator are shown only the like button", async () => {
  render(
    <MemoryRouter>
      <Blog blog={blog} user={user} />
    </MemoryRouter>,
  );

  expect(screen.getByText("fullstackopen: Testing React apps")).toBeVisible();
  expect(screen.getByText("likes 10")).toBeVisible();
  expect(screen.getByRole("button", { name: "like" })).toBeVisible();
  expect(
    screen.queryByRole("button", { name: "remove" }),
  ).not.toBeInTheDocument();
});

test("Delete button is visible to the blog's creator", async () => {
  const user = {
    username: "admin",
    user: "Administrator",
  };

  render(
    <MemoryRouter>
      <Blog blog={blog} user={user} />
    </MemoryRouter>,
  );

  expect(screen.getByText("fullstackopen: Testing React apps")).toBeVisible();
  expect(screen.getByText("likes 10")).toBeVisible();
  expect(screen.getByRole("button", { name: "like" })).toBeVisible();
  expect(screen.getByRole("button", { name: "remove" })).toBeVisible();
});

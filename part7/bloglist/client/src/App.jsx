import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useMatch } from "react-router-dom";
// services
import blogService from "./services/blogs";
import loginService from "./services/login";
// components
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import CreateBlogForm from "./components/CreateBlogForm";
import BlogList from "./components/BlogList";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./components/NotFound";
// style
import { Container, AppBar, Toolbar, Button, Typography } from "@mui/material";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogListUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogListUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      navigate("/");
    } catch {
      if (username.trim() === "" || password.trim() === "") {
        setNotification({
          text: "username and password must not be empty",
          type: "error",
        });
      } else {
        setNotification({ text: "wrong username or password", type: "error" });
      }
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogListUser");
    setUser(null);
    navigate("/");
  };

  const addBlog = async (blogObject) => {
    console.log("addBlog data:", blogObject);
    try {
      const savedBlog = await blogService.create(blogObject);

      setBlogs(blogs.concat(savedBlog));
      navigate("/");
      setNotification({
        text: `a new blog ${blogObject.title} by ${blogObject.author} added!`,
        type: "success",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch {
      setNotification({ text: "failed to create blog", type: "error" });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const updateBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject.id, blogObject);

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === updatedBlog.id ? updatedBlog : blog,
        ),
      );
    } catch {
      setNotification({ text: "failed to update blog", type: "error" });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const deleteBlog = async (blogObject) => {
    const confirmed = window.confirm(
      `Remove blog ${blogObject.title} by ${blogObject.author}`,
    );

    if (!confirmed) return;

    try {
      await blogService.remove(blogObject.id);

      setBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog.id !== blogObject.id),
      );
    } catch (error) {
      let errorMsg;
      if (error.response.status === 403) {
        errorMsg = "you are not authorized to delete this blog";
      } else {
        errorMsg = "failed to delete blog";
      }
      setNotification({ text: errorMsg, type: "error" });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const padding = { padding: 5 };

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  const sortedBlogsByLikes = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/create">
            new blog
          </Button>
          {!user ? (
            <Button color="inherit" component={Link} to="/login">
              login
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogout}>
              logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Notification notification={notification} />

      <ErrorBoundary>
        <Routes>
          <Route
            path="/blogs/:id"
            element={
              <Blog
                blog={blog}
                user={user}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
              />
            }
          />
          <Route
            path="/"
            element={
              <BlogList
                blogs={sortedBlogsByLikes}
                user={user}
                handleLogout={handleLogout}
                addBlog={addBlog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
              />
            }
          />

          <Route
            path="/create"
            element={
              <CreateBlogForm
                createBlog={addBlog}
                notification={notification}
              />
            }
          />

          {!user && (
            <Route
              path="/login"
              element={
                <LoginForm
                  handleLogin={handleLogin}
                  username={username}
                  setUsername={setUsername}
                  password={password}
                  setPassword={setPassword}
                  notification={notification}
                />
              }
            />
          )}

          <Route path="*" element={<NotFound></NotFound>} />
        </Routes>
      </ErrorBoundary>
    </Container>
  );
};

export default App;

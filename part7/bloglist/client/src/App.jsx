import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
// hooks
import { useNotification } from "./hooks/useNotification";
// style
import { Container, AppBar, Toolbar, Button, Typography } from "@mui/material";

const App = () => {
  const { showNotification } = useNotification()

  const queryClient = useQueryClient()

  const { data: blogs = [], isPending, isError, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  
  const match = useMatch("/blogs/:id");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogListUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['blogs'],
      });
    },
  });

  if (isPending) {
    return <div>Loading blogs...</div>
  }

  if (isError) {
    return <div>Error loading blogs: {error.message}</div>
  }

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
        showNotification({
          text: "username and password must not be empty",
          type: "error",
        });
      } else {
        showNotification({
          text: "wrong username or password",
          type: "error",
        });
      }
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogListUser");
    setUser(null);
    navigate("/");
  };

  const addBlog = async (blogObject) => {
    try {
      await createBlogMutation.mutateAsync(blogObject);

      navigate("/");
      showNotification({
        text: `a new blog ${blogObject.title} by ${blogObject.author} added!`,
        type: "success",
      })
    } catch {
      showNotification({
        text: "failed to create blog",
        type: "error",
      });
    }
  };

  // const updateBlog = async (blogObject) => {
  //   try {
  //     const updatedBlog = await blogService.update(blogObject.id, blogObject);

  //     setBlogs((prevBlogs) =>
  //       prevBlogs.map((blog) =>
  //         blog.id === updatedBlog.id ? updatedBlog : blog,
  //       ),
  //     );
  //   } catch {
  //     showNotification({
  //       text: "failed to update blog",
  //       type: "error",
  //     });
  //   }
  // };

  // const deleteBlog = async (blogObject) => {
  //   const confirmed = window.confirm(
  //     `Remove blog ${blogObject.title} by ${blogObject.author}`,
  //   );

  //   if (!confirmed) return;

  //   try {
  //     await blogService.remove(blogObject.id);

  //     setBlogs((prevBlogs) =>
  //       prevBlogs.filter((blog) => blog.id !== blogObject.id),
  //     );
  //   } catch (error) {
  //     let errorMsg;
  //     if (error.response.status === 403) {
  //       errorMsg = "you are not authorized to delete this blog";
  //     } else {
  //       errorMsg = "failed to delete blog";
  //     }
  //     showNotification({
  //       text: errorMsg,
  //       type: "error",
  //     });
  //   }
  // };

  const padding = { padding: 5 };

  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  const sortedBlogsByLikes = [...blogs].sort((a, b) => b.likes - a.likes);

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

      <Notification />

      <ErrorBoundary>
        <Routes>
          <Route
            path="/blogs/:id"
            element={
              <Blog
                blog={blog}
                user={user}
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
              />
            }
          />

          <Route path="/create" element={<CreateBlogForm createBlog={addBlog}/>} />

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

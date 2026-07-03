import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import {
  Card,
  CardContent,
  Typography,
  Link,
  Button,
  Stack,
  TextField,
} from "@mui/material";

const Blog = ({ blog, updateBlog, deleteBlog, addComment }) => {
  const id = useParams().id;
  const { user } = useUser()
  const navigate = useNavigate();

  const [viewBlog, setViewBlog] = useState(false);
  const [comment, setComment] = useState("")

  const toggleView = () => {
    setViewBlog(!viewBlog);
  };

  const handleLike = () => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
    });
  };

  const handeDelete = () => {
    deleteBlog(blog);
    navigate("/");
  };

  const handleAddComment = async (event) => {
    event.preventDefault();
    await addComment(blog.id, comment)
    setComment("")
  }

  const blogStyle = {
    padding: 5,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5">{blog.title}</Typography>

        <Typography sx={{ mt: 1 }}>by {blog.author}</Typography>

        <Link href={blog.url} target="_blank" rel="noopener noreferrer">
          <Typography sx={{ mt: 1 }}>{blog.url}</Typography>
        </Link>

        <Typography sx={{ mt: 1 }}>Added by {blog.user.name}</Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Typography>{blog.likes} likes</Typography>

          {user !== null && (
            <Button size="small" variant="outlined" onClick={handleLike}>
              like
            </Button>
          )}

          {user !== null && user.username === blog.user.username && (
            <Button
              color="error"
              variant="outlined"
              size="small"
              onClick={handeDelete}
            >
              remove
            </Button>
          )}
        </Stack>

        <Typography variant="h6" sx={{ marginTop: '20px' }}>comments</Typography>
        <form onSubmit={handleAddComment}>
          <TextField 
            value={comment}
            onChange={(event) => setComment(event.target.value)}

            placeholder="add a comment"
            size="small"
            sx={{ marginRight: "8px" }}
          />
          <Button 
            type="submit" 
            variant="contained"
            sx={{ textTransform: 'uppercase' }}
          >
            add comment
          </Button>
        </form>

        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Blog;

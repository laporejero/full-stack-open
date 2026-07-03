import { Link } from "react-router-dom";
import Blog from "./Blog";
import Togglable from "./Togglable";
import CreateBlogForm from "./CreateBlogForm";
import { Typography } from "@mui/material";

const BlogList = ({ blogs }) => {
  return (
    <div>
      <Typography variant="h5" sx={{ padding: '10px 0' }}>Blogs</Typography>

      <ul className="blog-list">
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link
              to={`/blogs/${blog.id}`}
            >{`${blog.title} by ${blog.author}`}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;

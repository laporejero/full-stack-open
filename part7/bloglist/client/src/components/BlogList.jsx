import { Link } from "react-router-dom"
import Blog from "./Blog"
import Togglable from "./Togglable"
import Notification from "./Notification"
import CreateBlogForm from "./CreateBlogForm"

const BlogList = ({ 
    blogs, 
    user, 
    handleLogout, 
    notificationMsg, 
    error,
    addBlog,
    updateBlog,
    deleteBlog
}) => {

    return (
        <div>
            <h2>blogs</h2>
            
            <Notification message={notificationMsg} error={error} />

            <ul className="blog-list">
                {blogs.map(blog =>
                    <li key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>{`${blog.title} by ${blog.author}`}</Link>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default BlogList
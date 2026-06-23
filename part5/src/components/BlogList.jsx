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
            {/* <p>
                {user.name} logged in
                <button onClick={handleLogout}>logout</button>
            </p> */}

            { user !== null &&
                <Togglable buttonLabel="create new blog">
                    <CreateBlogForm createBlog={addBlog} />
                </Togglable>
            }

            {blogs.map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    user={user}
                    updateBlog={updateBlog}
                    deleteBlog={deleteBlog}
                />
            )}
        </div>
    )
}

export default BlogList
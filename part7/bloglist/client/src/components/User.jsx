import { Typography } from "@mui/material"

const User = ({ user }) => {
    return (
        <div>
            <Typography variant="h5" sx={{ padding: '10px 0' }}>{user.name}</Typography>
            <Typography sx={{ mt: 1 }}>added blogs</Typography>
            <ul>
                {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
            </ul>
        </div>
    )
}

export default User
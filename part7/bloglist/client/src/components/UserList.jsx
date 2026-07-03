import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const UserList = ({ users }) => {
    return (
        <div>
            <Typography variant="h5" sx={{ padding: '10px 0' }}>Users</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Blogs created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.blogs.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default UserList
import { TextField, Button } from "@mui/material"
import Notification from "./Notification"

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
  message,
  error
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <Notification message={message} error={error} />
      <form onSubmit={handleLogin}>
        <TextField 
          label="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}

          variant="standard"
        />
        <br />
        <TextField 
          label="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}

          variant="standard"
          style={{ marginTop: 10 }}
        />
        <div>
          <Button type="submit" variant="contained" style={{ marginTop: 10 }}>login</Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
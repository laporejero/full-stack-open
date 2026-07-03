import { createContext, useContext, useState, useEffect } from "react";
import blogService from "../services/blogs"

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogListUser");
        if (loggedUserJSON) {
            const loggedUser = JSON.parse(loggedUserJSON);
            setUser(loggedUser);
            blogService.setToken(loggedUser.token)
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)
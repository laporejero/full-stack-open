import { createContext, useContext, useState, useEffect } from "react";
import blogService from "../services/blogs"
import { getUser } from "../services/persistentUser";

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loggedUser = getUser()
        if (loggedUser) {
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
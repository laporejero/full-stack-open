import { createContext, useReducer } from "react";

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.payload
        
        case 'CLEAR_NOTIFICATION':
            return null

        default:
            return state
    }
}

const NotificationProvider = ({ children }) => {
    const [notification, dispatch] = useReducer(
        notificationReducer,
        null
    )

    const showNotification = (notification) => {
        dispatch({
            type: 'SET_NOTIFICATION',
            payload: notification,
        });

        setTimeout(() => {
            dispatch({
                type: 'CLEAR_NOTIFICATION',
            });
        }, 5000)
    }

    return (
        <NotificationContext.Provider
            value={{ notification, showNotification }}
        >
            {children}
        </NotificationContext.Provider>
    )
}

export { notificationReducer, NotificationProvider }
export default NotificationContext
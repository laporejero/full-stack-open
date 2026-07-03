const STORAGE_KEY = "loggedBlogListUser";

export const getUser = () => {
    const userJSON = window.localStorage.getItem(STORAGE_KEY);

    if (!userJSON) {
        return null;
    }

    return JSON.parse(userJSON);
};

export const saveUser = (user) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const removeUser = () => {
    window.localStorage.removeItem(STORAGE_KEY);
};
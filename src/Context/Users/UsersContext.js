"use client";
import { createContext, useState } from "react";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    const [pagination, setPagination] = useState({
        totalPages: 0,
        skip: 0,
        limit: 0,
        total: 0,
    });

    const [usersLoading, setUsersLoading] = useState(true);
    const [userStatusLoading, setUserStatusLoading] = useState(false);

    const handleUsers = (newUsers) => {
        setUsers(newUsers);
        setUsersLoading(false);
    };

    const handleUsersLoading = (isLoading) => {
        setUsersLoading(isLoading);
    };

    const updateUserStatus = (user) => {
        const updatedUsers = users.map(u =>
            u._id === user._id ? user : u
        );
        setUsers(updatedUsers);
        setUserStatusLoading(false)
    };

    return (
        <UsersContext.Provider
            value={{
                userStatusLoading,
                usersLoading,
                users,
                pagination,
                handleUsers,
                handleUsersLoading,
                setPagination,
                updateUserStatus,
                setUserStatusLoading
            }}
        >
            {children}
        </UsersContext.Provider>
    );
};

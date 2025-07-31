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

    const handleUsers = (newUsers) => {
        setUsers(newUsers);
        setUsersLoading(false);
    };

    const handleUsersLoading = (isLoading) => {
        setUsersLoading(isLoading);
    };

    return (
        <UsersContext.Provider
            value={{
                users,
                usersLoading,
                pagination,
                handleUsers,
                handleUsersLoading,
                setPagination,
            }}
        >
            {children}
        </UsersContext.Provider>
    );
};

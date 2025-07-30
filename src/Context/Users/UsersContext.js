"use client";
import { createContext, useState } from "react";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([
        {
            _id: "10",
            name: "Hanzalah Samana",
            email: "hanzalah@example.com",
            plan: "Pro",
            status: "Active",
            createdAt: "2025-06-01",
            totalStores: 1,
        },
        {
            _id: "14",
            name: "Fatima Khan",
            email: "fatima@example.com",
            plan: "Free",
            status: "Suspended",
            createdAt: "2025-05-12",
            totalStores: 2,
        },
    ]);

    const [pagination, setPagination] = useState({
        totalPages: 2,
        skip: 0,
        limit: 10,
        total: 10,
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

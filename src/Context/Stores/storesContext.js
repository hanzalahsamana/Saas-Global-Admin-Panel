"use client";
import { createContext, useState } from "react";

export const StoresContext = createContext();

export const StoresProvider = ({ children }) => {
    const [stores, setStores] = useState([
        {
            name: "Al-Haram Fabrics",
            slug: "al-haram-fabrics",
            domain: "alharam.mysaas.com",
            ownerEmail: "hanzalah@example.com",
            status: "Active",
            createdAt: "2025-05-01",
            plan: "Pro",
        },
        {
            name: "Fabrico",
            slug: "fabrico",
            domain: "fabrico.mysaas.com",
            ownerEmail: "fatima@example.com",
            status: "Suspended",
            createdAt: "2025-06-10",
            plan: "Free",
        },
    ]);

    const [pagination, setPagination] = useState({
        totalPages: 2,
        skip: 0,
        limit: 10,
        total: 10,
    });

    const [storesLoading, setStoresLoading] = useState(false);

    const handleSetStores = (storeList) => {
        setStores(storeList);
        setStoresLoading(false);
    };

    const handleSetStoresLoading = (loading) => {
        setStoresLoading(loading);
    };

    return (
        <StoresContext.Provider
            value={{
                stores,
                setStores: handleSetStores,
                storesLoading,
                setStoresLoading: handleSetStoresLoading,
                pagination,
                setPagination,
            }}
        >
            {children}
        </StoresContext.Provider>
    );
};

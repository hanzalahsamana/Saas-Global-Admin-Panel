"use client";
import { createContext, useState } from "react";

export const StoresContext = createContext();

export const StoresProvider = ({ children }) => {
    const [stores, setStores] = useState([]);

    const [pagination, setPagination] = useState({
        totalPages: 0,
        skip: 0,
        limit: 0,
        total: 0,
    });

    const [storesLoading, setStoresLoading] = useState(true);
    const [storeStatusLoading, setStoreStatusLoading] = useState(false);


    const handleSetStores = (storeList) => {
        setStores(storeList);
        setStoresLoading(false);
    };

    const handleSetStoresLoading = (loading) => {
        setStoresLoading(loading);
    };

    const updateStoreStatus = (store) => {
        const updatedStores = stores.map(s =>
            s._id === store._id ? { ...s, storeStatus: store?.storeStatus } : s
        );
        setStores(updatedStores);
        setStoreStatusLoading(false);
    };


    return (
        <StoresContext.Provider
            value={{
                stores,
                handleSetStores,
                storesLoading,
                handleSetStoresLoading,
                pagination,
                setPagination,
                updateStoreStatus,
                storeStatusLoading,
                setStoreStatusLoading
            }}
        >
            {children}
        </StoresContext.Provider>
    );
};

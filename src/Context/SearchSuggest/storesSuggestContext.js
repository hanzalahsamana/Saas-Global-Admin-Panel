"use client";
import { createContext, useState } from "react";

export const StoresSuggestContext = createContext();

export const StoresSuggestProvider = ({ children }) => {
    const [storesSuggests, setStoresSuggests] = useState([]);
    const [storesSuggestsLoading, setStoresSuggestsLoading] = useState(true);

    const handleStoresSuggests = (newUsers) => {
        setStoresSuggests(newUsers);
        setStoresSuggestsLoading(false);
    };

    return (
        <StoresSuggestContext.Provider
            value={{
                storesSuggests,
                storesSuggestsLoading,
                handleStoresSuggests,
                setStoresSuggestsLoading,
            }}
        >
            {children}
        </StoresSuggestContext.Provider>
    );
};

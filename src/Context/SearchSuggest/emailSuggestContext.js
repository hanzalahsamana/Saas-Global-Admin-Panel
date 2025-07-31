"use client";
import { createContext, useState } from "react";

export const EmailSuggestContext = createContext();

export const EmailSuggestProvider = ({ children }) => {
    const [emailSuggests, setEmailSuggests] = useState([]);
    const [emailSuggestsLoading, setEmailSuggestsLoading] = useState(true);

    const handleEmailSuggests = (newUsers) => {
        setEmailSuggests(newUsers);
        setEmailSuggestsLoading(false);
    };

    const handleEmailSuggestLoading = (isLoading) => {
        setEmailSuggestsLoading(isLoading);
    };

    return (
        <EmailSuggestContext.Provider
            value={{
                emailSuggests,
                emailSuggestsLoading,
                handleEmailSuggests,
                handleEmailSuggestLoading,
            }}
        >
            {children}
        </EmailSuggestContext.Provider>
    );
};

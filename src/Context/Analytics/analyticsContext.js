"use client";
import { createContext, useState } from "react";

export const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
    const [analytics, setAnalytics] = useState({});
    const [analyticsLoading, setAnalyticsLoading] = useState(true);

    const handleAnalytics = (data) => {
        setAnalytics(data);
        setAnalyticsLoading(false);
    };

    const handleAnalyticsLoading = (loading) => {
        setAnalyticsLoading(loading);
    };

    return (
        <AnalyticsContext.Provider
            value={{
                analytics,
                analyticsLoading,
                handleAnalytics,
                handleAnalyticsLoading,
            }}
        >
            {children}
        </AnalyticsContext.Provider>
    );
};

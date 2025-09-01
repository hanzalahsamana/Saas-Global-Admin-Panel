"use client";
import { createContext, useState } from "react";

export const SubscriptionsContext = createContext();

export const SubscriptionsProvider = ({ children }) => {
    const [subscriptions, setSubscriptions] = useState([]);

    const [pagination, setPagination] = useState({
        totalPages: 2,
        skip: 0,
        limit: 10,
        total: 10,
    });

    const [subscriptionLoading, setSubscriptionsLoading] = useState(false);
    const [subsStatusLoading, setSubsStatusLoading] = useState(false);

    const handleSetSubscription = (data) => {
        setSubscriptions(data.subscriptions);
        setPagination(data.pagination);
        setSubscriptionsLoading(false);
    };

    const updateSubsStatus = (subscription) => {
        const updatedSubscriptions = subscriptions.map(s =>
            s._id === subscription._id ? { ...s, status: subscription?.status } : s
        );
        setSubscriptions(updatedSubscriptions);
        setSubsStatusLoading(false);
    };

    return (
        <SubscriptionsContext.Provider
            value={{
                subscriptions,
                handleSetSubscription,
                subscriptionLoading,
                setSubscriptionsLoading,
                pagination,
                updateSubsStatus,
                setSubsStatusLoading,
                subsStatusLoading
            }}
        >
            {children}
        </SubscriptionsContext.Provider>
    );
};

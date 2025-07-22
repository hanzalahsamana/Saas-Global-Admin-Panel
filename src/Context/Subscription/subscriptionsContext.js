"use client";
import { createContext, useState } from "react";

export const SubscriptionsContext = createContext();

export const SubscriptionsProvider = ({ children }) => {
    const [subscriptions, setSubscriptions] = useState([
        {
            userName: "Hanzalah Samana",
            storeName: "Store 1",
            plan: "Basic",
            paymentStatus: "Paid",
            billingCycle: "Monthly",
            amountPaid: "PKR 2,500",
            trialStart: "2025-06-01",
            trialEnd: "2025-06-08",
            subscriptionId: "sub_123456789",
        },
        {
            userName: "Fatima Khan",
            storeName: "Store 2",
            plan: "Premium",
            paymentStatus: "Trial",
            billingCycle: "Monthly",
            amountPaid: "PKR 0",
            trialStart: "2025-07-01",
            trialEnd: "2025-07-08",
            subscriptionId: "trial_987654321",
        },
        {
            userName: "Ali Raza",
            storeName: "Store 3",
            plan: "Advance",
            paymentStatus: "Failed",
            billingCycle: "Annual",
            amountPaid: "PKR 80,000",
            trialStart: "-",
            trialEnd: "-",
            subscriptionId: "sub_77777777", 
        },
    ]);

    const [pagination, setPagination] = useState({
        totalPages: 2,
        skip: 0,
        limit: 10,
        total: 10,
    });

    const [subscriptionLoading, setSubscriptionsLoading] = useState(false);

    const handleSetSubscription = (data) => {
        setSubscriptions(data.subscriptions);
        setPagination(data.pagination);
        setSubscriptionsLoading(false);
    };

    return (
        <SubscriptionsContext.Provider
            value={{
                subscriptions,
                setSubscriptions: handleSetSubscription,
                subscriptionLoading,
                setSubscriptionsLoading,
                pagination,
            }}
        >
            {children}
        </SubscriptionsContext.Provider>
    );
};

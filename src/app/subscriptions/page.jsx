"use client";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import Table from "@/Components/Tables/Table";
import React from "react";

const subscriptions = [
  {
    userName: "Hanzalah Samana",
    plan: "Pro",
    paymentStatus: "Paid",
    billingCycle: "Monthly",
    amountPaid: "PKR 2,500",
    trialStart: "2025-06-01",
    trialEnd: "2025-06-08",
    subscriptionId: "sub_123456789",
  },
  {
    userName: "Fatima Khan",
    plan: "Free Trial",
    paymentStatus: "Trial",
    billingCycle: "Monthly",
    amountPaid: "PKR 0",
    trialStart: "2025-07-01",
    trialEnd: "2025-07-08",
    subscriptionId: "trial_987654321",
  },
  {
    userName: "Ali Raza",
    plan: "Enterprise",
    paymentStatus: "Failed",
    billingCycle: "Annual",
    amountPaid: "PKR 80,000",
    trialStart: "-",
    trialEnd: "-",
    subscriptionId: "sub_77777777",
  },
];

const Subscriptions = () => {
  const columns = [
    "userName",
    "plan",
    "paymentStatus",
    "billingCycle",
    "amountPaid",
    "trialStart",
    "trialEnd",
    "subscriptionId",
  ];

  const actions = [
    {
      label: "Cancel",
      onClick: (row) => {
        console.log("Cancel subscription:", row.subscriptionId);
      },
    },
  ];

  const paymentStatusRenderer = ({ value }) => {
    const colorMap = {
      Paid: "bg-green-100 text-green-700",
      Trial: "bg-yellow-100 text-yellow-700",
      Failed: "bg-red-100 text-red-600",
    };

    return (
      <span
        className={`text-xs px-2 py-1 rounded-full font-medium ${
          colorMap[value] || "bg-gray-100 text-gray-600"
        }`}
      >
        {value}
      </span>
    );
  };

  return (
    <div className="p-6 space-y-4">
      <Table
        columns={columns}
        data={subscriptions}
        actions={actions}
        renderers={{ paymentStatus: paymentStatusRenderer }}
      />
    </div>
  );
};

export default ProtectedRoute(Subscriptions);

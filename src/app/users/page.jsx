"use client";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import Table from "@/Components/Tables/Table";
import React from "react";
import { useRouter } from "next/navigation";
import { FcBusinessman } from "react-icons/fc";

const Users = () => {
  const router = useRouter();

  const columns = [
    "name",
    "email",
    "store",
    "plan",
    "status",
    "signupDate",
    "lastLogin",
    "totalStores",
  ];

  const users = [
    {
      _id: "10",
      name: "Hanzalah Samana",
      email: "hanzalah@example.com",
      store: "al-haram-fabrics",
      plan: "Pro",
      status: "Active",
      signupDate: "2025-06-01",
      lastLogin: "2025-07-09",
      totalStores: 1,
    },
    {
      _id: "14",
      name: "Fatima Khan",
      email: "fatima@example.com",
      store: "fabrico",
      plan: "Free",
      status: "Suspended",
      signupDate: "2025-05-12",
      lastLogin: "2025-06-30",
      totalStores: 2,
    },
  ];

  const actions = [
    {
      label: "View",
      onClick: (user) => router.push(`/users/${user._id}`),
    },
    {
      label: "Suspended",
      onClick: (user) => console.log("Suspend:", user),
    },
  ];
  const statusRenderer = ({ value }) => {
    const statusColors = {
      Active: "bg-green-100 text-green-700",
      Suspended: "bg-red-100 text-red-600",
      Inactive: "bg-yellow-100 text-yellow-600",
    };

    return (
      <span
        className={`text-xs px-2 py-1 rounded-full font-medium ${
          statusColors[value] || "bg-gray-100 text-gray-600"
        }`}
      >
        {value}
      </span>
    );
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="font-semibold flex items-end gap-x-2">
        <FcBusinessman size={35} /> Users
      </h1>
      <Table
        columns={columns}
        data={users}
        actions={actions}
        renderers={{
          status: statusRenderer, 
        }}
      />
    </div>
  );
};

export default ProtectedRoute(Users);

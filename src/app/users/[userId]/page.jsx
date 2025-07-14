"use client";

import React from "react";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import { FiMail, FiUser } from "react-icons/fi";
import { MdOutlineCalendarToday } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import Table from "@/Components/Tables/Table";
import { FcBusinessman, FcShop } from "react-icons/fc";

const dummyUsers = [
  {
    _id: "10",
    name: "Hanzalah Samana",
    email: "hanzalah@example.com",
    status: "Active",
    signupDate: "2025-06-01",
    lastLogin: "2025-07-08",
    plan: "Pro",
    stores: [
      {
        id: "store001",
        name: "Al-Haram Fabrics",
        domain: "alharam.mysaas.com",
        status: "Active",
      },
      {
        id: "store002",
        name: "HanzTech",
        domain: "hanztech.mysaas.com",
        status: "Suspended",
      },
      {
        id: "store0010",
        name: "HanzTech",
        domain: "hanztech.mysaas.com",
        status: "Suspended",
      },
    ],
  },
  {
    _id: "14",
    name: "Fatima Khan",
    email: "fatima@example.com",
    status: "Suspended",
    signupDate: "2025-05-12",
    lastLogin: "2025-06-30",
    plan: "Free",
    stores: [
      {
        id: "store001",
        name: "Al-Haram Fabrics",
        domain: "alharam.mysaas.com",
        status: "Active",
      },
      {
        id: "store004",
        name: "djiel",
        domain: "hanjlkdeztech.mysaas.com",
        status: "Suspended",
      },
    ],
  },
];

const UserDetails = () => {
  const { userId } = useParams();
  const user = dummyUsers.find((u) => u._id === userId);

  if (!user) {
    return (
      <div className="p-6 text-black h-[calc(100vh-50px)] flex justify-center items-center text-2xl  font-semibold">
        User not found
      </div>
    );
  }

  const storeColumns = ["id", "name", "domain", "status"];
  const storeData = user.stores.map((s) => ({
    id: s.id,
    name: s.name,
    domain: s.domain,
    status: s.status,
  }));

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
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="rounded-xl bg-(--primaryC) p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex gap-x-2 items-center mb-2">
            <FcBusinessman size={35} />
            <h1 className="text-2xl font-bold text-(--secondaryC)">
              User Detail
            </h1>
          </div>
          <p className="text-sm text-(--secondaryC)">
            Comprehensive user information
          </p>
        </div>
        <span
          className={`text-xs px-4 py-1 rounded-full font-medium ${
            user.status === "Active"
              ? "bg-green-200 text-green-800"
              : user.status === "Suspended"
              ? "bg-red-200 text-red-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {user.status}
        </span>
      </div>

      {/* User Info Card */}
      <div className="bg-white/60 backdrop-blur rounded-xl border border-gray-100 p-6 shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <FiUser className="text-(--accentC)" />
            <span className="font-medium">Name:</span> {user.name}
          </div>
          <div className="flex items-center gap-2">
            <FiMail className="text-(--accentC)" />
            <span className="font-medium">Email:</span> {user.email}
          </div>
          <div className="flex items-center gap-2">
            <MdOutlineCalendarToday className="text-(--accentC)" />
            <span className="font-medium">Signup Date:</span> {user.signupDate}
          </div>
          <div className="flex items-center gap-2">
            <MdOutlineCalendarToday className="text-(--accentC)" />
            <span className="font-medium">Last Login:</span> {user.lastLogin}
          </div>
          <div className="flex items-center gap-2">
            <BsBoxSeam className="text-(--accentC)" />
            <span className="font-medium">Plan:</span> {user.plan}
          </div>
        </div>
      </div>

      {/* Store Table */}
      <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
        <div className="flex items-center gap-x-2  mb-4">
          <FcShop size={25} />
          <h2 className="text-lg font-semibold text-gray-800">
            User's Stores ({user.stores.length})
          </h2>
        </div>
        {storeData.length > 0 ? (
          <Table
            columns={storeColumns}
            data={storeData}
            renderers={{
              status: statusRenderer,
            }}
          />
        ) : (
          <p className="text-gray-400 italic">No stores found.</p>
        )}
      </div>
    </div>
  );
};

export default ProtectedRoute(UserDetails);

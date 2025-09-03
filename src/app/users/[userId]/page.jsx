"use client";

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import { FiMail, FiUser } from "react-icons/fi";
import { MdOutlineCalendarToday } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import Table from "@/Components/Tables/Table";
import { FcBusinessman, FcShop } from "react-icons/fc";
import { UsersContext } from "@/Context/Users/UsersContext";
import { fetchUsers } from "@/API/user/getUsers";
import { AuthContext } from "@/Context/Authentication/AuthContext";
import Loader from "@/Components/Loader/loader";
import ConfirmationModal from "@/Components/Modals/ConfirmationModal";
import { toggleUserStatus } from "@/API/user/toggleUserStatus";

const storeColumns = [
  { key: "_id", label: "Store Id" },
  { key: "storeName", label: "Store Name" },
  { key: "storeStatus", label: "Store Status" },
  { key: "subscriptionStatus", label: "Subscription Status" },
  { key: "plan", label: "Plan" },
  { key: "createdAt", label: "Created At" },
];

const statusRenderer = ({ value }) => {
  console.log("value", value);
  const statusColors = {
    Active: "bg-green-100 text-green-700",
    Suspended: "bg-red-100 text-red-600",
  };

  return (
    <span
      className={`text-xs px-4 py-1 rounded-sm font-medium ${
        statusColors[value] || "bg-gray-100 text-gray-600"
      }`}
    >
      {value}
    </span>
  );
};

const UserDetails = () => {
  const { userId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const { token } = currentUser;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const {
    userStatusLoading,
    usersLoading,
    users,
    handleUsers,
    handleUsersLoading,
    setPagination,
    updateUserStatus,
    setUserStatusLoading,
  } = useContext(UsersContext);
  const user = users.find((u) => u._id === userId);

  useEffect(() => {
    const getUsers = async () => {
      await fetchUsers(
        token,
        handleUsersLoading,
        setPagination,
        handleUsers,
        {}
      );
    };
    if (users?.length === 0) {
      getUsers();
    }
  }, []);

  if (usersLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-50px)]">
        <Loader />
      </div>
    );
  }

  if (!user && !usersLoading) {
    return (
      <div className="p-6 text-black h-[calc(100vh-50px)] flex justify-center items-center text-2xl  font-semibold">
        User not found
      </div>
    );
  }

  const storeData = user?.stores?.map((s) => ({
    _id: s._id,
    storeName: s.storeName,
    storeStatus: s.storeStatus,
    subscriptionStatus: s.subscriptionStatus,
    plan: s.plan,
    createdAt: s.createdAt.split("T")[0],
  }));

  const handleStatusChange = async () => {
    if (selectedUser?._id && isModalOpen) {
      await toggleUserStatus(
        token,
        selectedUser?._id,
        updateUserStatus,
        setUserStatusLoading
      );
      setIsModalOpen(false);
    }
  };
  return (
    <>
      {!usersLoading && (
        <div className="p-6 space-y-8">
          {/* Header */}
          <div className="rounded-xl bg-(--primaryC) p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-(--secondaryC)">
                User Detail
              </h1>
              <p className="text-sm text-(--secondaryC)">
                Comprehensive user information
              </p>
            </div>
            <div className="flex flex-col gap-y-4 justify-end items-end">
              <span
                onClick={() => {
                  setIsModalOpen(true);
                  setSelectedUser(user);
                }}
                className={`text-xs cursor-pointer px-4 py-1 rounded-full font-medium ${
                  user.status === "Active"
                    ? "bg-green-200 text-green-800"
                    : user.status === "Suspended"
                    ? "bg-red-200 text-red-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {user.status}
              </span>
              <div className="flex items-center gap-2">
                <FiMail className="text-(--accentC)" />
                <span className="text-secondaryC">
                  Email: {user.email}
                </span>{" "}
              </div>
              <div className="flex items-center gap-2">
                <MdOutlineCalendarToday className="text-(--accentC)" />
                <span className="text-secondaryC">
                  Signup Date: {user.createdAt.split("T")[0]}
                </span>{" "}
              </div>
            </div>
          </div>

          {/* User Info Card */}
          {/* <div className="bg-white/60 backdrop-blur rounded-xl border border-gray-100 p-6 shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <FiMail className="text-(--accentC)" />
            <span className="font-medium">Email:</span> {user.email}
          </div>
          <div className="flex items-center gap-2">
            <MdOutlineCalendarToday className="text-(--accentC)" />
            <span className="font-medium">Signup Date:</span>{" "}
            {user.createdAt.split("T")[0]}
          </div>
        </div>
      </div> */}

          {/* Store Table */}
          <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              User's Stores ({user?.stores?.length})
            </h2>
            {storeData.length > 0 ? (
              <Table
                columns={storeColumns}
                data={storeData}
                renderers={{
                  storeStatus: statusRenderer,
                }}
                loading={usersLoading}
              />
            ) : (
              <p className="text-gray-400 italic">No stores found.</p>
            )}
          </div>
          <ConfirmationModal
            show={isModalOpen}
            onHide={() => setIsModalOpen(false)}
            content={`You want to ${
              selectedUser?.status === "Active" ? "Suspend" : "Active"
            } this user`}
            heading={"Confirm Please"}
            contentHeading="Are you sure?"
            handleConfirm={handleStatusChange}
            loading={userStatusLoading}
          />
        </div>
      )}
    </>
  );
};

export default ProtectedRoute(UserDetails);

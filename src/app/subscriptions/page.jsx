"use client";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import React from "react";

const Subscriptions = () => {
  return <div className="p-6">Subscriptions</div>;
};

export default ProtectedRoute(Subscriptions);

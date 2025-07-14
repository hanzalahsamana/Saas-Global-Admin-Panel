"use client";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import React from "react";

const EmailBroadcast = () => {
  return <div className="p-6">EmailBroadcast</div>;
};

export default ProtectedRoute(EmailBroadcast);
"use client";

import { setCurrentUser } from "@/Redux/Authentication/AuthSlice";
import { dispatch } from "@/Redux/Store";
import { useEffect } from "react";

// This is for Only Redux Access
const ReduxProviderWrap = ({ children }) => {
  // Enable it When Apis Is Ready

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch(setCurrentUser(user));
  }, []);

  return children;
};

export default ReduxProviderWrap;

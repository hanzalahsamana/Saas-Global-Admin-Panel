"use client";
import { setCurrentUser } from "@/Redux/Authentication/AuthSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// This is for Only Redux Access
const ReduxProviderWrap = ({ children }) => {
  // Enable it When Apis Is Ready

  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch(setCurrentUser(user));
  }, []);

  return children;
};

export default ReduxProviderWrap;

"use client";
import { setCurrentUser, setLoading } from "@/Redux/Authentication/AuthSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// This is for Only Redux Access
const ReduxProviderWrap = ({ children }) => {
  // Enable it When Apis Is Ready
  const { currentUser, userLoading } = useSelector(
    (state) => state.currentUser
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      dispatch(setLoading(false));
    } else {
      dispatch(setCurrentUser(user));
    }
  }, [dispatch]);

  useEffect(() => {
    console.log("userLoading", userLoading);
  }, [userLoading]);

  return children;
};

export default ReduxProviderWrap;

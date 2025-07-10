"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: true,
};

export const currentDataSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload))
      state.loading = false
      return state;
    },
    setLogout: (state) => {
      state.currentUser = null;
      localStorage.clear();
      state.loading = false;
      return state;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
      return state;
    },
  },
});

export const { setCurrentUser, setLogout, setLoading } =
  currentDataSlice.actions;

export default currentDataSlice.reducer;

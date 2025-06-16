"use client";

// This is for Only Redux Access
const ReduxProviderWrap = ({ children }) => {

  //Enable it When Apis Is Ready

  // useEffect(() => {
  //   const userToken = localStorage.getItem("userToken");
  //   getUserFromToken(userToken);
  // }, []);

  return children;
};

export default ReduxProviderWrap;
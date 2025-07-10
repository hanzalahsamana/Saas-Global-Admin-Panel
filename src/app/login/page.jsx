"use client";
import UnProtectedRoute from "@/AuthenticRouting/UnProtectedRoutes";
import FormikForm from "@/Components/Forms/Form";
import FormInput from "@/Components/Forms/FormInput";
import { setCurrentUser } from "@/Redux/Authentication/AuthSlice";
import { dispatch } from "@/Redux/Store";
import { loginValidation } from "@/Utils/Validations/loginFormValidate";
import React from "react";
import { useSelector } from "react-redux";

const Login = () => {
  const { currentUser } = useSelector((state) => state.currentUser);
  console.log("currentUser", currentUser);
  const initialValues = {
    email: "hello@gmail.com",
    password: "123456",
  };

  const handleSubmit = async (values) => {
    console.log("login form values", values);

    dispatch(setCurrentUser(values));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 border border-gray-200">
        <h1 className=" font-bold text-center mb-6">Login</h1>

        <FormikForm
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          validationSchema={loginValidation}
          buttonLabel="Hello"
        >
          <FormInput
            name="email"
            type="email"
            className="!mt-8"
            size="large"
            placeholder="Email"
          />
          <FormInput
            name="password"
            type="password"
            className="!mt-8"
            size="large"
            placeholder="Password"
          />
        </FormikForm>

        <p className="text-sm text-center text-gray-500 mt-6">
          &copy; {new Date().getFullYear()} My Admin Panel
        </p>
      </div>
    </div>
  );
};

export default UnProtectedRoute(Login);

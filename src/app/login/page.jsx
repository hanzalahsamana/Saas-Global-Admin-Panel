"use client";
import { loginUser } from "@/API/Auth/login";
import UnProtectedRoute from "@/AuthenticRouting/UnProtectedRoutes";
import FormikForm from "@/Components/Forms/Form";
import FormInput from "@/Components/Forms/FormInput";
import { AuthContext } from "@/Context/Authentication/AuthContext";
import { loginValidation } from "@/Utils/Validations/loginFormValidate";
import React, { useContext } from "react";

const Login = () => {
  const { login, userLoading } = useContext(AuthContext);
  const initialValues = {
    email: "",
    password: "",
  };
  const handleSubmit = async (values) => {
    await loginUser(values, login);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-(--primaryC) px-4">
      <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-md shadow-gray-400 ">
        <h1 className="font-bold text-center mb-6 text-3xl">Login</h1>
        <FormikForm
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          validationSchema={loginValidation}
          buttonLabel="Login"
          loading={userLoading}
        >
          <FormInput
            name="email"
            type="email"
            size="large"
            placeholder="Email"
          />
          <FormInput
            name="password"
            type="password"
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

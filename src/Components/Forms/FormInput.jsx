"use client";

import React from "react";
import "../../Styles/globals.css";
import { ErrorMessage, Field, useField } from "formik";

const FormInput = ({
  name,
  placeholder = "Enter text",
  type = "text",
  readOnly = false,
  disabled = false,
  required = true,
  className = "",
  actionIcon = null,
  size = "small", // "small" or "large"
  layout = "floating", // "floating" or "label"
  label = "Name",
  autocomplete = "off", // "on" or "off"
}) => {
  const [field, meta] = useField(name);
  const inputSizeClass = size === "small" ? "text-sm h-9" : "text-base h-11";
  const isFilled = field.value !== "" && field.value !== undefined;
  const error = meta.touched && meta.error;

  return (
    <div className="relative w-full ">
      {layout === "label" && (
        <label className="text-[14px] font-medium text-(--textC) mb-1 block">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <div className="relative w-full">
        <Field
          id={name}
          type={type}
          name={name}
          readOnly={readOnly}
          disabled={disabled}
          autoComplete={autocomplete}
          placeholder={layout !== "floating" ? placeholder : ""}
          className={`Inputs  placeholder:text-sm   placeholder:text-[#b9b9b9] shadow-[inset_0_0px_6px_0_rgb(0_0_0_/_0.02)] px-3 text-(--textTC)  flex items-center border-[1.3px] w-full rounded-[4px] bg-white ${inputSizeClass} ${
            error ? "border-red-500" : "border-gray-300 focus:border-[#297ed9]"
          } ${className} outline-none`}
        />
        {actionIcon && (
          <div
            className={`absolute right-3 ${
              size === "large" ? "bottom-[32px]" : "bottom-[28px]"
            } transform -translate-y-1/2`}
          >
            {actionIcon}
          </div>
        )}
        {layout === "floating" && (
          <label
            className={`absolute left-3 px-1 bg-white transition-all text-[#b9b9b9] ${
              isFilled || isFilled === 0
                ? "top-[-10px] text-xs"
                : `${
                    size === "large"
                      ? "top-[10px] text-base"
                      : "top-[8px] text-sm"
                  }`
            } pointer-events-none`}
          >
            {placeholder}
            {required && <span className="text-red-500"> *</span>}
          </label>
        )}
      </div>
      <div className="mt-2 ">
        <ErrorMessage
          name={name}
          component="div"
          className="text-red-500 text-[13px]"
        />
      </div>
    </div>
  );
};

export default FormInput;

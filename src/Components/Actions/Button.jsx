"use client";

import React from "react";
import ButtonLoader from "../Loader/ButtonLoader";

const Button = ({
  type = "button",
  label = "Click",
  className = "",
  loading = false,
  size = "small",
  variant = "primary", // Added variant prop
  action = () => {},
  active = true,
  icon = null,
  iconPosition = "left",
  iconOnHover = false,
}) => {
  // Define button styles based on variant
  const buttonStyles = {
    outline:
      "border !border-(--primaryC) text-(--primaryC) bg-transparent  leading-[calc(1em)]",
    primary:
      "bg-(--primaryC) text-(--secondaryC)",
    danger: "bg-red-600 text-(--backgroundC) shadow-[inset_0_-3.2px_#991b1b]",
    black: "bg-[#424242] text-(--backgroundC) shadow-[inset_0_-3.2px_#000000]",
    white:
      "bg-(--secondaryC) border text-(--textC) !border-(--borderC)",
    warning: "bg-[#FA9A1F] text-white shadow-[inset_0_-3.2px_#b45309]",
    text: "bg-transparent text-(--primaryC) py-0 px-[5px]",
  };
  const buttonSizes = {
    large: "text-[16px] h-[42px] px-[10px] min-w-[150px] ",
    small: "text-[14px] py-[8px] px-[20px] w-max",
  };

  return (
    <button
      onClick={action}
      disabled={loading || !active}
      type={type}
      className={`group w-full cursor-pointer disabled:cursor-not-allowed  inline-flex items-center justify-center rounded-[4px] transition-all duration-300 ease-in-out
    ${buttonSizes[size]}
    ${
      loading || !active
        ? "cursor-not-allowed text-[#4f4c4c89] !bg-[#c5c5c589]"
        : buttonStyles[variant] || buttonStyles.primary
    } 
    ${className}
    `}
    >
      {loading ? (
        <ButtonLoader />
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span
              className={`
            flex-none 
            transition-all duration-300 
            overflow-hidden
            ${
              iconOnHover
                ? "opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-6"
                : "opacity-100 max-w-6"
            }
          `}
              style={{ transitionProperty: "opacity, max-width" }}
            >
              <span className="pr-2 flex items-center">{icon}</span>
            </span>
          )}

          <span className="whitespace-nowrap">{label}</span>

          {icon && iconPosition === "right" && (
            <span
              className={`
            flex-none 
            transition-all duration-200 
            overflow-hidden
            ${
              iconOnHover
                ? "opacity-0 max-w-0 group-hover:opacity-100  group-hover:max-w-6 "
                : "opacity-100 max-w-6"
            }
          `}
              style={{ transitionProperty: "opacity, max-width" }}
            >
              <span className="pl-2 flex items-center">{icon}</span>
            </span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;

import { ErrorMessage, useField } from "formik";
import React from "react";

const FormTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-6">
      {label && (
        <label className="block mb-1 font-medium text-sm text-(--textTC)">
          {label}
        </label>
      )}
      <textarea
        {...field}
        {...props}
        className={`w-full px-4 py-2 border rounded-lg outline-none  ${
          meta.touched && meta.error
            ? "border-red-500"
            : "border-gray-300 focus:border-(--accentC)"
        }`}
      />
      <div className="mt-2 ">
        <ErrorMessage
          name={field?.name}
          component="div"
          className="text-red-500 text-[13px]"
        />
      </div>
    </div>
  );
};

export default FormTextArea;

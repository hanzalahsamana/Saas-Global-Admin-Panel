import React from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";

const FormDropdown = ({ label, name, options = [] }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <div className="mb-6">
      {label && (
        <label className="block mb-1 font-medium text-sm text-(--textTC)">
          {label}
        </label>
      )}
      <select
        {...field}
        onChange={(e) => setFieldValue(name, e.target.value)}
        className={`w-full px-4 py-2 border rounded-lg outline-none  ${
          meta.touched && meta.error
            ? "border-red-500"
            : "border-gray-300 focus:border-(--accentC)"
        }`}
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
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

export default FormDropdown;

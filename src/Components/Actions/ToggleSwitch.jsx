import React from "react";
import { useFormikContext } from "formik";

const ToggleSwitch = ({ label, value, onChange }) => {
  const checked = value;

  return (
    <div className="flex items-center space-x-3">
      <label className="font-medium text-gray-700">{label}</label>
      <button
        type="button"
        onClick={() => {
          onChange();
        }}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? "bg-(--accentC)" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;

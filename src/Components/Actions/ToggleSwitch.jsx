import React from "react";
const ToggleSwitch = ({ label, value, onChange }) => {
  const checked = value;

  return (
    <div className="flex items-center space-x-3 cursor-pointer ">
      <label className="font-medium text-gray-700">{label}</label>
      <button
        type="button"
        onClick={() => {
          onChange();
        }}
        className={`relative inline-flex cursor-pointer h-4 w-8 items-center rounded-full transition-colors ${
          checked ? "bg-(--accentC)" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-2 w-2 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;

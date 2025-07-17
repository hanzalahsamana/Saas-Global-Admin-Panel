// import React, { useRef } from "react";
import { IoChevronDown } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { useRef, useState } from "react";
import useOutsideClick from "@/Utils/hooks/useOutSideClick";

export function CustomDropdown({
  dropdownData,
  dropdownHeading,
  handleClick,
  icon = true,
}) {
  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  return (
    <div ref={dropdownRef} className="min-w-full md:min-w-[200px] select-none">
      <div className="relative">
        <div
          onClick={() => toggleDropdown()}
          className="bg-white cursor-pointer h-[36px] px-4 w-[100%] border border-(--borderC) flex items-center gap-x-1 justify-between"
        >
          <div className="flex items-center gap-x-1">
            {icon && (
              <div className="text-darkTextC text-lg">
                <CiFilter size={18} />
              </div>
            )}
            <p className="text-darkTextC whitespace-nowrap capitalize">
              {dropdownHeading}
            </p>
          </div>
          <div
            className={`text-darkTextC text-lg ${
              !isDropdownOpen ? "rotate-0" : "rotate-[-180deg]"
            } transition-all duration-200 ease-out`}
          >
            <IoChevronDown />
          </div>
        </div>
        {isDropdownOpen && (
          <div className="absolute top-9 w-[100%] z-10 max-h-[150px] overflow-auto custom-scrollbar rouded-br-sm bg-white shadow-sm border-b border-r border-l border-(--borderC)">
            {dropdownData.length > 0 &&
              dropdownData.map((item, index) => {
                const itemValue = item?.name || item;
                if (itemValue === dropdownHeading) return null;
                return (
                  <div
                    key={index}
                    onClick={() => {
                      handleClick(itemValue);
                      setIsDropdownOpen(false);
                    }}
                    className={`flex item-center hover:bg-[#F9FAFB] cursor-pointer gap-x-1 px-4 py-2 `}
                  >
                    {item?.icon && (
                      <div
                        className={`text-lg w-[20px] h-[20px] flex items-center text-darkTextC`}
                      >
                        {item?.icon}
                      </div>
                    )}
                    <p className="leading-5 text-md capitalize text-darkTextC">
                      {itemValue}
                    </p>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

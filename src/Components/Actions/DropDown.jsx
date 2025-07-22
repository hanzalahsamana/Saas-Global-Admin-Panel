import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { CiFilter } from "react-icons/ci";
import { HiOutlineChevronDown } from "react-icons/hi2";
import { IoChevronDownOutline } from "react-icons/io5";

export default function CustomDropdown({
  dropdownData,
  dropdownHeading,
  handleClick,
  position = "bottom end",
}) {
  return (
    <div className="relative inline-block text-left h-full">
      <Menu>
        <MenuButton className="inline-flex cursor-pointer h-full transition-all duration-200 ease-linear hover:border-accentC items-center justify-between gap-x-6 border border-borderC min-w-[120px] px-2 rounded bg-white py-[6px] outline-none">
          <div className="flex items-center gap-x-[2px]">
            <CiFilter className="text-textC text-[17px] font-normal " />
            <p className="capitalize text-textC text-sm font-medium">
              {dropdownHeading}
            </p>
          </div>
          <IoChevronDownOutline className="text-textTC text-sm font-normal mt-[2px]" />
        </MenuButton>
        <MenuItems
          anchor={position}
          transition
          className="origin-top transition min-w-[120px] [--anchor-gap:8px] duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 outline-none bg-white border border-borderC rounded-md shadow-md p-1"
        >
          {dropdownData?.map((item, index) => {
            if (item.label.toLowerCase() === dropdownHeading.toLowerCase())
              return;

            return (
              <div key={index}>
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={() => handleClick(item.value)}
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } block w-full text-left px-4 py-2 !text-sm cursor-pointer rounded`}
                    >
                      {item.label}
                    </button>
                  )}
                </MenuItem>
              </div>
            );
          })}
        </MenuItems>
      </Menu>
    </div>
  );
}

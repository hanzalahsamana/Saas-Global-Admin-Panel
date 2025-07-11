import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { CiHome } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { LuMenu } from "react-icons/lu";
import Button from "@/Components/Actions/Button";
import { GoChevronDown } from "react-icons/go";
import { logoutUser } from "@/Redux/Authentication/AuthSlice";
import { dispatch } from "@/Redux/Store";
import { useRouter } from "next/navigation";

const Header = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.currentUser);
  const router = useRouter();
  const dropDownData = [
    { name: "Home", icon: <CiHome />, iconColor: "text-primaryC", href: "/" },
    {
      name: "Profile",
      icon: <CiUser />,
      iconColor: "text-green-500",
      href: "/user-profile",
    },
    {
      name: "Logout",
      icon: <CiLogout />,
      iconColor: "text-red-500",
      href: "/",
    },
  ];
  return (
    <header className=" h-[50px] sticky shadow-lg top-0 bg-(--primaryC) z-20 w-full">
      <div className="h-[100%] flex justify-between items-center w-full">
        {/* <div className="flex-row gap-x-6 flex items-center w-[20%]"> */}
        {/* toggle sidebar button  */}
        <Button
          variant="text"
          className="h-[100%] w-full !text-xl text-white !rounded-none"
          action={toggleSidebar}
          label={<LuMenu />}
        />
        {/* </div> */}

        <div className="relative flex justify-center items-center h-full w-max px-4">
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="h-full gap-x-2 flex items-center cursor-pointer select-none focus:outline-none text-white font-semibold text-lg"
          >
            <span className="leading-normal ">{currentUser?.email}</span>
            <div
              className={`${
                !dropdownOpen ? "rotate-[-90deg]" : "rotate-0"
              } transition-all duration-200 ease-linear mt-1`}
            >
              <GoChevronDown />
            </div>
          </div>
          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute top-10 right-4 mt-1 w-40 bg-[#ffffff] cursor-pointer text-darkTextC rounded-lg z-10 shadow-lg">
              {dropDownData.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <div
                      className={`flex items-center text-black gap-x-2 px-4 py-3  hover:bg-[#F9FAFB] ${
                        index === 0
                          ? "rounded-se-lg rounded-ss-lg"
                          : index === dropDownData.length - 1 &&
                            "rounded-ee-lg rounded-es-lg"
                      }`}
                      onClick={() => {
                        index === dropDownData.length - 1 &&
                          dispatch(logoutUser());
                        router.push(item.href);
                      }}
                    >
                      <div className={`${item.iconColor}`}>{item.icon}</div>
                      <p>{item.name}</p>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

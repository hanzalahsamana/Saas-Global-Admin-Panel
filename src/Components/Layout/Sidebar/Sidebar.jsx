"use client";
import { Fragment, useEffect } from "react";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { BsArrowRightShort, BsShop } from "react-icons/bs";
import { MdDashboard, MdSpaceDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { BiSolidStore } from "react-icons/bi";
import { PiContactlessPaymentFill } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
import { IoMdSettings } from "react-icons/io";
import { Tooltip } from "react-tooltip";

const sideBarTabs = [
  {
    label: "Dashboard",
    icon: <MdDashboard />,
    href: "/",
  },
  {
    label: "Users",
    icon: <FaUser size={23} />,
    href: "/users",
  },
  {
    label: "Stores",
    icon: <BiSolidStore />,
    href: "/stores",
  },
  {
    label: "Subscriptions",
    icon: <PiContactlessPaymentFill />,
    href: "/subscriptions",
  },
  {
    label: "Email Broadcast",
    icon: <MdEmail />,
    href: "/email-broadcast",
  },
  {
    label: "Analytics",
    icon: <SiGoogleanalytics />,
    href: "/subscriptions/",
  },
  // {
  //   label: "Support",
  //   icon: <BiSupport />,
  //   href: "/subscriptions/",
  // },
  {
    label: "Settings",
    icon: <IoMdSettings />,
    href: "/subscriptions/",
  },
];

function Sidebar({ isOpen, setIsOpen }) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsOpen(false);
      } else {
        setIsOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const pathname = usePathname();

  return (
    <Fragment>
      <div
        className={`bg-primaryC overflow-hidden h-[calc(100vh-50px)] lg:h-[100vh] absolute inset-y-0 top-[50px] lg:top-0 left-0 lg:pt-0 transition-all duration-100 ease-out z-10 ${
          isOpen ? "w-[230px] px-1" : "w-[0px] lg:w-[65px] lg:px-1"
        }`}
      >
        <div
          className={`w-[100%] h-[50px] overflow-hidden max-h-[50px] items-end gap-x-2 mb-4`}
        >
          <p
            className={`w-[60px] h-[100%] object-contain text-secondaryC font-bold text-xl ${
              !isOpen ? "lg:flex justify-center items-center hidden" : "hidden"
            }`}
          >
            MT
          </p>
          <p
            className={`w-[60%] h-[100%] pl-4 font-bold text-xl object-contain mb-3 text-secondaryC whitespace-nowrap ${
              isOpen ? "flex items-center" : "hidden"
            }`}
          >
            Multi Tenant
          </p>
        </div>
        <nav className="whitespace-nowrap">
          {sideBarTabs.map((tab, index) => {
            const activeLink = pathname === tab?.href;
            return (
              <Fragment key={index}>
                <Link
                  id={"tooltip-" + index}
                  href={tab.href}
                  className={`flex rounded-sm group whitespace-nowrap mb-1 h-[50px] transition-all duration-300 items-center no-underline hover:no-underline focus:no-underline text-secondaryC focus:text-secondaryC cursor-pointer w-full ${"hover:!bg-accentC"} ${
                    activeLink ? "!bg-accentC !text-secondaryC" : ""
                  } `}
                >
                  <div
                    className={`text-2xl ${
                      isOpen ? "pl-4 pr-3" : "w-full flex justify-center"
                    } `}
                  >
                    {tab.icon}
                  </div>
                  <div
                    className={`flex justify-between items-center pr-2 w-[75%]  ${
                      !isOpen && "hidden"
                    }`}
                  >
                    <p
                      className={`w-full text-start transition-all duration-300 ease-out text-[16px]`}
                    >
                      {tab.label}
                    </p>
                    <div
                      className={`text-2xl transition-transform duration-200 group-hover:scale-x-[1.5] ${
                        activeLink && "scale-x-[1.5]"
                      }`}
                    >
                      <BsArrowRightShort />
                    </div>
                  </div>
                </Link>
              </Fragment>
            );
          })}
        </nav>
      </div>
      {sideBarTabs.map((item, index) => {
        return (
          <Fragment key={index}>
            {!isOpen && (
              <Tooltip
                anchorSelect={"#tooltip-" + index}
                content={item?.label}
                place="right"
                className="!z-[1000]"
              />
            )}
          </Fragment>
        );
      })}
    </Fragment>
  );
}

export default Sidebar;

"use client";
import { Fragment, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FcAutomatic, FcBusinessContact, FcBusinessman, FcCustomerSupport, FcHeadset, FcMindMap, FcOnlineSupport, FcSalesPerformance, FcSupport, FcTreeStructure } from "react-icons/fc";
import { FcManager } from "react-icons/fc";
import Link from "next/link";
import { BsArrowRightShort, BsShop } from "react-icons/bs";
import { FcInvite } from "react-icons/fc";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { FcShop } from "react-icons/fc";
import { MdSubscriptions, MdUnsubscribe } from "react-icons/md";
import { FcServices } from "react-icons/fc";

const sideBarTabs = [
  {
    label: "Dashboard",
    icon: <FcMindMap />,
    href: "/",
  },
  {
    label: "Users",
    icon: <FcBusinessman />,
    href: "/users",
  },
  {
    label: "Subscriptions",
    icon: <FcSalesPerformance />,
    href: "/subscriptions",
  }, 
  {
    label: "Email Broadcast",
    icon: <FcInvite />,
    href: "/Admin/feedback",
  },
  {
    label: "Support Tickets",
    icon: <FcCustomerSupport />,
    href: "/Admin/NationalAverage",
  },
  {
    label: "Stores",
    icon: <FcShop />,
    href: "/statements",
  },
  {
    label: "Settings",
    icon: <FcAutomatic />,
    href: "/Admin/StandardExpanses",
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
        className={`bg-white text-black overflow-hidden shadow-xl shadow-gray-300 h-[calc(100vh-50px)]  lg:h-[100vh] absolute inset-y-0 top-[50px] lg:top-0 left-0 lg:pt-0 transition-all duration-100 ease-out z-10 ${
          isOpen ? "w-[230px]" : "w-[0px] lg:w-[60px]"
        }`}
      >
        <div
          className={`w-[100%] h-[50px] mb-2 overflow-hidden max-h-[50px] items-end gap-x-2`}
        >
          <p
            className={`w-[60px] h-[100%] object-contain text-black ${
              !isOpen ? "lg:flex justify-center items-center hidden" : "hidden"
            }`}
          >
            MT
          </p>
          <p
            className={`w-[60%] h-[100%] pl-4 object-contain mb-3 text-black whitespace-nowrap ${
              isOpen ? "flex items-center" : "hidden"
            }`}
          >
            Multi Tenant
          </p>
        </div>
        <nav className="(--primaryC)space-nowrap">
          {sideBarTabs.map((tab, index) => {
            const activeLink = pathname === tab?.href;
            return (
              <Fragment key={index}>
                <Link
                  //   data-tooltip-target={"tooltip-" + index}
                  //   data-tooltip-style="light"
                  //   data-tooltip-placement="right"
                  href={tab.href}
                  className={`flex group h-[55px] transition-all duration-300 items-center no-underline hover:no-underline focus:no-underline text-black hover:text-primaryC focus:text-primaryC cursor-pointer w-full ${
                    isOpen ? "hover:bg-secondaryC" : ""
                  } ${activeLink && isOpen ? "bg-secondaryC" : ""} ${
                    activeLink ? "text-primaryC" : ""
                  }`}
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
      {/* {adminTabs.map((item, index) => {
        return (
          <Fragment key={index}>
            {!isOpen && (
              <Tooltip dataTooltipTarget={"tooltip-" + index}>
                {item?.label}
              </Tooltip>
            )}
          </Fragment>
        );
      })} */}
    </Fragment>
  );
}

export default Sidebar;

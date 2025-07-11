"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";

export default function DashbordLayout({ children }) {
  const { currentUser } = useSelector((state) => state.currentUser);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <section className="custom-font-family">
      <div className="flex h-[calc(100vh-50px)]">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className="w-full flex justify-end">
          <div
            className={`${
              isSidebarOpen
                ? "lg:w-[calc(100%-230px)]"
                : "lg:w-[calc(100%-60px)]"
            } w-full max-h-[100%] overflow-auto no-scrollbar min-h-[100vh] transition-all duration-100 ease-out`}
          >
            <Header toggleSidebar={toggleSidebar} />
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

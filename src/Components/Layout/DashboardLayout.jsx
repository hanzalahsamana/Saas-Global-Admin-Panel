"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";

export default function DashbordLayout({ children }) {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <section className="custom-font-family w-full">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex justify-between h-[calc(100vh-50px)] w-full">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div
          className={`${
            isSidebarOpen ? "lg:w-[calc(100%-230px)]" : "lg:w-[calc(100%-65px)]"
          } w-full max-h-[100%] overflow-auto no-scrollbar min-h-[100%] transition-all duration-100 ease-out`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

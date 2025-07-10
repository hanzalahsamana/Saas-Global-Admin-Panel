"use client";

import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";

function Home() {
  return (
    <div className="">
      <h1 className="text-[40px] font-semibold">This is home page</h1>
    </div>
  );
}

export default ProtectedRoute(Home)

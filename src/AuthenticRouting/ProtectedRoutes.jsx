"use client";

import DashbordLayout from "@/Components/Layout/DashboardLayout";
import Loader from "@/Components/Loader/loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ProtectedRoute(WrappedComponent) {
  return () => {
    const router = useRouter();
    const { currentUser, userLoading } = useSelector(
      (state) => state.currentUser
    );

    useEffect(() => {
      console.log("Entring in useEffect...");
      if (!currentUser?.email) {
        router.push("/login");
        return;
      }
    }, [currentUser?.email]);

    if ((!currentUser?.email || !currentUser) && !userLoading) {
      return <Loader height="h-[100vh]" />;
    }

    if (userLoading) {
      return <Loader height="h-[100vh]" />;
    }

    return (
      <DashbordLayout>
        <WrappedComponent />
      </DashbordLayout>
    );
  };
}

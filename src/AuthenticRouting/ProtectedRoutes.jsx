"use client";

import DashbordLayout from "@/Components/Layout/DashboardLayout";
import Loader from "@/Components/Loader/Loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ProtectedRoute(WrappedComponent) {
  return () => {
    const router = useRouter();
    const { currentUser, loading } = useSelector((state) => state.currentUser);

    useEffect(() => {
      if (!currentUser?.email && !loading) {
        router.push("/login");
        return;
      }
    }, [currentUser?.email]);

    if ((!currentUser?.email || !currentUser) && !loading) {
      return <Loader height="h-[100vh]" />;
    }

    if (loading) {
      return <Loader height="h-[100vh]" />;
    }

    return (
      <DashbordLayout>
        <WrappedComponent />
      </DashbordLayout>
    );
  };
}

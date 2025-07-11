"use client";

import DashbordLayout from "@/Components/Layout/DashboardLayout";
import Loader from "@/Components/Loader/Loader";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function ProtectedRoute(WrappedComponent) {
  return () => {
    const router = useRouter();
    const { currentUser, loading } = useSelector((state) => state.currentUser);

    if (loading) {
      return <Loader />;
    }

    if (!currentUser) {
      router.push("/login");
      return;
    }

    return (
      <DashbordLayout>
        <WrappedComponent />
      </DashbordLayout>
    );
  };
}

import Loader from "@/Components/Loader/Loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const UnProtectedRoute = (WrappedComponent) => {
  return () => {
    const { currentUser, loading } = useSelector((state) => state.currentUser);
    const router = useRouter();

    useEffect(() => {
      if (currentUser?.email) {
        router.push("/");
        return;
      }
    }, [currentUser?.email]);

    if (loading) {
      return <Loader />;
    }

    if (currentUser) {
      return <Loader />;
    }

    return <WrappedComponent />;
  };
};

export default UnProtectedRoute;

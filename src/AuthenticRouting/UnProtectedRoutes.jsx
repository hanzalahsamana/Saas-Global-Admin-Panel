import Loader from "@/Components/Loader/Loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const UnProtectedRoute = (WrappedComponent) => {
  return () => {
    const { currentUser, loading } = useSelector((state) => state.currentUser);
    const router = useRouter();
    useEffect(() => {
      if (currentUser) {
        router.push("/");
        return;
      }
    }, [currentUser]);

    if (currentUser) {
      return <Loader />;
    }

    if (loading) {
      return <Loader />;
    }

    return <WrappedComponent />;
  };
};

export default UnProtectedRoute;

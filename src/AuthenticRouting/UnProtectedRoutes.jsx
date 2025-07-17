import Loader from "@/Components/Loader/Loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const UnProtectedRoute = (WrappedComponent) => {
  return () => {
    const { currentUser, loading } = useSelector((state) => state.currentUser);
    const router = useRouter();

    useEffect(() => {
      if (currentUser?.email && !loading) {
        router.push("/");
        return;
      }
    }, [currentUser?.email]);

    if ((currentUser?.email || currentUser) && !loading) {
      return <Loader height="h-[100vh]" />;
    }

    if (loading) {
      return <Loader height="h-[100vh]" />;
    }

    return <WrappedComponent />;
  };
};

export default UnProtectedRoute;

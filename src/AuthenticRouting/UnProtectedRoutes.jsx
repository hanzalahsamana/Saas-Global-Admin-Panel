import Loader from "@/Components/Loader/loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const UnProtectedRoute = (WrappedComponent) => {
  return () => {
    const { currentUser, userLoading } = useSelector(
      (state) => state.currentUser
    );
    const router = useRouter();

    useEffect(() => {
      if (currentUser?.email && !userLoading) {
        router.push("/");
        return;
      }
    }, [currentUser?.email]);

    if ((currentUser?.email || currentUser) && !userLoading) {
      return <Loader height="h-[100vh]" />;
    }

    if (userLoading) {
      return <Loader height="h-[100vh]" />;
    }

    return <WrappedComponent />;
  };
};

export default UnProtectedRoute;

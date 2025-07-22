import Loader from "@/Components/Loader/loader";
import { AuthContext } from "@/Context/Authentication/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const UnProtectedRoute = (WrappedComponent) => {
  return () => {
    const { currentUser, userLoading } = useContext(AuthContext);
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

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Loader from "@/components/Loader/loader";

const UnProtectedRoute = (WrappedComponent) => {
  return () => {
    const router = useRouter();
    const { currUser, loading } = useSelector((state) => state.currentUser);
    if (loading) {
      return <Loader />;
    }

    if (!currUser) {
      return <WrappedComponent />;
    }

    return router.push("/");
  };
};

export default UnProtectedRoute;

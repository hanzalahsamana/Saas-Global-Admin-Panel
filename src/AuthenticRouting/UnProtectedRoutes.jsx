import Loader from "@/Components/Loader/Loader";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const UnProtectedRoute = (WrappedComponent) => {
  return () => {
    const { currentUser, loading } = useSelector((state) => state.currentUser);
    const router = useRouter();

    if (loading) {
      return <Loader />;
    }

    if (currentUser) {
      router.push("/");
      return;
    }
    return <WrappedComponent />;
  };
};

export default UnProtectedRoute;

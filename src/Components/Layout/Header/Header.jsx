import Button from "@/Components/Actions/Button";
import { AuthContext, logoutUser } from "@/Context/Authentication/AuthContext";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { TfiMenu } from "react-icons/tfi";

const Header = ({ toggleSidebar }) => {
  const pathName = usePathname();
  const cleanPath = pathName.replace(/^\//, "");

  const { logout } = useContext(AuthContext);
  return (
    <header className=" h-[50px] sticky top-0 bg-[#70009c] shadow-md z-20 w-full">
      <div className="h-[100%] flex justify-between items-center w-full">
        {/* toggle sidebar button  */}
        <div className="flex items-center">
          <Button
            variant="text"
            className="h-[100%] w-full text-secondaryC !text-xl !rounded-none"
            action={toggleSidebar}
            label={<TfiMenu />}
          />

          <p className="text-2xl font-bold capitalize text-secondaryC">
            {pathName === "/" ? "Dashboard" : cleanPath}
          </p>
        </div>
        <div className="flex text-secondaryC items-center gap-x-6 pr-6">
          <FaUser size={20} className="cursor-pointer" />
          <IoIosSettings size={25} className="cursor-pointer" />
          <FaSignOutAlt size={20} className="cursor-pointer" onClick={logout} />
        </div>
      </div>
    </header>
  );
};

export default Header;

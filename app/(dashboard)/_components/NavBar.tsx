import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./MobileSidebar";

const Navbar = () => {
  return (
    <div className="border-b p-4 bg-white flex items-center shadow-sm h-full">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;

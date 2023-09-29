import { Logo } from "./logo";
import SideBarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="h-full bg-white border-r flex flex-col shadow-sm overflow-y-auto">
      <div className="p-6">
        <Logo />
      </div>
      <div>
        <SideBarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;

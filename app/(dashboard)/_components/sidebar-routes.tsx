"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import SidebarItem from "./sidebar-items";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    lable: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    lable: "Browse",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    lable: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    lable: "Analytics",
    href: "/teacher/analytics",
  },
];

const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  return (
    <div className="flex flex-col h-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.lable}
          icon={route.icon}
          label={route.lable}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;

"use client";

import { usePathname, useRouter } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}
const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname.startsWith(`${href}/`);
  const onClick = () => {
    router.push(href);
  };
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 pl-6 hover:bg-slate-300/20 transition-all text-slate-500 hover:text-slate-600 font-[500]",
        isActive &&
          "text-sky-700 hover:text-sky-700 bg-sky-200/20 hover:bg-sky-200/20"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto h-full opacity-0 transition-all border-4 border-sky-700",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};

export default SidebarItem;

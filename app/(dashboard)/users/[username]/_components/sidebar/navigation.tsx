"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { 
  Fullscreen,
} from "lucide-react";

import { NavItem, NavItemSkeleton } from "./nav-item";

export const Navigation = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const routes = [
    {
      label: "My Homepage",
      href: `/users/${user?.username}`,
      icon: Fullscreen,
    },
  ];

  if (!user?.username) {
    return (
      <ul className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <NavItemSkeleton key={i} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
     {routes.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive={pathname === route.href}
        />
     ))}
    </ul>
  );
};
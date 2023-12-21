"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/use-sidebar";
import { SportAvatar } from "@/components/SportAvatar";
import { Skeleton } from "@/components/ui/skeleton";

interface SportItemProps {
  name: string;
  imageUrl: string;
};

export function SportItem({ name, imageUrl }: SportItemProps) {
  const pathname = usePathname();

  const { collapsed } = useSidebar((state) => state);

  const href = `/${name}`;
  const isActive = pathname === href;

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-12",
        collapsed ? "justify-center" : "justfy-start",
        isActive && "bg-accent",
      )}
    >
      <Link href={href}>
        <div className={cn(
          "flex items-center w-full gap-x-4",
          collapsed && "justify-center",
        )}>
          <SportAvatar
            imageUrl={imageUrl}
            name={name}
          />
          {!collapsed && (
            <p className="truncate">
              {name}
            </p>
          )}
          {/* {!collapsed && (
            <LiveBadge className="ml-auto" />
          )} */}
        </div>
      </Link>
    </Button>
  );
}

export const SportItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
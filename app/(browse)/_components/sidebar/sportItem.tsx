"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/use-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/UserAvatar";
import { LiveBadge } from "@/components/LiveBadge";
import { SportAvatar } from "@/components/SportAvatar";

interface SportItemProps {
  sportName: string;
  imageUrl: string;
};

export function SportItem({ sportName, imageUrl }: SportItemProps) {
  const pathname = usePathname();

  const { collapsed } = useSidebar((state) => state);

  const href = `/${sportName}`;
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
            sportName={sportName}
          />
          {!collapsed && (
            <p className="truncate">
              {sportName}
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


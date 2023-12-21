"use client";

import { useSidebar } from "@/store/use-sidebar";
import { Follow, Sport } from "@prisma/client";
import { SportItem, SportItemSkeleton } from "./sportItem";

interface FollowingProps {
  data: (Follow & {
    beingFollowed: Sport;
  })[];
}
function Following({ data }: FollowingProps) {
  const { collapsed } = useSidebar((state) => state);

  if (!data.length) {
    return null;
  }

  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((follow) => (
          <SportItem
            key={follow.beingFollowed.id}
            name={follow.beingFollowed.name}
            imageUrl={follow.beingFollowed.imageUrl}
          />
        ))}
      </ul>
    </div>
  );
}

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3)].map((_, i) => (
        <SportItemSkeleton key={i} />
      ))}
    </ul>
  );
};

export default Following;

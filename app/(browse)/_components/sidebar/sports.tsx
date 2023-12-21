"use client";

import { useSidebar } from "@/store/use-sidebar";
import { Sport as MySport } from "@prisma/client";
import { SportItem, SportItemSkeleton } from "./sportItem";

interface SportProps {
  data: MySport[];
}

export function Sports({ data }: SportProps) {
  const { collapsed } = useSidebar((state) => state);

  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((sport) => (
          <SportItem
            key={sport.id}
            name={sport.name}
            imageUrl={sport.imageUrl}
          />
        ))}
      </ul>
    </div>
  );
}

export const SportsSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(5)].map((_, i) => (
        <SportItemSkeleton key={i} />
      ))}
    </ul>
  );
};
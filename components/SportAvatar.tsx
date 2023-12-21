import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { LiveBadge } from "@/components/LiveBadge";

const avatarSizes = cva(
  "",
  {
    variants: {
      size: {
        default: "h-8 w-8",
        lg: "h-14 w-14",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);


interface SportAvatarProps
  extends VariantProps<typeof avatarSizes> {
  name: string;
  imageUrl: string;
  showBadge?: boolean;
};

export const SportAvatar = ({
  name,
  imageUrl,
  showBadge,
  size,
}: SportAvatarProps) => {
  const canShowBadge = showBadge

  return (
    <div className="relative">
      <Avatar
        className={cn(
          "ring-2 ring-rose-500 border border-background",
          avatarSizes({ size })
        )}
      >
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>
          {name[0]}
          {name[name.length - 1]}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

interface SportAvatarSkeletonProps 
  extends VariantProps<typeof avatarSizes> {};

export const SportAvatarSkeleton = ({
  size,
}: SportAvatarSkeletonProps) => {
  return (
    <Skeleton className={cn(
      "rounded-full",
      avatarSizes({ size }),
    )} />
  );
};
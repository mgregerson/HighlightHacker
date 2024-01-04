'use client';

import React, { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { onLike, onUnlike } from "@/actions/like";

// Actions are built in RPC's that allow us to do API-less mutations

interface likeActionsProps {
  isLiking: boolean;
  highlightId: string;
}

function LikeActions({ isLiking, highlightId }: likeActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    startTransition(() => {
      onLike(highlightId)
        .then((data) => {
          console.log("data=", data);
          toast.success(`You have liked this highlight!`);
        })
        .catch(() => {
          toast.error("Failed to like the highlight!");
        });
    });
  };

  const handleUnlike = () => {
    startTransition(() => {
      onUnlike(highlightId)
        .then((data) => {
          console.log("data=", data);
          toast.success(`You have unliked this highlight!`);
        })
        .catch(() => {
          toast.error("Failed to unlike the highlight!");
        });
    });
  };

  const onLikeClick = () => {
    if (!isLiking) {
      handleLike();
    } else {
      handleUnlike();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4 pt-5">
      <Button
        disabled={isPending}
        variant="primary"
        className="w-[50%]"
        onClick={onLikeClick}
      >
        {!isLiking ? "Like Highlight" : "Unlike Highlight"}
      </Button>
    </div>
  );
}

export default LikeActions;

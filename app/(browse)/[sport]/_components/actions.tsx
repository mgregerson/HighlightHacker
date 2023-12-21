"use client";

import React, { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { onFollow, onUnfollow } from "@/actions/follow";
import { toast } from "sonner";

// Actions are built in RPC's that allow us to do API-less mutations

interface ActionsProps {
  isFollowing: boolean;
  sportId: string
}

function Actions({ isFollowing, sportId }: ActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(sportId)
        .then((data) => toast.success(`You are now following ${data.beingFollowed.name}`))
        .catch(() => toast.error("Failed to follow the sport!"));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(sportId)
        .then((data) => toast.success(`You have stopped following ${data.beingFollowed.name}`))
        .catch(() => toast.error("Failed to unfollow the sport!"));
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  }

  return (
    
    <Button
      disabled={isPending}
      variant="primary"
      onClick={onClick}
    >
     {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}

export default Actions;

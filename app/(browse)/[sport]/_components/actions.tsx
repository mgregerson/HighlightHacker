"use client";

import React, { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { onFollow } from "@/actions/follow";
import { toast } from "sonner";

// Actions are built in RPC's that allow us to do API-less mutations

interface ActionsProps {
  isFollowing: boolean;
  sportId: string
}

function Actions({ isFollowing, sportId }: ActionsProps) {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onFollow(sportId)
        .then((data) => toast.success(`You are now following ${data.beingFollowed.name}`))
        .catch(() => toast.error("Failed to follow the sport!"));
    });
  };
  return (
    <Button
      disabled={isFollowing || isPending}
      variant="primary"
      onClick={onClick}
    >
      Follow
    </Button>
  );
}

export default Actions;

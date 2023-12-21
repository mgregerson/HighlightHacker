"use client";

import React, { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { onFollow, onUnfollow } from "@/actions/follow";
import { toast } from "sonner";
import { onBlock, onUnblock } from "@/actions/block";

// Actions are built in RPC's that allow us to do API-less mutations

interface ActionsProps {
  isFollowing: boolean;
  isBlocking: boolean;
  sportId: string;
}

function Actions({ isFollowing, sportId, isBlocking }: ActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(sportId)
        .then((data) =>
          toast.success(`You are now following ${data.beingFollowed.name}`)
        )
        .catch(() => toast.error("Failed to follow the sport!"));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(sportId)
        .then((data) =>
          toast.success(`You have stopped following ${data.beingFollowed.name}`)
        )
        .catch(() => toast.error("Failed to unfollow the sport!"));
    });
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(sportId)
        .then((data) =>
          toast.success(`You have blocked ${data.blockedSport.name}`)
        )
        .catch(() => toast.error("Failed to block the sport!"));
    });
  };

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(sportId)
        .then((data) =>
          toast.success(`You have unblocked ${data.blockedSport.name}`)
        )
        .catch(() => toast.error("Failed to block the sport!"));
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  const onBlockClick = () => {
    if (isBlocking) {
      handleUnblock();
    } else {
      handleBlock();
    }
  }

  return (
    <>
      <Button disabled={isPending} variant="primary" onClick={onClick}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button disabled={isPending} variant="destructive" onClick={onBlockClick}>
        {isBlocking ? "Unblock" : "Block"}
      </Button>
    </>
  );
}

export default Actions;

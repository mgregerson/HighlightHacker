"use client";

import React, { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { onFollow, onUnfollow } from "@/actions/follow";
import { toast } from "sonner";
import { onBlock, onUnblock } from "@/actions/block";
import { addGames } from "@/actions/addGame";
import Games from "../../../../videos.json";

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
          toast.success(`You are now following ${data.beingFollowed.name}`, {
            duration: 2000,
          })
        )
        .catch(() => toast.error("Failed to follow the sport!"));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(sportId)
        .then((data) =>
          toast.success(`You have stopped following ${data.beingFollowed.name}`, {
            duration: 2000,
          })
        )
        .catch(() => toast.error("Failed to unfollow the sport!"));
    });
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(sportId)
        .then((data) =>
          toast.success(`You have blocked ${data.blockedSport.name}`, {
            duration: 2000,
          })
        )
        .catch(() => toast.error("Failed to block the sport!"));
    });
  };

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(sportId)
        .then((data) => {
          toast.success(`You have unblocked ${data.blockedSport.name}`, {
            duration: 2000,
          });
        })
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
  };

  const handleAddGames = () => {
    startTransition(() => {
      addGames(Games)
        .then((data) => toast.success(`You have added games to the database!`), )
        .catch(() => toast.error("Failed to add games!"));
    });
  };

  return (
    <div className="flex flex-row justify-center items-center space-x-4 py-5">
      <Button
        disabled={isPending}
        variant="primary"
        className="w-[40%] content-center"
        onClick={onClick}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button
        disabled={isPending}
        variant="destructive"
        className="w-[40%]"
        onClick={onBlockClick}
      >
        {isBlocking ? "Unblock" : "Block"}
      </Button>
      {/* <Button onClick={handleAddGames}>Import Games</Button> */}
    </div>
  );
}

export default Actions;

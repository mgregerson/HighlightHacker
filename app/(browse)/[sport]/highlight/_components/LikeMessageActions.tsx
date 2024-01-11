"use client";

import { Button } from "@/components/ui/button";
import { Heart, HeartOff } from "lucide-react";
import React, { useTransition } from "react";
import { onLikeMessage, onUnlikeMessage } from "@/actions/likeMessage";
import { toast } from "sonner";
import { Hint } from "@/components/hint";

interface LikeMessageActionsProps {
  sport: string;
  isLiked: boolean;
  messageId: string;
}

function LikeMessageActions({
  sport,
  isLiked,
  messageId,
}: LikeMessageActionsProps) {
  console.log("isLiked=", isLiked);
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    startTransition(() => {
      onLikeMessage(messageId, sport).catch(() =>
        toast.error("Failed to like the message!")
      );
    });
  };

  const handleUnlike = () => {
    startTransition(() => {
      onUnlikeMessage(messageId, sport).catch(() =>
        toast.error("Failed to unlike the message!")
      );
    });
  };

  const onLikeClick = () => {
    if (!isLiked) {
      handleLike();
    } else {
      handleUnlike();
    }
  };

  const label = isLiked ? "Unlike Message" : "Like Message";

  // return (
  //   <>
  //     {!collapsed ? (
  //       <div className="p-3 pl-6 mb-2 flex items-center w-full">
  //         <p className="font-semibold text-primary">For you</p>
  //         <Hint label={label} side="right" asChild></Hint>

  return (
    <div>
      <Hint label={label} side="right" asChild>
        {isLiked ? (
          <Heart
            onClick={onLikeClick}
            color="#ff0000"
            fill={"#ff0000"}
            className="hover:scale-125 transform transition-transform duration-300 cursor-pointer"
          />
        ) : (
          <Heart
            onClick={onLikeClick}
            color="#ff0000"
            className="hover:scale-125 transform transition-transform duration-300 cursor-pointer"
          />
        )}
      </Hint>
    </div>
  );
}

export default LikeMessageActions;

"use client";

import { Button } from "@/components/ui/button";
import { Heart, HeartOff } from "lucide-react";
import React, { useState, useTransition } from "react";
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
  const [optimisticLiked, setOptimisticLiked] = useState(isLiked);

  const handleLike = () => {
    setOptimisticLiked(true); // Optimistically update UI
    startTransition(() => {
      onLikeMessage(messageId, sport).catch(() => {
        toast.error("Failed to like the message!");
        setOptimisticLiked(false); 
      });
    });
  };

  const handleUnlike = () => {
    setOptimisticLiked(false); // Optimistically update UI
    startTransition(() => {
      onUnlikeMessage(messageId, sport).catch(() => {
        toast.error("Failed to unlike the message!");
        setOptimisticLiked(true); 
      });
    });
  };

  const onLikeClick = () => {
    if (!isLiked) {
      handleLike();
    } else {
      handleUnlike();
    }
  };

  const label = optimisticLiked ? "Unlike Message" : "Like Message";

  return (
    <div>
      <Hint label={label} side="right" asChild>
        {optimisticLiked ? (
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

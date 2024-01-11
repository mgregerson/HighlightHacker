import React from "react";
import { extendedMessage } from "./MessagesList";
import UserThumbnail from "@/components/UserThumbnail";
import { generateTimestamp } from "@/utils/generateTimestamp";
import LikedHeart from "@/components/icons/heartOn";
import LikeMessageActions from "./LikeMessageActions";
import { messageLikeStatus } from "@/actions/likeMessage";

interface MessageProps {
  message: extendedMessage;
  index: number;
  sport: string;
}

async function SingleMessage({ message, index, sport }: MessageProps) {

  const likedMessage = await messageLikeStatus(message.id);

  console.log('likedMessage', likedMessage)

  return (
    <div className="flex items-center ml-2 py-4">
      <UserThumbnail imageUrl={message.user.imageUrl} />
      <div className="flex flex-col px-2">
        <div className="flex items-center">
          <p className="flex">{message.user.username}</p>
          <p className="flex text-gray-500 text-xs ml-2">
            {generateTimestamp(message.createdAt)}
          </p>
        </div>
        <div className="flex items-center">
          {" "}
          {/* Added parent container */}
          <div className="bg-gray-500 p-3 rounded-md mt-2 flex-grow">
            {message.content}
          </div>
          <div className="ml-2">
            <LikeMessageActions sport={sport} isLiked={likedMessage} messageId={message.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleMessage;

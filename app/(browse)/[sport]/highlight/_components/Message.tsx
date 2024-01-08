import { Message } from "@prisma/client";
import React from "react";
import { extendedMessage } from "./MessagesList";
import UserThumbnail from "@/components/UserThumbnail";
import { generateTimestamp } from "@/utils/generateTimestamp";

interface MessageProps {
  message: extendedMessage;
  index: number;
}

function SingleMessage({ message, index }: MessageProps) {
  return (
    <div className="flex items-center ml-2 py-4">
    <UserThumbnail imageUrl={message.user.imageUrl} />
    <div className="flex flex-col px-2">
      <div className="flex items-center">
        <p className="flex">{message.user.username}</p>
        <p className="flex text-gray-500 text-xs ml-2">{generateTimestamp(message.createdAt)}</p>
      </div>
      <div className="bg-gray-500 p-3 rounded-md mt-2">
        {message.content}
      </div>
    </div>
  </div>
  );
}

export default SingleMessage;

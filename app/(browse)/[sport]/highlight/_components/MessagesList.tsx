import React from "react";
import SingleMessage from "./Message";
import { Message, User } from "@prisma/client";

interface MessagesListProps {
  messages: extendedMessage[];
}

export interface extendedMessage extends Message {
  user: User;
}

function MessagesList({ messages }: MessagesListProps) {
  return (
    <div className="mt-8">
      {messages.map((message: extendedMessage, index: number) => (
        <SingleMessage key={index} message={message} index={index} />
      ))}
    </div>
  );
}

export default MessagesList;

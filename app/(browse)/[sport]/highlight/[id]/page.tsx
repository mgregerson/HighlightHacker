import React from "react";

import { User } from "@prisma/client";
import { getHighlightById } from "@/lib/highlight-service";
import ClientHighlightVideo from "../../../../../components/highlights/ClientHighlightVideo";
import { getMessagesByChatroom, sendMessage } from "@/lib/message-service";
import ChatInput from "../_components/ChatInput";
import MessagesList from "../_components/MessagesList";

interface HighlightPageProps {
  name: string;
  user: User;
  params: {
    sport: string;
    id: string;
  };
}



async function HighlightPage({ name, user, params }: HighlightPageProps) {
  // const { collapsed } = useChatSidebar((state) => state);
  const highlight = await getHighlightById(params.id);
  const chatroomId = highlight?.chatroom?.id;
  const chatroomMessages = await getMessagesByChatroom(chatroomId!);

  console.log('messages=', chatroomMessages)
  return (
    <div>
      {highlight && <ClientHighlightVideo highlight={highlight} />}
      <ChatInput chatroomId={chatroomId!} />
      <MessagesList messages={chatroomMessages} />
    </div>
  );
}

export default HighlightPage;

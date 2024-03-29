import React from "react";

import { User } from "@prisma/client";
import { getHighlightById } from "@/lib/highlight-service";
import ClientHighlightVideo from "../../../../../components/highlights/ClientHighlightVideo";
import { getMessagesByChatroom, sendMessage } from "@/lib/message-service";
import ChatInput from "../_components/ChatInput";
import MessagesList from "../_components/MessagesList";
import LikedHeart from "@/components/icons/heartOn";
import DislikedHeart from "@/components/icons/heartOff";
import { Button } from "@/components/ui/button";


interface HighlightPageProps {
  params: {
    sport: string;
    id: string;
  };
}

async function HighlightPage({ params }: HighlightPageProps) {
  // const { collapsed } = useChatSidebar((state) => state);
  const highlight = await getHighlightById(params.id);
  const chatroomId = highlight?.chatroom?.id;
  const chatroomMessages = await getMessagesByChatroom(chatroomId!);

  function getVideoIdFromUrl(url: string): string | null {
    const urlObject = new URL(url);
    const videoId = urlObject.searchParams.get("v");

    return videoId || null;
  }

  const url = "https://www.youtube.com/watch?v=8b0yFzCqYX8&ab_channel=ESPN";

  const parametersMap = getVideoIdFromUrl(url);

  return (
    <div>
      {highlight && <ClientHighlightVideo highlight={highlight} />}
      <ChatInput chatroomId={chatroomId!} />
      <MessagesList messages={chatroomMessages} sport={params.sport} />
    </div>
  );
}

export default HighlightPage;

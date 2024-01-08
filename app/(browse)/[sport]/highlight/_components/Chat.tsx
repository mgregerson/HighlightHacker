"use client";

import { useChatSidebar } from "@/store/use-chat-sidebar";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";

interface ChatProps {
  viewerName: string;
  hostName: string;
  hostIdentity: string;
}

function Chat({ viewerName, hostName, hostIdentity }: ChatProps) {
  const [value, setValue] = useState('');

  const matches = useMediaQuery('(max-width: 1024px)')
  const { variant, onExpand } = useChatSidebar((state) => state);


  return <div>Chat</div>;
}

export default Chat;

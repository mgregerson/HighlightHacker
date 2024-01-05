import React from "react";

import { useChatSidebar } from "@/store/use-chat-siderbar";
import { cn } from "@/lib/utils";
import Chat from "../_components/Chat";
import { User } from "@prisma/client";

interface HighlightPageProps {
  name: string;
  user: User;
}

function HighlightPage({ name, user }: HighlightPageProps) {
  // const { collapsed } = useChatSidebar((state) => state);

  return (
    <div>
      HighlightPage
      <div className={cn("col-span-1")}>
        {/* <Chat
          viewerName={name}
          hostName={user.username}
          hostIdentity={user.id}
        /> */}
      </div>
    </div>
  );
}

export default HighlightPage;

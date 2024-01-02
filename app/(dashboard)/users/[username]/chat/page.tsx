import React from "react";
import ToggleCard from "./_components/ToggleCard";



function ChatPage() {
  const isChatEnabled = true;
  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text2xl font-bold">Chat Settings</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label="Enable Chat"
          value={isChatEnabled}
        />
      </div>
    </div>
  );
}

export default ChatPage;

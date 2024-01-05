"use client";

import React, { useEffect, useState } from "react";
import { useChannel } from "ably/react";

export default function ChatBox() {
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState<any>([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  useEffect(() => {
    messageEnd.scrollIntoView({ behaviour: "smooth" });
  });

  const { channel, ably } = useChannel("chat-demo", (message) => {
    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);
  });

  const sendChatMessage = (messageText: any) => {
    channel.publish({ name: "chat-message", data: messageText });
    setMessageText("");
    inputBox.focus();
  };

  const handleFormSubmission = (event: any) => {
    event.preventDefault();
    sendChatMessage(messageText);
  };

  const handleKeyPress = (event: any) => {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  };

  const messages = receivedMessages
    .slice()
    .reverse()
    .map((message: any, index: any) => {
      const author =
        message.connectionId === ably.connection.id ? "me" : "other";
      return (
        <span
          key={index}
          className="bg-blue-100 p-4 rounded-lg flex-grow-0"
          data-author={author}
        >
          {message.data}
        </span>
      );
    });

  let inputBox: any = null;
  let messageEnd: any = null;

  return (
    <div className="grid grid-rows-[1fr,100px]">
      <div className="flex flex-col-reverse items-start h-[calc(100vh-40px-100px-100px-100px)] overflow-y-auto">
        {messages}
        <div
          ref={(element) => {
            messageEnd = element;
          }}
        ></div>
      </div>
      <form
        onSubmit={handleFormSubmission}
        className="grid grid-cols-[1fr,100px] border-t border-solid border-gray-300"
      >
        <textarea
          ref={(element) => {
            inputBox = element;
          }}
          value={messageText}
          placeholder="Type a message..."
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="p-4 border-0 font-sans text-xl"
        ></textarea>
        <button
          type="submit"
          className="border-0 font-bold text-white text-xl bg-gradient-to-r from-[#363795] to-[#005C97] hover:bg-gradient-to-r hover:from-[#363795] hover:to-[#005C97] disabled:bg-gradient-to-r disabled:opacity-50"
          disabled={messageTextIsEmpty}
        >
          Send
        </button>
      </form>
    </div>
  );
}

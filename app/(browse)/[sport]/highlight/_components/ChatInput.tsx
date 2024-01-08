"use client";

import { FormEvent, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ChatInput({ chatroomId }: { chatroomId: string }) {
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await axios.post("/api/send-message", {
        content: message,
        chatroomId: chatroomId,
      });
      toast.success("Message sent!");
      setMessage("");
    } catch (error: any) {
      console.error("Error submitting message:", error.message);
    }
  }

  return (
    <div className="flex items-center justify-center h-full">
      <form
        onSubmit={onSubmit}
        className="flex items-center justify-center w-1/2 px-5 pt-5"
      >
        <Input
          type="text"
          placeholder="How sick is this highlight?"
          value={message}
          name="message"
          autoComplete="off"
          onChange={(e) => setMessage(e.target.value)}
          className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        />
        <Button
          type="submit"
          size="lg"
          variant="secondary"
          className="rounded-l-none"
        >
          Go!
        </Button>
      </form>
    </div>
  );
}

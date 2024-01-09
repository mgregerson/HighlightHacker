"use client";

import { FormEvent, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { onSend } from "@/actions/message";

export default function ChatInput({ chatroomId }: { chatroomId: string }) {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      startTransition(() => {
        onSend(message, chatroomId)
        .then(() => 
          toast.success(`Message Sent!`)
        )
      })
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
          disabled={isPending}
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

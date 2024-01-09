'use server';

import { sendMessage } from "@/lib/message-service";
import { revalidatePath } from "next/cache";

export const onSend = async (content: string, chatroomId: string) => {
    try {
        const newMessage = await sendMessage(content, chatroomId);
        revalidatePath('/');

        if (newMessage) {
            revalidatePath(`/${newMessage.chatroom.highlight.sport.name}/highlight/${newMessage.chatroom.id}`)
        }
        return newMessage;
    } catch (error) {
        throw new Error("Internal Error");
    }
}
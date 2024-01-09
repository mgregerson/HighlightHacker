import { db } from "./db";

import { getSelf } from "@/lib/auth-service";

export const sendMessage = async (content: string, chatroomId: string) => {
  const self = await getSelf();
  try {
    const newMessage = await db.message.create({
      data: {
        content,
        chatroomId,
        userId: self!.id,
      },
      include: {
        chatroom: {
          include: {
            highlight: {
              include: {
                sport: true,
              },
            },
          },
        },
      },
    });
    return newMessage;
  } catch (err) {
    throw new Error("Internal Error");
  }
};

export const getMessagesByChatroom = async (chatroomId: string) => {
  try {
    const messages = await db.message.findMany({
      where: {
        chatroomId,
      },
      include: {
        user: true,
      },
    });
    return messages;
  } catch (err) {
    throw new Error("Internal Error");
  }
};

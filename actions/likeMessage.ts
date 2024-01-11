"use server";

import { revalidatePath } from "next/cache";

import { likeHighlight, unlikeHighlight } from "@/lib/like-service";
import {
  likeMessage,
  unlikeMessage,
  isLikingMessage,
} from "@/lib/like-message-service";

export const messageLikeStatus = async (messageId: string) => {
  try {
    const likeStatus = await isLikingMessage(messageId);

    return likeStatus;
  } catch (error) {
    throw new Error("Internal Error");
  }
};

export const onLikeMessage = async (messageId: string, sport: string) => {
  try {
    const likedMessage = await likeMessage(messageId);

    revalidatePath("/");
    if (likedMessage) {
        revalidatePath(`/${sport}/highlight/${likedMessage.message.chatroom.highlightId}}`)
    }
    return likedMessage;
  } catch (error) {
    throw new Error("Internal Error");
  }
};

export const onUnlikeMessage = async (messageId: string, sport: string) => {
  try {
    const unlikedMessage = await unlikeMessage(messageId);

    revalidatePath("/");

    if (unlikedMessage) {
        revalidatePath(`/${sport}/highlight${unlikedMessage.message.chatroom.highlightId}`)
    }
    
    return unlikedMessage;
  } catch (error) {
    throw new Error("Internal Error");
  }
};

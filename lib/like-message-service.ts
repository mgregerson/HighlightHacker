import { getSelf } from "./auth-service";

import { db } from "./db";

export const isLikingMessage = async (messageId: string) => {
  const self = await getSelf();

  if (!self) {
    throw new Error("User not found!");
  }

  const messageLike = await db.messageLike.findFirst({
    where: {
      userId: self.id,
      messageId,
    },
  });

  if (messageLike) {
    return true;
  } else {
    return false;
  }
};

export const likeMessage = async (messageId: string) => {
  const self = await getSelf();

  if (!self) {
    throw new Error("User not found!");
  }

  const message = await db.message.findUnique({
    where: { id: messageId },
    include: {
      likes: true,
      chatroom: {
        include: {
          highlight: true,
        },
      },
    },
  });

  if (!message) {
    throw new Error("Message not found :(");
  }

  const existingLike = await db.messageLike.findFirst({
    where: {
      userId: self.id,
      messageId,
    },
  });

  if (existingLike) {
    throw new Error("Already liked message!");
  }

  const messageLike = await db.messageLike.create({
    data: {
      userId: self.id,
      messageId,
    },
    include: {
      message: {
        include: {
          chatroom: {
            include: {
              highlight: true,
            },
          },
        },
      },
    },
  });

  return messageLike;
};

export const unlikeMessage = async (messageId: string) => {
  const self = await getSelf();

  if (!self) {
    throw new Error("User not found!");
  }

  const message = await db.message.findUnique({
    where: { id: messageId },
    include: {
      likes: true,
      chatroom: {
        include: {
          highlight: true,
        },
      },
    },
  });

  if (!message) {
    throw new Error("Message not found :(");
  }

  const existingLike = await db.messageLike.findFirst({
    where: {
      userId: self.id,
      messageId,
    },
  });

  if (!existingLike) {
    throw new Error("Already unliked message!");
  }

  const messageLike = await db.messageLike.delete({
    where: {
      id: existingLike.id,
    },
    include: {
      message: {
        include: {
          chatroom: {
            include: {
              highlight: true,
            },
          },
        },
      },
    },
  });

  return messageLike;
};

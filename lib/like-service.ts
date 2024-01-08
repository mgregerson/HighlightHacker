import { db } from "./db";

import { getSelf } from "@/lib/auth-service";

export const getLikedHighlights = async () => {
  const self = await getSelf();

  try {
    const likedHighlights = await db.like.findMany({
      where: {
        userId: self!.id,
      },
      include: {
        highlight: true,
      },
    });

    const extractedHighlights = likedHighlights.map(
      ({ highlight }) => highlight
    );

    return extractedHighlights;
  } catch (err) {
    throw new Error("Internal Error");
  }
};

export const getLikedHighlightsByUser = async (userId: string) => {
  try {
    const likedHighlights = await db.like.findMany({
      where: {
        userId,
      },
      include: {
        highlight: {
          include: {
            sport: true,
          },
        },
      },
    });

    const extractedHighlights = likedHighlights.map(
      ({ highlight }) => highlight
    );

    return extractedHighlights;
  } catch (err) {
    throw new Error("Internal Error");
  }
};

export const isLikingHighlight = async (highlightId: string) => {
  try {
    const self = await getSelf();

    const highlight = await db.highlight.findUnique({
      where: { id: highlightId },
      include: { likes: true },
    });

    if (!highlight) {
      throw new Error("Highlight Not Found");
    }

    // Check if the user is following the sport
    const likedHighlight = await db.like.findFirst({
      where: {
        userId: self?.id,
        highlightId: highlight.id,
      },
    });

    if (likedHighlight) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

export const likeHighlight = async (highlightId: string) => {
  const self = await getSelf();

  const highlight = await db.highlight.findUnique({
    where: { id: highlightId },
    include: { likes: true },
  });

  if (!highlight) {
    throw new Error("Highlight Not Found");
  }

  // Check if the user has liked the highlight
  const existingLike = await db.like.findFirst({
    where: {
      userId: self?.id,
      highlightId: highlight.id,
    },
  });

  if (existingLike) {
    throw new Error("Already Liked Highlight");
  }

  const like = await db.like.create({
    data: {
      userId: self!.id,
      highlightId: highlight.id,
    },
    include: {
      user: true,
      highlight: {
        include: {
          sport: true,
        },
      },
    },
  });

  return like;
};

export const unlikeHighlight = async (highlightId: string) => {
  const self = await getSelf();

  const highlight = await db.highlight.findUnique({
    where: { id: highlightId },
    include: { likes: true },
  });

  if (!highlight) {
    throw new Error("Highlight Not Found");
  }

  // Check if the user has liked the highlight
  const existingLike = await db.like.findFirst({
    where: {
      userId: self?.id,
      highlightId: highlight.id,
    },
  });

  if (!existingLike) {
    throw new Error(`${self?.username} hasn't Liked This Highlight`);
  }

  const like = await db.like.delete({
    where: {
      id: existingLike.id,
    },
    include: {
      user: true,
      highlight: {
        include: {
          sport: true,
        },
      }
    },
  });

  return like;
};

import { db } from "@/lib/db";

import { getSelf } from "@/lib/auth-service";
import getVideoIdFromUrl from "@/utils/getYoutubeId";

export const getHighlights = async (sportId: string) => {
  let highlights;

  try {
    highlights = await db.highlight.findMany({
      where: {
        sportId,
      },
      include: {
        likes: {
          include: {
            user: true,
          },
        },
        sport: true,
      },
    });
  } catch {
    highlights = null;
  }
  return highlights;
};

export const getHighlightById = async (id: string) => {
  let highlight = await db.highlight.findUnique({
    where: {
      id,
    },
    include: {
      likes: {
        include: {
          user: true,
        },
      },
      sport: true,
      chatroom: {
        include: {
          messages: true,
        },
      },
    },
  });
  return highlight;
};

export const getRandomRecentHighlights = async () => {
  let highlights;

  try {
    highlights = await db.highlight.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        likes: {
          include: {
            user: true,
          },
        },
        sport: true,
      },
    });

    // shuffle highlights
    highlights.sort(() => Math.random() - 0.5);
  } catch (err) {
    console.error("Error fetching recent highlights:", err);
    throw err;
  }
  return highlights;
};

export const createHighlight = async (
  sport: string,
  description: string,
  videoUrl: string
) => {
  const sportName = await db.sport.findFirst({
    where: {
      name: sport,
    },
  });

  if (!sportName) {
    throw new Error("Sport does not exist");
  }

  const youtubeId = getVideoIdFromUrl(videoUrl);

  if (!youtubeId) {
    throw new Error("Invalid youtube URL");
  }

  const highlight = await db.highlight.create({
    data: {
      description,
      youtubeId,
      sportId: sportName.id,
      url: videoUrl,
    },
  });

  if (!highlight) {
    throw new Error("Error creating highlight");
  }

  await db.chatroom.create({
    data: {
      highlightId: highlight.id,
    },
  });

  return highlight;
};

// model Highlight {
//   id          String   @id @default(uuid())
//   url         String
//   description String   @db.Text
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt
//   youtubeId   String
//   sportId     String
//   sport       Sport    @relation(fields: [sportId], references: [id])

//   chatroom Chatroom?

//   likes Like[] @relation(name: "HighlightLikes")

//   @@index([sportId])
// }

export const getRecentHighlights = async (cursor: string | null = null) => {
  // let highlights;
  // try {
  //   if (cursor !== null) {
  //     highlights = await db.highlight.findMany({
  //       take: 10,
  //       cursor: {
  //         id: cursor
  //       },
  //       orderBy: {
  //         createdAt: 'desc'
  //       }
  //     })
  //     return highlights;
  //   } else {
  //     highlights = await db.highlight.findMany({
  //       take: 10,
  //       orderBy: {
  //         createdAt: 'desc',
  //       },
  //     })
  //     return highlights;
  //   }
  // } catch (err) {
  //   console.error('Error fetching recent highlights:', err);
  //   throw err;
  // }
};

// export const getHighlightsByUserFollows = async (cursor: string | null = null) => {
//   let highlights;

//   const user = await getSelf();

//   try {
//     if (cursor !== null) {
//       highlights = await db.highlight.findMany({
//         take: 10,
//         where: {

//         }
//         cursor: {
//           id: cursor
//         },
//         orderBy: {
//           createdAt: 'desc'
//         }
//       })
//       return highlights;
//     } else {
//       highlights = await db.highlight.findMany({
//         take: 10,
//         orderBy: {
//           createdAt: 'desc',
//         },
//       })
//       return highlights;
//     }
//   }

// }

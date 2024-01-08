import { db } from "@/lib/db";

import { getSelf } from "@/lib/auth-service";

export const getHighlights = async (sportId: string) => {
  let highlights;

  try {
    highlights = await db.highlight.findMany({
      where: {
        sportId,
      },
      include: {
        likes: true,
        sport: true,
      }
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
        likes: true,
        sport: true,
        chatroom: {
          include: {
            messages: true,
          }
        }
      }
    });
  return highlight;
}

export const getRandomRecentHighlights = async () => {
  let highlights;

  try {
    highlights = await db.highlight.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        likes: true,
        sport: true,
      }
    })

    // shuffle highlights
    highlights.sort(() => Math.random() - 0.5);
  } catch (err) {
    console.error('Error fetching recent highlights:', err);
    throw err;
  }
  return highlights;
}

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
}

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

import { db } from "@/lib/db";

// import { getSelf } from "@/lib/auth-service";

export const getHighlights = async (sport: string) => {
  let highlights;

  try {
    highlights = await db.highlight.findMany({
      where: {
        sport: sport,
      },
    });
  } catch {
    highlights = null;
  }
  return highlights;
};

export const getRecentHighlights = async (cursor: string | null = null) => {
  let highlights; 

  try {
    if (cursor !== null) {
      highlights = await db.highlight.findMany({
        take: 10,
        cursor: {
          id: cursor
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
      return highlights;
    } else {
      highlights = await db.highlight.findMany({
        take: 10,
        orderBy: {
          createdAt: 'desc',
        },
      })
      return highlights;
    }
  } catch (err) {
    console.error('Error fetching recent highlights:', err);
    throw err;
  }
}

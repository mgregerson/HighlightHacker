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

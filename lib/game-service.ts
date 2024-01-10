import { db } from "@/lib/db";



export const getGames = async () => {
  let games;

  try {
    games = await db.game.findMany();
  } catch {
    games = null;
  }

    return games;
};


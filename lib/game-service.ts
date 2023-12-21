import { db } from "@/lib/db";

// import { getSelf } from "@/lib/auth-service";

export const getGames = async () => {
  let games;

  try {
    games = await db.game.findMany();
  } catch {
    games = null;
  }

    return games;
};

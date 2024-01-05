import { db } from "@/lib/db";

export async function importSportsData(games: any[]) {
  try {
    const addedGames = [];
      for (let game of games){
        const createdGame = await db.highlight.create({
            data: {
              url: game.url,
              description: game.description,
              youtubeId: game.youtubeId,
              sportId: game.sportId
            },
          });
          // Log success message
          console.log(`Successfully created a new game with ID: ${createdGame.id}`);
          addedGames.push(createdGame);
    }
    return addedGames;
  } catch (error) {
    console.error("Error importing data:", error);
  }
}
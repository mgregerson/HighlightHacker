'use server';

import { importSportsData } from "@/lib/add-game-service";

import { revalidatePath } from "next/cache";

export const addGames = async (games: any[]) => {
    const addedGames = await importSportsData(games);

    revalidatePath('/');
    console.log('addedGames=', addedGames)

    return addedGames;
}


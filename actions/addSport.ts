'use server';

import { newSport } from "@/lib/sport-service";
// import { importSportsData } from "@/lib/add-game-service";

import { revalidatePath } from "next/cache";

// export const addGames = async (games: any[]) => {
//     const addedGames = await importSportsData(games);

//     revalidatePath('/');
//     console.log('addedGames=', addedGames)

//     return addedGames;
// }

export const addSport = async (name: string, imageUrl: string) => {
    const addedSport = await newSport(name, imageUrl);

    revalidatePath('/');

    if (addedSport) {
        revalidatePath('/(dashboard)/users/[username]/(home)', 'page')
    }

    return addedSport;
}
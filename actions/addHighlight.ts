'use server';

import { createHighlight } from "@/lib/highlight-service";

import { revalidatePath } from "next/cache";

export const addHighlight = async (sport: string, description: string, videoUrl: string) => {
    const addedSport = await createHighlight(sport, description, videoUrl);

    revalidatePath('/');

    if (addedSport) {
        revalidatePath('/(dashboard)/users/[username]/(home)', 'page')
    }

    return addedSport;
}

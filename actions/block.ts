'use server';

import { blockSport, unblockSport } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
    // TODO: Adapt to disconnect from live stream.
    // TODO: Allow ability to kick a guest.
    const blockedSport = await blockSport(id);

    console.log('blockedSport in onBlock function', blockedSport)

    revalidatePath('/');

    if (blockedSport) {
        revalidatePath(`/${blockedSport.blockedSport.name}`)
    }

    return blockedSport;
}

export const onUnblock = async (id: string) => {
    const unblockedSport = await unblockSport(id);

    revalidatePath('/');

    if (unblockedSport) {
        revalidatePath(`/${unblockedSport.blockedSport.name}`)
    }

    return unblockedSport;
}


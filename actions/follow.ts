"use server";

import { revalidatePath } from "next/cache";

import { followSport, unfollowSport } from "@/lib/follow-service";

export const onFollow = async (id: string) => {
  try {
    const followedSport = await followSport(id);

    revalidatePath("/");
    if (followedSport) {
        revalidatePath(`/${followedSport.beingFollowed.name}`)
    }
    return followedSport;
  } catch (error) {
    throw new Error("Internal Error");
  }
};

export const onUnfollow = async (id: string) => {
    try {
        const unfollowedSport = await unfollowSport(id);
    
        revalidatePath("/");
        if (unfollowedSport) {
            revalidatePath(`/${unfollowedSport.beingFollowed.name}`)
        }
        return unfollowedSport;
    } catch (error) {
        throw new Error("Internal Error");
    }
}
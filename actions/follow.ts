"use server";

import { revalidatePath } from "next/cache";

import { followSport } from "@/lib/follow-service";

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

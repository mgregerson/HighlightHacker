"use server";

import { revalidatePath } from "next/cache";

import { likeHighlight, unlikeHighlight } from "@/lib/like-service";

export const isLiking = async (id: string) => {
    try {
        const likedHighlight = await likeHighlight(id);
    
        return likedHighlight;
    } catch (error) {
        throw new Error("Internal Error");
    }
}

export const onLike = async (id: string) => {
  try {
    const likedHighlight = await likeHighlight(id);

    revalidatePath("/");
    if (likedHighlight) {
        revalidatePath(`/${likedHighlight.highlight.sport}`)
    }
    return likedHighlight;
  } catch (error) {
    throw new Error("Internal Error");
  }
};

export const onUnlike = async (id: string) => {
    try {
        const unlikedHighlight = await unlikeHighlight(id);
    
        revalidatePath("/");
        if (unlikedHighlight) {
            revalidatePath(`/${unlikedHighlight.highlight.sport}`)
        }
        return unlikedHighlight;
    } catch (error) {
        throw new Error("Internal Error");
    }
}
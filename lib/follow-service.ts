import { db } from "./db";

import { getSelf } from "@/lib/auth-service";

export const getFollowedSports = async () => {
  try {
    const self = await getSelf();

    if (!self) {
      return [];
    }

    const followedSports = await db.follow.findMany({
      where: { followerId: self.id },
      include: { beingFollowed: true },
    });

    return followedSports;
  } catch {
    return [];
  }
}

export const isFollowingSport = async (sportId: string) => {
  try {
    const self = await getSelf();

    const sport = await db.sport.findUnique({
      where: { id: sportId },
      include: { followedBy: true },
    });

    if (!sport) {
      throw new Error("Sport Not Found");
    }

    // Check if the user is following the sport
    const isFollowing = sport.followedBy.some(
      (follower) => follower.followerId === self?.id
    );

    return isFollowing;
  } catch {
    return false;
  }
};


export const followSport = async (sportId: string) => {
    const self = await getSelf();

    const sport = await db.sport.findUnique({
        where: { id: sportId },
        include: { followedBy: true },
    });

    if (!sport) {
        throw new Error("Sport Not Found");
    }

    // Check if the user is following the sport
    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self?.id,
            sportId: sport.id,
        }
    });

    if (existingFollow){
        throw new Error("Already Following");
    }

    const follow = await db.follow.create({
        data: {
            followerId: self!.id,
            sportId: sport.id,
            sportName: sport.name
        },
        include: {
            follower: true,
            beingFollowed: true,
        }
    })

    return follow;
}

export const unfollowSport = async (sportId: string) => {
    const self = await getSelf();

    const sport = await db.sport.findUnique({
        where: { id: sportId },
        include: { followedBy: true },
    });

    if (!sport) {
        throw new Error("Sport Not Found");
    }

    // Check if the user is following the sport
    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self?.id,
            sportId: sport.id,
        }
    });

    if (!existingFollow){
        throw new Error("Not Following");
    }

    const follow = await db.follow.delete({
        where: {
            id: existingFollow.id
        },
        include: {
            follower: true,
            beingFollowed: true,
        }
    })

    return follow;
}
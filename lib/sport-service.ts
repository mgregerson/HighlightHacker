import { db } from "@/lib/db";

import { getSelf } from "@/lib/auth-service";

export const getSports = async () => {
  let sports;

  const self = await getSelf();

  if (!self) {
    sports = await db.sport.findMany();
    return sports;
  }

  try {
    sports = await db.sport.findMany({
      where: {
        followedBy: {
          every: {
            NOT: {
              followerId: self.id,
            },
          },
        },
        blockedBy: {
          every: {
            NOT: {
              blockerId: self.id,
            },
          },
        },
      },
    });
  } catch {
    sports = null;
  }
  return sports;
};

export const getAllSports = async () => {
  try {
    const sports = await db.sport.findMany();
    // Return an array of sport names
    return sports.map((sport) => sport.name);
  } catch (error) {
    console.error("Error fetching sports:", error);
    // Return null or handle the error as needed
    return null;
  }
};

export const getSportByName = async (sportName: string) => {
  let sport;
  try {
    sport = await db.sport.findFirst({
      where: { name: sportName },
    });
  } catch {
    sport = null;
  }
  return sport;
};

export const newSport = async (name: string, imageUrl: string) => {
  const existingSport = await getSportByName(name);

  if (existingSport) {
    throw new Error("This sport already exists on HighlightHacker!");
  }

  const newSport = await db.sport.create({
    data: {
      name,
      imageUrl,
    },
  });

  return newSport;
};

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
            }
          }
        }
      },
    });
  } catch {
    sports = null;
  }
  return sports;
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


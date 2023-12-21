import { db } from "@/lib/db";

// import { getSelf } from "@/lib/auth-service";

export const getSports = async () => {
  let sports;

  try {
    sports = await db.sport.findMany();
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


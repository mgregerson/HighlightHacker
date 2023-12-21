import { getSelf } from "./auth-service";

import { db } from "@/lib/db";

export const isSportBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf();

    if (!self) {
      throw new Error("User not found");
    }

    const sport = await db.sport.findUnique({
      where: { id },
    });

    if (!sport) {
      throw new Error("Sport not found");
    }

    const isBlocked = await db.block.findUnique({
      where: {
        blockerId_blockedSportId: {
          blockerId: self.id,
          blockedSportId: sport.id,
        },
      },
    });

    return !!isBlocked;
  } catch {
    return false;
  }
};

export const blockSport = async (id: string) => {
  const self = await getSelf();

  if (!self) {
    throw new Error("User not found");
  }

  const sport = await db.sport.findUnique({
    where: { id },
  });

  if (!sport) {
    throw new Error("Sport not found");
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedSportId: {
        blockerId: self.id,
        blockedSportId: sport.id,
      },
    },
  });

  if (existingBlock) {
    throw new Error("Sport already being ignored");
  }

  const blockedSport = await db.block.create({
    data: {
      blockerId: self.id,
      blockedSportId: sport.id,
    },
    include: {
      blockedSport: true,
    },
  });

  return blockedSport;
};

export const unblockSport = async (id: string) => {
  const self = await getSelf();

  if (!self) {
    throw new Error("User not found");
  }

  const sport = await db.sport.findUnique({
    where: { id },
  });

  if (!sport) {
    throw new Error("Sport not found");
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedSportId: {
        blockerId: self.id,
        blockedSportId: sport.id,
      },
    },
  });

  if (!existingBlock) {
    throw new Error("Sport is not being ignored");
  }

  const unblockedSport = await db.block.delete({
    where: {
      blockerId_blockedSportId: {
        blockerId: self.id,
        blockedSportId: sport.id,
      },
    },
    include: {
      blockedSport: true,
    },
  });

  return unblockedSport;
};

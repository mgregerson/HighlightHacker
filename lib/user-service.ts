import { db } from "@/lib/db";

export const getUserByUserName = async (username: string) => {
    let user;
    try {
        user = await db.user.findUnique({
            where: { username },
        });
    }
    catch {
        user = null;
    }
    return user;
}



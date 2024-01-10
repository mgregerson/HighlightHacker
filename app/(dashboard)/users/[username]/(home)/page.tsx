import { currentUser } from "@clerk/nextjs";

import { getUserByUserName } from "@/lib/user-service";

import { getLikedHighlightsByUser } from "@/lib/like-service";
import Highlights from "@/components/highlights/highlights";
import Link from "next/link";

interface CreatorPageProps {
  params: {
    username: string;
  };
}

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const externalUser = await currentUser();
  const user = await getUserByUserName(params.username);

  const myHighlights = await getLikedHighlightsByUser(user!.id);

  if (!user || user.externalUserId !== externalUser?.id) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="h-full p-4 flex flex-col space-y-4">
      <p className="text-center pt-5">User: {user.username}</p>
      <div className="flex flex-row space-x-10 justify-center items-center">
        <Link
          href={`/users/${user.username}/add-highlight`}
          className="bg-slate-200 px-4 py-2 rounded inline-block no-underline text-slate-800 hover:bg-slate-500"
        >
          Add Highlight
        </Link>
        <Link
          href={`/users/${user.username}/add-sport`}
          className="bg-slate-200 text-slate-800 px-4 py-2 rounded inline-block no-underline hover:bg-slate-500"
        >
          Add Sport
        </Link>
      </div>
      {myHighlights.length > 0 ? (
        <Highlights highlights={myHighlights} userId={user.externalUserId} />
      ) : (
        <div className="flex text-center justify-center">No highlights yet</div>
      )}
    </div>
  );
};

export default CreatorPage;

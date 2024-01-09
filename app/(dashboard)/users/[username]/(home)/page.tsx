import { currentUser } from "@clerk/nextjs";

import { getUserByUserName } from "@/lib/user-service";

import AddHighlightForm from "../_components/AddHighlightForm";
import {
  getLikedHighlights,
  getLikedHighlightsByUser,
} from "@/lib/like-service";
import Highlights from "@/components/highlights/highlights";
import AddSportForm from "../_components/AddSportForm";
import { getAllSports } from "@/lib/sport-service";

interface CreatorPageProps {
  params: {
    username: string;
  };
}

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const externalUser = await currentUser();
  const user = await getUserByUserName(params.username);

  const myHighlights = await getLikedHighlightsByUser(user!.id);
  const currentSports = await getAllSports();

  if (!user || user.externalUserId !== externalUser?.id) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="h-full p-4 flex flex-col space-y-4">
      <p className="text-center pt-5">User: {user.username}</p>
      {currentSports ? <AddHighlightForm sports={currentSports} /> : null}

      <AddSportForm />
      {myHighlights.length > 0 ? (
        <Highlights highlights={myHighlights} />
      ) : (
        <div className="flex text-center justify-center">No highlights yet</div>
      )}
    </div>
  );
};

export default CreatorPage;
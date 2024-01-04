import { currentUser } from "@clerk/nextjs";

import { getUserByUserName } from "@/lib/user-service";

import AddHighlightForm from "../_components/addHighlightForm";
import { getLikedHighlights, getLikedHighlightsByUser } from "@/lib/like-service";
import Highlights from "@/app/(browse)/[sport]/_components/highlights";
import { getHighlights } from "@/lib/highlight-service";

interface CreatorPageProps {
  params: {
    username: string;
  };
};

const CreatorPage = async ({
  params,
}: CreatorPageProps) => {
  const externalUser = await currentUser();
  const user = await getUserByUserName(params.username);

  const myHighlights = await getLikedHighlightsByUser(user!.id);

  console.log("myHighlights=", myHighlights);

  if (!user || user.externalUserId !== externalUser?.id) {
    throw new Error("Unauthorized");
  }

  return ( 
    <div className="h-full">
      <p className="text-center pt-5">User: {user.username}</p>
      {/* <AddHighlightForm /> */}
      <Highlights highlights={myHighlights} />
    </div>
  );
}
 
export default CreatorPage;
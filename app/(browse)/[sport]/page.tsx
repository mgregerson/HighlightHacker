import { isFollowingSport } from "@/lib/follow-service";
import { getSportByName } from "@/lib/sport-service";
import { notFound } from "next/navigation";
import Actions from "./_components/actions";
import { isSportBlockedByUser } from "@/lib/block-service";
import Highlights from "./_components/highlights";
import { getHighlights } from "@/lib/highlight-service";
import { currentUser } from "@clerk/nextjs";

interface SportPageProps {
  params: {
    sport: string;
  };
}

async function SportPage({ params }: SportPageProps) {
  const sport = await getSportByName(params.sport);

  const user = await currentUser();

  if (!sport) {
    notFound();
  }

  const isFollowing = await isFollowingSport(sport.id);
  const isBlocking = await isSportBlockedByUser(sport.id);
  const highlights = await getHighlights(sport.id);

  return (
    <div className="flex flex-col gap-y-[100px] ">
      <Actions
        isFollowing={isFollowing}
        isBlocking={isBlocking}
        sportId={sport.id}
      />
      {highlights && <Highlights highlights={highlights} userId={user?.id} />}
    </div>
  );
}

export default SportPage;

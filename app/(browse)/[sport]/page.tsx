import { isFollowingSport } from "@/lib/follow-service";
import { getSportByName } from "@/lib/sport-service";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import FollowButton from "@/components/FollowButton";
import Actions from "./_components/actions";
import { isSportBlockedByUser } from "@/lib/block-service";
import Highlights from "./_components/highlights";
import { importSportsData } from "@/lib/add-game-service";
import addGamesButton from "./_components/importGame";
import { getHighlights } from "@/lib/highlight-service";

interface SportPageProps {
  params: {
    sport: string;
  };
}

async function SportPage({ params }: SportPageProps) {
  const sport = await getSportByName(params.sport);

  if (!sport) {
    notFound();
  }

  const isFollowing = await isFollowingSport(sport.id);
  const isBlocking = await isSportBlockedByUser(sport.id);
  const highlights = await getHighlights(sport.name);

  console.log("isBlocking=", isBlocking);

  return (
    <div className="flex flex-col gap-y-4">
      <Actions
        isFollowing={isFollowing}
        isBlocking={isBlocking}
        sportId={sport.id}
      />
      {highlights && <Highlights highlights={highlights} />}
    </div>
  );
}

export default SportPage;

import { isFollowingSport } from "@/lib/follow-service";
import { getSportByName } from "@/lib/sport-service";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import FollowButton from "@/components/FollowButton";
import Actions from "./_components/actions";
import { isSportBlockedByUser } from "@/lib/block-service";

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

  console.log('isBlocking=', isBlocking)

  return (
    <div className="flex flex-col gap-y-4">
      <p>Sport: {sport?.name}</p>
      <p>Sport ID: {sport.id}</p>
      <p>Is Following: {`${isFollowing}`}</p>
      <Actions isFollowing={isFollowing} isBlocking={isBlocking} sportId={sport.id}/>
    </div>
  );
}

export default SportPage;

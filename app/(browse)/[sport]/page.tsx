import { isFollowingSport } from "@/lib/follow-service";
import { getSportByName } from "@/lib/sport-service";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import FollowButton from "@/components/FollowButton";
import Actions from "./_components/actions";

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

  console.log('isFollowing in sportpage=', isFollowing)

  return (
    <div className="flex flex-col gap-y-4">
      <p>Sport: {sport?.name}</p>
      <p>Sport ID: {sport.id}</p>
      <p>Is Following: {`${isFollowing}`}</p>
      <Actions isFollowing={isFollowing} sportId={sport.id}/>
    </div>
  );
}

export default SportPage;

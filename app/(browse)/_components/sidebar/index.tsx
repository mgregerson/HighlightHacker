import { getRecommended } from "@/lib/recommended-service";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { Toggle, ToggleSkeleton } from "./toggle";
import Wrapper from "./wrapper";
import { getGames } from "@/lib/game-service";
import { Sports, SportsSkeleton } from "./sports";
import { getSports } from "@/lib/sport-service";
import { getFollowedSports } from "@/lib/follow-service";
import Following, { FollowingSkeleton } from "./following";

export async function Sidebar() {
  // const recommended = await getRecommended();
  const followedSports = await getFollowedSports();
  const sports = await getSports();

  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={followedSports} />
        <Sports data={sports!} />
      </div>
    </Wrapper>
  );
}

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <SportsSkeleton />
    </aside>
  );
};

export default Sidebar;

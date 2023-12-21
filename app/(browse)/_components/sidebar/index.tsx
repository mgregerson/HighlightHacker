import { getRecommended } from "@/lib/recommended-service";
import { Recommended, RecommendedSkeleton } from "./recommended";
import {Toggle, ToggleSkeleton} from "./toggle";
import Wrapper from "./wrapper";
import { getGames } from "@/lib/game-service";
import { Sports } from "./sports";
import { getSports } from "@/lib/sport-service";


export async function Sidebar() {
  // Can fetch followed users
  const recommended = await getRecommended();
  // Fetch recommended users
  const sports = await getSports();

  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Recommended data={recommended} />
        {sports !== null && <Sports data={sports} />}
      </div>
    </Wrapper>
  );
}

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <ToggleSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};

export default Sidebar;

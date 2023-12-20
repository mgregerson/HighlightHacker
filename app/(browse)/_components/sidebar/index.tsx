import { getRecommended } from "@/lib/recommended-service";
import { Recommended, RecommendedSkeleton } from "./recommended";
import {Toggle, ToggleSkeleton} from "./toggle";
import Wrapper from "./wrapper";
import { getGames } from "@/lib/game-service";
import { Sports } from "./sports";

export interface Game {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  sportId: string;
}

export async function Sidebar() {
  // Can fetch followed users
  const recommended = await getRecommended();
  // Fetch recommended users
  const games = await getGames();

  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Recommended data={recommended} />
        {games !== null && <Sports data={games as Game[]} />}
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

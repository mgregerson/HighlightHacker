'use client';

import { Button } from "./ui/button";
import { followSport } from "@/lib/follow-service";

interface FollowButtonProps {
  sportId: string;
}

function FollowButton({ sportId }: FollowButtonProps) {

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    await followSport(sportId);
  };

  return (
   <button className="" onClick={handleClick}>
      Follow
    </button>
  );
}

export default FollowButton;

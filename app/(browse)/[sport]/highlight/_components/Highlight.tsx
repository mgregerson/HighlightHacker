

import { Highlight } from "@prisma/client";
import { isLikingHighlight } from "@/lib/like-service";
import LikeActions from "@/app/(browse)/[sport]/_components/likeActions";
import HighlightVideo from "./HighlightVideo";
import { usePathname } from 'next/navigation'

interface HighlightProps {
  highlight: Highlight;
}

async function HighlightPage({ highlight }: HighlightProps) {
  const isLiking = await isLikingHighlight(highlight.id);

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      {/* <h1 className="text-2xl font-bold mb-4 text-blue-700">{highlight.title}</h1> */}
      <HighlightVideo highlight={highlight} />
      <LikeActions isLiking={isLiking} highlightId={highlight.id} />
    </div>
  );
}

export default HighlightPage;

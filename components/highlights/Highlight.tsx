import { Highlight, Like, Sport } from "@prisma/client";
import LikeActions from "@/app/(browse)/[sport]/_components/likeActions";
import HighlightVideo from "./HighlightVideo";
import { extendedHighlight } from "./highlights";

interface HighlightProps {
  highlight: extendedHighlight;
  userId?: string | undefined;
}

function HighlightPage({ highlight, userId }: HighlightProps) {
  const isLiking = true;


  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <HighlightVideo highlight={highlight} />
      <LikeActions isLiking={isLiking} highlightId={highlight.id} />
    </div>
  );
}

export default HighlightPage;
 
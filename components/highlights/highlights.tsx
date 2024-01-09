import { Highlight, Like, Sport, User } from "@prisma/client";
import { CarouselDemo } from "./Carousel";

export interface extendedLike extends Like {
  user: User;
}

export interface extendedHighlight extends Highlight {
  likes?: extendedLike[];
  sport: Sport;
}
interface HighlightsProps {
  highlights: extendedHighlight[];
  userId?: string | undefined;
}


function Highlights({ highlights, userId }: HighlightsProps) {
  return (
    <div className="flex items-center justify-center h-screen">
      <CarouselDemo highlights={highlights} userId={userId} />
    </div>
  );
}

export default Highlights;

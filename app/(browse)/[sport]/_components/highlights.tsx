import { Highlight } from "@prisma/client";
import { CarouselDemo } from "./Carousel";
import { User } from "@clerk/nextjs/server";

interface HighlightsProps {
  highlights: Highlight[];
  userId: string | undefined;
}

function Highlights({ highlights, userId }: HighlightsProps) {
  return (
    <div className="flex items-center justify-center h-screen">
      <CarouselDemo highlights={highlights} userId={userId} />
    </div>
  );
}

export default Highlights;

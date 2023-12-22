"use client";

import HighlightPage from "@/components/Highlight";
import { Highlight } from "@prisma/client";

interface HighlightsProps {
    highlights: Highlight[];
}

function Highlights({highlights}: HighlightsProps) {

  return (
    <div>
      {highlights.map((highlight) => (
        <HighlightPage key={highlight.id} highlight={highlight} />
      ))}
    </div>
  );
}

export default Highlights;

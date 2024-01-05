import { Highlight } from "@prisma/client";
import Link from "next/link";

interface HighlightProps {
  highlight: Highlight;
}

function HighlightDescription({ highlight }: HighlightProps) {

    function getShortenedDescription(description: string) {
        if (description.length > 100) {
            return description.substring(0, 100) + "...";
        }
        return description;
    }

  return (
    <Link href={`/${highlight.sportId}/highlight/${highlight.id}`}>
      <p className="text-gray-600 mt-4">{getShortenedDescription(highlight.description)}</p>
    </Link>
  );
}

export default HighlightDescription;

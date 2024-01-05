import Link from "next/link";
import { extendedHighlight } from "./highlights";

interface HighlightDescriptionPros {
    highlight: extendedHighlight;
}

function HighlightDescription({ highlight }: HighlightDescriptionPros) {

  function getShortenedDescription(description: string) {
    if (description.length > 100) {
      return description.substring(0, 100) + "...";
    }
    return description;
  }

  return (
    <Link href={`/${highlight.sport.name}/highlight/${highlight.id}`}>
      <p className="text-gray-600 mt-4">
        {getShortenedDescription(highlight.description)}
      </p>
    </Link>
  );
}

export default HighlightDescription;

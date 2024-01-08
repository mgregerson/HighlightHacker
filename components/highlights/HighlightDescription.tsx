"use client";

import Link from "next/link";
import { useState } from "react";
import { extendedHighlight } from "./highlights";
import { Hint } from "../hint";

interface HighlightDescriptionPros {
  highlight: extendedHighlight;
  showHint?: boolean;
}

function HighlightDescription({ highlight, showHint = true }: HighlightDescriptionPros) {
  const [isHovered, setIsHovered] = useState(false);

  function getShortenedDescription(description: string) {
    if (description.length > 100) {
      return description.substring(0, 100) + "...";
    }
    return description;
  }

  return (
    <Link href={`/${highlight.sport.name}/highlight/${highlight.id}`}>
      {showHint ? (
        <Hint label="Visit this highlight" side="top" asChild>
          <div
            className={`text-gray-600 mt-4 p-2 ${
              isHovered ? "bg-[#f0f0f0]" : ""
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <p>{getShortenedDescription(highlight.description)}</p>
          </div>
        </Hint>
      ) : (
        <div
          className={`text-gray-600 mt-4 p-2 ${
            isHovered ? "bg-[#f0f0f0]" : ""
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <p>{getShortenedDescription(highlight.description)}</p>
        </div>
      )}
    </Link>
  );
}

export default HighlightDescription;

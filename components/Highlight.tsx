"use client";
import { Highlight } from "@prisma/client";
import YouTube, { YouTubeProps } from "react-youtube";

interface HighlightProps {
  highlight: Highlight;
}

function HighlightPage({ highlight }: HighlightProps) {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      {/* <h1 className="text-2xl font-bold mb-4 text-blue-700">{highlight.title}</h1> */}
      <div className="flex justify-center">
        <YouTube
          videoId={highlight.youtubeId}
          opts={opts}
          onReady={onPlayerReady}
        />
      </div>
      <p className="text-gray-600 mt-4">{highlight.description}</p>
    </div>
  );
}

export default HighlightPage;

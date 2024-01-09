import React, { useEffect, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import HighlightDescription from "./HighlightDescription";
import { extendedHighlight } from "./highlights";
import { Skeleton } from "../ui/skeleton";

interface HighlightProps {
  highlight: extendedHighlight;
}

function HighlightVideo({ highlight }: HighlightProps) {
  const [isPlayerReady, setPlayerReady] = useState(false);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "400",
    width: "550",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setPlayerReady(true);
    }, 2500);
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      {isPlayerReady ? (
        <>
          <div className="flex justify-center">
            <YouTube
              videoId={highlight.youtubeId}
              opts={opts}
              onReady={onPlayerReady}
            />
          </div>
          <HighlightDescription highlight={highlight} />
        </>
      ) : (
        <HighlightVideoSkeleton />
      )}
    </div>
  );
}

export const HighlightVideoSkeleton = () => {
  return (
    <div className="flex flex-col justify-center">
      <Skeleton className="h-[400px] w-[550px]" />
      <Skeleton className="h-[60px] w-[550px] mt-4" />
    </div>
  );
};

export default HighlightVideo;

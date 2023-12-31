"use client";

import YouTube, { YouTubeProps } from "react-youtube";
import HighlightDescription from "./HighlightDescription";
import { extendedHighlight } from "./highlights";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
// import Chat from "@/app/(browse)/[sport]/highlight/_components/Chat";

// const Chat = dynamic(() => import("../chat/Chat"), {
//   ssr: false,
// });

interface HighlightProps {
  highlight: extendedHighlight;
}

function ClientHighlightVideo({
  highlight,
}: HighlightProps) {

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const { collapsed } = useChatSidebar((state) => state);

  const opts: YouTubeProps["opts"] = {
    height: "400",
    width: "550",
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
        <HighlightDescription highlight={highlight} showHint={false} />
      </div>
  );
}

export default ClientHighlightVideo;

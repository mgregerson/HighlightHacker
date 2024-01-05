import React from "react";

import { useChatSidebar } from "@/store/use-chat-siderbar";
import { cn } from "@/lib/utils";
import Chat from "../_components/Chat";
import { User } from "@prisma/client";
import { getHighlightById } from "@/lib/highlight-service";
import ClientHighlightVideo from "../../../../../components/highlights/ClientHighlightVideo";

interface HighlightPageProps {
  name: string;
  user: User;
  params: {
    sport: string;
    id: string;
  };
}

async function HighlightPage({ name, user, params }: HighlightPageProps) {
  // const { collapsed } = useChatSidebar((state) => state);
  const highlight = await getHighlightById(params.id);

  return (
    <div>
      HighlightPage
      {highlight && <ClientHighlightVideo highlight={highlight} />}
    </div>
  );
}

export default HighlightPage;

// import { Highlight } from "@prisma/client";
// import YouTube, { YouTubeProps } from "react-youtube";
// import HighlightDescription from "./HighlightDescription";
// import { extendedHighlight } from "../../_components/highlights";

// interface HighlightProps {
//   highlight: extendedHighlight;
// }

// function HighlightVideo({ highlight }: HighlightProps) {
//   const onPlayerReady: YouTubeProps["onReady"] = (event) => {
//     // access to player in all event handlers via event.target
//     event.target.pauseVideo();
//   };

//   const opts: YouTubeProps["opts"] = {
//     height: "400",
//     width: "550",
//     playerVars: {
//       // https://developers.google.com/youtube/player_parameters
//       autoplay: 1,
//     },
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
//       {/* <h1 className="text-2xl font-bold mb-4 text-blue-700">{highlight.title}</h1> */}
//       <div className="flex justify-center">
//         <YouTube
//           videoId={highlight.youtubeId}
//           opts={opts}
//           onReady={onPlayerReady}
//         />
//       </div>
//       <HighlightDescription highlight={highlight} />
//     </div>
//   );
// }

// export default HighlightVideo;

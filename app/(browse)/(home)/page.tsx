import { getRandomRecentHighlights } from "@/lib/highlight-service"
import Highlights from "../../../components/highlights/highlights";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Home() {
  const recentHighlights = await getRandomRecentHighlights();

  return (
   <div className="flex flex-col gap-y-4">
    <h1 className="pt-5 text-5xl text-center">Our Most Recent Highlights</h1>
    {recentHighlights && <Highlights highlights={recentHighlights}/>}
   </div>
  )
}
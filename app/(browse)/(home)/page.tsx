import { getRecentHighlights } from "@/lib/highlight-service"
import Highlights from "../[sport]/_components/highlights";

export default async function Home() {

  const recentHighlights = await getRecentHighlights();
  
  console.log('recentHighlights=', recentHighlights)

  return (
   <div className="flex flex-col gap-y-4">
    <h1 className="pt-5 text-5xl text-center">Our Most Recent Highlights</h1>
    {recentHighlights && <Highlights highlights={recentHighlights}/>}
   </div>
  )
}

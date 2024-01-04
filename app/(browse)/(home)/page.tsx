import { getRecentHighlights } from "@/lib/highlight-service"
import Highlights from "../[sport]/_components/highlights";
import PaginatedHighlights from "../_components/paginatedHighlights";

export default async function Home() {
  const recentHighlights = await getRecentHighlights();

  return (
   <div className="flex flex-col gap-y-4">
    <h1 className="pt-5 text-5xl text-center">Our Most Recent Highlights</h1>
    {recentHighlights && <Highlights highlights={recentHighlights}/>}
    {/* <PaginatedHighlights /> */}
   </div>
  )
}

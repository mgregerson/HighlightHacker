import React from "react";
import AddHighlightForm from "./_components/AddHighlightForm";
import { getAllSports } from "@/lib/sport-service";

async function AddHighlightPage() {
  const sports = await getAllSports();

  return <div>{sports ? <AddHighlightForm sports={sports} /> : null}</div>;
}

export default AddHighlightPage;

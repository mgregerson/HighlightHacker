"use client";

import { Button } from "@/components/ui/button";
import { importSportsData } from "@/lib/add-game-service";
import Games from "../../../../videos.json";

function AddGamesButton() {
  const handleAddGames = async () => {
    try {
      await importSportsData(Games);
      console.log("Import successful!");
    } catch (error) {
      console.error("Error importing games:", error);
    }
  };

  return <Button onClick={handleAddGames}>Import Games</Button>;
}

export default AddGamesButton;

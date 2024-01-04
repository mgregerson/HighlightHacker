"use client";

import { getRecentHighlights } from "@/lib/highlight-service";
import { useState, useEffect } from "react";

function PaginatedHighlights() {
  const [cursor, setCursor] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);

  console.log('data=', data);

  useEffect(() => {
    async function fetchData(cursor: string | null = null) {
      let recentHighlights: any;
      if (cursor !== null) {
        recentHighlights = await getRecentHighlights(cursor);
      } else {
        recentHighlights = await getRecentHighlights();
      }

      return recentHighlights;
    }

    async function fetchDataAndUpdateCursor() {
      const highlights = await fetchData(cursor);
      setData((prevData) => [...prevData, ...highlights]);
      if (highlights.length > 0) {
        setCursor(highlights[highlights.length - 1].id);
      }
    }

    fetchDataAndUpdateCursor();

    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        // Adjust the offset (200) based on your requirements
        fetchDataAndUpdateCursor();
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [cursor]);

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{/* Render your item here */}</div>
      ))}
    </div>
  );
}

export default PaginatedHighlights;

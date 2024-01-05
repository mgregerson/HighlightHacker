'use client';
 
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HighlightPage from "../highlight/_components/Highlight";
import { Highlight } from "@prisma/client";

interface CarouselDemoProps {
    highlights: Highlight[];
    userId: string | undefined;
}

export function CarouselDemo({ highlights, userId }: CarouselDemoProps) {

  return (
    <Carousel className="w-full max-w-2xl">
      <CarouselContent>
        {highlights.map((highlight) => (
          <CarouselItem key={highlight.id}>
            <div className="p-1">
              <Card>
                <CardContent className="">
                  <HighlightPage highlight={highlight} userId={userId}/>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
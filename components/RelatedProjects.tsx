"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/lib/projects";

export default function RelatedProjects({ projects }: { projects: Project[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("init", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("init", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-6 active:cursor-grabbing" style={{ cursor: "grab" }}>
          {projects.map((project) => (
            <div
              key={project.slug}
              className="w-[75vw] flex-none sm:w-[46vw] md:w-[32vw] lg:w-[26vw]"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          data-cursor-hover
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 transition-colors hover:border-fire disabled:opacity-30"
          aria-label="Previous project"
        >
          &larr;
        </button>
        <button
          type="button"
          data-cursor-hover
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 transition-colors hover:border-fire disabled:opacity-30"
          aria-label="Next project"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}

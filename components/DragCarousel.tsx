"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { MediaItem } from "@/lib/projects";

export default function DragCarousel({ items }: { items: MediaItem[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [selected, setSelected] = useState(0);
  const skewRef = useRef<HTMLDivElement>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("init", onSelect);

    let lastX = 0;
    let lastT = performance.now();

    const onScroll = () => {
      const progress = emblaApi.scrollProgress();
      const now = performance.now();
      const dt = Math.max(now - lastT, 1);
      const dx = progress - lastX;
      const velocity = (dx / dt) * 1000;
      lastX = progress;
      lastT = now;

      if (skewRef.current) {
        const skew = Math.max(-6, Math.min(6, velocity * -0.4));
        skewRef.current.style.transform = `skewX(${skew}deg)`;
      }
    };
    emblaApi.on("scroll", onScroll);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("init", onSelect);
      emblaApi.off("scroll", onScroll);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full">
      <div ref={skewRef} className="overflow-hidden transition-transform duration-200 ease-out">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y gap-4 active:cursor-grabbing" style={{ cursor: "grab" }}>
            {items.map((item, i) => (
              <div
                key={i}
                className="relative aspect-[9/16] w-[70vw] flex-none overflow-hidden rounded-2xl bg-navy sm:w-[36vw] md:w-[26vw] lg:w-[20vw]"
              >
                {item.type === "video" ? (
                  <video
                    className="pointer-events-none h-full w-full object-cover"
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.src}
                    alt=""
                    draggable={false}
                    className="pointer-events-none h-full w-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {items.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === selected ? "w-6 bg-fire" : "w-1.5 bg-cream/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

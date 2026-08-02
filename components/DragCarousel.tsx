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
  const [muted, setMuted] = useState(true);
  const skewRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

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

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) video.muted = muted;
    });
  }, [muted]);

  const hasVideo = items.some((item) => item.type === "video");

  return (
    <div className="relative w-full">
      {hasVideo && (
        <button
          type="button"
          data-cursor-hover
          onClick={() => setMuted((m) => !m)}
          className="absolute top-0 right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 bg-navy-deep/70 backdrop-blur-sm transition-colors hover:border-fire"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? (
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
              <path d="M4 9v6h4l5 5V4L8 9H4Z" fill="currentColor" />
              <path d="M17 8.5 21.5 13M21.5 8.5 17 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
              <path d="M4 9v6h4l5 5V4L8 9H4Z" fill="currentColor" />
              <path
                d="M16.5 8.5a5 5 0 0 1 0 7M19 6a9 9 0 0 1 0 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      )}

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
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
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

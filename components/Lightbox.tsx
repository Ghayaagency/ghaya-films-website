"use client";

import { useEffect, useRef } from "react";
import type { MediaItem } from "@/lib/projects";

export default function Lightbox({
  item,
  onClose,
}: {
  item: MediaItem | null;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [item, onClose]);

  useEffect(() => {
    if (item?.type === "video") {
      videoRef.current?.play().catch(() => {});
    }
  }, [item]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-navy-deep/95 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        data-cursor-hover
        onClick={onClose}
        className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 transition-colors hover:border-fire"
        aria-label="Close"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <div
        className="relative max-h-[85vh] max-w-3xl overflow-hidden rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "video" && (
          <video
            ref={videoRef}
            className="max-h-[85vh] w-auto"
            src={item.src}
            loop
            playsInline
            controls
          />
        )}
        {item.type === "image" && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.src} alt="" className="max-h-[85vh] w-auto" />
        )}
        {item.type === "youtube" && (
          <iframe
            className="h-[70vh] w-[85vw] max-w-3xl"
            src={`https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}

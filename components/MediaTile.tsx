"use client";

import { useEffect, useRef, useState } from "react";
import { useSharedAudio } from "@/components/AudioContext";
import type { MediaItem } from "@/lib/projects";

export default function MediaTile({
  item,
  onExpand,
  className = "",
}: {
  item: MediaItem;
  onExpand: () => void;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [volume, setVolume] = useState(1);
  const { activeId, setActiveId } = useSharedAudio();
  const mediaId = item.type === "youtube" ? `yt:${item.id}` : item.src;
  const active = activeId === mediaId;

  useEffect(() => {
    if (item.type !== "video" || !videoRef.current) return;
    videoRef.current.muted = !active;
    videoRef.current.volume = volume;
  }, [active, volume, item.type]);

  return (
    <div
      className={`group relative flex-none overflow-hidden rounded-2xl bg-navy ${className}`}
    >
      {item.type === "video" && (
        <video
          ref={videoRef}
          className="pointer-events-none h-full w-full object-cover"
          src={item.src}
          autoPlay
          muted
          loop
          playsInline
        />
      )}
      {item.type === "image" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.src}
          alt=""
          draggable={false}
          className="pointer-events-none h-full w-full object-cover"
        />
      )}
      {item.type === "youtube" && (
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${item.id}`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="absolute top-3 right-3 flex items-center gap-2">
        {item.type === "video" && active && (
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(volume * 100)}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setVolume(Number(e.target.value) / 100)}
            className="h-1 w-16 accent-fire"
            aria-label="Volume"
          />
        )}
        {item.type === "video" && (
          <button
            type="button"
            data-cursor-hover
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setActiveId(active ? null : mediaId);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/30 bg-navy-deep/70 backdrop-blur-sm transition-colors hover:border-fire"
            aria-label={active ? "Mute" : "Unmute"}
          >
            {active ? (
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M4 9v6h4l5 5V4L8 9H4Z" fill="currentColor" />
                <path
                  d="M16.5 8.5a5 5 0 0 1 0 7M19 6a9 9 0 0 1 0 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M4 9v6h4l5 5V4L8 9H4Z" fill="currentColor" />
                <path d="M17 8.5 21.5 13M21.5 8.5 17 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        )}
        {item.type !== "youtube" && (
          <button
            type="button"
            data-cursor-hover
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onExpand();
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/30 bg-navy-deep/70 backdrop-blur-sm transition-colors hover:border-fire"
            aria-label="Expand"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
              <path
                d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
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
  const [muted, setMuted] = useState(true);

  return (
    <div
      className={`group relative flex-none overflow-hidden rounded-2xl bg-navy ${className}`}
    >
      {item.type === "video" ? (
        <video
          ref={videoRef}
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

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="absolute top-3 right-3 flex gap-2">
        {item.type === "video" && (
          <button
            type="button"
            data-cursor-hover
            onClick={(e) => {
              e.stopPropagation();
              setMuted((m) => {
                const next = !m;
                if (videoRef.current) videoRef.current.muted = next;
                return next;
              });
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/30 bg-navy-deep/70 backdrop-blur-sm transition-colors hover:border-fire"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M4 9v6h4l5 5V4L8 9H4Z" fill="currentColor" />
                <path d="M17 8.5 21.5 13M21.5 8.5 17 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
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
        <button
          type="button"
          data-cursor-hover
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
      </div>
    </div>
  );
}

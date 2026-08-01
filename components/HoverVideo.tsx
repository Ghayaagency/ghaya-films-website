"use client";

import { useRef } from "react";

export default function HoverVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => {
        const video = videoRef.current;
        if (!video) return;
        video.pause();
        video.currentTime = 0;
      }}
    />
  );
}

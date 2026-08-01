"use client";

import Link from "next/link";
import { useRef } from "react";
import { categoryLabel, socialFormatLabel, type Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor-hover
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-navy"
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => {
        const video = videoRef.current;
        if (!video) return;
        video.pause();
        video.currentTime = 0;
      }}
    >
      {project.cover.type === "video" ? (
        <video
          ref={videoRef}
          className="h-full w-full scale-105 object-cover transition-transform duration-700 group-hover:scale-110"
          src={project.cover.src}
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.cover.src}
          alt=""
          className="h-full w-full scale-105 object-cover transition-transform duration-700 group-hover:scale-110"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/10 to-transparent" />
      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-cream/30 bg-navy-deep/60 px-3 py-1 font-brandon text-[11px] uppercase tracking-widest backdrop-blur-sm">
          {categoryLabel[project.category]}
        </span>
        {project.pending && (
          <span className="rounded-full border border-fire/50 bg-fire/10 px-3 py-1 font-brandon text-[11px] uppercase tracking-widest text-fire-soft backdrop-blur-sm">
            Coming soon
          </span>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-xs uppercase tracking-widest text-cream-dim">
          {project.client}
        </p>
        <p className="mt-1 font-display text-xl">{project.title}</p>
        {project.socialFormats && (
          <p className="mt-1 text-xs text-cream-dim/70">
            {project.socialFormats.map((f) => socialFormatLabel[f]).join(" / ")}
          </p>
        )}
      </div>
    </Link>
  );
}

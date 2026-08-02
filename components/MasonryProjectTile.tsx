import Link from "next/link";
import InViewVideo from "@/components/InViewVideo";
import { categoryLabel, type Project } from "@/lib/projects";

export default function MasonryProjectTile({
  project,
  index,
  className = "",
}: {
  project: Project;
  index: number;
  className?: string;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor-hover
      className={`group flex flex-col ${className}`}
    >
      <div className="relative flex-1 overflow-hidden bg-navy">
        {project.cover.type === "video" ? (
          <InViewVideo
            className="h-full w-full scale-105 object-cover transition-transform duration-700 group-hover:scale-110"
            src={project.cover.src}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.cover.src}
            alt=""
            className="h-full w-full scale-105 object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        {project.pending && (
          <span className="absolute top-4 left-4 rounded-full border border-fire/50 bg-navy-deep/70 px-3 py-1 text-[11px] uppercase tracking-widest text-fire-soft backdrop-blur-sm">
            Coming soon
          </span>
        )}
      </div>

      <div className="mt-4 flex items-start gap-4">
        <span className="mt-1 font-brandon text-sm text-cream-dim/60">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <p className="font-display text-xl transition-colors group-hover:text-fire-soft sm:text-2xl">
            {project.title}
          </p>
          <p className="mt-1 text-xs text-cream-dim uppercase tracking-wide">
            {categoryLabel[project.category]} · {project.year}
          </p>
        </div>
      </div>
    </Link>
  );
}

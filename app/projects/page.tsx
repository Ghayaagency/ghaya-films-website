import Link from "next/link";
import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import {
  projects,
  categoryLabel,
  socialFormatLabel,
  type ProjectCategory,
  type SocialFormat,
} from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects — Ghaya Films",
};

const filters: { label: string; value: string }[] = [
  { label: "All", value: "" },
  { label: categoryLabel.documentary, value: "documentary" },
  { label: socialFormatLabel.reels, value: "reels" },
  { label: socialFormatLabel.carousels, value: "carousels" },
  { label: socialFormatLabel.images, value: "images" },
  { label: socialFormatLabel["long-form"], value: "long-form" },
];

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = category ?? "";

  const filtered = projects.filter((project) => {
    if (!active) return true;
    if (active === "documentary" || active === "social") {
      return project.category === (active as ProjectCategory);
    }
    return project.socialFormats?.includes(active as SocialFormat) ?? false;
  });

  return (
    <div className="px-6 pt-32 pb-24 md:px-10 md:pt-40 md:pb-36">
      <div className="mx-auto max-w-6xl">
        <Reveal as="h1" className="font-display text-4xl sm:text-5xl">
          Projects
        </Reveal>
        <Reveal delay={100} className="mt-4 max-w-xl text-cream-dim">
          Every project gets its own treatment &mdash; from full documentary
          pieces to reels, carousels, and stills built for social.
        </Reveal>

        <nav className="mt-10 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <Link
              key={filter.value}
              href={filter.value ? `/projects?category=${filter.value}` : "/projects"}
              data-cursor-hover
              className={`rounded-full border px-4 py-2 font-brandon text-sm uppercase tracking-wide transition-colors ${
                active === filter.value
                  ? "border-fire bg-fire/10 text-cream"
                  : "border-cream/20 text-cream-dim hover:border-cream/50 hover:text-cream"
              }`}
            >
              {filter.label}
            </Link>
          ))}
        </nav>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 3) * 100}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-cream-dim">No projects in this category yet.</p>
        )}
      </div>
    </div>
  );
}

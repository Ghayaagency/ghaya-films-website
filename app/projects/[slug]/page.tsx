import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import GhayaCTA from "@/components/GhayaCTA";
import DragCarousel from "@/components/DragCarousel";
import HoverVideo from "@/components/HoverVideo";
import RelatedProjects from "@/components/RelatedProjects";
import {
  projects,
  getProject,
  categoryLabel,
  socialFormatLabel,
} from "@/lib/projects";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Ghaya Films`,
    description: project.blurb,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const isDocumentary = project.category === "documentary";
  const otherProjects = projects.filter((p) => p.slug !== project.slug);

  return (
    <div className="pb-24 md:pb-36">
      {/* Main video / cover */}
      <section className="relative flex h-svh min-h-[560px] w-full items-end overflow-hidden">
        {project.cover.type === "video" ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={project.cover.src}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.cover.src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="relative z-10 w-full px-6 pb-12 md:px-10 md:pb-16">
          <p className="font-brandon text-xs uppercase tracking-[0.3em] text-cream-dim">
            {isDocumentary
              ? categoryLabel.documentary
              : project.socialFormats
                ? project.socialFormats.map((f) => socialFormatLabel[f]).join(" / ")
                : categoryLabel.social}
            {project.pending ? " — Coming soon" : ""}
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Credit frame — sits below the main video, film-credit style */}
      <section className="border-b border-cream/10 px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-x-12 gap-y-4">
          {project.credits.map((credit) => (
            <div key={credit.label}>
              <p className="font-brandon text-xs uppercase tracking-widest text-cream-dim">
                {credit.label}
              </p>
              <p className="mt-1 font-display text-lg">{credit.name}</p>
            </div>
          ))}
          <div>
            <p className="font-brandon text-xs uppercase tracking-widest text-cream-dim">
              Year
            </p>
            <p className="mt-1 font-display text-lg">{project.year}</p>
          </div>
          <div>
            <p className="font-brandon text-xs uppercase tracking-widest text-cream-dim">
              Role
            </p>
            <p className="mt-1 font-display text-lg">{project.role}</p>
          </div>
        </div>
      </section>

      {/* Story / blurb with glow accent */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-10 md:grid-cols-[auto_1fr]">
          <div
            className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fire shadow-[0_0_20px_6px_var(--color-fire)]"
            aria-hidden="true"
          />
          <Reveal as="p" className="max-w-2xl text-xl text-cream-dim sm:text-2xl">
            {project.blurb}
          </Reveal>
        </div>
      </section>

      {/* Gallery — treatment differs by type */}
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          {project.socialFormats?.some((f) => f === "carousels" || f === "reels") ? (
            <Reveal>
              <DragCarousel items={project.gallery} />
            </Reveal>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {project.gallery.map((item, i) => (
                <Reveal
                  key={i}
                  delay={(i % 3) * 100}
                  className={`overflow-hidden rounded-2xl bg-navy ${
                    i === 0 ? "col-span-2 aspect-video md:col-span-2" : "aspect-square"
                  }`}
                >
                  {item.type === "video" ? (
                    <HoverVideo className="h-full w-full object-cover" src={item.src} />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.src} alt="" className="h-full w-full object-cover" />
                  )}
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Explore other projects */}
      {otherProjects.length > 0 && (
        <section className="mt-24 border-t border-cream/10 px-6 pt-20 md:mt-36 md:px-10 md:pt-28">
          <div className="mx-auto max-w-6xl">
            <Reveal as="h2" className="font-display text-3xl sm:text-4xl">
              Let&rsquo;s explore other projects
            </Reveal>
            <div className="mt-10">
              <RelatedProjects projects={otherProjects} />
            </div>
          </div>
        </section>
      )}

      {/* Next / CTA */}
      <section className="mx-auto mt-24 max-w-6xl px-6 text-center md:mt-36 md:px-10">
        <Reveal>
          <p className="text-cream-dim">Have a story like this one?</p>
          <GhayaCTA className="mt-6" />
          <Link
            href="/projects"
            data-cursor-hover
            className="mt-8 block font-brandon text-sm uppercase tracking-widest text-cream-dim hover:text-cream"
          >
            &larr; Back to all projects
          </Link>
        </Reveal>
      </section>
    </div>
  );
}

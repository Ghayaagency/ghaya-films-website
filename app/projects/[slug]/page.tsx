import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import GhayaCTA from "@/components/GhayaCTA";
import HoverVideo from "@/components/HoverVideo";
import RelatedProjects from "@/components/RelatedProjects";
import ContentSections from "@/components/ContentSections";
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
  const treatment = isDocumentary
    ? categoryLabel.documentary
    : project.socialFormats
      ? project.socialFormats.map((f) => socialFormatLabel[f]).join(" / ")
      : categoryLabel.social;

  return (
    <div className="pb-24 md:pb-36">
      {/* Main video / cover — contained height, no gradient, full bleed width */}
      <section className="relative h-[45vh] max-h-[600px] min-h-[320px] w-full overflow-hidden pt-20">
        {project.cover.type === "video" ? (
          <video
            className="h-full w-full object-cover"
            src={project.cover.src}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.cover.src} alt="" className="h-full w-full object-cover" />
        )}
      </section>

      {/* Title + meta + credits, mustiymk-style info block below the video */}
      <section className="px-6 pt-10 md:px-10 md:pt-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] md:gap-16">
            <div>
              <p className="font-brandon text-xs uppercase tracking-[0.3em] text-cream-dim">
                {treatment}
                {project.pending ? " — Coming soon" : ""}
              </p>
              <h1 className="mt-3 font-display text-4xl sm:text-5xl">
                {project.title}
              </h1>
            </div>
            <Reveal as="p" className="text-lg text-cream-dim">
              {project.blurb}
            </Reveal>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-12 gap-y-4">
            <div>
              <p className="font-brandon text-xs uppercase tracking-widest text-cream-dim">
                Category
              </p>
              <p className="mt-1 font-display text-lg">{treatment}</p>
            </div>
            <div>
              <p className="font-brandon text-xs uppercase tracking-widest text-cream-dim">
                Year
              </p>
              <p className="mt-1 font-display text-lg">{project.year}</p>
            </div>
            <div>
              <p className="font-brandon text-xs uppercase tracking-widest text-cream-dim">
                Client
              </p>
              <p className="mt-1 font-display text-lg">{project.client}</p>
            </div>
          </div>

          <div className="mt-8 border-t border-cream/10 pt-8">
            <p className="font-brandon text-xs uppercase tracking-widest text-cream-dim">
              Credits
            </p>
            <div className="mt-4 flex flex-wrap gap-x-12 gap-y-4">
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
                  Role
                </p>
                <p className="mt-1 font-display text-lg">{project.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content — split by type when sections are defined, otherwise fall back */}
      <section className="px-6 pt-20 md:px-10 md:pt-28">
        <div className="mx-auto max-w-6xl">
          {project.sections ? (
            <ContentSections sections={project.sections} />
          ) : project.socialFormats?.some((f) => f === "carousels" || f === "reels") ? (
            <ContentSections sections={[{ label: "Gallery", items: project.gallery }]} />
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

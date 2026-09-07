import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import GhayaCTA from "@/components/GhayaCTA";
import ProjectCard from "@/components/ProjectCard";
import { visibleProjects } from "@/lib/projects";

const serviceGroups = [
  {
    key: "documentary",
    title: "Films & Campaigns",
    description:
      "Documentaries, branded films, interviews, and campaign stories shaped around real people and meaningful ideas.",
    cta: "View films",
  },
  {
    key: "social",
    title: "Digital Content",
    description:
      "Short-form video and visual content created for digital platforms—clear, engaging, and grounded in human stories.",
    cta: "View content",
  },
] as const;

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex h-svh min-h-[640px] w-full items-end overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/home-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="relative z-10 w-full px-6 pb-16 md:px-10 md:pb-24">
          <Image
            src="/images/logo-full.png"
            alt="Ghaya Films"
            width={527}
            height={497}
            className="mb-4 h-16 w-auto sm:h-20"
            priority
          />
          <h1 className="max-w-3xl font-display text-4xl leading-[1.05] text-balance sm:text-5xl md:text-6xl">
            Human stories come first.
          </h1>
          <p className="mt-6 max-w-xl text-sm text-cream-dim sm:text-base">
            We create films built around real people, honest experiences,
            and ideas worth sharing.
          </p>
          <GhayaCTA className="mt-10" label="Tell us your Ghaya" />
        </div>
      </section>

      {/* What is your Ghaya */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-36">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <Reveal as="h2" className="font-display text-3xl leading-tight sm:text-4xl">
            Every good film starts with listening.
          </Reveal>
          <div className="space-y-6 text-cream-dim">
            <Reveal delay={100}>
              At Ghaya Films, we take the time to understand the people
              behind each story&mdash;what matters to them, what they have
              experienced, and what deserves to be seen.
            </Reveal>
            <Reveal delay={150}>
              We then shape that into a film that feels honest, thoughtful,
              and human.
            </Reveal>
            <Reveal delay={200}>
              <Link
                href="/ghaya"
                data-cursor-hover
                className="inline-flex items-center gap-2 text-cream underline decoration-fire/60 underline-offset-4 transition-colors hover:decoration-fire"
              >
                Start a project &rarr;
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-cream/10 px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-6xl">
          <Reveal className="font-display text-3xl sm:text-4xl">
            What we create
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-6">
            {serviceGroups.map((service, i) => (
              <Reveal key={service.key} delay={i * 120}>
                <Link
                  href={`/projects?category=${service.key}`}
                  data-cursor-hover
                  className="group block rounded-2xl border border-cream/10 p-8 transition-colors hover:border-fire/50 md:p-10"
                >
                  <div
                    className="mb-6 h-2 w-2 rounded-full bg-fire transition-shadow duration-500 group-hover:shadow-[0_0_24px_6px_var(--color-fire)]"
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-2xl">{service.title}</h3>
                  <p className="mt-3 text-sm text-cream-dim">
                    {service.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-brandon text-sm uppercase tracking-widest text-cream-dim transition-colors group-hover:text-fire-soft">
                    {service.cta} <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="border-t border-cream/10 px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-6">
            <Reveal className="font-display text-3xl sm:text-4xl">
              Recent work
            </Reveal>
            <Reveal delay={100}>
              <Link
                href="/projects"
                data-cursor-hover
                className="hidden font-brandon text-sm uppercase tracking-widest text-cream-dim hover:text-cream sm:inline"
              >
                All projects &rarr;
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.slice(0, 3).map((project, i) => (
              <Reveal key={project.slug} delay={i * 120}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-cream/10 px-6 py-24 text-center md:py-36">
        <Reveal className="mx-auto max-w-2xl">
          <Image
            src="/images/logo-full.png"
            alt="Ghaya Films"
            width={527}
            height={497}
            className="mx-auto h-16 w-auto"
          />
          <h2 className="mt-4 font-display text-3xl text-balance sm:text-4xl">
            Every story starts with a purpose worth chasing.
          </h2>
          <GhayaCTA className="mt-10" />
        </Reveal>
      </section>
    </>
  );
}

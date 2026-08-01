import Link from "next/link";
import Reveal from "@/components/Reveal";
import GhayaCTA from "@/components/GhayaCTA";
import ProjectCard from "@/components/ProjectCard";
import Testimonials from "@/components/Testimonials";
import { projects, categoryLabel } from "@/lib/projects";

const serviceGroups = [
  {
    key: "documentary",
    title: categoryLabel.documentary,
    description:
      "Long-form and short-form storytelling that follows real people through real moments — credit-led, cinematic, unhurried.",
  },
  {
    key: "social",
    title: categoryLabel.social,
    description:
      "Reels, carousels, and images built for the scroll — same human-first eye, tuned for how people actually watch.",
  },
] as const;

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex h-svh min-h-[640px] w-full items-end overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/hero-boulders.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/50 to-navy-deep/20" />
        <div className="absolute inset-0 bg-navy-deep/20" />

        <div className="relative z-10 w-full px-6 pb-16 md:px-10 md:pb-24">
          <p className="font-arabic text-6xl leading-none text-fire-soft sm:text-7xl md:text-8xl">
            غاية
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-balance sm:text-5xl md:text-6xl">
            Ghaya means passion &amp; purpose.
            <span className="block text-cream-dim">
              We help you find yours, and film it.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-sm text-cream-dim sm:text-base">
            A production house focused on human storytelling first &mdash;
            whether it&rsquo;s a narrative documentary or a piece built for
            social media.
          </p>
          <GhayaCTA className="mt-10" />
        </div>
      </section>

      {/* What is your Ghaya */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-36">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <Reveal as="h2" className="font-display text-3xl leading-tight sm:text-4xl">
            To explore humans and their passion &mdash; and give it a way to
            be seen.
          </Reveal>
          <div className="space-y-6 text-cream-dim">
            <Reveal delay={100}>
              Ghaya is Arabic for <span className="text-cream">purpose</span>.
              Our goal is simple: discover a person&rsquo;s passion, and
              explore it until it can be felt by anyone watching &mdash;
              simple, but something that ignites what&rsquo;s already inside
              the viewer.
            </Reveal>
            <Reveal delay={200}>
              <Link
                href="/ghaya"
                data-cursor-hover
                className="inline-flex items-center gap-2 text-cream underline decoration-fire/60 underline-offset-4 transition-colors hover:decoration-fire"
              >
                Tell us what yours is &rarr;
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-cream/10 px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-6xl">
          <Reveal className="font-display text-3xl sm:text-4xl">
            What we make
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
                    View work <span aria-hidden="true">&rarr;</span>
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
            {projects.slice(0, 3).map((project, i) => (
              <Reveal key={project.slug} delay={i * 120}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Closing CTA */}
      <section className="border-t border-cream/10 px-6 py-24 text-center md:py-36">
        <Reveal className="mx-auto max-w-2xl">
          <p className="font-arabic text-4xl text-fire-soft">غاية</p>
          <h2 className="mt-4 font-display text-3xl text-balance sm:text-4xl">
            Every story starts with a purpose worth chasing.
          </h2>
          <GhayaCTA className="mt-10" />
        </Reveal>
      </section>
    </>
  );
}

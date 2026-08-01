import Reveal from "@/components/Reveal";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

// Placeholder copy — swap each entry for a real client quote before launch.
const testimonials: Testimonial[] = [
  {
    quote:
      "Add a short quote here about what it was like working with Ghaya Films.",
    name: "Client name",
    role: "Company / role",
  },
  {
    quote:
      "Add a short quote here about what it was like working with Ghaya Films.",
    name: "Client name",
    role: "Company / role",
  },
  {
    quote:
      "Add a short quote here about what it was like working with Ghaya Films.",
    name: "Client name",
    role: "Company / role",
  },
];

export default function Testimonials() {
  return (
    <section className="border-t border-cream/10 px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal className="font-display text-3xl sm:text-4xl">
          What clients say
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              key={i}
              delay={i * 120}
              className="flex h-full flex-col rounded-2xl border border-cream/10 p-8"
            >
              <p className="font-arabic text-3xl text-fire-soft">&ldquo;</p>
              <p className="mt-2 flex-1 text-cream-dim">{t.quote}</p>
              <div className="mt-6">
                <p className="font-display text-lg">{t.name}</p>
                <p className="text-sm text-cream-dim">{t.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

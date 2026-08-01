import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import GhayaForm from "@/components/GhayaForm";

export const metadata: Metadata = {
  title: "What is your Ghaya? — Ghaya Films",
  description:
    "Tell us about the story, the brand, or the passion you want us to help you explore.",
};

export default function GhayaPage() {
  return (
    <div className="px-6 pt-32 pb-24 md:px-10 md:pt-40 md:pb-36">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="font-arabic text-5xl text-fire-soft sm:text-6xl">
            غاية
          </p>
          <h1 className="mt-4 font-display text-4xl text-balance sm:text-5xl">
            What is your ghaya?
          </h1>
          <p className="mt-4 max-w-xl text-cream-dim">
            Every project starts with a purpose. Tell us a bit about yours
            and we&rsquo;ll get back to you to talk through how to film it.
          </p>
        </Reveal>

        <div className="mt-14">
          <GhayaForm />
        </div>
      </div>
    </div>
  );
}

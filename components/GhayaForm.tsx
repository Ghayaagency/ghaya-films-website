"use client";

import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  message: string;
};

const projectTypes = ["Narrative", "Social Media"] as const;

export default function GhayaForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      throw new Error("Failed to submit");
    }
    reset();
  };

  if (isSubmitSuccessful) {
    return (
      <div className="rounded-2xl border border-fire/40 bg-fire/5 p-10 text-center">
        <p className="font-arabic text-4xl text-fire-soft">غاية</p>
        <p className="mt-4 font-display text-2xl">We&rsquo;ve got it.</p>
        <p className="mt-2 text-cream-dim">
          Thanks for sharing your ghaya &mdash; we&rsquo;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input
            {...register("name", { required: "Please tell us your name." })}
            type="text"
            autoComplete="name"
            className={inputClass}
            placeholder="Your name"
          />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <input
            {...register("email", {
              required: "Please share an email so we can reply.",
              pattern: { value: /\S+@\S+\.\S+/, message: "That email doesn't look right." },
            })}
            type="email"
            autoComplete="email"
            className={inputClass}
            placeholder="you@company.com"
          />
        </Field>
      </div>

      <Field label="Company / Brand (optional)">
        <input
          {...register("company")}
          type="text"
          autoComplete="organization"
          className={inputClass}
          placeholder="Where you're calling from"
        />
      </Field>

      <Field label="What kind of project is it?" error={errors.projectType?.message}>
        <div className="grid grid-cols-2 gap-4">
          {projectTypes.map((type) => (
            <label key={type} data-cursor-hover className="cursor-pointer">
              <input
                type="radio"
                value={type}
                {...register("projectType", { required: "Pick one." })}
                className="peer sr-only"
              />
              <span className="block rounded-lg border border-cream/20 px-4 py-4 text-center font-brandon transition-colors peer-checked:border-fire peer-checked:bg-fire/10 peer-checked:text-cream hover:border-cream/40">
                {type}
              </span>
            </label>
          ))}
        </div>
      </Field>

      <Field label="What is your ghaya?" error={errors.message?.message}>
        <textarea
          {...register("message", { required: "Tell us a little about it." })}
          rows={6}
          className={`${inputClass} resize-none`}
          placeholder="Tell us about the story, the brand, or the passion you want us to help you explore."
        />
      </Field>

      <button
        type="submit"
        data-cursor-hover
        disabled={isSubmitting}
        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-cream/30 px-8 py-4 font-display text-lg transition-colors hover:border-fire disabled:opacity-60"
      >
        <span
          className="absolute inset-0 -z-10 scale-0 rounded-full bg-fire/20 blur-xl transition-transform duration-500 group-hover:scale-150"
          aria-hidden="true"
        />
        {isSubmitting ? "Sending..." : "Send it over"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-cream/20 bg-transparent px-4 py-3 text-cream placeholder:text-cream-dim/60 outline-none transition-colors focus:border-fire";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm uppercase tracking-widest text-cream-dim">
        {label}
      </span>
      {children}
      {error && <span className="mt-2 block text-sm text-fire-soft">{error}</span>}
    </label>
  );
}

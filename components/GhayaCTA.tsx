import Link from "next/link";

export default function GhayaCTA({
  className = "",
}: {
  className?: string;
}) {
  return (
    <Link
      href="/ghaya"
      data-cursor-hover
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-cream/30 px-8 py-4 font-display text-lg transition-colors hover:border-fire ${className}`}
    >
      <span
        className="absolute inset-0 -z-10 scale-0 rounded-full bg-fire/20 blur-xl transition-transform duration-500 group-hover:scale-150"
        aria-hidden="true"
      />
      let&rsquo;s find your ghaya?
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
        &rarr;
      </span>
    </Link>
  );
}

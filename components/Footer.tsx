import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-cream/10 px-6 py-10 md:px-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl">Ghaya Films</p>
          <p className="mt-1 max-w-sm text-sm text-cream-dim">
            A production house exploring human stories &mdash; on screen,
            first.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-cream-dim md:items-end">
          <Link href="/ghaya" data-cursor-hover className="hover:text-cream">
            hello@ghayafilms.com
          </Link>
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="hover:text-cream"
            >
              Instagram
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="hover:text-cream"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
      <p className="mt-8 text-xs text-cream-dim/70">
        &copy; {new Date().getFullYear()} Ghaya Films. All rights reserved.
      </p>
    </footer>
  );
}

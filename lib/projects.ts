export type ProjectCategory = "documentary" | "social";
export type SocialFormat = "reels" | "carousels" | "images";

export type MediaItem =
  | { type: "video"; src: string; poster?: string }
  | { type: "image"; src: string };

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  socialFormat?: SocialFormat;
  year: string;
  role: string;
  blurb: string;
  cover: MediaItem;
  gallery: MediaItem[];
  credits: { label: string; name: string }[];
};

export const projects: Project[] = [
  {
    slug: "boulders",
    title: "Boulders",
    client: "Boulders Climbing Gym",
    category: "documentary",
    year: "2025",
    role: "Direction, Filming, Edit",
    blurb:
      "A short documentary following route-setters and climbers as they chase the next problem — the discipline, the falls, and the small victories that come from chasing a passion.",
    cover: { type: "video", src: "/videos/hero-boulders.mp4" },
    gallery: [
      { type: "video", src: "/videos/hero-boulders.mp4" },
      { type: "video", src: "/videos/boulders-vertical.mp4" },
    ],
    credits: [
      { label: "Director", name: "Ghaya Films" },
      { label: "Client", name: "Boulders Climbing Gym" },
    ],
  },
  {
    slug: "dayton-one-way-to-qatar",
    title: "One Way to Qatar",
    client: "Dayton",
    category: "documentary",
    year: "2025",
    role: "Direction, Filming, Edit",
    blurb:
      "Dayton spends Ramadan in Qatar as a non-Muslim exploring the culture, the fasting, and the community around him — a narrative series about discovering a place through its people.",
    cover: { type: "video", src: "/videos/hero-boulders.mp4" },
    gallery: [{ type: "video", src: "/videos/hero-boulders.mp4" }],
    credits: [
      { label: "Director", name: "Ghaya Films" },
      { label: "Featuring", name: "Dayton" },
    ],
  },
  {
    slug: "vrc",
    title: "Quiet Consistency",
    client: "VRC",
    category: "documentary",
    year: "2025",
    role: "Direction, Filming, Edit",
    blurb:
      "A feature on Angie and the quiet, consistent effort behind every run — the vibe of the work day that turns into the desire to move.",
    cover: { type: "video", src: "/videos/hero-boulders.mp4" },
    gallery: [{ type: "video", src: "/videos/hero-boulders.mp4" }],
    credits: [
      { label: "Director", name: "Ghaya Films" },
      { label: "Featuring", name: "Angie" },
    ],
  },
  {
    slug: "berenjak-maha-island",
    title: "Berenjak, Maha Island",
    client: "Berenjak",
    category: "social",
    socialFormat: "images",
    year: "2025",
    role: "Photography",
    blurb:
      "On-location photography at Berenjak's Maha Island and Souq Waqif openings — the food, the crowd, the atmosphere.",
    cover: { type: "image", src: "/images/berenjak/1.jpg" },
    gallery: [
      { type: "image", src: "/images/berenjak/1.jpg" },
      { type: "image", src: "/images/berenjak/2.jpg" },
      { type: "image", src: "/images/berenjak/3.jpg" },
    ],
    credits: [{ label: "Photography", name: "Ghaya Films" }],
  },
  {
    slug: "heenat-salam",
    title: "Heenat Salam",
    client: "Heenat Salam",
    category: "social",
    socialFormat: "carousels",
    year: "2025",
    role: "Photography",
    blurb:
      "Event coverage for Heenat Salam's clay event — shot for a scroll-stopping carousel across their social channels.",
    cover: { type: "image", src: "/images/heenat/1.jpg" },
    gallery: [
      { type: "image", src: "/images/heenat/1.jpg" },
      { type: "image", src: "/images/heenat/2.jpg" },
      { type: "image", src: "/images/heenat/3.jpg" },
      { type: "image", src: "/images/heenat/4.jpg" },
    ],
    credits: [{ label: "Photography", name: "Ghaya Films" }],
  },
  {
    slug: "vrc-reels",
    title: "VRC Reels",
    client: "VRC",
    category: "social",
    socialFormat: "reels",
    year: "2025",
    role: "Filming, Edit",
    blurb:
      "A run of short-form reels for VRC — educational stretches, work-to-run vibes, and feature moments built for the scroll.",
    cover: { type: "video", src: "/videos/boulders-vertical.mp4" },
    gallery: [{ type: "video", src: "/videos/boulders-vertical.mp4" }],
    credits: [{ label: "Edit", name: "Ghaya Films" }],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const categoryLabel: Record<ProjectCategory, string> = {
  documentary: "Narrative",
  social: "Social Media",
};

export const socialFormatLabel: Record<SocialFormat, string> = {
  reels: "Reels",
  carousels: "Carousels",
  images: "Images",
};

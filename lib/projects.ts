export type ProjectCategory = "documentary" | "social";
export type SocialFormat = "reels" | "carousels" | "images" | "long-form";

export type CoverMedia =
  | { type: "video"; src: string; poster?: string }
  | { type: "image"; src: string };

export type MediaItem = CoverMedia | { type: "youtube"; id: string };

export type ContentSection = {
  label: string;
  items: MediaItem[];
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  socialFormats?: SocialFormat[];
  year: string;
  role: string;
  blurb: string;
  cover: CoverMedia;
  gallery: MediaItem[];
  sections?: ContentSection[];
  credits: { label: string; name: string }[];
  pending?: boolean;
  archived?: boolean;
};

export const projects: Project[] = [
  {
    slug: "vrc",
    title: "VRC",
    client: "VRC Running Community",
    category: "social",
    socialFormats: ["reels", "carousels"],
    year: "2026",
    role: "Production",
    blurb:
      "VRC wanted a space where every runner feels like they belong. We shaped that into a simple message — running is for everyone, all you have to do is come — carried across reels and carousels built for the community.",
    cover: { type: "video", src: "/videos/vrc/reels/5-short-breath-2.mp4" },
    gallery: [
      { type: "video", src: "/videos/vrc/reels/1-angie-feature.mp4" },
      { type: "video", src: "/videos/vrc/reels/2-sami-feature.mp4" },
      { type: "video", src: "/videos/vrc/reels/3-educational-piece.mp4" },
      { type: "video", src: "/videos/vrc/reels/4-work-vibe-to-running-desire.mp4" },
      { type: "video", src: "/videos/vrc/reels/5-short-breath-2.mp4" },
      { type: "video", src: "/videos/vrc/reels/6-short-breath.mp4" },
      { type: "video", src: "/videos/vrc/carousel/card-1.mp4" },
      { type: "video", src: "/videos/vrc/carousel/card-2.mp4" },
      { type: "video", src: "/videos/vrc/carousel/card-3.mp4" },
      { type: "video", src: "/videos/vrc/carousel/card-4.mp4" },
      { type: "video", src: "/videos/vrc/carousel/card-5.mp4" },
      { type: "video", src: "/videos/vrc/carousel/card-6.mp4" },
    ],
    sections: [
      {
        label: "Reel",
        items: [
          { type: "video", src: "/videos/vrc/reels/1-angie-feature.mp4" },
          { type: "video", src: "/videos/vrc/reels/2-sami-feature.mp4" },
          { type: "video", src: "/videos/vrc/reels/3-educational-piece.mp4" },
          { type: "video", src: "/videos/vrc/reels/4-work-vibe-to-running-desire.mp4" },
          { type: "video", src: "/videos/vrc/reels/5-short-breath-2.mp4" },
          { type: "video", src: "/videos/vrc/reels/6-short-breath.mp4" },
        ],
      },
      {
        label: "Carousel 1",
        items: [
          { type: "video", src: "/videos/vrc/carousel/card-1.mp4" },
          { type: "video", src: "/videos/vrc/carousel/card-2.mp4" },
          { type: "video", src: "/videos/vrc/carousel/card-3.mp4" },
          { type: "video", src: "/videos/vrc/carousel/card-4.mp4" },
          { type: "video", src: "/videos/vrc/carousel/card-5.mp4" },
          { type: "video", src: "/videos/vrc/carousel/card-6.mp4" },
        ],
      },
      {
        label: "Carousel 2",
        items: [
          { type: "video", src: "/videos/vrc/carousel2/card-1.mp4" },
          { type: "video", src: "/videos/vrc/carousel2/card-2.mp4" },
          { type: "video", src: "/videos/vrc/carousel2/card-3.mp4" },
          { type: "video", src: "/videos/vrc/carousel2/card-4.mp4" },
        ],
      },
    ],
    credits: [{ label: "Production", name: "Ghaya Films" }],
  },
  {
    slug: "heenat-salam",
    title: "Heenat Salam",
    client: "Heenat Salam",
    category: "social",
    socialFormats: ["images"],
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
    archived: true,
  },
  {
    slug: "berenjak-maha-island",
    title: "Berenjak, Maha Island",
    client: "Berenjak",
    category: "social",
    socialFormats: ["images"],
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
    archived: true,
  },
  {
    slug: "dayton-one-way-to-qatar",
    title: "One Way to Qatar",
    client: "Dayton Kendrick",
    category: "social",
    socialFormats: ["reels", "long-form"],
    year: "2025",
    role: "Filming, Edit",
    blurb:
      "Dayton Kendrick, an expat living in Qatar, wanted to show that a full, adventurous life in the GCC is closer than people think — through his own experiences and everyday tips. We split the story into long-form videos for YouTube and short-form cuts for social, so the same journey plays differently depending on where you catch it.",
    cover: { type: "video", src: "/videos/dayton/reels/1.mp4" },
    gallery: [
      { type: "youtube", id: "Nk2MTHsgI1g" },
      { type: "video", src: "/videos/dayton/reels/1.mp4" },
      { type: "video", src: "/videos/dayton/reels/2.mp4" },
      { type: "video", src: "/videos/dayton/reels/3.mp4" },
    ],
    sections: [
      {
        label: "Long-form",
        items: [{ type: "youtube", id: "Nk2MTHsgI1g" }],
      },
      {
        label: "Reels",
        items: [
          { type: "video", src: "/videos/dayton/reels/1.mp4" },
          { type: "video", src: "/videos/dayton/reels/2.mp4" },
          { type: "video", src: "/videos/dayton/reels/3.mp4" },
        ],
      },
    ],
    credits: [
      { label: "Post Production", name: "Ghaya Films" },
      { label: "Featuring", name: "Dayton Kendrick" },
    ],
  },
  {
    slug: "boulders",
    title: "Boulders",
    client: "Boulders Climbing Gym",
    category: "social",
    socialFormats: ["reels", "long-form"],
    year: "2025",
    role: "Production",
    blurb:
      "Boulders is Qatar's first indoor climbing center. For their launch, we told the story through the people building it from the inside — the coach and the route-setters shaping every wall.",
    cover: { type: "video", src: "/videos/boulders/reel/0.mp4" },
    gallery: [
      { type: "video", src: "/videos/boulders/reel/0.mp4" },
      { type: "video", src: "/videos/boulders/reel/1.mp4" },
      { type: "video", src: "/videos/boulders/reel/2.mp4" },
      { type: "video", src: "/videos/boulders/reel/3.mp4" },
      { type: "video", src: "/videos/boulders/reel/4.mp4" },
      { type: "video", src: "/videos/boulders/reel/5.mp4" },
    ],
    sections: [
      {
        label: "Reel",
        items: [
          { type: "video", src: "/videos/boulders/reel/0.mp4" },
          { type: "video", src: "/videos/boulders/reel/1.mp4" },
          { type: "video", src: "/videos/boulders/reel/2.mp4" },
          { type: "video", src: "/videos/boulders/reel/3.mp4" },
          { type: "video", src: "/videos/boulders/reel/4.mp4" },
          { type: "video", src: "/videos/boulders/reel/5.mp4" },
        ],
      },
    ],
    credits: [{ label: "Production", name: "Ghaya Films" }],
  },
  {
    slug: "al-mujadilah-explainer",
    title: "Al-Mujadilah Explainer",
    client: "Al-Mujadilah: Center & Mosque for Women",
    category: "social",
    socialFormats: ["reels"],
    year: "2025",
    role: "Filming, Edit",
    blurb:
      "A set of explainer reels introducing Al-Mujadilah Center & Mosque for Women — footage pending.",
    cover: { type: "image", src: "/images/placeholder.jpg" },
    gallery: [{ type: "image", src: "/images/placeholder.jpg" }],
    credits: [{ label: "Edit", name: "Ghaya Films" }],
    pending: true,
    archived: true,
  },
  {
    slug: "al-mujadilah-documentary",
    title: "Al-Mujadilah",
    client: "Al-Mujadilah: Center & Mosque for Women",
    category: "documentary",
    year: "2025",
    role: "Direction, Filming, Edit",
    blurb:
      "A documentary piece on Al-Mujadilah Center & Mosque for Women — video pending, coming soon via Vimeo.",
    cover: { type: "image", src: "/images/placeholder.jpg" },
    gallery: [{ type: "image", src: "/images/placeholder.jpg" }],
    credits: [{ label: "Director", name: "Ghaya Films" }],
    pending: true,
    archived: true,
  },
];

export const visibleProjects = projects.filter((p) => !p.archived);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const categoryLabel: Record<ProjectCategory, string> = {
  documentary: "Films & Campaigns",
  social: "Digital Content",
};

export const socialFormatLabel: Record<SocialFormat, string> = {
  reels: "Reels",
  carousels: "Carousels",
  images: "Images",
  "long-form": "Long-form",
};

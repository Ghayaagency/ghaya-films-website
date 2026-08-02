"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import MediaRow from "@/components/MediaRow";
import Lightbox from "@/components/Lightbox";
import type { ContentSection, MediaItem } from "@/lib/projects";

export default function ContentSections({
  sections,
}: {
  sections: ContentSection[];
}) {
  const [openItem, setOpenItem] = useState<MediaItem | null>(null);

  return (
    <div className="space-y-16">
      {sections.map((section) => (
        <Reveal key={section.label}>
          <h3 className="mb-6 font-display text-xl text-cream-dim">
            {section.label}
          </h3>
          <MediaRow items={section.items} onExpand={setOpenItem} />
        </Reveal>
      ))}

      <Lightbox item={openItem} onClose={() => setOpenItem(null)} />
    </div>
  );
}

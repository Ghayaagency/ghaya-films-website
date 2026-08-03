"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import MediaRow from "@/components/MediaRow";
import MediaTile from "@/components/MediaTile";
import Lightbox from "@/components/Lightbox";
import { AudioProvider } from "@/components/AudioContext";
import type { ContentSection, MediaItem } from "@/lib/projects";

export default function ContentSections({
  sections,
}: {
  sections: ContentSection[];
}) {
  const [openItem, setOpenItem] = useState<MediaItem | null>(null);

  return (
    <AudioProvider>
      <div className="space-y-16">
        {sections.map((section) => {
          const isSingleWide =
            section.items.length === 1 && section.items[0].type === "youtube";

          return (
            <Reveal key={section.label}>
              <h3 className="mb-6 font-display text-xl text-cream-dim">
                {section.label}
              </h3>
              {isSingleWide ? (
                <MediaTile
                  item={section.items[0]}
                  onExpand={() => setOpenItem(section.items[0])}
                  className="aspect-video w-full"
                />
              ) : (
                <MediaRow items={section.items} onExpand={setOpenItem} />
              )}
            </Reveal>
          );
        })}

        <Lightbox item={openItem} onClose={() => setOpenItem(null)} />
      </div>
    </AudioProvider>
  );
}

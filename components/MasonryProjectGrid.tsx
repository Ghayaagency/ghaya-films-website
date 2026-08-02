import MasonryProjectTile from "@/components/MasonryProjectTile";
import type { Project } from "@/lib/projects";

const LARGE_H = "sm:h-[560px]";
const SMALL_H = "sm:h-[268px]";

export default function MasonryProjectGrid({
  projects,
}: {
  projects: Project[];
}) {
  const groups: Project[][] = [];
  for (let i = 0; i < projects.length; i += 3) {
    groups.push(projects.slice(i, i + 3));
  }

  let runningIndex = 0;

  return (
    <div className="space-y-6">
      {groups.map((group, gi) => {
        const [large, small1, small2] = group;
        const startIndex = runningIndex;
        runningIndex += group.length;

        if (group.length === 3) {
          return (
            <div key={gi} className="flex flex-col gap-6 sm:flex-row">
              <MasonryProjectTile
                project={large}
                index={startIndex}
                className={`aspect-[4/5] sm:aspect-auto sm:w-1/2 ${LARGE_H}`}
              />
              <div className="flex flex-1 flex-col gap-6">
                <MasonryProjectTile
                  project={small1}
                  index={startIndex + 1}
                  className={`aspect-[16/10] sm:aspect-auto ${SMALL_H}`}
                />
                <MasonryProjectTile
                  project={small2}
                  index={startIndex + 2}
                  className={`aspect-[16/10] sm:aspect-auto ${SMALL_H}`}
                />
              </div>
            </div>
          );
        }

        if (group.length === 2) {
          return (
            <div key={gi} className="flex flex-col gap-6 sm:flex-row">
              <MasonryProjectTile
                project={large}
                index={startIndex}
                className={`aspect-[4/5] sm:aspect-auto sm:w-1/2 ${LARGE_H}`}
              />
              <MasonryProjectTile
                project={small1}
                index={startIndex + 1}
                className={`aspect-[4/5] sm:aspect-auto sm:w-1/2 ${LARGE_H}`}
              />
            </div>
          );
        }

        return (
          <div key={gi}>
            <MasonryProjectTile
              project={large}
              index={startIndex}
              className={`aspect-[16/9] sm:aspect-auto ${LARGE_H}`}
            />
          </div>
        );
      })}
    </div>
  );
}

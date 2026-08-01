export default function GrainOverlay({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-40 overflow-hidden ${className}`}
    >
      <svg
        className="grain-pan absolute -inset-1/2 h-[200%] w-[200%] opacity-[0.14]"
        style={{ isolation: "isolate" }}
      >
        <filter
          id="ghaya-grain"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix in="noise" type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ghaya-grain)" />
      </svg>
    </div>
  );
}

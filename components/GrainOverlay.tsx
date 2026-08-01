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
      <svg className="grain-pan absolute -inset-1/2 h-[200%] w-[200%] opacity-[0.22] mix-blend-overlay">
        <filter id="ghaya-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ghaya-grain)" />
      </svg>
    </div>
  );
}

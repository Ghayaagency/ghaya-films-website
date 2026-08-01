"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const flameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const flame = flameRef.current;
    if (!dot || !flame) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dotPos = { ...pos };
    const flamePos = { ...pos };

    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(flame, { xPercent: -50, yPercent: -50 });

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let hovering = false;
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      hovering = !!target.closest("a, button, input, textarea, [role='button'], [data-cursor-hover]");
      gsap.to(flame, {
        scale: hovering ? 2.4 : 1,
        duration: 0.35,
        ease: "power3.out",
      });
    };
    window.addEventListener("mouseover", onOver);

    const ticker = () => {
      dotPos.x += (pos.x - dotPos.x) * 0.9;
      dotPos.y += (pos.y - dotPos.y) * 0.9;
      flamePos.x += (pos.x - flamePos.x) * 0.14;
      flamePos.y += (pos.y - flamePos.y) * 0.14;

      gsap.set(dot, { x: dotPos.x, y: dotPos.y });
      gsap.set(flame, { x: flamePos.x, y: flamePos.y });
    };
    gsap.ticker.add(ticker);

    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      gsap.ticker.remove(ticker);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] hidden md:block" aria-hidden="true">
      <div
        ref={flameRef}
        className="absolute top-0 left-0 h-6 w-6 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(125,180,255,0.85) 0%, rgba(61,123,255,0.45) 45%, rgba(61,123,255,0) 75%)",
          willChange: "transform",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
      />
      <div
        ref={dotRef}
        className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-cream"
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TECH_BADGES = ["HTML", "CSS", "JavaScript", "Cybersécurité"];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tagline1Ref = useRef<HTMLDivElement>(null);
  const tagline2Ref = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Intro: tagline 1 fades up from blur
      gsap.set(tagline1Ref.current, {
        autoAlpha: 0,
        y: 60,
        filter: "blur(20px)",
      });
      gsap.to(tagline1Ref.current, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.6,
        delay: 0.3,
        ease: "expo.out",
      });

      // Intro: tagline 2 sweeps in from right
      gsap.set(tagline2Ref.current, {
        clipPath: "inset(0 100% 0 0)",
      });
      gsap.to(tagline2Ref.current, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.4,
        delay: 1.0,
        ease: "power4.inOut",
      });

      // Intro: badges stagger up
      const badges = badgesRef.current?.querySelectorAll("[data-badge]");
      if (badges) {
        gsap.set(badges, { autoAlpha: 0, y: 20 });
        gsap.to(badges, {
          autoAlpha: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          delay: 1.5,
          ease: "back.out(1.2)",
        });
      }

      // ScrollTrigger: hero content blurs out as user scrolls
      if (contentRef.current && sectionRef.current) {
        gsap.to(contentRef.current, {
          scale: 1.1,
          filter: "blur(20px)",
          opacity: 0,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=600",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="hero"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 0%, transparent 70%)",
        }}
      />

      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(16,185,129,0.08) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Film grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.03,
          background:
            "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/></svg>')",
        }}
      />

      {/* Hero content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center gap-5 px-6"
      >
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold tracking-[3px] uppercase font-mono"
          style={{
            background: "rgba(16,185,129,0.08)",
            border: "1px solid rgba(16,185,129,0.25)",
            color: "var(--accent-light)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{
              background: "var(--accent)",
              boxShadow: "0 0 8px var(--accent)",
            }}
          />
          Bac Pro CIEL · Stage de fin d&apos;école
        </div>

        {/* Taglines */}
        <div className="flex flex-col items-center gap-1">
          <div
            ref={tagline1Ref}
            className="text-[clamp(36px,7vw,80px)] font-black tracking-tight leading-none"
            style={{ color: "var(--text-primary)" }}
          >
            Stage @ EY Fabernovel
          </div>
          <div
            ref={tagline2Ref}
            className="text-[clamp(36px,7vw,80px)] font-black tracking-tight leading-none"
            style={{
              background:
                "linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 50%, var(--accent-lighter) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 30px rgba(16,185,129,0.4))",
            }}
          >
            Eden Tisba
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-12 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent), transparent)",
          }}
        />

        {/* Subtitle */}
        <div className="flex flex-col items-center gap-1">
          <span
            className="font-mono text-sm md:text-base"
            style={{ color: "var(--accent)" }}
          >
            Mission /{" "}
            <span style={{ color: "var(--accent-light)" }}>
              Apprendre HTML, CSS &amp; JavaScript
            </span>
          </span>
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Formation Cybersécurité · Informatique · Électronique
          </span>
        </div>

        {/* Tech badges */}
        <div
          ref={badgesRef}
          className="flex flex-wrap justify-center gap-2 mt-1"
        >
          {TECH_BADGES.map((label) => (
            <span
              key={label}
              data-badge
              className="rounded-lg px-4 py-2 font-mono text-sm transition-colors duration-200"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "var(--text-secondary)",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce z-10"
        aria-hidden="true"
      >
        <div
          className="w-px h-8"
          style={{
            background: "linear-gradient(to bottom, var(--accent), transparent)",
          }}
        />
        <span
          className="font-mono text-[9px] tracking-[3px] uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          Scroll
        </span>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroSection } from "@/components/hero-section";
import { PresentationCard } from "@/components/presentation-card";
import { CTASection } from "@/components/cta-section";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Page() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Card columns slide in from sides
      const cardLeft = document.querySelector("[data-col='left']");
      const cardRight = document.querySelector("[data-col='right']");
      const cardSection = document.querySelector("[data-section='card']");

      if (cardLeft && cardRight && cardSection) {
        gsap.fromTo(
          cardLeft,
          { x: -50, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: cardSection,
              start: "top 75%",
            },
          }
        );
        gsap.fromTo(
          cardRight,
          { x: 50, scale: 0.9, autoAlpha: 0 },
          {
            x: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: cardSection,
              start: "top 75%",
            },
          }
        );
      }

      // CTA fades in
      const ctaSection = document.querySelector("[data-section='cta']");
      if (ctaSection) {
        gsap.fromTo(
          ctaSection,
          { scale: 0.95, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1.0,
            ease: "expo.out",
            scrollTrigger: {
              trigger: ctaSection,
              start: "top 80%",
            },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="overflow-x-hidden">
      <HeroSection />
      <PresentationCard />
      <CTASection />
    </div>
  );
}
